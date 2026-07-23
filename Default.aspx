<%@ Page Language="VB" AutoEventWireup="false" CodeFile="Default.aspx.vb" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Energy</title>
</head>
<body>

    <form id="form1" runat="server" defaultbutton="btnCalculate">
    
    <div>
        <table style="width: 500px; height: 176px">
            <tr style="background-color:#ECECE3">
                <th style="width:80px">Material</th>
                <th style="width: 155px">Heating Value</th>
                <th style="width: 155px">Cost per Unit ($)</th>
                <th style="width:80px">Cost per Million BTU ($)</th>
              
                
            </tr>
            <tr>
                <th>
                    Wood (dry)
                </th>
                <td style="width: 150px" align="left">
                <asp:Textbox runat="server" ID="tbxHeatingValue1" Width="40%">7000</asp:Textbox>
                <asp:RequiredFieldValidator ID="rfvtbxHeatingValue1" runat="server" ControlToValidate="tbxHeatingValue1" Display="Dynamic" ErrorMessage="*" Enabled="true"></asp:RequiredFieldValidator>
                <asp:Label ID="lblBtu1" runat="server" Text="Btu/lb"></asp:Label>
                </td>
                <td style="width: 150px" align="left">
                <asp:Label ID="lblDollar1" Width="6px" runat="server" Text="$"></asp:Label>
                <asp:Textbox runat="server" ID="tbxCostperUnit1" Width="40%">40</asp:Textbox>
                <asp:RequiredFieldValidator ID="rfvtbxCostperUnit" runat="server" ControlToValidate="tbxCostperUnit1" Display="Dynamic" ErrorMessage="*" Enabled="true"></asp:RequiredFieldValidator>
                <asp:Label ID="lblTon1" runat="server" Text="/Ton"></asp:Label>
                </td>
                <td align="center">
                <asp:Label ID="lblDollar2" Width="6px" runat="server" Text="$"></asp:Label>
                <asp:Label runat="server" ID="lblCostperMillion1">3.64</asp:Label>
                </td>
            </tr>
            <tr>
                <th>
                    Wood (green)
                </th>
                <td style="width: 150px" align="left">
                <asp:Textbox runat="server" ID="tbxHeatingValue2" Width="40%">4900</asp:Textbox>
                <asp:RequiredFieldValidator ID="rfvtbxHeatingValue2" runat="server" ControlToValidate="tbxHeatingValue2" Display="Dynamic" ErrorMessage="*" Enabled="true"></asp:RequiredFieldValidator>
                <asp:Label ID="lblBtu2" runat="server" Text="Btu/lb"></asp:Label>
                </td>
                <td style="width: 150px" align="left">
                <asp:Label ID="lblDollar3" Width="6px" runat="server" Text="$"></asp:Label>
                <asp:Textbox runat="server" ID="tbxCostperUnit2" Width="40%">30</asp:Textbox>
                <asp:RequiredFieldValidator ID="rfvtbxCostperUnit2" runat="server" ControlToValidate="tbxCostperUnit2" Display="Dynamic" ErrorMessage="*" Enabled="true"></asp:RequiredFieldValidator>
                <asp:Label ID="lblTon2" runat="server" Text="/Ton"></asp:Label>
                </td>
                <td align="center">
                <asp:Label ID="lblDollar4" Width="6px" runat="server" Text="$"></asp:Label>
                <asp:Label runat="server" ID="lblCostperMillion2">3.91</asp:Label>
                </td>
            </tr>
            
            <tr>
                <th>Coal
                </th>
                <td style="width: 150px" align="left">
                <asp:Textbox runat="server" ID="tbxHeatingValue3" Width="40%">12,200</asp:Textbox>
                <asp:RequiredFieldValidator ID="rfvtbxHeatingValue3" runat="server" ControlToValidate="tbxHeatingValue3" Display="Dynamic" ErrorMessage="*" Enabled="true"></asp:RequiredFieldValidator>
                <asp:Label ID="lblBtu3" runat="server" Text="Btu/lb"></asp:Label>
                </td>
                <td style="width: 150px" align="left">
                <asp:Label ID="lblDollar5" Width="6px" runat="server" Text="$"></asp:Label>
                <asp:Textbox runat="server" ID="tbxCostperUnit3" Width="40%">140</asp:Textbox>
                <asp:RequiredFieldValidator ID="rfvtbxCostperUnit3" runat="server" ControlToValidate="tbxCostperUnit3" Display="Dynamic" ErrorMessage="*" Enabled="true"></asp:RequiredFieldValidator>
                <asp:Label ID="lblTon3" runat="server" Text="/Ton"></asp:Label>
                </td>
                <td align="center">
                <asp:Label ID="lblDollar6" Width="6px" runat="server" Text="$"></asp:Label>
                <asp:Label runat="server" ID="lblCostperMillion3">5.74</asp:Label>
                </td>
            </tr>
            <tr>
                <th>Gas (natural)
                </th>
                <td style="width: 150px" align="left">
                <asp:Textbox runat="server" ID="tbxHeatingValue4" Width="40%">1,028,000</asp:Textbox>
                <asp:RequiredFieldValidator ID="rfvtbxHeatingValue4" runat="server" ControlToValidate="tbxHeatingValue4" Display="Dynamic" ErrorMessage="*" Enabled="true"></asp:RequiredFieldValidator>
                <asp:Label ID="lblBtu4" runat="server" Text="Btu/Mcf"></asp:Label>
                </td>
                <td style="width: 150px" align="left">
                <asp:Label ID="lblDollar7" Width="6px" runat="server" Text="$"></asp:Label>
                <asp:Textbox runat="server" ID="tbxCostperUnit4" Width="40%">10.62</asp:Textbox>
                <asp:RequiredFieldValidator ID="rfvtbxCostperUnit4" runat="server" ControlToValidate="tbxCostperUnit4" Display="Dynamic" ErrorMessage="*" Enabled="true"></asp:RequiredFieldValidator>
                <asp:Label ID="lblMcf" runat="server" Text="/Mcf"></asp:Label>
                </td>
                <td align="center">
                <asp:Label ID="lblDollar8" Width="6px" runat="server" Text="$"></asp:Label>
                <asp:Label runat="server" ID="lblCostperMillion4">10.33</asp:Label>
                </td>
            </tr>
            <tr>
                <th style="height: 26px">Oil
                </th>
                <td style="width: 150px" align="left">
                <asp:Textbox runat="server" ID="tbxHeatingValue5" Width="40%">144,000</asp:Textbox>
                <asp:RequiredFieldValidator ID="rfvtbxHeatingValue5" runat="server" ControlToValidate="tbxHeatingValue5" Display="Dynamic" ErrorMessage="*" Enabled="true"></asp:RequiredFieldValidator>
                <asp:Label ID="lblBtu5" runat="server" Text="Btu/Gallon"></asp:Label>
                </td>
                <td style="width: 150px" align="left">
                <asp:Label ID="lblDollar9" Width="6px" runat="server" Text="$"></asp:Label>
                <asp:Textbox runat="server" ID="tbxCostperUnit5" Width="40%">3.85</asp:Textbox>
                <asp:RequiredFieldValidator ID="rfvtbxCostperUnit5" runat="server" ControlToValidate="tbxCostperUnit5" Display="Dynamic" ErrorMessage="*" Enabled="true"></asp:RequiredFieldValidator>
                <asp:Label ID="lblGallon" runat="server" Text="/Gallon"></asp:Label>
                </td>
                <td style="height: 26px" align="center">
                <asp:Label ID="lblDollar10" Width="6px" runat="server" Text="$"></asp:Label>
                <asp:Label runat="server" ID="lblCostperMillion5">26.74</asp:Label>
                </td>
            </tr>
            <tr>
                <th>Electric
                </th>
                <td style="width: 150px" align="left">
                <asp:Textbox runat="server" ID="tbxHeatingValue6" Width="40%">3412</asp:Textbox>
                <asp:RequiredFieldValidator ID="rfvtbxHeatingValue6" runat="server" ControlToValidate="tbxHeatingValue6" Display="Dynamic" ErrorMessage="*" Enabled="true"></asp:RequiredFieldValidator>
                <asp:Label ID="lblBtu6" runat="server" Text="Btu/KWH"></asp:Label>
                </td>
                <td style="width: 150px" align="left">
                <asp:Label ID="lblDollar11" Width="6px" runat="server" Text="$"></asp:Label>
                <asp:Textbox runat="server" ID="tbxCostperUnit6" Width="40%">0.12</asp:Textbox>
                <asp:RequiredFieldValidator ID="rfvtbxCostperUnit6" runat="server" ControlToValidate="tbxCostperUnit6" Display="Dynamic" ErrorMessage="*" Enabled="true"></asp:RequiredFieldValidator>
                <asp:Label ID="lblKWH" runat="server" Text="/KWH"></asp:Label>
                </td>
                <td align="center">
                <asp:Label ID="lblDollar12" Width="6px" runat="server" Text="$"></asp:Label>
                <asp:Label runat="server" ID="lblCostperMillion6">35.17</asp:Label>
                </td>
            </tr>
        
        <tr>
        <td align="center" colspan="4">
        <asp:Button ID="btnCalculate" runat="server" Height="24px" Text="Calculate" Width="88px" style="display:none"/>
        </td>
        </tr>
        <tr>
        <td align="center" colspan="4">
        <asp:Label ID="tbxUserInfo" runat="server" Height="24px" Width="488px">Change the values in the above fields and hit enter to re-calculate.</asp:Label>
        </td>
        </tr>
        </table>
        </div>
        
      </form>
</body>
</html>
