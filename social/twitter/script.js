chrome.storage.local.get("im_status", function (result) {
    if (result.im_status == "true") {
        delay_task = 1;
        delay_task = delay_task * 1000;
        if (document.location.host == "mobile.twitter.com" || document.location.host == "twitter.com") {
            if (document.location.href == "https://mobile.twitter.com/home" || document.location.href == "https://twitter.com/home") {
                android.next();
            } else {
                function XPatch(val) {
                    return document.evaluate(val, document, null, XPathResult.ANY_TYPE, null).iterateNext();
                }
                interval = setInterval(function () {
                    var body_page = document.body.textContent;
                    if (body_page.indexOf("view profile") != -1 || body_page.indexOf("Да, посмотреть профиль") != -1) {
                        if (XPatch('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div[2]/div[3]') == null) {
                            if (XPatch('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div[2]/div[3]') == null) {
                                if (XPatch('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div[2]/div/div/div[2]/div[3]') == null) {
                                    clearInterval(interval);
                                    android.block("twitter");
                                } else {
                                    XPatch('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div[2]/div/div/div[2]/div[3]').click();
                                }
                            } else {
                                XPatch('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div[2]/div[3]').click();
                            }
                        } else {
                            XPatch('//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div/div/div/div[2]/div[3]').click();
                        }
                    }
                    if (body_page.indexOf("Something went wrong.") != -1) {
                        clearInterval(interval);
                        android.block("twitter");
                    }
                    if (XPatch('/html/body/div[2]/div/form/input[5]') != null) {
                        clearInterval(interval);
                        android.block("twitter");
                    }
                    if (document.querySelector('div[data-testid="userActions"]') != null) {
                        if (body_page.indexOf("Follow") != -1) {
                            document.querySelector('div[data-testid="placementTracking"]').querySelector('div[role="button"]').click();
                        }
                        if (body_page.indexOf("Following") != -1 || body_page.indexOf("profile may") != -1 || body_page.indexOf("blocked") != -1) {
                            clearInterval(interval);
                            setTimeout(check, delay_task);
                        } else {
                            document.querySelector('div[data-testid="placementTracking"]').querySelector('div[role="button"]').click();
                            clearInterval(interval);
                            setTimeout(check, delay_task);
                        }
                    } else {
                        if (document.querySelector('div[data-testid="like"]') != null) {
                            clearInterval(interval);
                            document.querySelector('div[data-testid="like"]').click();
                            setTimeout(check, delay_task);
                        } else {
                            elem = '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div/div/section/div/div/div[2]/div/div/article/div/div/div/div[2]/div[2]/div[2]/div[3]/div[3]/div';
                            if (XPatch(elem) != null) {
                                if (XPatch(elem).getAttribute("data-testid").indexOf("unlike") != -1) {
                                    clearInterval(interval);
                                    android.next();
                                } else {
                                    clearInterval(interval);
                                    XPatch(elem).click();
                                    setTimeout(check, delay_task);
                                }
                            } else {
                                if (document.querySelector('div[data-testid="unlike"]') != null) {
                                    clearInterval(interval);
                                    android.next();
                                }
                            }
                        }
                    }
                }, 1000);
            }
        }
        function check() {
            var body_page = document.body.textContent;
            if (body_page.indexOf("unable to follow more people") == -1) {
                if (body_page.indexOf("account is suspended and is not permitted") == -1) {
                    if (body_page.indexOf("ействие вашей учетной записи приостановлено") == -1) {
                        android.check_task();
                    } else {
                        android.block("twitter");
                    }
                } else {
                    android.block("twitter");
                }
            } else {
                android.block("twitter");
            }
        }
    }
});
