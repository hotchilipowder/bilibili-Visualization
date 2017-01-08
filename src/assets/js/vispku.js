//include libraries

// var serverIp = 'http://127.0.0.1:8888/';

var serverIp = 'http://vis.pku.edu.cn/addonfilter/';
//var serverIp = 'http://localhost:2016/';

// var newLink = document.createElement('link');
// newLink.setAttribute('rel','icon');
// newLink.setAttribute('type','image/png');
// newLink.href = serverIp + '/src/rc/addonfilter_logo.png';
// // newLink.setAttribute('href','http://localhost:2016/src/rc/addonfilter_logo.png');
// document.querySelector('head').appendChild(newLink);

// include manual libraries
var iLink = document.createElement("link");
iLink.rel="stylesheet";
iLink.type = 'text/css';
iLink.href= serverIp + "src/style/style.css";
document.getElementsByTagName("head")[0].appendChild(iLink); 

iLink = document.createElement("link");
iLink.rel="stylesheet";
iLink.type = 'text/css';
// iLink.href= serverIp + "library/font-awesome-4.5.0/css/font-awesome.min.css";
iLink.href= 'https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'
//"https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"; //
document.getElementsByTagName("head")[0].appendChild(iLink);

iScript = document.createElement("script");
iScript.type = "text/javascript";
iScript.src = serverIp + "library/numeric.js";//"https://cdnjs.cloudflare.com/ajax/libs/numeric/1.2.6/numeric.min.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 


iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "library/jquery-1.11.3.min.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "library/jquery-1.11.3.min.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

// underscore
iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "library/underscore-min.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 


//d3
iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "library/d3.js";
iScript.charset="utf-8"
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "library/svg-crowbar.js";
iScript.charset="utf-8"
document.getElementsByTagName("head")[0].appendChild(iScript); 

//canvg
iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "library/canvg/rgbcolor.js";
iScript.charset="utf-8"
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "library/canvg/StackBlur.js";
iScript.charset="utf-8"
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "library/canvg/canvg.js";
iScript.charset="utf-8"
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "library/html2canvas.js";
iScript.charset="utf-8"
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/render/namerender.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/render/toolbarrender.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/manager/toolbarmanager.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/basic/basicdraw.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/recordinteraction.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/manager/propertypanelmanager.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/manager/objectpanelmanager.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/threepanels/drawlogicpanel.js";
document.getElementsByTagName("head")[0].appendChild(iScript);

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/threepanels/drawannotationdialog.js";
document.getElementsByTagName("head")[0].appendChild(iScript);

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/threepanels/drawobjectpanel.js";
document.getElementsByTagName("head")[0].appendChild(iScript);

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/threepanels/drawpropertypanel.js";
document.getElementsByTagName("head")[0].appendChild(iScript);

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/crossfilter.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/filtersetting.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/drawfilter.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/monitoranimation.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/fadeundetected.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/detectcompoundeles.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/collectfeedback.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/detectelepro.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/buildtree.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/defineregion.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/definearea.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/specialurl.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/render/inobjmaskrender.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/inobjmask.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/inobjrender.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/render/inobjdialogrender.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/render/inobjfilterrender.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/inobj.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 

iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "src/inobjmanager.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 


