sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
    "use strict";

    return Controller.extend("sap.tutorial.productconfigurationapitutorial.controller.Sales", {
        onAfterRendering: function () {
            const oVizFrame = this.oVizFrame = this.getView().byId("idVizFrame");
            const oPopOver = this.getView().byId("idPopOver");
            // oPopOver.connect(oVizFrame.getVizUid());
        }
    });
});
