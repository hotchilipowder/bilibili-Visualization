import axios from 'axios'
import $ from 'jquery'
import {lengthTransform} from '../utils/utils'
function post(url, data){
	return axios({
		url,
		method: 'POST',
		data
	})
}

//获取弹幕数据
export function getDanmuXml(cid){
    return axios({
        url: 'https://comment.bilibili.com/'+cid+ '.xml',
        method: 'GET'
    })
}

//获取cid
export function getCid() {
    return axios({
            url:"",
            method:"GET"
        })
        .then(res => {
            const data = res.data;
            let cid = Number(data.match(/cid=(\d+)/)[1]);
            return cid;
        }).catch(res=>{
            return undefined;
        })
};

//获取视频长度
export function getVideoLen(){
    var promise = new Promise(function(resolve, reject){
        let video_length = $(".bilibili-player-video-time-total").text();
        var timer = setInterval(function(){
            if(video_length && video_length != '00:00'){
                clearInterval(timer);
                video_length = lengthTransform(video_length)
                resolve(video_length);
            }
        }, 1000)
    });
    return promise;
}

//获取视频上传时间
export function getVideoUpTime(){
    var promise = new Promise(function(resolve, reject){
        let time = $("time").attr("datetime");
        var timer = setInterval(function(){
            if(time){
                clearInterval(timer);
                let video_length = new Date(time);
                resolve(video_length);
            }
        }, 1000)
    })
    return promise;
}