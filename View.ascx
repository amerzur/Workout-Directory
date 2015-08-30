<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="View.ascx.cs" Inherits="Fitnessyard.Modules.FYWorkoutDirectory.View" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.Client.ClientResourceManagement" Assembly="DotNetNuke.Web.Client" %>
<dnn:DnnCssInclude runat="server" FilePath="DesktopModules/FYWorkoutDirectory/CSS/ngDialog.min.css"/>
<dnn:DnnCssInclude runat="server" FilePath="DesktopModules/FYWorkoutDirectory/CSS/ngDialog-theme-default.min.css"/>
<dnn:DnnCssInclude runat="server" FilePath="DesktopModules/FYWorkoutDirectory/CSS/font-awesome.css"/>
<dnn:DnnCssInclude runat="server" FilePath="DesktopModules/FYWorkoutDirectory/CSS/angular.rangeSlider.css"/>
<dnn:DnnCssInclude runat="server" FilePath="Portals/_default/Skins/FitnessyardEnglishSkin/assets/Plugins/bootstrap-toastr/toastr.css"/>
<dnn:DnnCssInclude runat="server" FilePath="DesktopModules/FYWorkoutDirectory/CSS/angular-busy.css"/>

 <input type="hidden" id="hdn_tm_usrid" clientidmode="Static" value="<%= UserInfo.UserID %>" />
<input type="hidden" id="hdn_tm_culture" clientidmode="Static" value="<%= PortalSettings.DefaultLanguage %>" />
<input type="hidden" id="hdn_tm_Url" clientidmode="Static" value="<%= "http://"+this.Context.Request.Url.Host + this.Context.Request.RawUrl %>" />

 
<div class="page-container  " ng-app="WDApp">
    <div ui-view>
    
    
  </div>
    
</div>
<%-- library scripts  --%>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude1" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/angular.js" Priority="110"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude9" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/angular-translate.js" Priority="111"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude3" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/AngularUI/ui-router.min.js" Priority="112"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude2" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/angular-animate.js" Priority="113"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude6" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/angular-strap.min.js" Priority="114"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude7" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/angular-strap.tpl.min.js" Priority="115"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude12" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/moment.js" Priority="116"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude18" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/ngDialog.min.js" Priority="117"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude10" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/ngCart/dist/ngCart.js" Priority="118"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude11" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/ui-bootstrap-tpls-0.13.0.js" Priority="119"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude19" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/angular-resource.js" Priority="120"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude20" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/jquery.fancybox.js" Priority="121"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude25" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/jquery.fancybox.pack.js" Priority="122"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude27" runat="server" FilePath="/Portals/_default/Skins/FitnessyardEnglishSkin/assets/plugins/jquery.blockui.min.js" Priority="122"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude26" runat="server" FilePath="Portals/_default/Skins/FitnessyardEnglishSkin/assets/Plugins/bootstrap-toastr/toastr.css" Priority="123"/>
<dnn:DnnJsInclude  ForceProvider="DnnFormBottomProvider"  ID="DnnJsInclude30" runat="server" FilePath="/DesktopModules/FYWorkoutDirectory/Scripts/toastr.min.js" Priority="124" />
 
<dnn:DnnJsInclude  ForceProvider="DnnFormBottomProvider"  ID="DnnJsInclude31" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/angular.rangeSlider.js" Priority="125" />
<dnn:DnnJsInclude  ForceProvider="DnnFormBottomProvider"  ID="DnnJsInclude32" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/angular-busy.js" Priority="126" />
<dnn:DnnJsInclude  ForceProvider="DnnFormBottomProvider"  ID="DnnJsInclude33" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/angular-seo.js" Priority="127" />
<dnn:DnnJsInclude  ForceProvider="DnnFormBottomProvider"  ID="DnnJsInclude28" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/Scripts/angular-file-upload.min.js" Priority="128" />
  
 


<%-- app scripts  --%>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude4" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/app.js" Priority="130"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude21" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/controllers/CompletePlansController.js" Priority="132"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude8" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/controllers/homeControlller.js" Priority="131"/>
<dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude15" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/controllers/WorkoutDetailsController.js" Priority="133"/>
 <dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude22" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/controllers/WorkoutDetailsListController.js" Priority="134"/>
 <dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude23" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/controllers/CartDetailsController.js" Priority="138"/>
 <dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude24" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/controllers/BillingController.js" Priority="139"/>
 <dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude13" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/controllers/paymentStatusController.js" Priority="140"/>
 <dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude29" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/controllers/PurchaseItemsController.js" Priority="141"/>
 <dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude5" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/controllers/addWorkoutController.js" Priority="142"/>
 
  <dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude14" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/factories/WDAppFactory.js" Priority="135"/>
 <dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude17" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/services/WDService.js" Priority="136"/>
 <dnn:DnnJsInclude ForceProvider="DnnFormBottomProvider" ID="DnnJsInclude16" runat="server" FilePath="DesktopModules/FYWorkoutDirectory/app/directives/WDdirective.js" Priority="137"/>

 