//wait until load finished
var timer = setInterval(function(){
    
    if (!jQuery || !jQuery_pkuvis || !d3 || !d3_pkuvis)
        return;

    //console.log("jQuery", jQuery)
    //console.log(" numeric ", numeric);
        
    iScript = document.createElement("script");
    iScript.type="text/javascript";
    iScript.src= serverIp + "library/mds.js";
    document.getElementsByTagName("head")[0].appendChild(iScript); 

    iScript = document.createElement("script");
    iScript.type="text/javascript";
    iScript.src= serverIp + "library/jquery.cookie.js";
    document.getElementsByTagName("head")[0].appendChild(iScript); 

    iLink = document.createElement("link");
    iLink.rel="stylesheet";
    iLink.type = 'text/css';
    iLink.href= serverIp + "library/jquery-ui-1.11.4.custom/jquery-ui.css";
    document.getElementsByTagName("head")[0].appendChild(iLink); 

    iScript = document.createElement("script");
    iScript.type="text/javascript";
    iScript.src= serverIp + "library/jquery-ui-1.11.4.custom/jquery-ui.js";
    document.getElementsByTagName("head")[0].appendChild(iScript); 

    iLink = document.createElement("link");
    iLink.rel="stylesheet";
    iLink.type = 'text/css';
    iLink.href= serverIp + "library/bootstrap/css/bootstrap-theme.min.css";
    document.getElementsByTagName("head")[0].appendChild(iLink); 

    iLink = document.createElement("link");
    iLink.rel="stylesheet";
    iLink.type = 'text/css';
    iLink.href= serverIp + "src/style/bootstrap.pkuvis.css";
    document.getElementsByTagName("head")[0].appendChild(iLink); 
    
    //bootstrap
    iScript = document.createElement("script");
    iScript.type="text/javascript";
    iScript.src= serverIp + "library/bootstrap/js/bootstrap.min.js";
    document.getElementsByTagName("head")[0].appendChild(iScript); 

        
    //lasso
    iScript = document.createElement("script");
    iScript.type="text/javascript";
    iScript.src= serverIp + "library/lasso.min.js";
    iScript.charset="utf-8"
    document.getElementsByTagName("head")[0].appendChild(iScript); 

    // if (!$.cookie)
    //  return;

    iScript = document.createElement("script");
    iScript.type="text/javascript";
    iScript.src= serverIp + "src/welcome.js";
    document.getElementsByTagName("head")[0].appendChild(iScript); 

    // if(!addModal)
    //  return;

    exec();
    clearInterval(timer);
}, 300);

var timer2 = setInterval(function(){
    collectFeedback();
    // alert('Collect Feedback');
    clearInterval(timer2);
}, 1000 * 60 * 1000)

var d = new Date()
d = 'Interaction+ :) ' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
// alert(d);

//global variance
var addOnSvg;
var defineRegionRect = undefined;
// var bCreateOne = false;
var isCreating = false;
var g_MouseBegin={}, g_MouseEnd={};
var dragid = 0, dragIdName;

var g_FrontZIndex = 100;
var USER = undefined;

//var selectElement = [];

var g_TimeCount = 0;
var g_FeedbackFilled = false;

var g_StartTime, g_EndTime;
var g_ToolBarManager;

function exec(){

    g_StartTime = new Date().getTime();

    //check for first time user
    g_ToolBarManager = new ToolBarManager();
    g_NameRender = new NameRender();
    
    USER = "Guest";
    // welcome();

    //set the feedback dialog
    // function pleaseFillFeedback(){
    //  g_TimeCount += 1;
    //  //console.log(' time count ', g_TimeCount);
    //  // if(g_TimeCount == 2){
    //  //  //the first 5 min
    //  //  alert('Please Fill Feedback ');
    //  //  g_FeedbackFilled = true;
    //  // }
    //  // if(!g_FeedbackFilled)
    //  clearTimeout();
    //  setTimeout(pleaseFillFeedback(), 30000); //5 min
            
    // }

    // setTimeout(pleaseFillFeedback(), 30000); //5 min


    g_ToolBarManager.addFloatPanel();
    enterAddOn();

    // iScript = document.createElement("script");
    // iScript.type="text/javascript";
    // iScript.src= serverIp + "library/lasso.js";
    // document.getElementsByTagName("head")[0].appendChild(iScript); 

    
    //add the drag rect
    // $("body").on('mousedown', function (e) {
};

function welcome(){

    USER = $.cookie('AddonFilter_User');
    if(USER == undefined){
        //the first time 
        addModal();
        //manual & login
        showManual();
        //remove
        // removeModal();
    }else{

        g_ToolBarManager.addFloatPanel();
        enterAddOn();   
    }
}


