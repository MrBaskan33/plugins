(function(exports,api,metro,common,plugin,lazy){"use strict";function _class_call_check(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _create_class(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),Constructor}function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var StorageManager=function(){function StorageManager2(options){if(_class_call_check(this,StorageManager2),_define_property(this,"_storage",void 0),_define_property(this,"_migrations",void 0),_define_property(this,"version",void 0),this._storage=options.storage,this.version=options.version,this._migrations=options.migrations,!this._storage.version){var newStorage=options.initialize();for(var key in newStorage)this._storage[key]=newStorage[key]}if(this.version<this._storage.version)throw new Error("The supported version is lower than the current storage version");this.version>this._storage.version&&this.migrate()}return _create_class(StorageManager2,[{key:"migrate",value:function(){for(var migrationStorage=this._storage,currentVersion=migrationStorage.version;currentVersion<this.version;currentVersion++){var migration=this._migrations[currentVersion];migrationStorage=migration(migrationStorage),migrationStorage.version=currentVersion+1}for(var key in migrationStorage)this._storage[key]=migrationStorage[key]}},{key:"set",value:function(path,value){for(var currentNode=this._storage,steps=path.split("."),i=0;i<steps.length;i++){var nextKey=steps[i];if(i===steps.length-1)currentNode[nextKey]=value;else if(nextKey in currentNode)currentNode=currentNode[nextKey];else{var node={};currentNode[nextKey]=node,currentNode=node}}return this}},{key:"get",value:function(path){var currentNode;for(var nextKey of path.split(".")){var node=currentNode??this._storage;if(nextKey in node)currentNode=node[nextKey];else return}return currentNode}},{key:"getFirstDefined",value:function(...paths){for(var path of paths){var value=this.get(path);if(value!==void 0)return value}}},{key:"setIfNotDefined",value:function(path,valueCb){return this.get(path)===void 0&&this.set(path,valueCb()),this}},{key:"unset",value:function(path){for(var currentNode,steps=path.split("."),i=0;i<steps.length;i++){var nextKey=steps[i];if(i===steps.length-1)return delete currentNode[nextKey],!0;var node=currentNode??this._storage;if(nextKey in node)currentNode=node[nextKey];else return!1}}}]),StorageManager2}(),findPropLazy=prop=>lazy.proxyLazy(()=>metro.findByPropsLazy(prop)[prop]);findPropLazy("inspect");var _a,color=metro.findByPropsLazy("SemanticColor");color?.default?.colors??common.constants?.ThemeColorMap,color?.default?.unsafe_rawColors??common.constants?.Colors,(_a=color.default).meta??(_a.meta=color.default.internal),metro.findByStoreNameLazy("ThemeStore"),findPropLazy("TextStyleSheet"),lazy.proxyLazy(()=>metro.findByPropsLazy("useSafeAreaInsets").SafeAreaView);var{Button,IconButton,TableRow,TableRowTrailingText,TableRowGroup,TableSwitchRow,TableSwitch,TableRadioRow,TableRadioGroup,TableCheckbox,TextInput}=metro.findByPropsLazy("Button","IconButton","TableRow");metro.findByProps("ActionSheet"),metro.findByProps("ActionSheetRow"),findPropLazy("BottomSheetTitleHeader"),lazy.lazyDestructure(()=>metro.findByPropsLazy("FormSwitch","FormRadio","FormCheckbox"));var Stack=findPropLazy("Stack");findPropLazy("FlashList");var storage=new StorageManager({storage:plugin.storage,initialize(){return{version:3,hide:{app:!0,gift:!0,thread:!0,voice:!0},show:{thread:!1},neverDismiss:!0}},version:3,migrations:{1:({version,...oldStorage})=>({hide:oldStorage,neverDismiss:!0}),2:old=>({...old,show:{thread:!1}})}}),unpatches=[],{factories:{createFilterDefinition},lazy:{createLazyModule}}=metro,byTypeDisplayName=createFilterDefinition(([name],m)=>m?.type?.displayName===name,([name])=>`palmdevs.byTypeDisplayName(${name})`),findByTypeDisplayNameLazy=(displayName,expDefault=!0)=>createLazyModule(expDefault?byTypeDisplayName(displayName):byTypeDisplayName.byRaw(displayName)),index={onLoad:()=>{var ChatInputSendButton=findByTypeDisplayNameLazy("ChatInputSendButton"),ChatInputActions=findByTypeDisplayNameLazy("ChatInputActions");unpatches.push(api.patcher.before("render",ChatInputSendButton.type,([props])=>{props.canSendVoiceMessage&&(props.canSendVoiceMessage=!storage.get("hide.voice"))}),api.patcher.before("render",ChatInputActions.type,([props])=>{props.isAppLauncherEnabled&&(props.isAppLauncherEnabled=!storage.get("hide.app")),props.canStartThreads=storage.get("show.thread")||!storage.get("hide.thread"),props.forceShowActions=storage.get("neverDismiss"),props.shouldShowGiftButton=!storage.get("hide.gift")}))},onUnload:()=>{for(var unpatch of unpatches)unpatch()},settings:()=>{var[_,forceUpdate]=React.useReducer(x=>~x,0);return React.createElement(common.ReactNative.ScrollView,{style:{flex:1}},React.createElement(Stack,{style:{paddingVertical:24,paddingHorizontal:12},spacing:24},React.createElement(TableRowGroup,{title:"Hide Buttons"},[["App Launcher button","AppsIcon","app"],["Gift button","ic_gift","gift"],["New Thread button","ThreadPlusIcon","thread"],["Voice Message button","MicrophoneIcon","voice"]].map(([label,icon,key])=>React.createElement(TableSwitchRow,{key,icon:React.createElement(TableRow.Icon,{source:api.assets.findAssetId(icon)}),label:`Hide ${label}`,disabled:key==="thread"&&storage.get(`show.${key}`),value:key==="thread"&&storage.get(`show.${key}`)?!1:storage.get(`hide.${key}`),onValueChange:v=>{storage.set(`hide.${key}`,v),forceUpdate()}}))),React.createElement(TableRowGroup,{title:"Force Show Buttons"},React.createElement(TableSwitchRow,{icon:React.createElement(TableRow.Icon,{source:api.assets.findAssetId("ThreadPlusIcon")}),label:"Force show New Thread button",subLabel:"Show the thread button even when you can't start threads, or when the chat input is not focused",value:storage.get("show.thread"),onValueChange:v=>{storage.set("show.thread",v),forceUpdate()}}))))}};return exports.default=index,exports.storage=storage,Object.defineProperty(exports,"__esModule",{value:!0}),exports})({},bunny.api,bunny.metro,bunny.metro.common,vendetta.plugin,bunny.utils.lazy);
