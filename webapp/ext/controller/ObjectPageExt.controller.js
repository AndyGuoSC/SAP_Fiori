sap.ui.define([
	"sap/ui/core/mvc/ControllerExtension",
	"sap/ui/model/Filter",
	"sap/ui/core/Locale",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment"
], function (ControllerExtension, Filter, Locale, MessageToast, Fragment) {
	"use strict";

	return sap.ui.controller("aatest.ext.controller.ObjectPageExt", {
		
		onInit: function () {
			
		},
		
		onPopupSelectionDialog: function () {
			var that = this;
			var oView = that.getView();

			// create dialog lazily
			if (!that.byId("postSelection")) {
				// load asynchronous XML fragment
				Fragment.load({
					id: oView.getId(),
					name: "aatest.ext.view.PostSelection",
					controller: that
				}).then(function (oDialog) {
					// connect dialog to the root view of this component (models, lifecycle)
					oView.addDependent(oDialog);
					oDialog.open();
				});
			} else {
				that.byId("postSelection").open();
			}
		},
		
		onCloseDialog : function () {
			this.byId("postSelection").close();
		},
		
		onClickActionPostInvoice: function (oEvent) {
			var item = this.getView().getContent()[0];
			var sUpToDate = this.byId("upToDate").getValue();
			if (item) {
				var that = this;
				var oView = that.getView();
				var oDataModel = oView.getModel();
				
				var oContext = item._getBindingContext();
	
				var fnError = function (err) {
					that.byId("postSelection").close();
					//var message = $(err.response.body).find("message").first().text();
					var message = err.responseText;
					sap.m.MessageBox.show(
						message,
						sap.m.MessageBox.Icon.ERROR,
						"ERROR" );
				};
				
				var fnSuccess = function(oData, response) {
					//var oMessage = new Message({
					//	message: response.body,
					//	type: MessageType.Success,
					//	processor: oDataModel
					//});
					//sap.ui.getCore().getMessageManager().addMessages(oMessage);
					that.byId("postSelection").close();
					var message = " ";
					var errFlag;
					var len = response.data.results.length;
					for (var j=0; j<len; j++) {
						message = message.concat(response.data.results[j].mtext, "\n");
						if ( response.data.results[j].Msgty !== "S" ) {
							errFlag = "error";
						}
					}
					if ( errFlag === "error" ) {
						sap.m.MessageBox.show(
							message,
							sap.m.MessageBox.Icon.ERROR,
							"ERROR" );
					}
					else{
						sap.m.MessageBox.show(
							message,
							sap.m.MessageBox.Icon.SUCCESS,
							"Success" );
					}
					//read data for refreshing the forcast section
					oDataModel.read("/ZZZC_RecrrgTmplForcast");
				};	
	            
	            var sTemplateUUID = oDataModel.getProperty("RecrrgInvcTmplUUID", oContext);
				var sIsActiveEntity = true;
				var oUrlParameters = {RecrrgInvcTmplUUID : sTemplateUUID, IsActiveEntity : sIsActiveEntity, upToDate : sUpToDate};      
				//oDataModel.callFunction("/A7B6A7D694FADF4C45D481DD9DF6Post_invoice", {
				//		method: "POST",
				oDataModel.callFunction("/onPost_invoice", {
						method: "GET",
						urlParameters: oUrlParameters,
						success: fnSuccess,
						error: fnError
				});
				that.byId("postSelection").close();
			} else {
				MessageToast.show("You must first select a row!");
			}
			
		},
		
		onReleaseTmpl: function (oEvent) {
			var item = this.getView().getContent()[0];
			var that = this;
			var oView = that.getView();
			var oDataModel = oView.getModel();
			var oContext = item._getBindingContext();
			var sTemplateUUID = oDataModel.getProperty("RecrrgInvcTmplUUID", oContext);
			var oUrlParameters = {RecrrgInvcTmplUUID : sTemplateUUID };
			
			var fnError = function (err) {
				var message = err.responseText;
				sap.m.MessageBox.show(
					message,
					sap.m.MessageBox.Icon.ERROR,
					"ERROR" );
			};
		
			var fnSuccess = function(oData, response) {
				var message = " ";
				var errFlag;
				var len = response.data.results.length;
				for (var j=0; j<len; j++) {
					message = message.concat(response.data.results[j].mtext, "\n");
					if ( response.data.results[j].Msgty !== "S" ) {
						errFlag = "error";
					}
				}
				if ( errFlag === "error" ) {
					sap.m.MessageBox.show(
						message,
						sap.m.MessageBox.Icon.ERROR,
						"ERROR" );
				}
				else{
					sap.m.MessageBox.show(
						message,
						sap.m.MessageBox.Icon.SUCCESS,
						"Success" );
				}
				oDataModel.read("/ZZZC_RecrrgTmpl");
			};			
			
			oDataModel.callFunction("/onRelease_tmpl", {
					method: "GET",
					urlParameters: oUrlParameters,
					success: fnSuccess,
					error: fnError
			});
		},
		
		onBlockTmpl: function (oEvent) {
			var item = this.getView().getContent()[0];
			var that = this;
			var oView = that.getView();
			var oDataModel = oView.getModel();
			var oContext = item._getBindingContext();
			var sTemplateUUID = oDataModel.getProperty("RecrrgInvcTmplUUID", oContext);
			var oUrlParameters = {RecrrgInvcTmplUUID : sTemplateUUID };
			
			var fnError = function (err) {
				var message = err.responseText;
				sap.m.MessageBox.show(
					message,
					sap.m.MessageBox.Icon.ERROR,
					"ERROR" );
			};
		
			var fnSuccess = function(oData, response) {
				var message = " ";
				var errFlag;
				var len = response.data.results.length;
				for (var j=0; j<len; j++) {
					message = message.concat(response.data.results[j].mtext, "\n");
					if ( response.data.results[j].Msgty !== "S" ) {
						errFlag = "error";
					}
				}
				if ( errFlag === "error" ) {
					sap.m.MessageBox.show(
						message,
						sap.m.MessageBox.Icon.ERROR,
						"ERROR" );
				}
				else{
					sap.m.MessageBox.show(
						message,
						sap.m.MessageBox.Icon.SUCCESS,
						"Success" );
				}
				oDataModel.read("/ZZZC_RecrrgTmpl");
			};			
			
			oDataModel.callFunction("/onBlock_tmpl", {
					method: "GET",
					urlParameters: oUrlParameters,
					success: fnSuccess,
					error: fnError
			});
		}

	});
});