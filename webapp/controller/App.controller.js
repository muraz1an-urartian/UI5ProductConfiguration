sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("sap.tutorial.productconfigurationapitutorial.controller.App", {
        onInit() {
        },
        navToSales: function(oEvent){
          let oItem = oEvent.getSource()
          let oRouter = sap.ui.core.UIComponent.getRouterFor(this)
          oRouter.navTo("Sales")
        }
      });
    }
  );
  