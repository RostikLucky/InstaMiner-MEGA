chrome.storage.local.get("im_logout", function (result) { 
	if (result.im_logout == "true1") {
		chrome.storage.local.get("im_acc_login", function (result) { 
            setTimeout(function() {
            	if (XPatch_log('//*[@id="react-root"]/section/main/article/div/div/div/div[3]/button[1]') != null) {
	           		XPatch_log('//*[@id="react-root"]/section/main/article/div/div/div/div[3]/button[1]').click();
		        } 
		        if (XPatch_log('//*[@id="react-root"]/section/main/article/div[2]/div[2]/div/p/button[1]') != null) {
		            XPatch_log('//*[@id="react-root"]/section/main/article/div[2]/div[2]/div/p/button[1]').click();
		        } 
		        elem = '//*[@id="react-root"]/section/div/div/div[3]/form/div[2]/span/button';
	            if (XPatch_log(elem) != null) {
	                XPatch_log(elem).click();
	            }

	            elem = '//*[@id="react-root"]/div/div/section/main/article/div[2]/div/div/div[3]/span/button';
	            if (XPatch_log(elem) != null) {
	                XPatch_log(elem).click();
	            }

	            elem = '//*[@id="react-root"]/section/main/article/div[2]/div/div/div[3]/span/button';
	            if (XPatch_log(elem) != null) {
	                XPatch_log(elem).click();
	            }

	            elem = '//*[@id="react-root"]/section/main/div/div/div/div/div[3]/span/button';
	            if (XPatch_log(elem) != null) {
	                XPatch_log(elem).click();
	            }

				if (result.im_acc_login.indexOf("[{") == -1) {
					login(result.im_acc_login.split(":")[0], result.im_acc_login.split(":")[1]);
				} else {
					elem = '//*[@id="react-root"]/section/div/div/div[3]/form/div[2]/span/button';
	                if (XPatch_log(elem) != null) {
	                    XPatch_log(elem).click();
	                }
					setTimeout(function() {
					 	if (XPatch_log('//*[@id="react-root"]/section/main/article/div/div/div/div[3]/button[1]') != null) {
				            XPatch_log('//*[@id="react-root"]/section/main/article/div/div/div/div[3]/button[1]').click();
				        }
						if (
				            XPatch_log('//*[@id="loginForm"]/div/div[1]/div/label/input') != null ||
				            XPatch_log('//*[@id="loginForm"]/div[1]/div[1]/div/label/input') != null ||
            				document.querySelector('input[name="username"]') != null
				        ) {
				            android.block("instagram");
				        } else {
				        	chrome.storage.local.set({'im_logout': "false"});
				        	sync_data("<start>");
				        }
			        }, 2000);
				}
			}, 2000);
		});
	}
});
function login(l, p) {
    let interval = setInterval(function () {
        if (
            XPatch_log('//*[@id="react-root"]/section/main/article/div/div/div/div[2]/button') != null ||
            XPatch_log('//*[@id="loginForm"]/div/div[1]/div/label/input') != null ||
            XPatch_log('//*[@id="loginForm"]/div[1]/div[1]/div/label/input') != null ||
            document.querySelector('input[name="username"]') != null
        ) {
            clearInterval(interval);
            run();
        }
    }, 1000);
    function run() {
        elem = '//*[@id="react-root"]/section/main/article/div/div/div/div[2]/button';
        if (XPatch_log(elem) != null) {
        	chrome.storage.local.set({'im_logout': "true2"});
            XPatch_log(elem).click();
        }
        elem = document.querySelector('input[name="username"]');
        if (elem != null) {
            elem.focus();
            for (var i = 0; i < elem.value.length; i++) {
                document.execCommand("delete", false)
            }
            setTimeout(function() {
	            if (document.execCommand("insertText", false, l) != false) {
	                elem = document.querySelector('input[name="password"]');
	                if (elem != null) {
	                    elem.focus();
	                    for (var i = 0; i < elem.value.length; i++) {
	                        document.execCommand("delete", false);
	                    }
	                    setTimeout(function() {
		                    if (document.execCommand("insertText", false, p) != false) {
		                        elem = document.querySelector('button[type="submit"]');
		                        if (elem != null) {
		                        	chrome.storage.local.set({'im_logout': "true2"});
		                            elem.click();
		                            setTimeout(function() {android.block("instagram")}, 10000);
		                        } else {
		                            android.block("instagram");
		                        }
		                    }
	                    }, 500);
	                }
	            }
            }, 500);
        } else {
            elem = '//*[@id="loginForm"]/div/div[1]/div/label/input';
            if (XPatch_log(elem) != null) {
                XPatch_log(elem).focus();
                for (var i = 0; i < XPatch_log(elem).value.length; i++) {
                    document.execCommand("delete", false);
                }
                setTimeout(function() {
	                if (document.execCommand("insertText", false, l) != false) {
	                    elem = '//*[@id="loginForm"]/div/div[2]/div/label/input';
	                    if (XPatch_log(elem) != null) {
	                        XPatch_log(elem).focus();
	                        for (var i = 0; i < XPatch_log(elem).value.length; i++) {
	                            document.execCommand("delete", false);
	                        }
	                        setTimeout(function() {
		                        if (document.execCommand("insertText", false, p) != false) {
		                            elem = '//*[@id="loginForm"]/div/div[3]/button';
		                            if (XPatch_log(elem) != null) {
		                            	chrome.storage.local.set({'im_logout': "true2"});
		                                XPatch_log(elem).click();
		                                setTimeout(function() {android.block("instagram")}, 10000);
		                            } else {
		                                android.block("instagram");
		                            }
		                        }
	                        }, 500);
	                    }
	                }
	            }, 500);
            } else {
                elem = '//*[@id="loginForm"]/div[1]/div[1]/div/label/input';
                if (XPatch_log(elem) != null) {
                    XPatch_log(elem).focus();
                    for (var i = 0; i < XPatch_log(elem).value.length; i++) {
                        document.execCommand("delete", false);
                    }
                    setTimeout(function() {
	                    if (document.execCommand("insertText", false, l) != false) {
	                        elem = '//*[@id="loginForm"]/div[1]/div[2]/div/label/input';
	                        if (XPatch_log(elem) != null) {
	                            XPatch_log(elem).focus();
	                            for (var i = 0; i < XPatch_log(elem).value.length; i++) {
	                                document.execCommand("delete", false);
	                            }
	                            setTimeout(function() {
		                            if (document.execCommand("insertText", false, p) != false) {
		                                elem = '//*[@id="loginForm"]/div[1]/div[4]/button';
		                                if (XPatch_log(elem) != null) {
		                                	chrome.storage.local.set({'im_logout': "true2"});
		                                    XPatch_log(elem).click();
		                                    setTimeout(function() {android.block("instagram")}, 10000);
		                                    error = 0;
		                                    let interval = setInterval(function () {
		                                        if (error == 15) {
		                                            clearInterval(interval);
		                                            android.block("instagram");
		                                        }
		                                        if (XPatch_log('//*[@id="slfErrorAlert"]') != null) {
		                                            clearInterval(interval);
		                                            error = 16;
		                                            android.block("instagram");
		                                        }
		                                        error++;
		                                    }, 1000);
		                                } else {
		                                    android.block("instagram");
		                                }
		                            } else {
		                                android.block("instagram");
		                            }
	                            }, 500);
	                        }
	                    }
                    }, 500);
                }
            }
        }
    }
}

