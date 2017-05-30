
var serverIp = 'http://127.0.0.1:3000/';

//react
iScript = document.createElement("script");
iScript.type = "text/javascript";
iScript.src = serverIp + '/static/js/bundle.js';
document.getElementsByTagName("head")[0].appendChild(iScript); 


// //添加一个VIS的BUTTON
function initVisBotton(){
    var btn = document.createElement("div");
    // btn.setAttribute("class",'bootstrap-custom bgray-btn show');
    btn.setAttribute("id","root");
    
    if($(".bgray-btn.show").length == 1){
        $(".bgray-btn.show")[0].after(btn);
    }else{
        console.log("VIS button exists!");
        return ;
    }
};

initVisBotton()



// iLink = document.createElement("link");
// iLink.rel="stylesheet";
// iLink.type = 'text/css';
// iLink.href= serverIp + "assets/css/dc.css";
// $("link")[0].before(iLink); 


// //bootstrap 
// iLink = document.createElement("link");
// iLink.rel="stylesheet";
// iLink.type = 'text/css';
// iLink.href= serverIp + "assets/css/bootstrap.css";
// $("link")[0].before(iLink); 


 // iLink = document.createElement("link");
 // iLink.rel="stylesheet";
 // iLink.type = 'text/css';
 // iLink.href= "https://cdn.datatables.net/1.10.13/css/dataTables.bootstrap.min.css";
 // $("link")[0].before(iLink); 


// iLink = document.createElement("link");
// iLink.rel="stylesheet";
// iLink.type = 'text/css';
// iLink.href= serverIp + "assets/css/jquery.dataTables.min.css";
// $("link")[0].before(iLink); 



// // 去掉带入的高版本jquery，去掉bootstrap的报错。
// // //jquery
// // iScript = document.createElement("script");
// // iScript.type = "text/javascript";
// // iScript.src = serverIp + 'assets/js/jquery.js'; 
// // document.getElementsByTagName("head")[0].appendChild(iScript);





// //d3
// iScript = document.createElement("script");
// iScript.type="text/javascript";
// iScript.src= serverIp + "assets/js/d3.js";
// document.getElementsByTagName("head")[0].appendChild(iScript); 


// //wait until load finished
// var timer = setInterval(function(){
 

//     //bootstrap
//     iScript = document.createElement("script");
//     iScript.type="text/javascript";
//     iScript.src= serverIp + "assets/js/bootstrap.js";
//     $("head")[0].appendChild(iScript); 

    
//     //dc 
//     iScript = document.createElement("script");
//     iScript.type = "text/javascript";
//     iScript.src = serverIp + "assets/js/dc.js";
//     document.getElementsByTagName("head")[0].appendChild(iScript); 
    
    
//     iScript = document.createElement("script");
//     iScript.type="text/javascript";
//     iScript.src= serverIp + "assets/js/jquery.dataTables.js";
//     $("head")[0].appendChild(iScript); 

//     iScript = document.createElement("script");
//     iScript.type = "text/javascript";
//     iScript.src = serverIp + "assets/js/vis.js";
//     document.getElementsByTagName("head")[0].appendChild(iScript); 




//     console.log("Time1 Finished!");

//         //vis.js
//     clearInterval(timer);

// }, 300);




// /*

// <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">'
    
//   Launch demo modal
// </button>
// */
// function initVisModal(){
//     var html= ['        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
// '            <div class="modal-dialog modal-lg modal-chat">',
// '                <div class="modal-content">',
// '                    <div class="modal-header">',
// '                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
// '                        <h4 class="modal-title" id="myModalLabel">弹幕可视化报告</h4>',
// '                    </div>',
// '                    <div class="modal-body">',
// '                        <div class="contain">',
// '                            <div class="row">',
// '                                <div class="col-md-10 col-md-offset-1">',
// '                                    <div id="danmu-line-chart">',
// '                                    </div>',
// '                                     <div class="chart-title text-center">弹幕出现时间</div>',
// '                                    <div id="danmu-volume-chart">',
// '                                        <span class="reset" style="display: none;">range: <span class="filter"></span></span>',
// '                                        <a class="reset" href="javascript:dc.filterAll(); dc.renderAll(); $(\'#danmu-up-chart svg\').attr(\'height\', 250);" style="display: none;">reset</a>',
// '                                    </div>',
// '                                    <div id="danmu-up-chart">',
// '                                    </div>',
// '                                    <div class="chart-title text-center">弹幕上传时间</div>',
// '                                </div>',
// '                                <div class="col-md-10 col-md-offset-1">',
// '                                    <div class="row">',
// '                                        <div id="color-chart" class="col-md-4 pie-chart">',
// '                                            <strong class="pie-title">颜色分布情况</strong>',
// '                                        </div>',
// '                                        <div id="pos-chart" class="col-md-4 pie-chart">',
// '                                            <strong class="pie-title">位置分布情况</strong>',
// '                                        </div>',
// '                                        <div id="char-chart" class="col-md-4 pie-chart">',
// '                                            <strong class="pie-title">弹幕长度分布情况</strong>',
// '                                        </div>',
// '                                    </div>',
// '                                </div>',
// '                                <div class="col-md-10 col-md-offset-1">',
// '                                    <h3>弹幕部分列表</h3>',
// '                                    <div class="dc-data-count">',
// '                                        <span class="filter-count"></span> selected out of <span class="total-count"></span> records | <a href="javascript:dc.filterAll(); dc.renderAll();$("#danmu-up-chart svg").attr("height", 250);">Reset All</a>',
// '                                    </div>',
// '                                    <table class="table table-hover dc-data-table">',
// '                                    </table>',
// '                                </div>',
// '                                <div class="col-md-10 col-md-offset-1">',
// '                                    <h3>弹幕详情列表</h3>',
// '                                    <div id="full-data-table">',
// '                                    </div>',
// '                                </div>',
// '                            </div>',
// '                        </div>',
// '                    </div>',
// '                    <div class="modal-footer">',
// '                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>',
// '                    </div>',
// '                </div>',
// '            </div>',
// '        </div>'].join("");
    
    
//     var modal = document.createElement("div");
//     modal.setAttribute("class","bootstrap-custom");
//     modal.innerHTML = html;
//     $("body")[0].appendChild(modal);
//     console.log("done!");
//     // vis.main();
// };



// var timer2 = setInterval(function(){ 
   
//     vis.main();
//     initVisBotton();

//     console.log("Time2 Finished!");

//     clearInterval(timer2);
// }, 3000);




