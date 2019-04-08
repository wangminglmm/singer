
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

export function initJsBridge() {
  window.showMyHome = showMyHome
  window.to_personal = to_personal
}
