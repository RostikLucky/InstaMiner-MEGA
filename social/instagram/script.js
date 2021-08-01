comment_delay = 0;
click_addition = false;
check_addition = false;
inst_not_find = 0;
st = false;
chrome.storage.local.get("im_logout", function (result) { 
    if (result.im_logout == "false" || result.im_logout == undefined) {
        chrome.storage.local.get("im_status", function (result) {
            if (result.im_status == true) {
                chrome.storage.local.get("im_comments_val", function (result2) {
                    comment_delay = result2.im_comments_val * 1;
                });
                chrome.storage.local.get("im_comments_val", function (result2) {
                    comment_delay = result2.im_comments_val * 1;
                });
                chrome.storage.local.get("im_addition", function (result2) {
                    click_addition = result2.im_addition;
                });
                like_post = false;
                if (document.location.host == "www.instagram.com") {
                    if (document.location.href.indexOf(".com/accounts/login/") != -1) {
                        android.block_2("instagram");
                        console.log("BLOCK: F2");
                    } else {
                        if (document.location.href.indexOf("instagram.com/challenge") != -1) {
                            android.block_2("instagram");
                            console.log("BLOCK: F0");
                        } else {
                            if (document.location.href.indexOf("instagram.com/terms/unblock") != -1) {
                                android.block_2("instagram");
                                console.log("BLOCK: F0-2");
                            } else {
                                inst_find = setInterval(function() {
                                    inst();
                                    inst_not_find++;
                                    if (inst_not_find > 100) {
                                        android.next_task();
                                    }
                                }, 100);
                            }
                        }
                    }
                }
            } else {
                window.onload = function () {
                    setTimeout(function() {
                        if (XPatch('//*[@id="react-root"]/section/main/article') != null) {
                            wait_elem = setInterval(function() {
                                elem1 = '//*[@id="react-root"]/section/main/article/div[2]/div[3]';
                                if (XPatch(elem1) != null) {
                                    clearInterval(wait_elem);
                                    XPatch(elem1).innerHTML = `<div style="width: 10px;-webkit-box-align: center;-webkit-align-items: center;-ms-flex-align: center;align-items: center;-webkit-appearance: none;background: #fafafa;background: rgba(var(--b3f,250,250,250),1);border: 1px solid #dbdbdb;border: 1px solid rgba(var(--ca6,219,219,219),1);border-radius: 3px;-webkit-box-sizing: border-box;box-sizing: border-box;color: #262626;color: rgba(var(--i1d,38,38,38),1);display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-webkit-flex-direction: row;-ms-flex-direction: row;flex-direction: row;font-size: 14px;position: relative;width: 100%;"><label style="display: -webkit-box;display: -webkit-flex;display: -ms-flexbox;display: flex;height: 36px;-webkit-box-flex: 1;-webkit-flex: 1 0 0;-ms-flex: 1 0 0;flex: 1 0 0;padding: 0;position: relative;margin: 0;min-width: 0;width: 10px;height: 34px;"><input id="im_crx_cookie" placeholder="Cookie (формат JSON)" aria-required="true" autocapitalize="off" autocorrect="off" type="text" style="font-size: 12px;padding: 14px 0 2px 8px!important;background: #fafafa;background: rgba(var(--b3f,250,250,250),1);border: 0;-webkit-box-flex: 1;-webkit-flex: 1 0 auto;-ms-flex: 1 0 auto;flex: 1 0 auto;margin: 0;outline: 0;overflow: hidden;padding: 9px 0 7px 8px;text-overflow: ellipsis;height: 6px;" class=""></label><div style="-webkit-box-align: center;-webkit-align-items: center;-ms-flex-align: center;align-items: center;-webkit-box-flex: 0;-webkit-flex: 0 0 auto;-ms-flex: 0 0 auto;flex: 0 0 auto;-webkit-box-orient: horizontal;-webkit-box-direction: normal;-webkit-flex-direction: row;-ms-flex-direction: row;flex-direction: row;height: 100%;padding-right: 8px;vertical-align: middle;"><div style=" margin-left: 8px;-webkit-box-flex: 0;-webkit-flex: 0 0 auto; -ms-flex: 0 0 auto;flex: 0 0 auto;"><button id="im_crx_cookie_login" style="border: 0;color: #0095f6;color: rgba(var(--d69,0,149,246),1);display: inline;padding: 0;position: relative;" type="button">Войти</button></div></div></div>` +  XPatch(elem1).innerHTML;
                                    document.getElementById("im_crx_cookie_login").onclick = function() {
                                        android.login_cookie_acc(document.getElementById("im_crx_cookie").value);   
                                        setTimeout(function() {location.reload()}, 1000);     
                                    }
                                }
                            }, 500);
                        }
                    }, 500);
                }
            }
        });
    }
});

