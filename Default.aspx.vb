
Partial Class _Default
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load

    End Sub

    Protected Sub btnCalculate_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles btnCalculate.Click
        Dim dryWoodHeatValue As Double = Me.tbxHeatingValue1.Text
        Dim greenWoodHeatValue As Double = Me.tbxHeatingValue2.Text
        Dim CoalHeatValue As Double = Me.tbxHeatingValue3.Text
        Dim NaturalGasHeatValue As Double = Me.tbxHeatingValue4.Text
        Dim OilHeatValue As Double = Me.tbxHeatingValue5.Text
        Dim ElectricHeatValue As Double = Me.tbxHeatingValue6.Text
        Dim dryWoodCostperUnit As Double = Me.tbxCostperUnit1.Text
        Dim greenWoodCostperUnit As Double = Me.tbxCostperUnit2.Text
        Dim CoalCostperUnit As Double = Me.tbxCostperUnit3.Text
        Dim NaturalGasCostperUnit As Double = Me.tbxCostperUnit4.Text
        Dim OilCostperUnit As Double = Me.tbxCostperUnit5.Text
        Dim ElectricCostperUnit As Double = Me.tbxCostperUnit6.Text

        Dim dryWoodCostperMillion As Double = (dryWoodCostperUnit / 2000) * (1000000 / dryWoodHeatValue)
        Dim greenWoodCostperMillion As Double = (greenWoodCostperUnit / 2000) * (1000000 / greenWoodHeatValue)
        Dim CoalWoodCostperMillion As Double = (CoalCostperUnit / 2000) * (1000000 / CoalHeatValue)
        Dim NaturalGasCostperMillion As Double = NaturalGasCostperUnit * (1000000 / NaturalGasHeatValue)
        Dim OilGasCostperMillion As Double = OilCostperUnit * (1000000 / OilHeatValue)
        Dim ElectricCostperMillion As Double = ElectricCostperUnit * (1000000 / ElectricHeatValue)

        Me.lblCostperMillion1.Text = Math.Round(dryWoodCostperMillion, 2)
        Me.lblCostperMillion2.Text = Math.Round(greenWoodCostperMillion, 2)
        Me.lblCostperMillion3.Text = Math.Round(CoalWoodCostperMillion, 2)
        Me.lblCostperMillion4.Text = Math.Round(NaturalGasCostperMillion, 2)
        Me.lblCostperMillion5.Text = Math.Round(OilGasCostperMillion, 2)
        Me.lblCostperMillion6.Text = Math.Round(ElectricCostperMillion, 2)
    End Sub

End Class
