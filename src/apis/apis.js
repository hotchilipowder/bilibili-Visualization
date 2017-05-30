import axios from 'axios'

function post(url, data){
	return axios({
		url,
		method: 'POST',
		data
	})
}


export function getQEtest(){
	return axios({
		url: 'http://127.0.0.1:8444/qe',
		method: 'GET'
	})
}