//enter the mode of Interaction+
function enterAddOn(){

    var svgwidth =  document.body.scrollWidth;
    var svgheight = document.body.scrollHeight;

    //add a div
    var addOnDiv = document.createElement('div');
    addOnDiv.id = 'addondiv';
    addOnDiv.className = 'pku-vis-add-on';
    $('body')[0].appendChild(addOnDiv);
    $('#addondiv').css({
        // cursor: 'pointer',
        width: svgwidth,
        height: svgheight,
        top: 0,
        left: 0,
        position: 'absolute',
        'z-index': g_FrontZIndex
    });

    addOnSvg = d3.select("#addondiv").append("svg")
    .attr("width", svgwidth)
    .attr("height", svgheight)
    .attr("class", "addonsvg")
    .attr('id', 'addonsvg_here')
    .attr("x", 0)
    .attr("y", 0)
    .style({
        "position": "absolute",
        "left": 0,
        "top": 0
    });

    $('#addondiv').on('mousedown', function (e) {
      // //console.log('mousedown', e.pageX, ', ', e.pageY); 
      var pos = getPosInAddonSvg(e);
      handleMouseDown(pos, addOnSvg);
    }).on('mouseup', function(e) {
      handleMouseUp(); //e
    }).on('mousemove', function(e) {
      var pos = getPosInAddonSvg(e);    
      // //console.log('mousemove', e.pageX, ', ', e.pageY);    
      handleMouseMove(pos, addOnSvg);
    });


    var testDiv = document.getElementById('addonsvg_here');  

    var blurdefhtml = 
    '<defs>' +
        '<filter id="glow"> ' +
                ' <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/> '+
                ' <feMerge> ' +
                    ' <feMergeNode in="coloredBlur"/> ' +
                    ' <feMergeNode in="SourceGraphic"/> ' +
                ' </feMerge> ' +
        '</filter>' +        
    '</defs>';

    testDiv.innerHTML = testDiv.innerHTML + blurdefhtml;

}

function showOnlyManual(){
    //console.log(' show only manual ');

    var manaul_div = document.createElement('div');
    manaul_div.id = 'onlymanual_div';
    $('body')[0].appendChild(manaul_div);

    $('#onlymanual_div').css({   
      background: 'rgba(0, 0, 0, 0.8)',
      left: '0px',
      top: '0px',
      width: '100%',
      height: '100%',
      position: 'fixed',
      'padding-top': '30px',
      'z-index': g_FrontZIndex + 3,
    });

    $('#onlymanual_div').on('click', function(){
        $(this).remove();
    });

    //show manual images
    var manualhtml = '<div class="col-md-12" id="onlymanual_panel_div"></div>';
    var compiled = _.template(manualhtml);
    //show_other_button, , feedback_button, exit_2_button

    // var manaul_div = document.getElementById('onlymanual_div');
    // var basesize = 0;

    $('#onlymanual_div').html(compiled());
    $('#onlymanual_panel_div').css({   
        width: '80%',
        background: 'white',
        height: '80%',
        'margin-left': '10%',
        'border-radius': '5px',
        'overflow-y': 'scroll',
    });

    //title
    var testDiv = document.getElementById('onlymanual_panel_div');  

    var titlehtml = '<div class="row" style=" font-size: 20px; text-align: center; font-weight: 700;"><p>Manual of Interaction+</p></div>';
    //</p><p style="margin:0px"> 
    var titlecom = _.template(titlehtml);
    testDiv.innerHTML = testDiv.innerHTML + titlecom({});

    var imghtml1 = '<div style="text-align:center"><img src=<%=ImgSrc1%> style="width:95%; border:black 1px solid; border-radius: 5px;"/><img src=<%=ImgSrc2%> style="width:95%; border-radius: 5px;border:black 1px solid; margin-top:10px"/></div>';
    var imgcompiled1 = _.template(imghtml1);
    //show_other_button, , feedback_button, exit_2_button

    testDiv.innerHTML = testDiv.innerHTML + imgcompiled1({
        ImgSrc1: serverIp + "rc/manual_addonfilter.png",
        ImgSrc2: serverIp + "rc/manual_functions.png",
    });

    


    // var imghtml2 = '<div style="text-align:center"><img src=<%=ImgSrc2%> style="width:95%; border-radius: 5px;"/></div>';
    // var imgcompiled1 = _.template(imghtml1);
    // //show_other_button, , feedback_button, exit_2_button

    // testDiv.innerHTML = testDiv.innerHTML + imgcompiled1({
    //  ImgSrc1: serverIp + "rc/manual_addonfilter.png",
    // });
     
}

//exist the mode of Interaction+
function exitAddOn(){
    if(g_InObjManager != undefined)
        g_InObjManager.clear();
    $('#addondiv').remove();
    $('#floatpaneldiv').remove();
}