export function calculateLocal(materials: { Name: string; HeatingValue: number; CostPerUnit: number; Unit: string }[]) {
  const results = materials.map(m => {
    const heating = m.HeatingValue || 0
    const costPerUnit = m.CostPerUnit || 0
    const effectiveCost = (m.Unit?.toLowerCase() === 'ton') ? (costPerUnit / 2000.0) : costPerUnit
    const costPerMillion = heating > 0 ? Math.round(effectiveCost * (1_000_000.0 / heating) * 100) / 100 : 0
    return { name: m.Name, costPerMillion }
  })
  return results
}
