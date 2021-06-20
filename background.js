tab_info = null;
tab_info_addition = null;
window_id = null;
click_addition = false;
/// Открыть главное меню
chrome.browserAction.onClicked.addListener(function() {
	if (window_id == null) {
		width = 950;
		height = 580;
	   	chrome.windows.create({'url': 'popup/index.html', 'type': 'popup', 'width': width, 'height': height, 'top': Math.round(window.screen.availHeight/2 - height/2), 'left': Math.round(window.screen.availWidth/2 - width/2)}, function(val) {
	   		window_id = val.id;
	   	});
   	} else {
		chrome.windows.update(window_id, {'focused': true}, (tab) => { });
   	}
});

/// Запретить изменение размера окна
chrome.windows.onBoundsChanged.addListener(function() {
	if (window_id != null) {
		///chrome.windows.update(window_id, {'width': width}, (tab) => { });
	}
});

/// Остановить бота при закрытии меню
chrome.windows.onRemoved.addListener(function(id) {
	if (id == window_id) {
		window_id = null;
		chrome.storage.local.set({"im_status": false});
	}
});

/// Синхронизация 
chrome.storage.onChanged.addListener(function(changes, namespace) {
	if (changes.data !== undefined) {
		data = changes.data.newValue.split(";");

		chrome.storage.local.get("im_values_1", function (result) { 
			if (result.im_values_1 === undefined || result.im_values_1 == "") { 
			  	telegram_browser = "Браузер 1";
			  	captcha = false;
			} else {
				telegram_browser = result.im_values_1.telegram_browser;
				captcha = result.im_values_1.captcha;
			}
		});

		if (data[0] == "<task_start>") {
			open_url("https://instagram777.ru/tasks/api.php?action=task_start&hash="+data[1]);
		}

		if (data[0] == "<task_open>") {
			open_url(data[1]);
		}

		if (data[0] == "<ava_message>") {
			alert(telegram_browser+": У вас не установлено фото в профиле соц. сети! Бот остановлен");
		}

		if (data[0] == "<captcha>") {
			if (captcha == false) {
				alert(telegram_browser+": Пройдите проверку во вкладке с заданием!");
			}
		}

		if (data[0] == "<message_block_all>") {
			alert(telegram_browser+": Ваши аккаунты заблокированы! Бот остановлен");
		}

		if (data[0] == "<message_block>") {
			alert(telegram_browser+": Ваш аккаунт попал под временную блокировку! Бот остановлен");
		}

		if (data[0] == "<add_acc>") {
			add_acc();
		}

		if (data[0] == "<add_pub_fol_ava>") {
			alert(telegram_browser+": Бот остановлен! Заполните свои Instagram аккаунты");
		}

		if (data[0] ==  "<clear_acc>") {
			remove_cookie();
		}

		if (data[0] ==  "<close_url>") {
			close_url();
		}

		if (data[0] == "<proxy_server>") {
			proxy();
		}

		if (data[0] == "<focus>") {
			chrome.tabs.create({url: chrome.runtime.getURL("popup/focus.html")}); 
		}

		if (data[0] == "<change_acc>") {
			remove_cookie();
			setTimeout(function() {
				chrome.storage.local.get("im_acc_login", function (result3) { 
					if (result3.im_acc_login.indexOf("[{") != -1) {
						login_cookie(JSON.parse(result3.im_acc_login));
					} else {
						open_url("https://www.instagram.com/");
					}
				});
			}, 1000)
		}

		if (data[0] == "<login_cookie_acc>") {
			acc = JSON.parse(data[1]);
			chrome.storage.local.set({'im_logout': "false"});
			for (var i = 0; i < acc.length; i++) {
				obj = acc[i];
				obj.url = "https://www.instagram.com/";
				obj.httpOnly = "";
				delete obj.httpOnly;
				obj.hostOnly = "";
				delete obj.hostOnly;
				obj.sameSite = "";
				delete obj.sameSite;
				obj.session = "";
				delete obj.session;
				obj.storeId = "";
				delete obj.storeId;
				obj.id = "";
				delete obj.id;
				obj.expirationDate = "";
				delete obj.expirationDate;
				if (obj.domain != "") {
					obj.domain = ".instagram.com";
					chrome.cookies.set(obj, function (cookie){});
				}
			}
		}
	}
});

/// Синхронизация 
function sync_data(val) {
	val = val+";"+"<background>";
	chrome.storage.local.set({
	  	data: val
	});
}

