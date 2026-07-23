using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<JsonOptions>(opts => opts.SerializerOptions.WriteIndented = true);
// Allow the Vite dev server at http://localhost:5173 to call the API during development
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Add Swagger generation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors();

app.MapPost("/api/calculate", (List<MaterialDto> materials) =>
{
    var results = materials.Select(m => new
    {
        name = m.Name,
        costPerMillion = Math.Round(Calculations.CostPerMillion(m.HeatingValue, m.CostPerUnit, m.Unit), 2)
    });
    return Results.Ok(results);
});

app.Run("http://localhost:5000");

internal record MaterialDto(string Name, double HeatingValue, double CostPerUnit, string Unit);

internal static class Calculations
{
    // Unit: "ton" indicates cost is per ton (divide by 2000). Others treated as per-unit directly (Mcf, Gallon, KWH)
    public static double CostPerMillion(double heatingValue, double costPerUnit, string unit)
    {
        if (heatingValue <= 0) return 0;
        double effectiveCost = unit?.ToLowerInvariant() == "ton" ? (costPerUnit / 2000.0) : costPerUnit;
        return effectiveCost * (1_000_000.0 / heatingValue);
    }
}