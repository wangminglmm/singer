import { Toast } from 'vant';
//显示我的界面
function showMyHome(device){
	if(device == 'ios'){
		window.location.href =  'pp://myhome'
	}else{
		var url = 'pp://myhome'
		var str = '{\'url\':\''+url+'\'}'
		window.peipeiinjs.runPeiPeiJavaScript(str)
	}
}

//显示用户页面
function to_personal (device, uid) {
  console.log(`跳转用户主页,设备${device},用户id${uid}`)
	if (device == 'ios') {
		window.location.href =  'pp://personal?uid=' + uid
	} else {
		var url = 'pp://personal'
		var str = '{\'url\':\''+url+'\', \'uid\':\'' + uid + '\'}'
		window.peipeiinjs.runPeiPeiJavaScript(str)
	}
}

//播放录音
function playVoice(device,voice_url){
	if(device == 'ios'){
		showPlayVoice_ios(voice_url);
	}else{
		showPlayVoice(voice_url);
	}
}

//录音
function Voice(device,content, act){
	if(device == 'ios'){
		showVoice_ios(content, act);
	}else{
		showVoice(content, act);
	}
}

//显示Android录音
function showVoice(content, act){
	//content = "每人只有一次上传机会，上传前请确认";
	var url = "pp://voice";
	var str = "{'url':'"+url+"','act':'"+act+"','content':'"+content+"'}";
	window.peipeiinjs.runPeiPeiJavaScript(str);//通过injs接口调用android的函数
}
//显示Android播放录音
function showPlayVoice(voice_url){
	var url = "pp://play_voice";
	var str = "{'url':'"+url+"','voice_url':'"+voice_url+"'}";
	window.peipeiinjs.runPeiPeiJavaScript(str);//通过injs接口调用android的函数
}

//显示IOS录音
function showVoice_ios(content, act){
	//content, act=hsy
	window.location.href =  "pp://voice?content="+content+"&act="+act+"";

}
//显示IOS播放录音
function showPlayVoice_ios(voice_url){

	window.location.href = "pp://play_voice?voice_url="+voice_url;

}

function fromandroidrun(json){
	voiceCallback(json);
}

function fromiosrun(json){
	voiceCallback(json);
}

function voiceCallback(json){
	if(json['type'] == "pp://voice"){
			json.voice = JSON.parse(json.voice);
			Toast(json.voice.msg);
	}
}

export function initJsBridge() {
  window.showMyHome = showMyHome
	window.to_personal = to_personal
	window.Voice = Voice
	window.playVoice = playVoice
	window.fromiosrun = fromiosrun
	window.fromandroidrun = fromandroidrun
}
