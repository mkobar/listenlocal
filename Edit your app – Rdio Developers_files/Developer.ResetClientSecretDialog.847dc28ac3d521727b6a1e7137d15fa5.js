Bujagali.fxns["client/Components/Developer/ResetClientSecretDialog/ResetClientSecretDialog.bg.html"]=function(){return function(ctx,args){var self=this;var done=function(post){var markup=self.markup;if(args&&args._blockProviders){args._blockProviders=null}self.done(post);ctx=null;args=null;self=null;done=function(){};return markup};function emit(more){Array.prototype.splice.apply(self.markup,[self.markup.length,more.length].concat(more))}emit(["\n"]);function bodyContent(){emit(['\n  <div class="error_message"></div>\n  ',t("WARNING: Your client_secret will be reset. This will take effect immediately, and your app will not be able to make API calls until you update your code to use the new client_secret."),"\n"])}emit(["\n"]);!function(){var __extendArgs=self.args||{};if(!__extendArgs._blockProviders){__extendArgs._blockProviders=[]}else{__extendArgs._blockProviders=__extendArgs._blockProviders.slice()}__extendArgs._blockProviders.push(function(functionName){try{return eval(functionName)}catch(e){return self.noBlockFound}});var __bgextend=new self.ctor("client/Components/Dialog/Dialog.bg.html",self.context,self.root);__bgextend.view=self.view;__bgextend.render(self.context,function(){},__extendArgs,self.markup);self._extendMonad=__bgextend}();return done()}}();!function($){R.Component.create("Developer.ResetClientSecretDialog",{dependencies:["Dialog"],superClass:"Dialog",title:function(){return"Reset Client Secret"},initialize:function(){R.Component.prototype.initialize.apply(this,arguments)},buttons:function(){var resetButton=new Backbone.Model({label:"Reset",className:"red",context:this,callback:this.onReset});return resetButton},closeButton:function(){return"Cancel"},onRendered:function(){R.Components.Developer.ResetClientSecretDialog.callSuper(this,"onRendered");this.$errorMessage=this.$(".error_message");this.$buttons=this.$("button")},onReset:function(){var self=this;this._clearErrorMessage();this._disableButtons();R.Api.request({method:"resetClientSecret",content:{client_id:this.model.get("client_id")},success:function(response){self.trigger("contentUpdated",response.result);self.close()},error:function(){self._showErrorMessage("There was a problem resetting your client secret.");self._enableButtons()}})},_showErrorMessage:function(message){this.$errorMessage.html(message).show()},_clearErrorMessage:function(){this.$errorMessage.html("").hide()},_enableButtons:function(){this.$buttons.removeAttr("disabled")},_disableButtons:function(){this.$buttons.attr("disabled",true)}})}(R.$);
//# sourceMappingURL=/media/client/orig/Components/Developer.ResetClientSecretDialog.847dc28ac3d521727b6a1e7137d15fa5.js.map