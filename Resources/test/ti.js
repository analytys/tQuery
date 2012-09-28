/**
 * ti api 
 */
var fs = require("fs");

exports.Ti = {
		API : {
			info : console.log , 
			log : console.log ,
			debug : console.log ,
			error : console.log ,
			trace : console.log ,
			warn : console.log ,
			timestamp : console.log ,
		},
		Platform : {
			osname : "android" ,
		    version : "2.1",
		    density : 0 , // 显示像素密度
		    dpi : 0 , 
		    DisplayCaps : {
		    	logicalDensityFactor : 0 ,
		    },
		    displayCaps : {
		    	platformHeight : 480 ,
		    	platformWidth  : 320 ,
		    	xdpi : 0 ,
		    	ydpi : 0 ,
		    },
		},
		
		
		UI : {
			createAlertDialog  : createCustomLayout,
			createAnimation  : createCustomLayout,
			createButtonBar   : createCustomLayout,
			createButton   : createCustomLayout,
			createCoverFlowView   : createCustomLayout,
			createDashboardItem   : createCustomLayout,
			createDashboardView   : createCustomLayout,
			createEmailDialog   : createCustomLayout,
			createImageView   : createCustomLayout,
			createLabel   : createCustomLayout,
			createMaskedImage   : createCustomLayout,
			createNotification   : createCustomLayout,
			createOptionDialog   : createCustomLayout,
			createPicker   : createCustomLayout,
			createPickerColumn   : createCustomLayout,
			createPickerRow   : createCustomLayout,
			createProgressBar   : createCustomLayout,
			createScrollableView   : createCustomLayout,
			createScrollView   : createCustomLayout,
			createSearchBar   : createCustomLayout,
			createSlider   : createCustomLayout,
			createSwitch   : createCustomLayout,
			createTab   : createCustomLayout,
			createTabbedBar   : createCustomLayout,
			createTabGroup   : createCustomLayout,
			createTableView   : createCustomLayout,
			createTableViewRow   : createCustomLayout,
			createTableViewSection   : createCustomLayout,
			createTextArea   : createCustomLayout,
			createTextField   : createCustomLayout,
			createToolbar   : createCustomLayout,
			createView   : createCustomLayout,
			createWebView   : createCustomLayout,
			createWindow   : createCustomLayout,
		},  
		Filesystem : {
			getFile : function( path ){ return new File(path); } , 
			resourcesDirectory :  process.platform == 'win32' ? 
					"D:\\Project\\tQuery\\Resources\\" : "/home/tocky/Data/JS/tQuery/Resources/" ,
		}
};

function createCustomLayout()
{
	console.log( arguments[0] );
	
	return new layout(arguments[0]) ;
}

function layout(opt)
{
	this.opt = opt ;
	
	this.getOpt = function()
	{
		return this.opt;
	};
	
	return this ;
	
}

function File( path )
{
	this.path = path ;
	
	this.exists = function()
	{
//		fs.exists = fs.exists || require('path').exists;
		fs.existsSync = fs.existsSync || require('path').existsSync;
		return fs.existsSync( this.path) ; // node version > 0.6  , current version 0.8.11
	};
	
	return this;
}