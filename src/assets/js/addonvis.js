
var serverIp = 'http://127.0.0.1:8888/';


//bootstrap 
iLink = document.createElement("link");
iLink.rel="stylesheet";
iLink.type = 'text/css';
iLink.href= serverIp + "assets/css/bootstrap.css";
$("link")[0].before(iLink); 


//jquery
iScript = document.createElement("script");
iScript.type = "text/javascript";
iScript.src = serverIp + 'assets/js/jquery.js'; 
document.getElementsByTagName("head")[0].appendChild(iScript);


//crossfilter
iScript = document.createElement("script");
iScript.type = "text/javascript";
iScript.src = serverIp + 'assets/js/crossfilter.js';
document.getElementsByTagName("head")[0].appendChild(iScript); 


//d3
iScript = document.createElement("script");
iScript.type="text/javascript";
iScript.src= serverIp + "assets/js/d3.js";
document.getElementsByTagName("head")[0].appendChild(iScript); 


//wait until load finished
var timer = setInterval(function(){
 

    //bootstrap
    iScript = document.createElement("script");
    iScript.type="text/javascript";
    iScript.src= serverIp + "assets/js/bootstrap.js";
    $("head")[0].before(iScript); 


    //dc 
    iScript = document.createElement("script");
    iScript.type = "text/javascript";
    iScript.src = serverIp + "assets/js/dc.js";
    document.getElementsByTagName("head")[0].appendChild(iScript); 
    clearInterval(timer);

}, 300);


//添加一个VIS的BUTTON
function showVisBotton(){
    var btn = document.createElement("div");
    btn.setAttribute("class",'bootstrap-custom btn btn-primary btn-xs');
    btn.setAttribute("data-toggle","modal");
    btn.setAttribute("data-target","#myModal");
    btn.innerHTML = 'VIS <br>该视频';
    $(".bgray-btn.show")[0].after(btn);
};

/*

<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">'
    
  Launch demo modal
</button>
*/
function showVisModal(){
    var html= "<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">"
+ "  <div class=\"modal-dialog\">"
+ "    <div class=\"modal-content\">"
+ "      <div class=\"modal-header\">"
+ "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button>"
+ "        <h4 class=\"modal-title\" id=\"myModalLabel\"></h4>"
+ "      </div>"
+ "      <div class=\"modal-body\">"
+ "        ..."
+ "      </div>"
+ "      <div class=\"modal-footer\">"
+ "        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>"
+ "        <button type=\"button\" class=\"btn btn-primary\">Save changes</button>"
+ "      </div>"
+ "    </div>"
+ "  </div>"
+ "</div>";
    var modal = document.createElement("div");
    modal.setAttribute("class","bootstrap-custom");
    modal.innerHTML = html;
    $("body")[0].appendChild(modal);
    console.log("done!");
};


 showVisBotton();
 showVisModal()



// function showOnlyManual(){
//     //console.log(' show only manual ');

//     var manaul_div = document.createElement('div');
//     manaul_div.id = 'onlymanual_div';
//     $('body')[0].appendChild(manaul_div);

//     $('#onlymanual_div').css({   
//       background: 'rgba(0, 0, 0, 0.8)',
//       left: '0px',
//       top: '0px',
//       width: '100%',
//       height: '100%',
//       position: 'fixed',
//       'padding-top': '30px',
//       'z-index': g_FrontZIndex + 3,
//     });

//     $('#onlymanual_div').on('click', function(){
//         $(this).remove();
//     });

//     //show manual images
//     var manualhtml = '<div class="col-md-12" id="onlymanual_panel_div"></div>';
//     var compiled = _.template(manualhtml);
//     //show_other_button, , feedback_button, exit_2_button

//     // var manaul_div = document.getElementById('onlymanual_div');
//     // var basesize = 0;

//     $('#onlymanual_div').html(compiled());
//     $('#onlymanual_panel_div').css({   
//         width: '80%',
//         background: 'white',
//         height: '80%',
//         'margin-left': '10%',
//         'border-radius': '5px',
//         'overflow-y': 'scroll',
//     });

//     //title
//     var testDiv = document.getElementById('onlymanual_panel_div');  

//     var titlehtml = '<div class="row" style=" font-size: 20px; text-align: center; font-weight: 700;"><p>Manual of Interaction+</p></div>';
//     //</p><p style="margin:0px"> 
//     var titlecom = _.template(titlehtml);
//     testDiv.innerHTML = testDiv.innerHTML + titlecom({});

//     var imghtml1 = '<div style="text-align:center"><img src=<%=ImgSrc1%> style="width:95%; border:black 1px solid; border-radius: 5px;"/><img src=<%=ImgSrc2%> style="width:95%; border-radius: 5px;border:black 1px solid; margin-top:10px"/></div>';
//     var imgcompiled1 = _.template(imghtml1);
//     //show_other_button, , feedback_button, exit_2_button

//     testDiv.innerHTML = testDiv.innerHTML + imgcompiled1({
//         ImgSrc1: serverIp + "rc/manual_addonfilter.png",
//         ImgSrc2: serverIp + "rc/manual_functions.png",
//     });

    


//     // var imghtml2 = '<div style="text-align:center"><img src=<%=ImgSrc2%> style="width:95%; border-radius: 5px;"/></div>';
//     // var imgcompiled1 = _.template(imghtml1);
//     // //show_other_button, , feedback_button, exit_2_button

//     // testDiv.innerHTML = testDiv.innerHTML + imgcompiled1({
//     //  ImgSrc1: serverIp + "rc/manual_addonfilter.png",
//     // });
     
// }

// //exist the mode of Interaction+
// function exitAddOn(){
//     if(g_InObjManager != undefined)
//         g_InObjManager.clear();
//     $('#addondiv').remove();
//     $('#floatpaneldiv').remove();
// }