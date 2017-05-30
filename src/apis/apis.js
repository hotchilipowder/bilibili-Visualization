import axios from 'axios'
import $ from 'jquery'

function post(url, data){
	return axios({
		url,
		method: 'POST',
		data
	})
}

export function getDanmuXml(cid){
    return axios({
        url: 'http://comment.bilibili.com/'+cid+ '.xml',
        method: 'GET'
    })
}

export function getCid() {
    return axios({
            url:"",
            method:"GET"
        }).then(res=>{
            const data = res.data;
            let cid = Number(data.match(/cid=(\d+)/)[1]);
            console.log(cid)
            return cid;
        }).catch(res=>{
            console.log(res)
            return undefined;
        })
};