javascript: (function() {
    if (!window.jQuery) { script = document.createElement('script');　
        script.src = 'https://cdn.staticfile.org/jquery/3.1.1/jquery.min.js';
        document.body.appendChild(script); };

    var serverIp = 'http://127.0.0.1:8888/';

    //d3
    iScript = document.createElement("script");
    iScript.type="text/javascript";
    iScript.src= serverIp + "assets/js/d3.js";
    document.getElementsByTagName("head")[0].appendChild(iScript); 

    //

    script = document.createElement('script');
    script.src = 'http://127.0.0.1:8888/src/assets/js/vis.js';
    document.body.appendChild(script); 
    script = document.createElement('script');
    script.src = 'http://127.0.0.1:8888/src/assets/js/d3.js';

})()
