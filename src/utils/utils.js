import $ from 'jquery'
// 将颜色的数值化为十六进制字符串表示
export function RRGGBB(color){

	let t = Number(color).toString(16).toUpperCase();
    if (t.length > 6) {
        t = t.substring(0, 6);
    }
    return Array(7 - t.length).join('0') + t;
}


//获取时间长度
export function lengthTransform (video_length) {
        let result = video_length.match(/\d{2,3}/g);
        return result.reduce(function (prev, cur, item, array) {
            return parseInt(prev) * 60 + parseInt(cur);
    });
};


export function print_filter(filter) {
    let f = eval(filter);
    if (typeof (f.length) != "undefined") {} else {}
    if (typeof (f.top) != "undefined") {
        f = f.top(Infinity);
    } else {}
    if (typeof (f.dimension) != "undefined") {
        f = f.dimension(function (d) {
            return "";
        }).top(Infinity);
    } else {}
    console.log(filter + "(" + f.length + ") = " + JSON.stringify(f).replace("[", "[\n\t").replace(/}\,/g, "},\n\t").replace("]", "\n]"));
};

//视频长度获取
var length_transform = function (video_length) {
    var result = video_length.match(/\d{2,3}/g);
    console.log(result);
    return result.reduce(function (prev, cur, item, array) {
        return parseInt(prev) * 60 + parseInt(cur);
    });
};

//parseXML对xml数据进行解析，得到数组
export function parseXML(content, video_length) {
    // console.log(typeof(content));
    let data = (new DOMParser()).parseFromString(content, 'application/xml');
    return Array.apply(Array, data.querySelectorAll('d')).map(function (line) {
        let info = line.getAttribute('p').split(','),
            text = line.textContent;
        return {
            'text': text,
            'video_len': video_length,
            'time': Number(info[0]),
            'mode': [undefined, 'R2L', 'R2L', 'R2L', 'BOTTOM', 'TOP'][Number(info[1])],
            'size': Number(info[2]),
            'color': RRGGBB(Number(info[3])),
            'bottom': Number(info[5]) > 0,
            'create': Number(info[4]),
            'pool': Number(info[5]),
            'sender': String(info[6]),
            'dmid': Number(info[7]),
        };
    });
};