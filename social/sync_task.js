stop_page = false;
chrome.storage.local.get("im_status", function (result) {
    if (result.im_status == true) {
		if (document.location.href.indexOf("https://wiq.ru/tasks/api.php?action=task_start") != -1) {
			$("body").append(`<script>function open(val){}; function close() {}</script>`);
			wait_info = setInterval(function() {
				if ($(".col-md-4").length > 0) {
					if ($(".col-md-4").html().indexOf("Пройдите проверку") != -1) {
						clearInterval(wait_info);
						sync_data("<captcha>");
						stop_page = true;
					}
				}
				if ($("#loader").length > 0) { 
					if ($("#loader").html().indexOf("Нельзя брать более") != -1) {
						clearInterval(wait_info);
						sync_data("<close_tab_no_load>");
					}

					if ($("#loader").html().indexOf("Задания больше не существует") != -1 || $("#loader").html().indexOf("Задание недоступно") != -1 || $("#loader").html().indexOf("Это задание уже недоступно или выполняется") != -1 || $("#loader").html().indexOf("Ошибка. Повторите позже") != -1) {
						clearInterval(wait_info);
						sync_data("<close_tab_no_load>");
					}

				}
			}, 100);

			setTimeout(function() {
				if (stop_page == false) {
					clearInterval(wait_info);
					sync_data("<close_tab_no_load>");
				}
			}, 9000);
		}
	}
});

/// Синхронизация 
chrome.storage.onChanged.addListener(function(changes, namespace) {
  	if (changes.data !== undefined) {
	    data = changes.data.newValue.split(";");
	    console.log(data[0]);
	    if (data[0] == "<stop_page>" || data[0] == "<stop>" || data[0] == "<start_timer>") {
	    	stop_page = true;
	    	window.stop();
	    }

	    if (data[0] == "<clear_session>") {
	    	function deleteCookie(name) {
				document.cookie.split(";").forEach(function(el) {
					el = el.split("=")[0].trim();
					if(!el.indexOf(name)) {
						var date = new Date(0);
						document.cookie = el + "=; path=/; expires=" + date.toUTCString();
					}
				});
			}
			function setCookie(name,value,days) {
			    var expires = "";
			    if (days) {
			        var date = new Date();
			        date.setTime(date.getTime() + (days*24*60*60*1000));
			        expires = "; expires=" + date.toUTCString();
			    }
			    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
			}
			setCookie('Time', 1, 7);
			deleteCookie("PHPSESSID");
	    }
  	}
});

/// Синхронизация 
function sync_data(val) {
	val = val+";"+"<task>";
	chrome.storage.local.set({
	  	data: val
	});
}

console.output = [];
console.log = (function(log) {
  return function() {
    log.apply(console, arguments);
    console.output.push(JSON.stringify(arguments));
    sync_data("<CONSOLE>;"+JSON.stringify(arguments));
  }
}(console.log));