chrome.storage.local.get("im_logout", function (result) { 
	if (result.im_logout == "true2") {
		profile();
	}
});

function profile() {
	no_login = 0;
	setTimeout(function() {
		elem = '//*[@id="react-root"]/section/main/article/div/div/div/div[2]/button';
	    if (XPatch_log(elem) != null) {
	        XPatch_log(elem).click();
	        chrome.storage.local.set({'im_logout': "false"});
        	sync_data("<start>");
	    } else {
	    	elem = '//*[@id="react-root"]/section/div/div/div[3]/form/div[2]/span/button';
		    if (XPatch_log(elem) != null) {
		        XPatch_log(elem).click();
		        chrome.storage.local.set({'im_logout': "false"});
	        	sync_data("<start>");
		    } else {
		    	elem = '/html/body/div[1]/div/div/iframe';
			    if (XPatch_log(elem) != null || XPatch_log('//*[@id="react-root"]/section/main/div[2]/div/div/div[1]/div[2]') != null || XPatch_log('//*[@id="recaptcha-iframe"]') != null) {
			    	chrome.storage.local.set({'im_logout': "false"});
			        android.block("instagram");
			    } else {
			    	if (
			            XPatch_log('//*[@id="react-root"]/section/main/article/div/div/div/div[2]/button') != null ||
			            XPatch_log('//*[@id="loginForm"]/div/div[1]/div/label/input') != null ||
			            XPatch_log('//*[@id="loginForm"]/div[1]/div[1]/div/label/input') != null ||
			            XPatch_log('//*[@id="react-root"]/section/div/div/div[4]/a') != null ||
			            document.querySelector('input[name="username"]') != null
			        ) {
			        	chrome.storage.local.set({'im_logout': "false"});
			            android.block("instagram");
			        } else {
			        	chrome.storage.local.set({'im_logout': "false"});
			        	sync_data("<start>");
			        }
			    }
		    }
	    }
	    
	}, 4000);
}

function XPatch_log(xpatch_val) {
    XPatch_elem = document.evaluate(xpatch_val, document, null, XPathResult.ANY_TYPE, null).iterateNext();
    if (XPatch_elem == null) {
        if (xpatch_val.indexOf('//*[@id="react-root"]/') != -1) {
            xpatch_val = xpatch_val.replace('//*[@id="react-root"]/', '//*[@id="react-root"]/div/div/');
        }
        if (xpatch_val.indexOf('/html/body/') != -1) {
            xpatch_val = xpatch_val.replace('/html/body/', '/html/body/div/div/');
        }
        XPatch_elem = document.evaluate(xpatch_val, document, null, XPathResult.ANY_TYPE, null).iterateNext();
    }
    if (XPatch_elem != null) {console.log("LOGIN: "+xpatch_val)}
    return XPatch_elem;
}

/// Синхронизация 
function sync_data(val) {
	val = val+";"+Math.random();
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
