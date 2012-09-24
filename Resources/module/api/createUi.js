exports.createUi = function(chain)
{
    var api ;
    var conf ;
    for( var id in chain ) // k = Window / Buttton 
    {
        var k = chain[id]['type'] ;
        switch( k )
        {
            case 'Page':
                continue; 
            case 'Window': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createWindow ; 
                break; 
            case 'AlertDialog': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createAlertDialog ; 
                break; 
            case 'Animation': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createAnimation ; 
                break; 
            case 'Button': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createButton ; 
                break; 
            case 'ButtonBar': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createButtonBar ; 
                break; 
            case 'CoverFlowView': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createCoverFlowView ; 
                break; 
            case 'DashboardItem': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createDashboardItem ; 
                break; 
            case 'DashboardView': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createDashboardView ; 
                break; 
            case 'EmailDialog': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createEmailDialog ; 
                break; 
            case 'ImageView': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createImageView ; 
                break; 
            case 'Label': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createLabel ; 
                break; 
            case 'MaskedImage': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createMaskedImage ; 
                break; 
            case 'Notification': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createNotification ; 
                break; 
            case 'OptionDialog': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createOptionDialog ; 
                break; 
            case 'Picker': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createPicker ; 
                break; 
            case 'PickerColumn': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createPickerColumn ; 
                break; 
            case 'PickerRow': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createPickerRow ; 
                break; 
            case 'ProgressBar': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createProgressBar ; 
                break; 
            case 'ScrollableView': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createScrollableView ; 
                break; 
            case 'ScrollView': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createScrollView ; 
                break; 
            case 'SearchBar': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createSearchBar ; 
                break; 
            case 'Slider': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createSlider ; 
                break; 
            case 'Switch': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createSwitch ; 
                break; 
            case 'Tab': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createTab ; 
                break; 
            case 'TabbedBar': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createTabbedBar ; 
                break; 
            case 'TabGroup': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createTabGroup ; 
                break; 
            case 'TableView': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createTableView ; 
                break; 
            case 'TableViewRow': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createTableViewRow ; 
                break; 
            case 'TableViewSection': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createTableViewSection ; 
                break; 
            case 'TextArea': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createTextArea ; 
                break; 
            case 'TextField': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createTextField ; 
                break; 
            case 'Toolbar': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createToolbar ; 
                break; 
            case 'View': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createView ; 
                break; 
            case 'WebView': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createWebView ; 
                break; 
            case 'Window': 
                api = /**DEBUG{{**/ typeof Ti === 'undefined' ?  function(){return new Object() ; } : /**}}**/ Ti.UI.createWindow ; 
                break; 
            default:
                /**DEBUG{{**/ typeof Ti === 'undefined' ?  console.error : /**}}**/ Ti.API.error("Unrecognized UI element " + k);
                break;
        }
    }
    
};