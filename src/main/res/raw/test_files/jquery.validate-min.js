vpn_eval((function(){
/*!
 * jQuery Validation Plugin v1.12.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 J\u00f6rn Zaefferer
 * Released under the MIT license
 */
(function(b){b.extend(b.fn,{validate:function(c){if(!this.length){if(c&&c.debug&&window.console){console.warn("Nothing selected, can't validate, returning nothing.")}return}var d=b.data(this[0],"validator");if(d){return d}this.attr("novalidate","novalidate");d=new b.validator(c,this[0]);b.data(this[0],"validator",d);if(d.settings.onsubmit){this.validateDelegate(":submit","click",function(e){if(d.settings.submitHandler){d.submitButton=e.target}if(b(e.target).hasClass("cancel")){d.cancelSubmit=true}if(b(e.target).attr("formnovalidate")!==undefined){d.cancelSubmit=true}});this.submit(function(e){if(d.settings.debug){e.preventDefault()}function f(){var g;if(d.settings.submitHandler){if(d.submitButton){g=b("<input type='hidden'/>").attr("name",d.submitButton.name).val(b(d.submitButton).val()).appendTo(d.currentForm)}d.settings.submitHandler.call(d,d.currentForm,e);if(d.submitButton){g.remove()}return false}return true}if(d.cancelSubmit){d.cancelSubmit=false;return f()}if(d.form()){if(d.pendingRequest){d.formSubmitted=true;return false}return f()}else{d.focusInvalid();return false}})}return d},valid:function(){var d,c;if(b(this[0]).is("form")){d=this.validate().form();if(!d){b(this[0]).triggerHandler("valid:fail")}}else{d=true;c=b(this[0].form).validate();this.each(function(){d=c.element(this)&&d});if(!d){b(this[0].form).triggerHandler("valid:fail")}}return d},removeAttrs:function(e){var c={},d=this;b.each(e.split(/\s/),function(f,g){c[g]=d.attr(g);d.removeAttr(g)});return c},rules:function(f,c){var h=this[0],e,j,k,g,d,i;if(f){e=b.data(h.form,"validator").settings;j=e.rules;k=b.validator.staticRules(h);switch(f){case"add":b.extend(k,b.validator.normalizeRule(c));delete k.messages;j[h.name]=k;if(c.messages){e.messages[h.name]=b.extend(e.messages[h.name],c.messages)}break;case"remove":if(!c){delete j[h.name];return k}i={};b.each(c.split(/\s/),function(l,m){i[m]=k[m];delete k[m];if(m==="required"){b(h).removeAttr("aria-required")}});return i}}g=b.validator.normalizeRules(b.extend({},b.validator.classRules(h),b.validator.metadataRules(h),b.validator.attributeRules(h),b.validator.dataAttributeRules(h),b.validator.dataRules(h),b.validator.staticRules(h)),h);if(g.required){d=g.required;delete g.required;g=b.extend({required:d},g);b(h).attr("aria-required","true")}if(g.remote){d=g.remote;delete g.remote;g=b.extend(g,{remote:d})}return g}});b.extend(b.expr[":"],{blank:function(c){return !b.trim(""+b(c).val())},filled:function(c){return !!b.trim(""+b(c).val())},unchecked:function(c){return !b(c).prop("checked")}});b.validator=function(c,d){this.settings=b.extend(true,{},b.validator.defaults,c);this.currentForm=d;this.init()};b.validator.format=function(c,d){if(arguments.length===1){return function(){var e=b.makeArray(arguments);e.unshift(c);return b.validator.format.apply(this,e)}}if(arguments.length>2&&d.constructor!==Array){d=b.makeArray(arguments).slice(1)}if(d.constructor!==Array){d=[d]}b.each(d,function(e,f){c=c.replace(new RegExp("\\{"+e+"\\}","g"),function(){return f})});return c};b.extend(b.validator,{defaults:{meta:"validate",messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:b([]),errorLabelContainer:b([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(c){this.lastActive=c;if(this.settings.focusCleanup&&!this.blockFocusCleanup){if(this.settings.unhighlight){this.settings.unhighlight.call(this,c,this.settings.errorClass,this.settings.validClass)}this.addWrapper(this.errorsFor(c)).hide()}},onfocusout:function(c){if(!this.checkable(c)&&(c.name in this.submitted||!this.optional(c))){this.element(c)}},onkeyup:function(c,d){if(d.which===9&&this.elementValue(c)===""){return}else{if(c.name in this.submitted||c===this.lastElement){this.element(c)}}},onclick:function(c){if(c.name in this.submitted){this.element(c)}else{if(c.parentNode.name in this.submitted){this.element(c.parentNode)}}},highlight:function(e,c,d){if(e.type==="radio"){this.findByName(e.name).addClass(c).removeClass(d)}else{b(e).addClass(c).removeClass(d)}},unhighlight:function(e,c,d){if(e.type==="radio"){this.findByName(e.name).removeClass(c).addClass(d)}else{b(e).removeClass(c).addClass(d)}}},setDefaults:function(c){b.extend(b.validator.defaults,c)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:b.validator.format("Please enter no more than {0} characters."),minlength:b.validator.format("Please enter at least {0} characters."),rangelength:b.validator.format("Please enter a value between {0} and {1} characters long."),range:b.validator.format("Please enter a value between {0} and {1}."),max:b.validator.format("Please enter a value less than or equal to {0}."),min:b.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=b(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||b(this.currentForm);this.containers=b(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var c=(this.groups={}),e;b.each(this.settings.groups,function(f,g){if(typeof g==="string"){g=g.split(/\s/)}b.each(g,function(i,h){c[h]=f})});e=this.settings.rules;b.each(e,function(f,g){e[f]=b.validator.normalizeRule(g)});function d(i){var g=b.data(this[0].form,"validator"),f="on"+i.type.replace(/^validate/,""),h=g.settings;if(h[f]&&!this.is(h.ignore)){try{h[f].call(g,this[0],i)}catch(j){}}}b(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",d).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",d);if(this.settings.invalidHandler){b(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)}b(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){this.checkForm();b.extend(this.submitted,this.errorMap);this.invalid=b.extend({},this.errorMap);if(!this.valid()){b(this.currentForm).triggerHandler("invalid-form",[this])}this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var c=0,d=(this.currentElements=this.elements());d[c];c++){this.check(d[c])}return this.valid()},element:function(e){var f=this.clean(e),d=this.validationTargetFor(f),c=true;this.lastElement=d;if(d===undefined){delete this.invalid[f.name]}else{this.prepareElement(d);this.currentElements=b(d);c=this.check(d)!==false;if(c){delete this.invalid[d.name]}else{this.invalid[d.name]=true}}b(e).attr("aria-invalid",!c);if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers)}this.showErrors();return c},showErrors:function(d){if(d){b.extend(this.errorMap,d);this.errorList=[];for(var c in d){this.errorList.push({message:d[c],element:this.findByName(c)[0]})}this.successList=b.grep(this.successList,function(e){return !(e.name in d)})}if(this.settings.showErrors){this.settings.showErrors.call(this,this.errorMap,this.errorList)}else{this.defaultShowErrors()}},resetForm:function(){if(b.fn.resetForm){b(this.currentForm).resetForm()}this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(e){var d=0,c;for(c in e){d++}return d},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()===0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid){try{b(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(c){}}},findLastActive:function(){var c=this.lastActive;return c&&b.grep(this.errorList,function(d){return d.element.name===c.name}).length===1&&c},elements:function(){var d=this,c={};return b(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){if(!this.name&&d.settings.debug&&window.console){console.error("%o has no name assigned",this)}if(this.name in c||!d.objectLength(b(this).rules())){return false}c[this.name]=true;return true})},clean:function(c){return b(c)[0]},errors:function(){var c=this.settings.errorClass.split(" ").join(".");return b(this.settings.errorElement+"."+c,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=b([]);this.toHide=b([]);this.currentElements=b([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(c){this.reset();this.toHide=this.errorsFor(c)},elementValue:function(d){var f,c=b(d),e=c.attr("type");if(e==="radio"||e==="checkbox"){return b("input[name='"+c.attr("name")+"']:checked").val()}f=c.val();if(typeof f==="string"){return f.replace(/\r/g,"")}return f},check:function(f){f=this.validationTargetFor(this.clean(f));var j=b(f).rules(),h=b.map(j,function(m,e){return e}).length,k=false,d=this.elementValue(f),l,c,i;for(c in j){i={method:c,parameters:j[c]};try{l=b.validator.methods[c].call(this,d,f,i.parameters);if(l==="dependency-mismatch"&&h===1){k=true;continue}k=false;if(l==="pending"){this.toHide=this.toHide.not(this.errorsFor(f));return}if(!l){this.formatAndAdd(f,i);return false}}catch(g){if(this.settings.debug&&window.console){console.log("Exception occurred when checking element "+f.id+", check the '"+i.method+"' method.",g)}throw g}}if(k){return}if(this.objectLength(j)){this.successList.push(f)}return true},customDataMessage:function(c,d){return b(c).data("msg"+d[0].toUpperCase()+d.substring(1).toLowerCase())||b(c).data("msg")},customMessage:function(d,e){var c=this.settings.messages[d];return c&&(c.constructor===String?c:c[e])},findDefined:function(){for(var c=0;c<arguments.length;c++){if(arguments[c]!==undefined){return arguments[c]}}return undefined},defaultMessage:function(c,d){return this.findDefined(this.customMessage(c.name,d),this.customDataMessage(c,d),!this.settings.ignoreTitle&&c.title||undefined,b.validator.messages[d],"<strong>Warning: No message defined for "+c.name+"</strong>")},formatAndAdd:function(d,f){var e=this.defaultMessage(d,f.method),c=/\$?\{(\d+)\}/g;if(typeof e==="function"){e=e.call(this,f.parameters,d)}else{if(c.test(e)){e=b.validator.format(e.replace(c,"{$1}"),f.parameters)}}this.errorList.push({message:e,element:d,method:f.method});this.errorMap[d.name]=e;this.submitted[d.name]=e},addWrapper:function(c){if(this.settings.wrapper){c=c.add(c.parent(this.settings.wrapper))}return c},defaultShowErrors:function(){var d,e,c;for(d=0;this.errorList[d];d++){c=this.errorList[d];if(this.settings.highlight){this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass)}this.showLabel(c.element,c.message)}if(this.errorList.length){this.toShow=this.toShow.add(this.containers)}if(this.settings.success){for(d=0;this.successList[d];d++){this.showLabel(this.successList[d])}}if(this.settings.unhighlight){for(d=0,e=this.validElements();e[d];d++){this.settings.unhighlight.call(this,e[d],this.settings.errorClass,this.settings.validClass)}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return b(this.errorList).map(function(){return this.element})},showLabel:function(d,e){var c=this.errorsFor(d);if(c.length){c.removeClass(this.settings.validClass).addClass(this.settings.errorClass);c.html(e)}else{c=b("<"+this.settings.errorElement+">").attr("for",this.idOrName(d)).addClass(this.settings.errorClass).html(e||"");if(this.settings.wrapper){c=c.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()}if(!this.labelContainer.append(c).length){if(this.settings.errorPlacement){this.settings.errorPlacement(c,b(d))}else{c.insertAfter(d)}}}if(!e&&this.settings.success){c.text("");if(typeof this.settings.success==="string"){c.addClass(this.settings.success)}else{this.settings.success(c,d)}}this.toShow=this.toShow.add(c)},errorsFor:function(d){var c=this.idOrName(d);return this.errors().filter(function(){return b(this).attr("for")===c})},idOrName:function(c){return this.groups[c.name]||(this.checkable(c)?c.name:c.id||c.name)},validationTargetFor:function(c){if(this.checkable(c)){c=this.findByName(c.name).not(this.settings.ignore)[0]}return c},checkable:function(c){return(/radio|checkbox/i).test(c.type)},findByName:function(c){return b(this.currentForm).find("[name='"+c+"']")},getLength:function(d,c){switch(c.nodeName.toLowerCase()){case"select":return b("option:selected",c).length;case"input":if(this.checkable(c)){return this.findByName(c.name).filter(":checked").length}}return d.length},depend:function(d,c){return this.dependTypes[typeof d]?this.dependTypes[typeof d](d,c):true},dependTypes:{"boolean":function(c){return c},string:function(d,c){return !!b(d,c.form).length},"function":function(d,c){return d(c)}},optional:function(c){var d=this.elementValue(c);return !b.validator.methods.required.call(this,d,c)&&"dependency-mismatch"},startRequest:function(c){if(!this.pending[c.name]){this.pendingRequest++;this.pending[c.name]=true}},stopRequest:function(c,d){this.pendingRequest--;if(this.pendingRequest<0){this.pendingRequest=0}delete this.pending[c.name];if(d&&this.pendingRequest===0&&this.formSubmitted&&this.form()){b(this.currentForm).submit();this.formSubmitted=false}else{if(!d&&this.pendingRequest===0&&this.formSubmitted){b(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}}},previousValue:function(c){return b.data(c,"previousValue")||b.data(c,"previousValue",{old:null,valid:true,message:this.defaultMessage(c,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},number:{number:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(c,d){if(c.constructor===String){this.classRuleSettings[c]=d}else{b.extend(this.classRuleSettings,c)}},classRules:function(d){var e={},c=b(d).attr("class");if(c){b.each(c.split(" "),function(){if(this in b.validator.classRuleSettings){b.extend(e,b.validator.classRuleSettings[this])}})}return e},metadataRules:function(c){if(!b.metadata){return{}}var d=b.data(c.form,"validator").settings.meta;return d?b(c).metadata({type:"attr",name:d}):b(c).metadata({type:"attr",name:"validate"})},dataAttributeRules:function(c){var d=b(c).data("rules")||{};return(typeof d==="object")?d:{}},attributeRules:function(d){var g={},c=b(d),e=d.getAttribute("type"),h,f;for(h in b.validator.methods){if(h==="required"){f=d.getAttribute(h);if(f===""){f=true}f=!!f}else{f=c.attr(h)}if(/min|max/.test(h)&&(e===null||/number|range|text/.test(e))){f=Number(f)}if(f||f===0){g[h]=f}else{if(e===h&&e!=="range"){g[h]=true}}}if(g.maxlength&&/-1|2147483647|524288/.test(g.maxlength)){delete g.maxlength}return g},dataRules:function(d){var g,e,f={},c=b(d);for(g in b.validator.methods){e=c.data("rule"+g[0].toUpperCase()+g.substring(1).toLowerCase());if(e!==undefined){f[g]=e}}return f},staticRules:function(d){var e={},c=b.data(d.form,"validator");if(c.settings.rules){e=b.validator.normalizeRule(c.settings.rules[d.name])||{}}return e},normalizeRules:function(d,c){b.each(d,function(g,f){if(f===false){delete d[g];return}if(f.param||f.depends){var e=true;switch(typeof f.depends){case"string":e=!!b(f.depends,c.form).length;break;case"function":e=f.depends.call(c,c);break}if(e){d[g]=f.param!==undefined?f.param:true}else{delete d[g]}}});b.each(d,function(e,f){d[e]=b.isFunction(f)?f(c):f});b.each(["minlength","maxlength"],function(){if(d[this]){d[this]=Number(d[this])}});b.each(["rangelength","range"],function(){var e;if(d[this]){if(b.isArray(d[this])){d[this]=[Number(d[this][0]),Number(d[this][1])]}else{if(typeof d[this]==="string"){e=d[this].split(/[\s,]+/);d[this]=[Number(e[0]),Number(e[1])]}}}});if(b.validator.autoCreateRanges){if(d.min&&d.max){d.range=[d.min,d.max];delete d.min;delete d.max}if(d.minlength&&d.maxlength){d.rangelength=[d.minlength,d.maxlength];delete d.minlength;delete d.maxlength}}return d},normalizeRule:function(d){if(typeof d==="string"){var c={};b.each(d.split(/\s/),function(){c[this]=true});d=c}return d},addMethod:function(c,e,d){b.validator.methods[c]=e;b.validator.messages[c]=d!==undefined?d:b.validator.messages[c];if(e.length<3){b.validator.addClassRules(c,b.validator.normalizeRule(c))}},methods:{required:function(d,c,f){if(!this.depend(f,c)){return"dependency-mismatch"}if(c.nodeName.toLowerCase()==="select"){var e=b(c).val();return e&&e.length>0}if(this.checkable(c)){return this.getLength(d,c)>0}return b.trim(d).length>0},email:function(d,c){return this.optional(c)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(d)},url:function(d,c){return this.optional(c)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(d)},date:function(d,c){return this.optional(c)||!/Invalid|NaN/.test(new Date(d).toString())},dateISO:function(d,c){return this.optional(c)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(d)},number:function(d,c){return this.optional(c)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(d)},digits:function(d,c){return this.optional(c)||/^\d+$/.test(d)},creditcard:function(g,d){if(this.optional(d)){return"dependency-mismatch"}if(/[^0-9 \-]+/.test(g)){return false}var h=0,f=0,c=false,i,e;g=g.replace(/\D/g,"");if(g.length<13||g.length>19){return false}for(i=g.length-1;i>=0;i--){e=g.charAt(i);f=parseInt(e,10);if(c){if((f*=2)>9){f-=9}}h+=f;c=!c}return(h%10)===0},minlength:function(e,c,f){var d=b.isArray(e)?e.length:this.getLength(b.trim(e),c);return this.optional(c)||d>=f},maxlength:function(e,c,f){var d=b.isArray(e)?e.length:this.getLength(b.trim(e),c);return this.optional(c)||d<=f},rangelength:function(e,c,f){var d=b.isArray(e)?e.length:this.getLength(b.trim(e),c);return this.optional(c)||(d>=f[0]&&d<=f[1])},min:function(d,c,e){return this.optional(c)||d>=e},max:function(d,c,e){return this.optional(c)||d<=e},range:function(d,c,e){return this.optional(c)||(d>=e[0]&&d<=e[1])},equalTo:function(d,c,f){var e=b(f);if(this.settings.onfocusout){e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){b(c).valid()})}return d===e.val()},remote:function(g,d,h){if(this.optional(d)){return"dependency-mismatch"}var e=this.previousValue(d),c,f;if(!this.settings.messages[d.name]){this.settings.messages[d.name]={}}e.originalMessage=this.settings.messages[d.name].remote;this.settings.messages[d.name].remote=e.message;h=typeof h==="string"&&{url:h}||h;if(e.old===g){return e.valid}e.old=g;c=this;this.startRequest(d);f={};f[d.name]=g;b.ajax(b.extend(true,{url:h,mode:"abort",port:"validate"+d.name,dataType:"json",data:f,context:c.currentForm,success:function(j){var l=j===true||j==="true",m,k,i;c.settings.messages[d.name].remote=e.originalMessage;if(l){i=c.formSubmitted;c.prepareElement(d);c.formSubmitted=i;c.successList.push(d);delete c.invalid[d.name];c.showErrors()}else{m={};k=j||c.defaultMessage(d,"remote");m[d.name]=e.message=b.isFunction(k)?k(g):k;c.invalid[d.name]=true;c.showErrors(m)}e.valid=l;c.stopRequest(d,l)}},h));return"pending"}}});b.format=function a(){throw"$.format has been deprecated. Please use $.validator.format instead."}}(jQuery));(function(c){var a={},b;if(c.ajaxPrefilter){c.ajaxPrefilter(function(f,e,g){var d=f.port;if(f.mode==="abort"){if(a[d]){a[d].abort()}a[d]=g}})}else{b=c.ajax;c.ajax=function(e){var f=("mode" in e?e:c.ajaxSettings).mode,d=("port" in e?e:c.ajaxSettings).port;if(f==="abort"){if(a[d]){a[d].abort()}a[d]=b.apply(this,arguments);return a[d]}return b.apply(this,arguments)}}}(jQuery));(function(a){a.extend(a.fn,{validateDelegate:function(d,c,b){return this.bind(c,function(e){var f=a(e.target);if(f.is(d)){return b.apply(f,arguments)}})}})}(jQuery));


}
).toString().slice(12, -2),"");