/// Вход по куки
function login_cookie(acc) {
	chrome.storage.local.set({'im_logout': "false"});
	for (var i = 0; i < acc.length; i++) {
		obj = acc[i];
		obj.url = "https://www.instagram.com/";
		obj.httpOnly = "";
		delete obj.httpOnly;
		obj.hostOnly = "";
		delete obj.hostOnly;
		obj.sameSite = "";
		delete obj.sameSite;
		obj.session = "";
		delete obj.session;
		obj.storeId = "";
		delete obj.storeId;
		obj.id = "";
		delete obj.id;
		obj.expirationDate = "";
		delete obj.expirationDate;
		if (obj.domain != "") {
			obj.domain = ".instagram.com";
			chrome.cookies.set(obj, function (cookie){});
		}
	}
	sync_data("<start>");
}

/// Добавить акк 
function add_acc() {
	chrome.cookies.getAll({domain: ".instagram.com"}, function(cookies) { 
		cookies = JSON.stringify(cookies);
	    chrome.storage.local.get("im_accounts", function (result) { 
	    	im_accounts = result.im_accounts;
	    	im_accounts.accounts.push(cookies+`<status><span class="badge badge-outline-success">Готово <i class="fa fa-trash mr-2 trash"></i></span>`);
	    	chrome.storage.local.set({'im_accounts': im_accounts});
	    	sync_data("<add_acc_2>");
	    });
    });
}

/// Удалить куки
function remove_cookie() {
	chrome.cookies.getAll({domain: ".instagram.com"}, function(cookies) { 
	    for(var i=0; i<cookies.length;i++) { chrome.cookies.remove({url: "https://www.instagram.com" + cookies[i].path, name: cookies[i].name});}
	});
}

/// Открыть ссылку
function open_url(url) {
	chrome.storage.local.get("im_addition", function (result2) {
        click_addition = result2.im_addition;
        if (tab_info == null) {
			chrome.tabs.create({url: url, active: click_addition }, tab =>{tab_info = tab.id;}); 
		} else {
			function callback() {
			    if (chrome.runtime.lastError) {
			        chrome.tabs.create({url: url, active: click_addition }, tab =>{tab_info = tab.id;}); 
			    } else {
			        chrome.tabs.update(tab_info, {url: url});
			    }
			}
			chrome.tabs.get(tab_info,callback);
		}
    });
}

/// Синхронизация с дополнением
function open_url_addition(url) {
	if (tab_info_addition == null) {
		chrome.tabs.create({url: url, active: false }, tab =>{tab_info_addition = tab.id;}); 
	} else {
		function callback() {
		    if (chrome.runtime.lastError) {
		        chrome.tabs.create({url: url, active: false }, tab =>{tab_info_addition = tab.id;}); 
		    } else {
		        chrome.tabs.update(tab_info_addition, {url: url});
		    }
		}
		chrome.tabs.get(tab_info_addition,callback);
	}
}

/// Закрыть вкладку
function close_url() {
	if (tab_info != null) {
		function callback() {
		    if (!chrome.runtime.lastError) {
		       chrome.tabs.remove(tab_info, function(){});
		       tab_info = null;
		    }
		}
		chrome.tabs.get(tab_info,callback);
	}
}

/// Включить / выключить прокси
function proxy() {
	chrome.storage.local.get("im_proxy", function (result) { 
		set_proxy(result.im_proxy)
	});
}

function set_proxy(proxy_info) {
	if (proxy_info.status == true) {
		scheme2 = "http";
		list = ["host == 'exemple.com'"];
		if (proxy_info.proxy_server_1 == true) {scheme2 = "PROXY"}
		if (proxy_info.proxy_server_2 == true) {scheme2 = "HTTPS"}
		if (proxy_info.proxy_server_3 == true) {scheme2 = "SOCKS4"}
		if (proxy_info.proxy_server_4 == true) {scheme2 = "SOCKS5"}

		if (proxy_info.proxy_server_site_1 == true) {list.push("host == 'instagram777.ru'")}
		if (proxy_info.proxy_server_site_2 == true) {list.push("host == '*.instagram.com' || host == 'instagram.com' || host == 'www.instagram.com'")}
		if (proxy_info.proxy_server_site_3 == true) {list.push("host == 'twitter.com' || host == '*.twitter.com' || host == 'm.twitter.com'")}
		if (proxy_info.proxy_server_site_4 == true) {list.push("host == '2ip.ru'")}
		if (proxy_info.proxy_server_site_5 == true) {list.push("host == 'myhide.ru'")}

		list = list.join(" || ");
		var config = {
		    mode: "pac_script",
		    pacScript: {
		      data: "function FindProxyForURL(url, host) {\n" +
            "  if ("+list+")\n" +
            "    return '"+scheme2+" "+proxy_info.ip+"';\n" +
            "  return 'DIRECT';\n" +
            "}"
		    }
    	}

		console.log(config);
		chrome.proxy.settings.set({value: config, scope: 'regular'},function() {});
	} else {
		var config = {mode: "direct"}
		chrome.proxy.settings.set({value: config, scope: 'regular'},function() {});
	}
}

