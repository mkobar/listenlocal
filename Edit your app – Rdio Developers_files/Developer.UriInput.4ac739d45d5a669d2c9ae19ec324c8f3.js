Bujagali.fxns["client/Components/Developer/UriInput/UriInput.bg.html"]=function(){return function(ctx,args){var self=this;var done=function(post){var markup=self.markup;if(args&&args._blockProviders){args._blockProviders=null}self.done(post);ctx=null;args=null;self=null;done=function(){};return markup};function emit(more){Array.prototype.splice.apply(self.markup,[self.markup.length,more.length].concat(more))}emit(['<div class="row">\n  ']);var __uniqueId=_.uniqueId("__bg_component");emit(['<div id="'+__uniqueId+'" />']);self.view.addChildFromTemplate(__uniqueId,self.view.textInput,{inStateSection:self._inStateSection});emit(['\n  <div class="button-wrapper">\n    <button class="remove button">Remove</button>\n  </div>\n</div>\n<p class="error_text row">A valid redirect URI is required.</p>\n']);return done()}}();R.StyleManager.loadComponentCss("Developer.UriInput",".upper{text-transform:uppercase;}.Developer_UriInput{display:table;margin-bottom:15px;}.Developer_UriInput .row{display:table-row;}.Developer_UriInput .TextInput{display:table-cell;width:100%;}.Developer_UriInput .button-wrapper{display:table-cell;padding-left:15px;}.Developer_UriInput .error_text{display:none;color:#cc4747;}");!function($){R.Component.create("Developer.UriInput",{dependencies:["TextInput"],protocolBlacklist:["about","chrome","data","file","ftp","javascript","mailto","mog","spotify","tel"],events:{"keyup input":"changed","paste input":"changed","click .remove":"handleRemove"},changed:function(){this.trigger("changed")},handleRemove:function(){this.trigger("remove",this)},getValue:function(){return this.textInput.getValue()},validate:function(){var valid=this.textInput.isValid();this.textInput.$el.toggleClass("error",!valid);this.$(".error_text").toggle(!valid);return valid},createChildComponents:function(){var self=this;this.textInput=new R.Components.TextInput({value:this.options.value,validator:function(val){var reg=new RegExp("^([a-zA-Z0-9_-]+)://.*$");var matches=reg.exec(val);if(!matches||_.contains(self.protocolBlacklist,matches[1].toLowerCase())){return false}return true},placeholder:"http://www.yourapp.com/"})},onInserted:function(){if(this.options.focus){_.defer(_.bind(this.textInput.setFocus,this.textInput))}}})}(R.$);
//# sourceMappingURL=/media/client/orig/Components/Developer.UriInput.4ac739d45d5a669d2c9ae19ec324c8f3.js.map