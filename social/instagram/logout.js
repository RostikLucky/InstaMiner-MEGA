ava_1 = '//*[@id="react-root"]/section/nav/div[2]/div/div/div[3]/div/div[5]/span';
logout_1 = '//*[@id="react-root"]/section/nav/div[2]/div/div/div[3]/div/div[5]/div[2]/div[2]/div[2]/div[2]';
chrome.storage.local.get("im_logout", function (result) { 
	if (result.im_logout == "true0") {
    	if (document.location.host == "www.instagram.com") {
    		window.onload = function () {
    			elem = '//*[@id="react-root"]/section/div/div/div[3]/form/div[2]/span/button';
                if (XPatch(elem) != null) {
                    XPatch(elem).click();
                }
	            if (XPatch(ava_1) != null) {
	        		XPatch(ava_1).click();
	        		setTimeout(function() { 
	        			if (XPatch(logout_1) != null) {
	        				chrome.storage.local.set({'im_logout': "true1"});
	        				XPatch(logout_1).click();
	    				} else {
	    					chrome.storage.local.set({'im_logout': "true1"});
	    	 				location.reload();
	    				}
	        		}, 1000);
	    	 	} else {
	    	 		chrome.storage.local.set({'im_logout': "true1"});
	    	 		location.reload();
	    	 	}
    	 	}
        	function XPatch(xpatch_val) {
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
			    if (XPatch_elem != null) {console.log("LOGOUT: "+xpatch_val)}
			    return XPatch_elem;
			}
    	}
	}
});