function inst() {
    if (document.body.textContent.indexOf("Это видео недоступно в вашей стране.") == -1) {
        if (document.body.textContent.indexOf("Подождите несколько минут") == -1) {
            setTimeout(function() {
                elem = '//*[@id="react-root"]/section/main/div[2]/div/div/div[2]/div[4]/button';
                if (XPatch(elem) != null) {
                    android.block("instagram");
                    console.log("BLOCK: "+elem);
                }
                elem = '/html/body/div[1]/div/div/iframe';
                if (XPatch(elem) != null) {
                    android.block("instagram");
                    console.log("BLOCK: "+elem);
                }           
                elem = '//*[@id="react-root"]/section/div/div/p[3]/text';
                if (XPatch(elem) != null) {
                    android.block("instagram");
                    console.log("BLOCK: "+elem);
                }
                elem = '//*[@id="react-root"]/section/main/div[2]/div/div/div[2]/div[5]/button';
                if (XPatch(elem) != null) {
                    android.block("instagram");
                    console.log("BLOCK: "+elem);
                }
                elem = '//*[@id="react-root"]/section/main/div[2]/div/div/div[3]/div/button';
                if (XPatch(elem) != null) {
                    android.block("instagram");
                    console.log("BLOCK: "+elem);
                }
                elem = '//*[@id="react-root"]/section/main/div[2]/div/div/div[2]/div[2]/h3';
                if (XPatch(elem) != null) {
                    android.block("instagram");
                    console.log("BLOCK: "+elem);
                }
                elem = '//*[@id="react-root"]/section/div/div/div[2]/form/span/button';
                if (XPatch(elem) != null) {
                    android.block("instagram");
                    console.log("BLOCK: "+elem);
                }
                elem = '//*[@id="react-root"]/section/div/div/div[1]/h2';
                if (XPatch(elem) != null) {
                    android.block("instagram");
                    console.log("BLOCK: "+elem);
                }
                
                //elem = '//*[@id="react-root"]/section/main/div/div/div/div/a';
                //if (XPatch(elem) != null) {
                //    android.next();
                //}
                if (document.location.pathname.split("/").length >= 5) {
                    if (document.location.href.indexOf("www.instagram.com/https://www.instagram.com") != -1) {
                        android.next();
                    } else {
                        document.location.href = document.location.href.replace(document.location.pathname.split("/")[3]+"/", "");
                    }
                }

            }, 1500);
            elem = '//*[@id="react-root"]/section/div/div/div[3]/form/div[2]/span/button';
            if (XPatch(elem) != null) {
                click(elem);
                android.next();
            } else {
                elem = '//*[@id="react-root"]/section/main/div/div/div/a';
                if (XPatch(elem) == null) {
                    elem = '//*[@id="react-root"]/section/div/div/div[2]/form/span/button';
                    if (XPatch(elem) == null) {
                        elem = '//*[@id="react-root"]/section/nav/div/div/section/div/div[3]/div[4]/button/div';
                        if (XPatch(elem) == null) {
                            elem1 = '//*[@id="loginForm"]/div/div[3]/button/div';
                            elem2 = '//*[@id="react-root"]/section/nav/div[2]/div/div/div[3]/div/div/div/div/div[2]/div[1]/div';
                            elem3 = '/html/body/div/section/div/div/form/input[2]';
                            elem4 = '//*[@id="react-root"]/section/div/div/div[3]/a';
                            if (XPatch(elem1) != null || XPatch(elem2) != null || XPatch(elem3) != null || XPatch(elem4) != null) {
                                android.block_2("instagram");
                                if (XPatch(elem1) != null) {
                                    console.log("BLOCK: "+elem1);
                                }
                                if (XPatch(elem2) != null) {
                                    console.log("BLOCK: "+elem2);
                                }
                                if (XPatch(elem3) != null) {
                                    console.log("BLOCK: "+elem3);
                                }
                                if (XPatch(elem4) != null) {
                                    console.log("BLOCK: "+elem4);
                                }
                            } else {
                                elem1 = '//*[@id="react-root"]/section/main/div/header/section/div[2]/div/div/div/div/span/span[1]/button';
                                elem2 = '//*[@id="react-root"]/section/main/div/header/section/div[2]/div/div/div[1]/div/button';
                                if (XPatch(elem1) != null || XPatch(elem2) != null) {
                                    if (XPatch(elem2) != null) {
                                        elem1 = '//*[@id="react-root"]/section/main/div/header/section/div[1]/div/div/div[2]/a/button';
                                        elem2 = '//*[@id="react-root"]/section/main/div/header/section/div[2]/div/div/div[2]/a/button';
                                        if (XPatch(elem1) != null || XPatch(elem2) != null) {
                                            if (XPatch(elem1) != null) {
                                                if (click_addition) {check_addition = true}
                                                click(elem1);
                                                check();
                                            } else {
                                                if (click_addition) {check_addition = true}
                                                click(elem2);
                                                check();
                                            }
                                        } else {
                                            android.next();
                                        }
                                    } else {
                                        if (click_addition) {check_addition = true}
                                        click(elem1);
                                        check();
                                    }
                                }
                                elem1 = '//*[@id="react-root"]/section/main/div/header/section/div[1]/div[1]/div/div/button';
                                elem2 = '//*[@id="react-root"]/section/main/div/header/section/div[2]/div/div/div/button';
                                elem3 = '//*[@id="react-root"]/section/main/div/header/section/div[1]/div[1]/div/div[2]/div/span/span[1]/button';
                                if (XPatch(elem1) != null) {
                                    if (XPatch(elem3) != null) {
                                        android.next_task();
                                    } else {
                                        if (click_addition) {check_addition = true}
                                        click(elem1);
                                        check();
                                    }
                                }
                                if (XPatch(elem2) != null) {
                                    if (XPatch(elem3) != null) {
                                        android.next_task();
                                    } else {
                                        if (click_addition) {check_addition = true}
                                        click(elem1);
                                        check();
                                    }                        
                                }
                                elem1 = '//*[@id="react-root"]/section/main/div/header/section/div[1]/div/div/div[2]/a/button';
                                elem2 = '//*[@id="react-root"]/section/main/div/header/section/div[2]/div/div/div[2]/a/button';
                                if (XPatch(elem1) != null || XPatch(elem2) != null) {
                                    if (XPatch(elem1) != null) {
                                        if (click_addition) {check_addition = true}
                                        click(elem1);
                                        check();
                                    } else {
                                        if (click_addition) {check_addition = true}
                                        click(elem2);
                                        check();
                                    }
                                } else {
                                    elem3 = '//*[@id="react-root"]/section/main/div/header/section/div[2]/div/div[2]/div/span/span[1]/button';
                                    if (XPatch(elem3) == null) {
                                        elem1 = '//*[@id="react-root"]/section/main/div/header/section/div[2]/div/div/button';
                                        elem3 = '//*[@id="react-root"]/section/main/div/header/section/div[1]/div[1]/div/div[2]/div/span/span[1]/button';
                                        if (XPatch(elem1) != null) {
                                            if (XPatch(elem3) != null) {
                                                android.next_task();
                                            } else {
                                                if (click_addition) {check_addition = true}
                                                click(elem1);
                                                check();
                                            }
                                        } else {
                                            elem1 = '//*[@id="react-root"]/section/main/div/header/section/div[1]/div[1]/div/div/div/span/span[1]/button';
                                            elem2 = '//*[@id="react-root"]/section/main/div/header/section/div[1]/div[1]/div/div[1]/div/button';
                                            elem3 = '//*[@id="react-root"]/section/main/div/header/section/div[1]/div[1]/div/div[2]/div/span/span[1]/button';
                                            el1 = '/html/body/div[5]/div/div/div/div[3]/button[1]';
                                            el2 = '/html/body/div[4]/div/div/div/div[3]/button[1]';
                                            if (XPatch(el1) == null) {
                                                if (XPatch(el2) == null) {
                                                    if (XPatch(elem3) == null) {
                                                        if (XPatch(elem1) != null || XPatch(elem2) != null) {
                                                            if (XPatch(elem2) != null) {
                                                                android.next();
                                                            } else {
                                                                if (click_addition) {check_addition = true}
                                                                click(elem1);
                                                                check();
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            
                                        }
                                    } 
                                    elem1 = '//*[@id="react-root"]/section/main/div/header/section/div[1]/div[2]/div/div/a/button';
                                    elem2 = '//*[@id="react-root"]/section/main/div/header/section/div[2]/div/div/div/a/button';
                                    if (XPatch(elem1) != null) {
                                        if (click_addition) {check_addition = true}
                                        click(elem1);
                                        check();
                                    }
                                    if (XPatch(elem2) != null) {
                                        if (click_addition) {check_addition = true}
                                        click(elem2);
                                        check();
                                    }
                                    elem1 = '//*[@id="react-root"]/section/main/div/header/section/div[1]/div[2]/div/div/div/span/span[1]/button'
                                    elem2 = '//*[@id="react-root"]/section/main/div/header/section/div[1]/div[2]/div/div[1]/button';
                                    if (XPatch(elem1) != null && XPatch(elem2) != null) {
                                        android.next_task();
                                    } else {
                                        if (XPatch(elem1) != null) {
                                            if (click_addition) {check_addition = true}
                                            click(elem1);
                                            check();
                                        }
                                    }
                                    elem1 = '//*[@id="react-root"]/section/main/div/header/section/div[2]/div/div/div/span/span[1]/button';
                                    elem3 = '//*[@id="react-root"]/section/main/div/header/section/div[2]/div/div[2]/div/span/span[1]/button';
                                    if (XPatch(elem1) != null) {
                                        if (XPatch(elem1) != null) {
                                            if (XPatch(elem3) != null) {
                                                android.next_task();
                                            } else {
                                                if (click_addition) {check_addition = true}
                                                click(elem1);
                                                check();
                                            }
                                        }
                                    }
                                    elem = '//*[@id="react-root"]/section/main/div/div/article/div[3]/section[1]/span[1]/button/div/span';
                                    if (XPatch(elem) != null) {
                                        if (XPatch(elem).getElementsByTagName("svg")[0].getAttribute("fill") == "#262626") {
                                            if (click_addition) {check_addition = true}
                                            click(elem);
                                            like_post = true;
                                            check();
                                        } else {
                                            click(elem);
                                            setTimeout(function() {
                                                if (click_addition) {check_addition = true}
                                                click(elem);
                                                like_post = true;
                                                check();
                                            }, 1000);
                                        }
                                    } else {
                                        elem = '//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section[1]/span[1]/button';
                                        if (XPatch(elem) != null) {
                                            if (XPatch(elem).getElementsByTagName("svg")[0].getAttribute("fill") == "#262626") {
                                                if (click_addition) {check_addition = true}
                                                click(elem);
                                                like_post = true;
                                                check();
                                            } else {
                                                click(elem);
                                                setTimeout(function() {
                                                    if (click_addition) {check_addition = true}
                                                    click(elem);
                                                    like_post = true;
                                                    check();
                                                }, 1000);
                                            }
                                        }
                                    }
                                }
                            }
                        } else {  
                            elem1 = '//*[@id="react-root"]/section/main/div/div/div/a';
                            elem2 = '//*[@id="react-root"]/section/main/div/h2';
                            if (XPatch(elem1) != null && XPatch(elem2) != null) {
                                android.next();
                            } else {
                               if (XPatch(elem2) != null) {
                                    if (XPatch(elem2).innerHTML.indexOf("К сожалению, эта стр") != -1) {
                                        android.next();
                                    } else {
                                        android.block("instagram");
                                        console.log("BLOCK: "+elem2);
                                    }
                                }
                            }
                        }
                    } else {
                        if (XPatch('//*[@id="react-root"]/section/div/div/div[2]/form/div/div/label') != null) {
                            android.block("instagram");
                            console.log("BLOCK: "+'//*[@id="react-root"]/section/div/div/div[2]/form/div/div/label');
                        } else {
                            android.next();
                        }
                    }
                } else {
                    elem1 = '//*[@id="react-root"]/section/main/div/div/div/a';
                    elem2 = '//*[@id="react-root"]/section/main/div/h2';
                    if (XPatch(elem1) != null && XPatch(elem2) != null) {
                        android.next();
                    } else {
                        if (XPatch(elem2) != null) {
                            if (XPatch(elem2).innerHTML.indexOf("К сожалению, эта стр") != -1) {
                                android.next();
                            } else {
                                android.block("instagram");
                                console.log("BLOCK: "+elem2);
                            }
                        }
                    }
                }
            }
        } else {
            android.block("instagram");
            console.log("BLOCK: F1");
        }
    } else {
        android.next();
    }
}


comment_base = `Ничего себе
Я в восторге
Благодаря твоей улыбке мой день стал лучше
Влюбился заново
Мое сердце растаяло в очередной раз
Звёзд на небосводе свыше миллиарда, но ты среди них блистаешь особенным свечением
Словно оазис в пустыне, что кажется, такого чуда просто нет, но оно дарует свежесть
Знаешь, нарушать закон нехорошо. Во всех конституциях стран такая краса под запретом
Интересно вас читать
Смотрю с удовольствием
Я по-настоящему залип
Нет слов, одни эмоции
Лучшие из лучших
Не налюбуешься
Подписка ❤️
Все взаимно ❤️❤️
С удовольствием за вами слежу
Это просто вышка
Мне нравится ваш стиль
У вас интересные публикации
У вас хорошо получается
Всегда жду ваших постов
Выкладывайте фото чаще
Делайте больше таких постов
Ух, просто огонь
Break my brain with a demon's smile.
Dip me in brandy, love, and cocaine.
Ready for the new week.🌕🌺🌿
Такая особа способна украшать собой всё, на что посмотришь и к чему прикоснёшься: одежда, место, люди, моё существование
Твой профиль – рай для всего человечества
Принцесса ягодная – сама сладость!
Увидеть утром твое фото – лучшее начало дня
Надеюсь в скором времени увидеть эту красоту вживую
От такой красоты мое сердце пропустило удар
Влюбился в тысячный раз
Спасибо за порцию красоты в моей ленте
#топ
Обе фотографии красивые
#эгергия
Счастье внутри нас, счастье вокруг нас
Очень нежное фото, такая весенняя 🌺
Гениально просто👏
ВЫ ЗАМЕЧАТЕЛЬНЫЕ💙🌹🌹
Ну что за пушкккааа🔥🔥🔥
Как вы в точку с цитатой🔥отличные слова.
Полностью согласна с вами в этом🔥
Прекрасное фото выглядите очень потрясающе
Очень красивые фотографии!
Стильная фотосессия 🙌 Фотографу браво!
Шикарные фотографии получились 😍
Какие хорошие фотографии)) тоже захотелось так сфоткаться
Восхитительные фотографии получились
Я теперь тоже хочу такую фотосессию👏🔥
Ты выглядишь очень красиво👍
Фотографу браво!
#мотивация
Даааа 🔥🔥🔥🔥🔥 обожаю тебя
Как классно, что есть возможность ходить опять в театры 😍
Прекрасно выглядите, отличных выходных 🙌
Шикарно выглядите смотреть на вас одно удовольствие
Wowwww super 👌👌🌹🌹❤️
Великолепный образ! Эта фотография достойна быть на обложках глянцевых журналов 👌👌👌❤️❤️
Вы прекрасны!
#взрослаяжизнь
Вам очень идёт этот цвет волос, прям красиво очень.
Здорово`;

smile_base = `😅💋
🤪👑😘
🤩🐶
🤗🐥
😻🌸
💫✅🥰
☄️
☀️
♥️
🍒😃
🥊😂💎
🎈🎈🎈
❤️🥰
💝😋🧨
💯🥳
🤤👀😛
👍🍉🤣
👌🥇💣
☝🏼
🧡🙏🏼
🙏🏼🖤
🙈🙉
🦋💟🥳
🌼😄
⭐️
😘♨️
🌕🌺🌿
😛💣💚
🤭🔆
😺😽
😻🤙
🏽🎀
🌹🌻🥀
🌟💗
☺️❤️❤️
🔥🔥🔥
🔥☺️
💖😗
❣️❤️❤️
💋👌
🥂✌🏼
🍓🙌🏽
🌪🤫🤓
✨😝
🥀🐚🎊
🙊👊🏽
👀😸😹
🤠🤓
😁🙎🏼
️🌈
😙🌺
😜🍃
😎😎😎
😈😹
🌈👏
✊🏽
🐰😋
🤟🏽💨
🏅✔️
🎉🌟
🔐
💙🌼
🔝💫💥
🙏🏼🖤
🤗🤭😋
🤣💜
🔥🔥🔥
🌪🔥
🏆🥇
🧨♨️
❤️❤️❤️
🎀💐
💖🔆
✅
🔝👌`;

function im_comments() {
    comment_base = comment_base.split("\n");
    rand = Math.floor(Math.random() * comment_base.length);
    smile = "";
    smile_true = (Math.floor(Math.random() * 2) === 0) ? true : false;
    if (smile_true == true) {
        smile_base = smile_base.split("\n");
        rand = Math.floor(Math.random() * smile_base.length);
        smile = " "+smile_base[rand];
    }
    comment_base = comment_base[rand];
    if (comment_base !== undefined) {
        commentary = comment_base+smile;
        elem1 = '//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section[1]/span[2]/button';
        elem2 = '//*[@id="react-root"]/section/main/div/div/article/div[3]/section[1]/span[2]/button';
        if (XPatch(elem1) != null) {
            XPatch(elem1).click();
        }
        if (XPatch(elem2) != null) {
            XPatch(elem2).click();
        }
        elem = '//*[@id="react-root"]/section/main/section/div/form/textarea';
        if (XPatch(elem) != null) {
            XPatch(elem).focus();
            if (document.execCommand("insertText", false, commentary) != false) {
                elem = '//*[@id="react-root"]/section/main/section/div/form/button';
                if (XPatch(elem) != null) {
                    XPatch(elem).click();
                }
            } 
        } else {
            elem = '//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section[3]/div/form/textarea';
            if (XPatch(elem) != null) {
                XPatch(elem).focus();
                if (document.execCommand("insertText", false, commentary) != false) {
                    elem1 = '//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section[3]/div/form/button';
                    elem2 = '//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section[3]/div/form/button[2]';
                    if (XPatch(elem1) != null || XPatch(elem2) != null) {
                        if (XPatch(elem1) != null) {
                            XPatch(elem1).click();
                        }
                        if (XPatch(elem2) != null) {
                            XPatch(elem2).click();
                        }
                    }
                }
            }
        }
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
    if (XPatch_elem != null) {clearInterval(inst_find); inst_find = null; console.log("SCRIPT-FIND: "+xpatch_val)}
    return XPatch_elem;
}

function click(elem_val) {
    console.log("SCRIPT-CLICK: "+elem_val);
    if (click_addition == false) {
        XPatch(elem_val).click();
    } else {
       visible(elem_val)
    }
}

function visible(target_val) {
    target = XPatch(target_val);
    var targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    },
    windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
    };

    if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
        targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
        targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
        targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа

        elem_addition = target;
        var coord = elem_addition.getBoundingClientRect();
        
        left = parseInt((window.outerWidth - window.innerWidth) + coord.left + window.screenLeft + elem_addition.clientWidth / 2);
        top_val = parseInt((window.outerHeight - window.innerHeight) + coord.top + window.screenTop + elem_addition.clientHeight / 2);
        sync_data("<addition>;"+"http://localhost:35536/click?left="+left+"&top="+top_val+"&rand="+Math.random());

    } else {
        XPatch(target_val).scrollIntoView({block: 'center', inline: 'center'});
        click(target_val)
    };
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.data !== undefined) {
        data = changes.data.newValue.split(";");
        if (check_addition == true) {
            if (data[0] == "<check_addition>") {
                check_addition = false;
                check();
            }
        }

        if (data[0] == "<im_mega_add>") {
            if (st == false) {
                st = true;
                android.add_acc();
                alert("Аккаунт добавлен!");
            }
        }

        if (data[0] == "<im_mega_clear>") {
            android.clear_acc();
            setTimeout(function() {document.location.href = "https://www.instagram.com/";}, 500);
        }

    }
});


function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

function count_p(array_elements) {
    re_a = false;
    array_elements.sort();

    var current = null;
    var cnt = 0;
    for (var i = 0; i < array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 1) {
                re_a = true;
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 1) {
        re_a = true;
    }
    return re_a;
}

function check() {
    if (check_addition == false) {
        chrome.storage.local.get("im_status_account", function (result) {
            if (result.im_status_account == false) {
                console.log("Don't check");
                log = document.body.textContent.split(',"username":"');
                if (log.length > 0) {
                    log = log[1].split('","badge_count":"');
                    if (log.length > 0) {
                        log = log[0];
                        $.getJSON('https://www.instagram.com/'+log+'/?__a=1', function(data) {
                            im_pub = data.graphql.user.edge_owner_to_timeline_media.count * 1;
                            im_fol = data.graphql.user.edge_followed_by.count * 1;
                            im_ava = data.graphql.user.profile_pic_url.indexOf("345707102882519_2446069589734326272_n.jpg");
                            console.log(log, im_pub, im_fol, im_ava);
                            if (im_pub >= 6 && im_fol >= 10 && im_ava == -1) {
                                res = [];
                                i2 = 0;
                                chrome.storage.local.set({"im_status_account": true});
                                for (var i = 0; i < 6; i++) {
                                    toDataURL(data.graphql.user.edge_owner_to_timeline_media.edges[i].node.thumbnail_resources[1].src, function(dataUrl) {
                                        res.push(dataUrl);
                                        if (i2 == 5) {
                                            if (count_p(res)) {
                                                sync_data("<add_pub_pid>");
                                            } 
                                        }
                                        i2++;
                                    });
                                }
                            } else {
                                sync_data("<add_pub_fol_ava>");
                            }
                        });
                    } else {
                        chrome.storage.local.set({"im_status_account": true});
                    }
                } else {
                    chrome.storage.local.set({"im_status_account": true});
                }
            }
        });
        console.log("CHECK");
        time_sleep = 0;
        if (click_addition == true) {
            if (like_post == true) {
                time_sleep = 400;
            } else {
                time_sleep = 500;
            }
        } 
        setTimeout(function() {
            elem1 = '//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section[1]/span[2]/button';
            elem2 = '//*[@id="react-root"]/section/main/div/div/article/div[3]/section[1]/span[2]/button';
            if (comment_delay != 0 && like_post == true && XPatch(elem1) != null && XPatch(elem2) != null && click_addition == false) {
                setTimeout(function() {
                    im_comments();
                }, 500);
            }
            elem2 = '//*[@id="react-root"]/section/main/div/div/article/div[2]/div/div[1]/div[2]/div/button';
            if (XPatch(elem2) != null) {
                click(elem2);
                setTimeout(function() {
                    if (XPatch(elem2) != null) {
                        click(elem2);
                    }
                }, 700);
            }
            android.check_task();
            setTimeout(function() {
                elem1 = "/html/body/div[4]/div/div/div/div[2]/button[2]";
                elem2 = "/html/body/div[6]/div/div/div/div[2]/button[2]";
                if (XPatch(elem1) != null || XPatch(elem2) != null) {
                    android.block_2("instagram");
                    if (XPatch(elem1) != null) {
                        console.log("BLOCK: "+elem1);
                    } 
                    if (XPatch(elem2) != null) { 
                        console.log("BLOCK: "+elem2);
                    }
                } else {
                    elem1 = "/html/body/div[5]/div[2]/div/div[2]/div/div/div[1]/h1";
                    elem2 = "/html/body/div[5]/div/div[2]/div/div/div/div[3]/a";
                    elem3 = '//*[@id="loginForm"]/div[1]/div[1]/div/label/input';
                    if (XPatch(elem1) != null || XPatch(elem2) != null || XPatch(elem3) != null) {
                        android.block_2("instagram");
                        if (XPatch(elem1) != null) {
                            console.log("BLOCK: "+elem1);
                        } 
                        if (XPatch(elem2) != null) { 
                            console.log("BLOCK: "+elem2);
                        }
                        if (XPatch(elem3) != null) { 
                            console.log("BLOCK: "+elem3);
                        }
                    } else {
                        elem1 = "/html/body/div[5]/div/div/div/div[1]/h3";
                        if (XPatch(elem1) != null) {
                            android.block_2("instagram");
                            console.log("BLOCK: "+elem1);
                        }
                    }
                }
            }, 1000)     
        }, time_sleep);
    }
}

console.output = [];
console.log = (function(log) {
  return function() {
    log.apply(console, arguments);
    console.output.push(JSON.stringify(arguments));
    sync_data("<CONSOLE>;"+JSON.stringify(arguments));
  }
}(console.log));