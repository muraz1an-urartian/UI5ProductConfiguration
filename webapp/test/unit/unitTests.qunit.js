/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"saptutorial/product_configuration_api_tutorial/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
