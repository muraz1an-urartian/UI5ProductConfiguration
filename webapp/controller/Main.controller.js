sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/base/Log"
],function (Controller,JSONModel,Log) {
        "use strict";

        return Controller.extend("sap.tutorial.productconfigurationapitutorial.controller.Main", {
           
          
          
          onInit: function () {

                var data = JSON.stringify({
                    "context": [
                      {
                        "name": "VBAP-VRKME",
                        "value": "EA"
                      }
                    ],
                    "date": "2018-08-09",
                    "kbId": 80,
                    "productKey": "CPS_BURGER"
                  });
                  
                  let self = this
                  this.getView().setModel(new JSONModel({}));

                  var xhr = new XMLHttpRequest();
                  xhr.withCredentials = false;
                  
                  xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === this.DONE) {
                      let jsonResults = JSON.parse(this.responseText)

                      var CPS_OPTION_M = jsonResults.rootItem.characteristics.find(function (i) { return i.id === "CPS_OPTION_M"; });
                      self.getView().getModel().setProperty("/possible_values", CPS_OPTION_M.possibleValues);
                      if (CPS_OPTION_M.values.length > 0) {
                        self.getView().getModel().setProperty("/value", CPS_OPTION_M.values[0].value);
                      } else {
                        self.getView().getModel().setProperty("/value", "");
                      }
                      
                      self.getView().getModel().setProperty("/config_id", jsonResults.id);
                      self.getView().getModel().setProperty("/item_id", jsonResults.rootItem.id);
                      
                      self.getView().getModel().setProperty("/etag", this.getResponseHeader("etag"));

                      self.readkb(jsonResults.kbId)
                    }
                  });
                  
                  //setting request method
                  //API endpoint for API sandbox 
                  xhr.open("POST", "https://sandbox.api.sap.com/cpservices/prodconf/api/v2/configurations?%24select=subItems%2CcharacteristicGroups%2CvariantConditions%2Ccharacteristics%2CpossibleValues%2Cvalues");
                  
                  
                  //adding request headers
                  xhr.setRequestHeader("Accept-Language", "en");
                  //API Key for API Sandbox
                  xhr.setRequestHeader("APIKey", "91tkdlX53e9kLFAr6KhGVNVbInTujyAU");
                  xhr.setRequestHeader("Accept", "application/json");
                  xhr.setRequestHeader("Content-Type", "application/json");
                  
                  
                  //sending request
                  xhr.send(data);
                  
            },

            onBeforeRendering: function () {
              window.message = "A random log message";
            },

            navToSales: function(oEvent){
              let oItem = oEvent.getSource()
              let oRouter = sap.ui.core.UIComponent.getRouterFor(this)
              oRouter.navTo("Sales")
            },
            // onAfterRendering: function () {
            //   debugger;
            // },

            onChange: function (oEvent) {
              var data = JSON.stringify({
                "values": [{
                    "value": this.getView().getModel().getProperty("/value"),
                    "selected": true
                }]
                });

              let self = this
              
              var xhr = new XMLHttpRequest();
              xhr.withCredentials = false;
              
              xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                  
                  self.getView().getModel().setProperty("/etag", this.getResponseHeader("etag"));
                }
              });
              
              //setting request method
              //API endpoint for API sandbox 
              xhr.open("PATCH",
              "https://sandbox.api.sap.com/cpservices/prodconf/api/v2/configurations/" +
                      this.getView().getModel().getProperty("/config_id") + "/items/" +
                      this.getView().getModel().getProperty("/item_id") + "/characteristics/CPS_OPTION_M "
                      );
              
              
              //adding request headers
              xhr.setRequestHeader("If-Match", "");
              //API Key for API Sandbox
              xhr.setRequestHeader("APIKey", "91tkdlX53e9kLFAr6KhGVNVbInTujyAU");
              xhr.setRequestHeader("Accept", "application/json");
              xhr.setRequestHeader("Content-Type", "application/json");
              
              
              //sending request
              xhr.send(data);
            },

            readkb: function (kbId) {
              var data = JSON.stringify(false);

              let self = this;

              var xhr = new XMLHttpRequest();
              xhr.withCredentials = false;

              xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                  // console.log(this.responseText);
                  var jsonResults = JSON.parse(this.responseText);
                  var CPS_OPTION_M = jsonResults.characteristics.find(function (i) {
                  return i.id === "CPS_OPTION_M";
                  });
                  self.getView().getModel().setProperty("/possible_values", CPS_OPTION_M.possibleValues);
                  self.getView().getModel().setProperty("/name", CPS_OPTION_M.name);

                }
              });

              xhr.open("GET", "https://sandbox.api.sap.com/cpservices/prodconf/api/v2/knowledgebases/" + kbId + 
                                  "?$select=products,classes,characteristics,characteristicSpecifics,bomItems,description");



              xhr.setRequestHeader("Accept-Language", "");
              xhr.setRequestHeader("APIKey", "91tkdlX53e9kLFAr6KhGVNVbInTujyAU");
              xhr.setRequestHeader("Accept", "application/json");
              xhr.setRequestHeader("Content-type", "application/json");


              //sending request
              xhr.send(data);
            }
        });
    });
