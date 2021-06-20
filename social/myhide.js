setTimeout(function() {
	if (document.body.textContent.indexOf("One more step") != -1 || document.body.textContent.indexOf("Please complete the security check to access myhide.ru") != -1) {
		sync_data("<captcha>");
	}
}, 5000);

/// Синхронизация 
function sync_data(val) {
	val = val+";"+Math.random();
	chrome.storage.local.set({
	  	data: val
	});
}