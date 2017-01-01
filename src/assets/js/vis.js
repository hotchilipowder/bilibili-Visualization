var config={
  'debug': true,
};

var debug = config.debug ? console.log.bind(console) : function () { };


// 将颜色的数值化为十六进制字符串表示
var RRGGBB = function (color) {
  var t = Number(color).toString(16).toUpperCase();
  return t;
};

var getCid = function (callback) {
  debug('get cid...');
  var cid = null, src = null;
  try {
    src = document.querySelector('#bofqi iframe').src.replace(/^.*\?/, '');
    console.log('src:'+src);
    cid = Number(src.match(/cid=(\d+)/)[1]);
  } catch (e) { }
  if (!cid) try {
    src = document.querySelector('#bofqi embed').getAttribute('flashvars');
    cid = Number(src.match(/cid=(\d+)/)[1]);
  } catch (e) { }
  if (!cid) try {
    src = document.querySelector('#bofqi object param[name="flashvars"]').getAttribute('value');
    cid = Number(src.match(/cid=(\d+)/)[1]);
  } catch (e) { }
  debug(cid+'-------here');
  if (cid) setTimeout(callback, 0, cid);
  else {
    $.ajax({
    url : "", 
    async : false, 
    success : function(data){ 
      try { 
        cid = Number(data.match(/cid=(\d+)/)[1]); 
      }
      catch (e) { }
      setTimeout(callback, 0, cid || undefined);
      },
    }); 
  }
};


var vidoe_transform(video_length){
  
};

var parseXML = function (content) {
  // debug(typeof(content));
  // var data = (new DOMParser()).parseFromString(content, 'application/xml');
  var video_length = $(".bilibili-player-video-time-total").text();
  data = content;
  return Array.apply(Array, data.querySelectorAll('d')).map(function (line) {
    var info = line.getAttribute('p').split(','), text = line.textContent;
    debug(info);
    return {
      'content': text,
      'show_time': Number(info[0]),
      'cls': [undefined, 'R2L', 'R2L', 'R2L', 'BOTTOM', 'TOP'][Number(info[1])],
      'font_size': Number(info[2]),
      'color': RRGGBB(Number(info[3])),
      'bottom': Number(info[5]) > 0,
      'submit_time': new Date(Number(info[4])),
      'pool': Number(info[5]),
      'sender': String(info[6]),
      'dmid': Number(info[7]),
    };
  });
};

 
var debug_console = function(data){
  debug(data);
  $.ajax({
    url:"http://comment.bilibili.com/"+data+'.xml',
    async : false, 
    success: function(data){
      var danmu = parseXML(data);
      debug(danmu);
    }
  })
};

getCid(debug_console);

// window.onload=function(){
//   var rs = getCid(debug_console);
//   console.log(rs);
// }

