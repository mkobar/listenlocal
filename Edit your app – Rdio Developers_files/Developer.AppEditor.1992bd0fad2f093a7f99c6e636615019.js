Bujagali.fxns["client/Components/Developer/AppEditor/AppEditor.bg.html"]=function(){return function(ctx,args){var self=this;var done=function(post){var markup=self.markup;if(args&&args._blockProviders){args._blockProviders=null}self.done(post);ctx=null;args=null;self=null;done=function(){};return markup};function emit(more){Array.prototype.splice.apply(self.markup,[self.markup.length,more.length].concat(more))}emit(['<div class="form_row">\n  <div class="left">App Name</div>\n  <div class="right">\n    ']);var __uniqueId=_.uniqueId("__bg_component");emit(['<div id="'+__uniqueId+'" />']);self.view.addChildFromTemplate(__uniqueId,self.view.nameInput,{inStateSection:self._inStateSection});emit(['\n    <p class="error_text for_name_input">This field is required.</p>\n  </div>\n</div>\n\n<div class="form_row">\n  <div class="left">Description</div>\n  <div class="right">\n    ']);var __uniqueId=_.uniqueId("__bg_component");emit(['<div id="'+__uniqueId+'" />']);self.view.addChildFromTemplate(__uniqueId,self.view.descriptionInput,{inStateSection:self._inStateSection});emit(['\n    <p class="error_text for_description_input">This field is required.</p>\n  </div>\n</div>\n\n<div class="form_row">\n  <div class="left">Images</div>\n  <div class="right">\n    <div class="image_section">\n      ']);var __uniqueId=_.uniqueId("__bg_component");emit(['<div id="'+__uniqueId+'" />']);self.view.addChildFromTemplate(__uniqueId,new R.Components.ImageLoader({src:ctx.get("galleryImage"),width:178,height:100}),{inStateSection:self._inStateSection});emit(["\n      "]);var __uniqueId=_.uniqueId("__bg_component");emit(['<div id="'+__uniqueId+'" />']);self.view.addChildFromTemplate(__uniqueId,self.view._images.galleryImage.uploader,{inStateSection:self._inStateSection});emit(['\n      <div>Gallery Image: 16:9 (1280 x 720px preferred)</div>\n    </div>\n    <div class="image_section">\n      ']);var __uniqueId=_.uniqueId("__bg_component");emit(['<div id="'+__uniqueId+'" />']);self.view.addChildFromTemplate(__uniqueId,new R.Components.ImageLoader({src:ctx.get("icon"),width:16,height:16}),{inStateSection:self._inStateSection});emit(["\n      "]);var __uniqueId=_.uniqueId("__bg_component");emit(['<div id="'+__uniqueId+'" />']);self.view.addChildFromTemplate(__uniqueId,self.view._images.icon.uploader,{inStateSection:self._inStateSection});emit(['\n      <div>Icon: square (32 x 32px preferred, shown at 16px for retina)</div>\n    </div>\n    <p class="last">Images are only required if you would like to submit your app to the App Gallery.</p>\n  </div>\n</div>\n\n<div class="form_row">\n  <div class="left">URL</div>\n  <div class="right">\n    ']);var __uniqueId=_.uniqueId("__bg_component");emit(['<div id="'+__uniqueId+'" />']);self.view.addChildFromTemplate(__uniqueId,self.view.urlInput,{inStateSection:self._inStateSection});emit(['\n    <p class="error_text for_url_input">This field is required; must be a valid non-Rdio URL starting with http or https.</p>\n  </div>\n</div>\n\n<div class="form_row">\n  <div class="left">Redirect URIs</div>\n  <div class="right">\n    <div class="redirect_uris"></div>\n    <p class="error_text for_redirect_uris">You must have at least one redirect URI.</p>\n    <button class="add_uri button">Add Another Redirect URI</button>\n    <p class="last">A Redirect URI should be the full URL (including port number if necessary) for the enclosing directory of your app. For instance, if your app is at http://foo.com/bar/music.html, you would use http://foo.com/bar/ as your Redirect URI. If your app can be accessed from both your raw domain (e.g. http://foo.com) and your www subdomain (e.g. http://www.foo.com), be sure to add Redirect URIs for both variations. You can also add an additional Redirect URI with a local URL, such as http://localhost:8000/, for development.</p>\n  </div>\n</div>\n\n<div class="form_row">\n  <div class="left">Permissions</div>\n  <div class="right checkboxes">\n    <label><input class="permission_playstate" type="checkbox">&nbsp;&nbsp;shared_playstate</label>\n    <p class="permission_playstate_warning">JavaScript API only: Your app will be able to see and change what the user is listening to on the Rdio site and on their mobile devices. You will also be able to modify their queue. Be careful not to change anything the user doesn\'t want you to!</p>\n  </div>\n</div>\n\n<div class="form_row">\n  <div class="left">Platforms</div>\n  <div class="right platforms checkboxes">\n    <div>\n      <label><input value="Web" type="checkbox">&nbsp;&nbsp;Web</label>\n      <label><input value="iPhone" type="checkbox">&nbsp;&nbsp;iPhone</label>\n      <label><input value="Windows" type="checkbox">&nbsp;&nbsp;Windows</label>\n    </div>\n    <div>\n      ']);if(R.currentUser.get("features").in_app_apps){emit(['\n        <label><input value="inRdio" type="checkbox">&nbsp;&nbsp;In Rdio</label>\n      '])}else{emit(["\n        <label></label>\n      "])}emit(['\n      <label><input value="iPad" type="checkbox">&nbsp;&nbsp;iPad</label>\n      <label><input value="Mac" type="checkbox">&nbsp;&nbsp;Mac</label>\n    </div>\n    <div>\n      <label></label>\n      <label><input value="Android" type="checkbox">&nbsp;&nbsp;Android</label>\n      <label><input value="Linux" type="checkbox">&nbsp;&nbsp;Linux</label>\n    </div>\n    ']);if(R.currentUser.get("features").in_app_apps){emit(['\n      <p class="platform_inrdio_warning">Note: In Rdio apps can\'t play music, modify the queue, or otherwise change playstate without the shared_playstate permission.</p>\n    '])}emit(['\n    <p class="error_text">You must select at least one platform.</p>\n  </div>\n</div>\n\n<div class="form_row">\n  <div class="left">Support</div>\n  <div class="right">\n    ']);var __uniqueId=_.uniqueId("__bg_component");emit(['<div id="'+__uniqueId+'" />']);self.view.addChildFromTemplate(__uniqueId,self.view.supportInput,{inStateSection:self._inStateSection});emit(['\n    <p class="error_text for_support_input">Invalid URL or email.</p>\n    <p class="last">An URL or email where your users can get support for your app. Optional, but required for inclusion in the app gallery.</p>\n  </div>\n</div>\n']);return done()}}();R.StyleManager.loadComponentCss("Developer.AppEditor",".upper{text-transform:uppercase;}.Developer_AppEditor .TextInput{width:100%;}.Developer_AppEditor .TextInput.multiline{height:120px;}.Developer_AppEditor p.last{margin-bottom:0;}.Developer_AppEditor .checkboxes{margin-top:10px;}.Developer_AppEditor .permission_playstate_warning,.Developer_AppEditor .platform_inrdio_warning{display:none;}.Developer_AppEditor .platforms label{display:inline-block;margin-right:27px;min-width:100px;}.Developer_AppEditor .error_text{display:none;color:#cc4747;}.Developer_AppEditor .image_section{display:inline-block;width:49%;}.Developer_AppEditor .image_section img{border:1px solid #b8c3c9;background-color:#f5f6f7;-webkit-border-top-left-radius:3px;-webkit-border-top-right-radius:3px;-webkit-border-bottom-right-radius:3px;-webkit-border-bottom-left-radius:3px;-moz-border-radius-topleft:3px;-moz-border-radius-topright:3px;-moz-border-radius-bottomright:3px;-moz-border-radius-bottomleft:3px;border-top-left-radius:3px;border-top-right-radius:3px;border-bottom-right-radius:3px;border-bottom-left-radius:3px;-moz-background-clip:padding;-webkit-background-clip:padding-box;background-clip:padding-box;}.Developer_AppEditor .image_section .Uploader{margin:5px 0;}");!function($){R.Component.create("Developer.AppEditor",{dependencies:["TextInput","Developer.UriInput","Uploader","ImageLoader"],events:{"keyup input":"deferredChanged","paste input":"deferredChanged","keyup textarea":"deferredChanged","paste textarea":"deferredChanged","click .add_uri":"addUri","change .permission_playstate":"changed","change .platforms input":"changed"},initialize:function(){R.Component.prototype.initialize.apply(this,arguments);this.redirectUriInputs=[];this._images={icon:{changed:false,title:"icon"},galleryImage:{changed:false,title:"gallery image"}}},changed:function(){this.updateUI();this.trigger("changed")},deferredChanged:function(){var self=this;_.defer(function(){self.changed()})},addUri:function(info){var self=this;var options={};if(_.isString(info)){options.value=info}else{options.focus=true}var input=new R.Components.Developer.UriInput(options);this.listen(input,"changed",this.deferredChanged);this.listen(input,"remove",function(target){target.remove();target.destroy();self.redirectUriInputs=_.without(self.redirectUriInputs,target);self.changed()});this.addChild(input).render().$el.appendTo(this.$(".redirect_uris"));this.redirectUriInputs.push(input);this.changed()},updateUI:function(event){this.$(".permission_playstate_warning").toggle(this.$sharedPlaystate.prop("checked"));var inRdioWarning=this.$inRdio.length&&this.$inRdio.prop("checked")&&!this.$sharedPlaystate.prop("checked");this.$(".platform_inrdio_warning").toggle(inRdioWarning)},modelFactory:function(){return new Backbone.Model({redirect_uris:[""],required_permissions:[],supported_platforms:[]})},toJSON:function(){var uris=_.map(this.redirectUriInputs,function(v,i){return $.trim(v.getValue()).replace(/ /g,"%20")});var required_permissions="";if(this.$sharedPlaystate.prop("checked")){required_permissions="shared_playstate"}var platforms=[];this.$(".platforms input:checked").each(function(i,v){var $input=$(v);platforms.push($input.prop("value"))});return{name:this.nameInput.getValue(),description:this.descriptionInput.getValue(),url:this.urlInput.getValue(),support_contact:this.supportInput.getValue(),redirect_uris:uris.join(" "),required_permissions:required_permissions,supported_platforms:platforms.join(",")}},removeUnchanged:function(data){var self=this;var delimeters={redirect_uris:" ",required_permissions:",",supported_platforms:","};var result={};_.each(data,function(v,k){var delimeter=delimeters[k];if(!_.isUndefined(delimeter)){var a=v?v.split(delimeter):[];var b=self.model.get(k);var d=_.difference(a,b);if(a.length!==b.length||d.length!==0){result[k]=data[k]}}else{if(v!==self.model.get(k)){result[k]=data[k]}}});return result},validate:function(){var result=true;var valid;var validateInput=function(input,className){valid=input.isValid();input.$el.toggleClass("error",!valid);this.$(".error_text."+className).toggle(!valid);result=valid&&result};validateInput(this.nameInput,"for_name_input");validateInput(this.descriptionInput,"for_description_input");validateInput(this.urlInput,"for_url_input");validateInput(this.supportInput,"for_support_input");valid=this.redirectUriInputs.length>0;this.$(".error_text.for_redirect_uris").toggle(!valid);result=valid&&result;_.each(this.redirectUriInputs,function(v,i){result=v.validate()&&result});valid=this.$(".platforms input:checked").length>0;this.$(".platforms .error_text").toggle(!valid);result=valid&&result;return result},onRendered:function(){this.$sharedPlaystate=this.$(".permission_playstate").prop("checked",_.contains(this.model.get("required_permissions"),"shared_playstate"));var $platformInputs=this.$(".platforms input").prop("checked",false);_.each(this.model.get("supported_platforms"),function(v,i){$platformInputs.filter('[value="'+v+'"]').prop("checked",true)});this.$inRdio=$platformInputs.filter("[value=inRdio]");this.updateUI()},createChildComponents:function(){var self=this;this.nameInput=new R.Components.TextInput({value:this.model.get("name"),extraClassName:"name_input",name:"app_name",validator:/./,placeholder:"Your app name"});this.descriptionInput=new R.Components.TextInput({value:this.model.get("description"),extraClassName:"description_input",name:"app_description",multiline:true,validator:/./,placeholder:"Describe your app as succinctly as possible..."});this.urlInput=new R.Components.TextInput({value:this.model.get("url"),extraClassName:"url_input",name:"app_url",validator:function(text){return/^https?:\/\/.*$/i.test(text)&&!/\/\/(www\.|)rdio\.com/i.test(text)&&!/\/\/(www\.|)rd\.io/i.test(text)},placeholder:"http://www.yourapp.com/"});this.supportInput=new R.Components.TextInput({value:this.model.get("support_contact"),extraClassName:"support_input",name:"app_support",validator:function(text){if(!text.length||/^https?:\/\/.*$/.test(text)){return true}return R.Utils.isValidEmail(text)},placeholder:"http://www.yourapp.com/support/"});_.each(this._images,function(v,k){v.uploader=new R.Components.Uploader({apiMethod:"setAppImage",accept:"image/*",name:k,success:function(response){v.changed=false;if(v.deferred){var deferred=v.deferred;delete v.deferred;deferred.resolve()}},error:function(response){if(v.deferred){var message="Unable to upload "+v.title;if(response&&response.message){message+=": "+response.message}else{message+="."}var deferred=v.deferred;delete v.deferred;deferred.reject(message)}},content:{client_id:self.model.get("client_id"),imageType:k}});self.listen(v.uploader,"change",function(){v.changed=true;self.trigger("changed")})});this.model.on("change:client_id",function(){_.each(self._images,function(v,k){v.uploader.options.content.client_id=self.model.get("client_id")})})},onInserted:function(){var self=this;_.each(this.model.get("redirect_uris"),function(v,i){self.addUri(v)})},imageChanged:function(name){return this._images[name].changed},uploadChangedImages:function(){var self=this;var masterDeferred=$.Deferred();var changed=_.filter(this._images,function(v,k){return v.changed});var next=function(){var image=changed.shift();if(!image){masterDeferred.resolve();return}image.deferred=$.Deferred().done(next).fail(function(message){masterDeferred.reject(message)});image.uploader.upload()};next();return masterDeferred}})}(R.$);
//# sourceMappingURL=/media/client/orig/Components/Developer.AppEditor.1992bd0fad2f093a7f99c6e636615019.js.map