var manifestData = chrome.runtime.getManifest();
version_script = 1;
$("#manifest_version").html(`<a href="https://t.me/instaminer_official" target="_blank">Новости</a> | <a href="https://t.me/Instagram777_android_bot" target="_blank">Боты</a> | <a href="https://telegra.ph/InstaMiner-MEGA-05-02" target="_blank">Версия: `+manifestData.version+`.`+version_script+`</a>`);

emoji = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '🥲', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😳', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '🥴', '💩', '👻', '💀', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '👍', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🐴', '🦄', '🐝', '🪱', '🐛', '🦋', '🌿', '☘️', '🍀', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌙', '🌎', '🌍', '🌏', '🪐', '💫', '⭐️', '🌟', '✨', '⚡️', '☄️', '💥', '🔥', '🌪', '🌈', '☀️', '🌤', '⛅️', '🌥', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑'];
/// Категория
filter_type = null;
filter_service = null;
getlist_refresh = false;

/// Выполненные / невыполненные задания
task_val = 1;
task_val_true = 0;
task_val_false = 0;
task_val_fail = 0;
task_val_follow_fail = 0;
task_ava_error = 0;
trash_list = [];

/// Кол-во подписок / лайков
filter_type_follow = 0;
filter_type_like = 0;

/// Баланс
start_balance = 0;
bot_balance_count = 1;

/// Аккаунты
temp_account_num = 0;
temp_account = "";
temp_account_block = false;

/// Таймер / Секундомер
reload_timer = null;
stopwatch_interval_fun = null;
reload_timer_2 = null;
timer_data_status = true;
sec_timer = 0;
timeMinut = 0;
timer_data = 0;
S = '00', M = '00', H = '00';

/// Управление ботом
telegram_sync_interval = false;
im_all_balance = 0.00;
last_message = null;
login_error = 0;
ref_status = false;
get_list_timer = null;

////////////////////////////////////
///                              ///
///                              ///
///          ПЕРЕМЕННЫЕ          ///
///                              ///
///                              ///
////////////////////////////////////

/// Получить переменные 
$(document).ready(function(){
  im_status = false;
  chrome.storage.local.set({"im_status": false});
  chrome.storage.local.get("im_welcome", function (result) { 
    if (result.im_welcome === undefined || result.im_welcome == "") { 
      im_welcome = false; 
      chrome.storage.local.set({'im_welcome': im_welcome}); 
    } else {
      im_welcome = result.im_welcome;
    }
    load(im_welcome);
  });

  chrome.storage.local.get("im_telegram_id", function (result) { 
    if (result.im_telegram_id === undefined || result.im_telegram_id == "") { 
      im_telegram_id = false; 
      chrome.storage.local.set({'im_telegram_id': im_telegram_id}); 
    } else {
      im_telegram_id = result.im_telegram_id;
    }
  });

  ////////////////////////////////////
  ///                              ///
  ///                              ///
  ///     НАСТРОЙКИ КАТЕГОРИЙ      ///
  ///                              ///
  ///                              ///
  ////////////////////////////////////

  chrome.storage.local.get("im_category", function (result) { 
    if (result.im_category === undefined || result.im_category == "") { 
      im_category = {
        category_1: false, 
        category_2: true, 
        category_3: false
      }; 
      $("#bot_category").html("Лайки");
      chrome.storage.local.set({'im_category': im_category}); 
    } else {
      im_category = result.im_category;
    }

    if (im_category.category_1 == true) {
      $("#category_1").attr('checked', 'checked');
      $("#bot_category").html("Подписки");
    }
    if (im_category.category_2 == true) {
      $("#category_2").attr('checked', 'checked');
      $("#bot_category").html("Лайки");
    }
    if (im_category.category_3 == true) {
      $("#category_3").attr('checked', 'checked');
      $("#bot_category").html("Twitter");
    }
  });

  chrome.storage.local.get("im_addition", function (result) { 
    if (result.im_addition === undefined || result.im_addition == "") { 
      chrome.storage.local.set({'im_addition': false}); 
    } else {
      if (result.im_addition) {
        $("#im_addition").attr('checked', 'checked');
      }
    }
  });

  ////////////////////////////////////
  ///                              ///
  ///                              ///
  ///     НАСТРОЙКИ ПЕРЕМЕННЫХ     ///
  ///                              ///
  ///                              ///
  ////////////////////////////////////

  chrome.storage.local.get("im_values_1", function (result) { 
    if (result.im_values_1 === undefined || result.im_values_1 == "") { 
      im_values_1 = {
        delay_task_1: 5, 
        delay_task_2: 1, 
        delay_comments: 0, 
        delay_change_category_1: 0, 
        delay_change_category_2: 0, 
        telegram_message: false, 
        captcha: false,
        telegram_sleep: false,
        telegram_browser: "Браузер 1", 
        telegram_balance: 10,
        telegram_token: "",
        telegram_sync: false,
        telegram_sync_2: 5,
        sleep_status: false,
        sleep_time_1: 15,
        sleep_time_2: 10
      }; 
      chrome.storage.local.set({'im_values_1': im_values_1}); 
    } else {
      im_values_1 = result.im_values_1;
    }

    $("#delay_task_1").val(im_values_1.delay_task_1);
    $("#delay_task_2").val(im_values_1.delay_task_2);
    $("#delay_comments").val(im_values_1.delay_comments);
    $("#delay_change_category_1").val(im_values_1.delay_change_category_1);
    $("#delay_change_category_2").val(im_values_1.delay_change_category_2);
    if (im_values_1.telegram_message == true) {
      $("#telegram_message").attr('checked', 'checked');
    }
    if (im_values_1.captcha == true) {
      $("#telegram_captcha").attr('checked', 'checked');
    }
    if (im_values_1.telegram_sleep == true) {
      $("#telegram_sleep").attr('checked', 'checked');
    }
    $("title").html("InstaMiner MEGA ("+im_values_1.telegram_browser+")");
    $("#telegram_browser").val(im_values_1.telegram_browser);
    $("#telegram_balance").val(im_values_1.telegram_balance);
    $("#telegram_token").val(im_values_1.telegram_token);
    if (im_values_1.telegram_sync == true) {
      $("#telegram_sync").attr('checked', 'checked');
      telegram_sync(true);
    }
    $("#telegram_sync_2").val(im_values_1.telegram_sync_2);
    if (im_values_1.sleep_status == true) {
      $("#sleep_status").attr('checked', 'checked');
    }
    $("#sleep_time_1").val(im_values_1.sleep_time_1);
    $("#sleep_time_2").val(im_values_1.sleep_time_2);

  });

  ////////////////////////////////////
  ///                              ///
  ///                              ///
  ///     НАСТРОЙКИ АВТОСМЕНЫ      ///
  ///                              ///
  ///                              ///
  ////////////////////////////////////

  chrome.storage.local.get("im_accounts", function (result) { 
    if (result.im_accounts === undefined || result.im_accounts == "") { 
      im_accounts = {
        status: false, 
        use: false,
        change: 15,
        sleep: 30,
        accounts: []
      }; 
      chrome.storage.local.set({'im_accounts': im_accounts}); 
    } else {
      im_accounts = result.im_accounts;
    }

    if (im_accounts.status == true) {
      $("#change_account_status").attr('checked', 'checked');
      $("#text_change_acc").attr("style", "display: none; margin-bottom: 1px;  margin-top: 10px;");
    }
    if (im_accounts.use == true) {
      $("#change_account_use").attr('checked', 'checked');
    }
    $("#change_account_task").val(im_accounts.change);
    $("#change_account_sleep").val(im_accounts.sleep);
    add_list_accounts(im_accounts.accounts);
  });

  ////////////////////////////////////
  ///                              ///
  ///                              ///
  ///       НАСТРОЙКИ ПРОКСИ       ///
  ///                              ///
  ///                              ///
  ////////////////////////////////////

  chrome.storage.local.get("im_proxy", function (result) { 
    if (result.im_proxy === undefined || result.im_proxy == "") { 
      im_proxy = {
        status: false,
        proxy_server_1: true,
        proxy_server_2: false,
        proxy_server_3: false,
        proxy_server_4: false,
        ip: "",
        proxy_server_site_1: true,
        proxy_server_site_2: true,
        proxy_server_site_3: true,
        proxy_server_site_4: true,
        proxy_server_site_5: false
      }; 
      chrome.storage.local.set({'im_proxy': im_proxy}); 
    } else {
      im_proxy = result.im_proxy;
    }

    if (im_proxy.status == true) {
      $("#proxy_server_status").attr('checked', 'checked');
      sync_data("<proxy_server>;"+Math.random());
    } 
    if (im_proxy.proxy_server_1 == true) {
      $("#proxy_server_1").attr('checked', 'checked');
    } 
    if (im_proxy.proxy_server_2 == true) {
      $("#proxy_server_2").attr('checked', 'checked');
    } 
    if (im_proxy.proxy_server_3 == true) {
      $("#proxy_server_3").attr('checked', 'checked');
    } 
    if (im_proxy.proxy_server_4 == true) {
      $("#proxy_server_4").attr('checked', 'checked');
    } 
    $("#proxy_server_ip").val(im_proxy.ip);
    if (im_proxy.proxy_server_site_1 == true) {
      $("#proxy_server_site_1").attr('checked', 'checked');
    } 
    if (im_proxy.proxy_server_site_2 == true) {
      $("#proxy_server_site_2").attr('checked', 'checked');
    } 
    if (im_proxy.proxy_server_site_3 == true) {
      $("#proxy_server_site_3").attr('checked', 'checked');
    } 
    if (im_proxy.proxy_server_site_4 == true) {
      $("#proxy_server_site_4").attr('checked', 'checked');
    } 
    if (im_proxy.proxy_server_site_5 == true) {
      $("#proxy_server_site_5").attr('checked', 'checked');
    } 
  });

  ////////////////////////////////////
  ///                              ///
  ///                              ///
  ///      СОХРАНИТЬ НАСТРОЙКИ     ///
  ///           КАТЕГОРИЙ          ///
  ///                              ///
  ///                              ///
  ////////////////////////////////////

  $("#category_1").change(function(){
    if ($("#category_1").prop("checked") == true) {
      im_category.category_1 = true;
      im_category.category_2 = false; 
      im_category.category_3 = false; 
      $("#bot_category").html("Подписки");
    } else {
      im_category.category_1 = false;
    }
    filter_type = null;
    chrome.storage.local.set({'im_category': im_category}); 
  });

  $("#category_2").change(function(){
    if ($("#category_2").prop("checked") == true) {
      im_category.category_1 = false;
      im_category.category_2 = true; 
      im_category.category_3 = false; 
      $("#bot_category").html("Лайки");
    } else {
      im_category.category_2 = false; 
    }
    filter_type = null;
    chrome.storage.local.set({'im_category': im_category}); 
  });

  $("#category_3").change(function(){
    if ($("#category_3").prop("checked") == true) {
      im_category.category_1 = false;
      im_category.category_2 = false; 
      im_category.category_3 = true; 
      $("#bot_category").html("Twitter");
    } else {
      im_category.category_3 = false; 
    }
    filter_type = null;
    chrome.storage.local.set({'im_category': im_category}); 
  });

  $("#im_addition").change(function(){
    if ($("#im_addition").prop("checked") == true) {
      im_addition = true;
      testaddition = false;
      visible("testaddition_2");
    } else {
      im_addition = false; 
    }
    chrome.storage.local.set({'im_addition': im_addition});
  });

  ////////////////////////////////////
  ///                              ///
  ///                              ///
  ///      СОХРАНИТЬ НАСТРОЙКИ     ///
  ///           ЗАДЕРЖЕК           ///
  ///                              ///
  ///                              ///
  ////////////////////////////////////

  $("#delay_task_1").change(function(){
    if ($("#delay_task_1").val() != "" && $("#delay_task_1").val() >= 1) {
      im_values_1.delay_task_1 = $("#delay_task_1").val(); 
    } else {
      $("#delay_task_1").val(1);
      im_values_1.delay_task_1 = 1; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  $("#delay_task_2").change(function(){
    if ($("#delay_task_2").val() != "" && $("#delay_task_2").val() >= 1) {
      im_values_1.delay_task_2 = $("#delay_task_2").val();
    } else {
      $("#delay_task_2").val(1);
      im_values_1.delay_task_2 = 1; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  $("#delay_comments").change(function(){
    if ($("#delay_comments").val() != "" && $("#delay_comments").val() >= 0) {
      im_values_1.delay_comments = $("#delay_comments").val();
    } else {
      $("#delay_comments").val(0);
      im_values_1.delay_comments = 0; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  $("#delay_change_category_1").change(function(){
    if ($("#delay_change_category_1").val() != "" && $("#delay_change_category_1").val() >= 0) {
      im_values_1.delay_change_category_1 = $("#delay_change_category_1").val();
    } else {
      $("#delay_change_category_1").val(0);
      im_values_1.delay_change_category_1 = 0; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  $("#delay_change_category_2").change(function(){
    if ($("#delay_change_category_2").val() != "" && $("#delay_change_category_2").val() >= 0) {
      im_values_1.delay_change_category_2 = $("#delay_change_category_2").val();
    } else {
      $("#delay_change_category_2").val(0);
      im_values_1.delay_change_category_2 = 0; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  ////////////////////////////////////
  ///                              ///
  ///                              ///
  ///      СОХРАНИТЬ НАСТРОЙКИ     ///
  ///          УВЕДОМЛЕНИЙ         ///
  ///                              ///
  ///                              ///
  ////////////////////////////////////

  $("#telegram_captcha").change(function(){
    if ($("#telegram_captcha").prop("checked") == true) {
      im_values_1.captcha = true;
    } else {
      im_values_1.captcha = false; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  $("#telegram_sleep").change(function(){
    if ($("#telegram_sleep").prop("checked") == true) {
      im_values_1.telegram_sleep = true;
    } else {
      im_values_1.telegram_sleep = false; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  $("#telegram_message").change(function(){
    if ($("#telegram_message").prop("checked") == true) {
      if ($("#telegram_token").val() != "") {
        if ($("#telegram_token").val().indexOf(":") != -1) {
          im_values_1.telegram_message = true;
          message(2, "");
        } else {
          $("#telegram_message").prop('checked', false);
          im_values_1.telegram_message = false; 
          alert("Вы неправильно ввели токен! Подробная информация в инструкции");
        }
      } else {
        $("#telegram_message").prop('checked', false);
        im_values_1.telegram_message = false; 
        alert("Введите токен телеграм бота! Подробная информация в инструкции");
      }
    } else {
      im_values_1.telegram_message = false; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  $("#telegram_browser").change(function(){
    if ($("#telegram_browser").val() != "") {
      im_values_1.telegram_browser = $("#telegram_browser").val();
    } else {
      $("#telegram_browser").val("Браузер 1");
      im_values_1.telegram_browser = "Браузер 1"; 
    }
    $("title").html("InstaMiner MEGA ("+im_values_1.telegram_browser+")");
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  $("#telegram_balance").change(function(){
    if ($("#telegram_balance").val() != "" && $("#telegram_balance").val() >= 5) {
      im_values_1.telegram_balance = $("#telegram_balance").val() * 1;
    } else {
      $("#telegram_balance").val(5);
      im_values_1.telegram_balance = 5; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  $("#telegram_token").change(function(){
    if ($("#telegram_token").val() != "") {
      im_values_1.telegram_token = $("#telegram_token").val();
      chrome.storage.local.set({'im_values_1': im_values_1});
    }
  });

  $("#telegram_sync").change(function(){
    if ($("#telegram_sync").prop("checked") == true) {
      if ($("#telegram_token").val() != "") {
        if ($("#telegram_token").val().indexOf(":") != -1) {
          $.getJSON("https://api.telegram.org/bot"+$("#telegram_token").val()+"/getUpdates", function(data) {
            if (data.result.length == 0) {
              $("#telegram_sync").prop('checked', false);
              im_values_1.telegram_sync = false; 
              alert("Отправьте своему боту любое сообщение и включите функцию заново!");
              chrome.storage.local.set({'im_values_1': im_values_1});
            } else {
              im_values_1.telegram_sync = true;
              text_turn_up = 'Вы включили управление через Telegram!%0A'+
              'Вам доступны команды:%0A'+
              '/get_bots - Получить имена всех активных ботов%0A'+
              '/start Имя бота - Запустить бота%0A'+
              '/stop Имя бота - Остановить бота%0A'+
              '/info Имя бота - Получить информацию о работе бота%0A'+
              '/acc_info Имя бота - Информация об аккаунтах%0A' +
              '/stop_timer Имя бота - Пропустить таймер' +
              '%0A%0AКоманда без Имени браузера сработает на все ваши боты%0A'+
              'Скорость ответа на ваши команды может достигать до '+im_values_1.telegram_sync_2+' сек.';
              $.getJSON("https://api.telegram.org/bot"+$("#telegram_token").val()+"/sendMessage?chat_id="+im_telegram_id+"&text="+text_turn_up, function(data) {});
              telegram_sync(true);
              chrome.storage.local.set({'im_values_1': im_values_1});
            }
          });
        } else {
          $("#telegram_sync").prop('checked', false);
          im_values_1.telegram_sync = false; 
          alert("Вы неправильно ввели токен! Подробная информация в инструкции");
        }
      } else {
        $("#telegram_sync").prop('checked', false);
        im_values_1.telegram_sync = false; 
        alert("Введите токен телеграм бота! Подробная информация в инструкции");
      }
    } else {
      telegram_sync(false);
      im_values_1.telegram_sync = false; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  $("#telegram_sync_2").change(function(){
    if ($("#telegram_sync_2").val() != "" && $("#telegram_sync_2").val() >= 5) {
      im_values_1.telegram_sync_2 = $("#telegram_sync_2").val() * 1;
    } else {
      $("#telegram_sync_2").val(5);
      im_values_1.telegram_sync_2 = 5; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  ////////////////////////////////////
  ///                              ///
  ///                              ///
  ///   СОХРАНИТЬ НАСТРОЙКИ СНА    ///
  ///                              ///
  ///                              ///
  ////////////////////////////////////

  $("#sleep_status").change(function(){
    if ($("#sleep_status").prop("checked") == true) {
      im_values_1.sleep_status = true;
    } else {
      im_values_1.sleep_status = false; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  $("#sleep_time_1").change(function(){
    if ($("#sleep_time_1").val() != "" && $("#sleep_time_1").val() >= 5) {
      im_values_1.sleep_time_1 = $("#sleep_time_1").val();
    } else {
      $("#sleep_time_1").val(5);
      im_values_1.sleep_time_1 = 5; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

 $("#sleep_time_2").change(function(){
    if ($("#sleep_time_2").val() != "" && $("#sleep_time_2").val() >= 5) {
      im_values_1.sleep_time_2 = $("#sleep_time_2").val();
    } else {
      $("#sleep_time_2").val(5);
      im_values_1.sleep_time_2 = 5; 
    }
    chrome.storage.local.set({'im_values_1': im_values_1});
  });

  ////////////////////////////////////
  ///                              ///
  ///                              ///
  ///     СОХРАНИТЬ НАСТРОЙКИ      ///
  ///          АВТОСМЕНЫ           ///
  ///                              ///
  ///                              ///
  ////////////////////////////////////

  $("#change_account_status").change(function(){
    if ($("#change_account_status").prop("checked") == true) {
      im_accounts.status = true;
      $("#text_change_acc").attr("style", "display: none; margin-bottom: 1px;  margin-top: 10px;");
    } else {
      im_accounts.status = false; 
      $("#text_change_acc").attr("style", "display: block; margin-bottom: 1px;  margin-top: 10px;");
    }
    chrome.storage.local.set({'im_accounts': im_accounts});
  });

  $("#change_account_use").change(function(){
    if ($("#change_account_use").prop("checked") == true) {
      im_accounts.use = true;
    } else {
      im_accounts.use = false; 
    }
    chrome.storage.local.set({'im_accounts': im_accounts});
  });

  $("#change_account_task").change(function(){
    if ($("#change_account_task").val() != "" && $("#change_account_task").val() >= 5) {
      im_accounts.change = $("#change_account_task").val();
    } else {
      $("#change_account_task").val(5);
      im_accounts.change = 5; 
    }
    chrome.storage.local.set({'im_accounts': im_accounts});
  });

  $("#change_account_sleep").change(function(){
    if ($("#change_account_sleep").val() != "" && $("#change_account_sleep").val() >= 10) {
      im_accounts.sleep = $("#change_account_sleep").val();
    } else {
      $("#change_account_sleep").val(10);
      im_accounts.sleep = 10; 
    }
    chrome.storage.local.set({'im_accounts': im_accounts});
  });

  ////////////////////////////////////
  ///                              ///
  ///                              ///
  ///  СОХРАНИТЬ НАСТРОЙКИ ПРОКСИ  ///
  ///                              ///
  ///                              ///
  ////////////////////////////////////

  $("#proxy_server_status").change(function(){
    if ($("#proxy_server_ip").val() != "") {
      if ($("#proxy_server_ip").val().split(":").length == 2 && $("#proxy_server_ip").val().split(".").length == 4) {
        if ($("#proxy_server_status").prop("checked") == true) {
          sync_data("<proxy_server>;"+Math.random());
          im_proxy.status = true;
        } else {
          sync_data("<proxy_server>;"+Math.random());
          im_proxy.status = false; 
        }
        chrome.storage.local.set({'im_proxy': im_proxy});
      } else {
        alert("Вы неправильно ввели прокси. Пример: IP-адрес:порт");
        $("#proxy_server_status").prop('checked', false);
      }
    } else {
      alert("Введите данные своего прокси-сервера");
      $("#proxy_server_status").prop('checked', false);
    }
  });

  $("#proxy_server_ip").change(function(){
    im_proxy.ip = $("#proxy_server_ip").val();
    chrome.storage.local.set({'im_proxy': im_proxy});

    if (im_proxy.status == true) {
      sync_data("<proxy_server>;"+Math.random());
    }
  });

  $("#proxy_server_1").change(function(){
    if ($("#proxy_server_1").prop("checked") == true) {
      im_proxy.proxy_server_1 = true;
      im_proxy.proxy_server_2 = false;
      im_proxy.proxy_server_3 = false;
      im_proxy.proxy_server_4 = false;
    } else {
      im_proxy.proxy_server_1 = false; 
    }
    chrome.storage.local.set({'im_proxy': im_proxy});

    if (im_proxy.status == true) {
      sync_data("<proxy_server>;"+Math.random());
    }
  });

  $("#proxy_server_2").change(function(){
    if ($("#proxy_server_2").prop("checked") == true) {
      im_proxy.proxy_server_2 = true;
      im_proxy.proxy_server_1 = false;
      im_proxy.proxy_server_3 = false;
      im_proxy.proxy_server_4 = false;
    } else {
      im_proxy.proxy_server_2 = false; 
    }
    chrome.storage.local.set({'im_proxy': im_proxy});

    if (im_proxy.status == true) {
      sync_data("<proxy_server>;"+Math.random());
    }
  });

  $("#proxy_server_3").change(function(){
    if ($("#proxy_server_3").prop("checked") == true) {
      im_proxy.proxy_server_3 = true;
      im_proxy.proxy_server_2 = false;
      im_proxy.proxy_server_1 = false;
      im_proxy.proxy_server_4 = false;
    } else {
      im_proxy.proxy_server_3 = false; 
    }
    chrome.storage.local.set({'im_proxy': im_proxy});

    if (im_proxy.status == true) {
      sync_data("<proxy_server>;"+Math.random());
    }
  });

  $("#proxy_server_4").change(function(){
    if ($("#proxy_server_4").prop("checked") == true) {
      im_proxy.proxy_server_4 = true;
      im_proxy.proxy_server_2 = false;
      im_proxy.proxy_server_3 = false;
      im_proxy.proxy_server_1 = false;
    } else {
      im_proxy.proxy_server_4 = false; 
    }
    chrome.storage.local.set({'im_proxy': im_proxy});

    if (im_proxy.status == true) {
      sync_data("<proxy_server>;"+Math.random());
    }
  });

  $("#proxy_server_site_1").change(function(){
    if ($("#proxy_server_site_1").prop("checked") == true) {
      im_proxy.proxy_server_site_1 = true;
    } else {
      im_proxy.proxy_server_site_1 = false; 
    }
    chrome.storage.local.set({'im_proxy': im_proxy});

    if (im_proxy.status == true) {
      sync_data("<proxy_server>;"+Math.random());
    }
  });

  $("#proxy_server_site_2").change(function(){
    if ($("#proxy_server_site_2").prop("checked") == true) {
      im_proxy.proxy_server_site_2 = true;
    } else {
      im_proxy.proxy_server_site_2 = false; 
    }
    chrome.storage.local.set({'im_proxy': im_proxy});

    if (im_proxy.status == true) {
      sync_data("<proxy_server>;"+Math.random());
    }
  });

  $("#proxy_server_site_3").change(function(){
    if ($("#proxy_server_site_3").prop("checked") == true) {
      im_proxy.proxy_server_site_3 = true;
    } else {
      im_proxy.proxy_server_site_3 = false; 
    }
    chrome.storage.local.set({'im_proxy': im_proxy});

    if (im_proxy.status == true) {
      sync_data("<proxy_server>;"+Math.random());
    }
  });

  $("#proxy_server_site_4").change(function(){
    if ($("#proxy_server_site_4").prop("checked") == true) {
      im_proxy.proxy_server_site_4 = true;
    } else {
      im_proxy.proxy_server_site_4 = false; 
    }
    chrome.storage.local.set({'im_proxy': im_proxy});

    if (im_proxy.status == true) {
      sync_data("<proxy_server>;"+Math.random());
    }
  });

  $("#proxy_server_site_5").change(function(){
    if ($("#proxy_server_site_5").prop("checked") == true) {
      im_proxy.proxy_server_site_5 = true;
    } else {
      im_proxy.proxy_server_site_5 = false; 
    }
    chrome.storage.local.set({'im_proxy': im_proxy});

    if (im_proxy.status == true) {
      sync_data("<proxy_server>;"+Math.random());
    }
  });
});

////////////////////////////////////
///                              ///
///                              ///
///          ВХОД В БОТА         ///
///                              ///
///                              ///
////////////////////////////////////

/// Вход по Telegram ID
$("#telegram_id_check").on('click', function() {
  if ($("#telegram_id").val() != "") {
    $.getJSON('https://instaminer.goh.su/InstaMinerMega/sync.php?status=1&telegram_id='+$("#telegram_id").val(), function(data) {
      switch (data.status) {
        case false:
          bot_alert(`Вы допутили где-то ошибку, <a href="https://telegra.ph/Uvedomleniya-v-Telegram-03-25" target="_blank">прочитайте инструкцию</a>`);
          break;
        case null:
          bot_alert(`Вам заблокирован доступ! Вы не сможете использовать эту программу`);
          break;
        default:
          chrome.storage.local.set({'im_welcome': true}); 
          im_telegram_id = data.id * 1;
          chrome.storage.local.set({'im_telegram_id': im_telegram_id}); 
          im_welcome = true;
          load(im_welcome);
      }
    }).fail(function() {chrome.storage.local.set({'im_welcome': true}); im_welcome = true; load(im_welcome)});
  } else {
    bot_alert(`Вы не ввели свой Telegram ID <a href="https://telegra.ph/Uvedomleniya-v-Telegram-03-25" target="_blank">Как его получить?</a>`)
  }
});

/// Кнопка обновить
$("#update_page").on('click', function() { 
  load(im_welcome);
});

/// Запуск бота 
$("#start_bot").click(function() {
  if ($("#start_bot").html() != "Обновите бота!") {
    if ($("#start_bot").html() == "Запустить бота") {
      $("#start_bot").html("Остановить бота");
      sync_data("<start>;"+Math.random());
      stopwatch_fun(true);
    } else {
      $("#start_bot").html("Запустить бота");
      sync_data("<stop>;"+Math.random());
      stopwatch_fun(false);
      bot_alert("Бот ожидает вашего запуска "+emoji[Math.floor(Math.random() * emoji.length)]);
      timeMinut = -99;
    }
  }
});

/// Загрузить страницу приветствия
function load(welcome) {
  $("#loading").css({"display":"block"});
  nav_link = $(".nav-link");
  for (var i = 0; i < nav_link.length; i++) {
    nav_link.eq(i).on('click', function() {
      card(this, null);
    });
  }
  if (welcome == true) {
      $.getJSON('https://wiq.ru/tasks/api.php?action=balance_get', function(data) {
        console.log(data);
        if (data.status == false) {
          card($(".nav-item").eq(0), 4);
        } else {
          bot_alert(`Бот ожидает вашего запуска `+emoji[Math.floor(Math.random() * emoji.length)]);
          for (var i = 0; i < nav_link.length; i++) {
            nav_link.eq(i).removeClass('disabled');
          }
          $(".nav-item").eq(1).addClass('active');
          $("#your_balance").html(data.data+"₽");
          start_balance = data.data * 1;
          bot_balance_temp = 0;
          card($(".nav-item").eq(0), 1);
        }
        $(".nav-item").eq(0).attr("style", "display: none");
        $("#loading").css({"display":"none"});
        $.get('https://wiq.ru/tasks.php', function(data) {
          message(0, $(data).find(".copy-api").eq(0).text().split(" ")[2]);
        });
        $("#top_users").find("iframe").eq(0).attr("src", "https://instaminer.goh.su/InstaMinerMega/top_users.php?id="+im_telegram_id);
      }).fail(function() {alert("Проверьте подключение к интернету, или работоспособность сайта wiq.ru!")});
  } else {
    card($(".nav-item").eq(0), 0);
    $("#loading").css({"display":"none"});
  }
}

/// Переход по вкладкам
function card(elem, val) {
  if (val == null) {
    val = $(elem).attr("id_elem")*1;
  }
  if (!$(elem).hasClass("disabled")) {
    card_elem = $(".card-body");
    elem = $(".nav-link");
    for (var i = 0; i < card_elem.length; i++) {
      if (i != val) {
        card_elem.eq(i).attr("style", "display: none");
        elem.eq(i).removeClass('active');
      } else {
        card_elem.eq(i).attr("style", "display: block");
        elem.eq(i).addClass('active');
      }
    }
  }
}

////////////////////////////////////
///                              ///
///                              ///
///     ТАЙМЕР И СЕКУНДОМЕР      ///
///                              ///
///                              ///
////////////////////////////////////

/// Секундомер 
function stopwatch_fun(val) {
  if (val == true) {
    stopwatch_interval_fun = setInterval(function(){
      S = + S + 1;
      if (S < 10) {S = '0' + S}
      if (S == 60) {
        S = '00';
          M = +M + 1;
          if (M < 10) {M = '0' + M}
          if (M == 60) {
            M = '00';
            H = +H + 1;
              if (H < 10) {H = '0' + H}
          }
        }
        sec_timer++;
        $("#stopwatch").html(H+":"+M+":"+S);
    }, 1000);
  } else {
    clearInterval(stopwatch_interval_fun);
  }
};

/// Таймер
$("#im_start").click();
function timer_function(min, swi, text) {
  if (timeMinut <= 0 || timeMinut == -99) {
    sync_data("<stop>");
    sync_data("<stop_page>");
    timeMinut = min * 60;
    timer_set = setInterval(function () {
      seconds_1 = timeMinut%60
      minutes_1 = timeMinut/60%60
      hour_1 = timeMinut/60/60%60
      sec_timer = 0;
      if (timeMinut == -99) {
        if (swi == "block") {
          for (var i = 0; i < acc.length; i++) {
            if ($("#change_account").find(".log_pass").eq(i).find(".info").eq(0).html().indexOf("badge-outline-warning") != -1) {
              $("#change_account").find(".log_pass").eq(i).find(".info").eq(0).html(`<span class="badge badge-outline-success">Готово <i class="fa fa-trash mr-2 trash"></i></span>`);
              $(".trash").on('click', function() {
                $(this).parent().parent().parent().remove();
                get_account();
              });
            }
          }
          get_account();
        }
        task_val_fail = 0;
        task_val_follow_fail = 0;
        console.log("Таймер сброшен!");
      } else {
        if (timeMinut <= 0) {
            clearInterval(timer_set);
            /// Действие
            if (swi == "block") {
              for (var i = 0; i < acc.length; i++) {
                if ($("#change_account").find(".log_pass").eq(i).find(".info").eq(0).html().indexOf("badge-outline-warning") != -1) {
                  $("#change_account").find(".log_pass").eq(i).find(".info").eq(0).html(`<span class="badge badge-outline-success">Готово <i class="fa fa-trash mr-2 trash"></i></span>`);
                  $(".trash").on('click', function() {
                    $(this).parent().parent().parent().remove();
                    get_account();
                  });
                }
              }
              get_account();
            }
            task_val_fail = 0;
            task_val_follow_fail = 0;
            sync_data("<start>");
        } else {
          if (Math.trunc(hour_1) < 10) { hour_1 = "0" + String(Math.trunc(hour_1)) } else { hour_1 = Math.trunc(hour_1) }
          if (Math.trunc(minutes_1) < 10) { minutes_1 = "0" + String(Math.trunc(minutes_1)) } else { minutes_1 = Math.trunc(minutes_1) }
          if (seconds_1 < 10) { seconds_1 = "0" + Math.trunc(seconds_1) } else { seconds_1 = seconds_1 }
          if (timeMinut == min * 60) {
            text = "Бот ушел в сон на <div id='timer_min' style='display: contents;'>"+`${hour_1}:${minutes_1}:${seconds_1}`+"</div>"+text+" <a href='#' style='color: #0080ff;' id='timeMinut_99'> (Пропустить)</a>";
            bot_alert(text);
            $("#timeMinut_99").on('click', function() {
              timeMinut = -99;
            });
            if (im_values_1.telegram_sleep == true) {
              if (min >= 3) {
                text = text.replace("<div id='timer_min' style='display: contents;'>", "").replace("</div>", "").replace("<a href='#' style='color: #0080ff;' id='timeMinut_99'> (Пропустить)</a>", "");
                message(6, text); 
                console.log(text);
              }
            }
          } else {
            $("#timer_min").html(`${hour_1}:${minutes_1}:${seconds_1}`); 
          }
        }
      }
      --timeMinut;
    }, 1000);
  }
}

////////////////////////////////////
///                              ///
///                              ///
///  ПОЛУЧИТЬ/ОТКРЫТЬ/ПРОВЕРИТЬ  ///
///           ЗАДАНИЕ            ///
///                              ///
///                              ///
////////////////////////////////////

/// Получить список заданий
function getlist() {
  if (im_status == true) {
    sync_data("<start_timer>");
    bot_alert("Поиск заданий!");
    //$.getJSON('https://wiq.ru/online.php', function(data) {console.log(data)});
    $.get('https://wiq.ru/tasks/api.php?action=getlist&filter_type='+filter_type+'&filter_service='+filter_service, function(data) {
      elems = [".get_list_timer", ".task_start"];
      if (data.indexOf('"data":{"timer"') != -1) {
        data = JSON.parse(data);
        console.log(data);
        if (data.status == true) {
          bot_alert(data.data.timer);
          sync_data("<stop>");
          timer_data = $("#bot_alert").find(elems[0]).eq(0).html() * 1;
          get_list_timer = setInterval(function() {
            timer_data--;
            $("#bot_alert").find(elems[0]).eq(0).html(timer_data);
            if (timer_data <= 0) {
              sync_data("<start>");
            }
          }, 1000);
        }
      } else {
        if (data.indexOf("Cloudflare") != -1) {
          timer_function(3, "restart", ", не удалось загрузить сайт Instagram777");
          console.log(data);
        } else {
          if (data.indexOf("Слишком частые запросы") != -1) {
            console.log(data);
            bot_alert("Слишком частые запросы!");
            setTimeout(function() {getlist()}, 5000);
          } else {
            if (data.indexOf("Нет доступных заданий") != -1) {
              timer_function(2, "restart", ", нет доступных заданий");
              console.log(data);
            } else {
              tasks = $(data).find(elems[1]);
              if (tasks.length > 0) {
                if (tasks.length < 1) {
                  timer_function(1, "restart", ", нет доступных заданий");
                  console.log(tasks);
                } else {
                  console.log(tasks);
                  bot_alert("Получено "+tasks.length+" заданий!");
                  task_list = [];
                  task_list_count = [];
                  tasks_id = 0;
                  for (var i = 0; i < tasks.length; i++) {
                  	if (trash_list.indexOf(tasks[i].dataset.taskSecret) == -1) {
	                    task_list.push(tasks[i].dataset.taskSecret);
	                    task_list_count.push(tasks[i].innerText.split("\n")[1].replace(" ", ""));
                    }
                  }
                  setTimeout(function() {task_start()}, 900);
                }
              } else {
                console.log(data);
                timer_function(1, "restart", ", из-за ошибки на сайте");
              }
            }
          }
        }
      }
    }).fail(function() {timer_function(1, "restart", ", не удалось загрузить сайт Instagram777")});
  }
}

/// Открыть задание
function task_start() {
  //$.getJSON('https://wiq.ru/online.php', function(data) {console.log(data)});
  /// Оставить комментарий Instagram
  temp_account = "";
  chrome.storage.local.set({"im_comments_val": 0});
  if (($("#delay_comments").val() * 1) != 0 && task_val_true > 0) {
    if (task_val_true%($("#delay_comments").val() * 1) == 0) {
      chrome.storage.local.set({"im_comments_val": 1});
    }
  }

  if (im_status == true) {
    /// Сон бота
    if (sec_timer/60 > $("#sleep_time_1").val() * 1 && $("#sleep_status").prop("checked")) {
      timer_function($("#sleep_time_2").val() * 1, "restart", "");
    } else {
      /// Выполнить задание
      if (task_list.length > 0 && task_list.length > tasks_id) {
        $.getJSON('https://wiq.ru/tasks/api.php?action=task_precheck&hash='+task_list[tasks_id], function(result) {
        	trash_list.push(task_list[tasks_id]);
          console.log(result);
          if (result.status == true) {
            if (result.data.status) {
                sync_data("<task_open>;"+result.data.data);
            } else {
              if (result.data.error == "Access_denied") {
                sync_data("<task_start>;"+task_list[tasks_id]);
              } else {
                if (result.data.error_title) {
                  if (result.data.error_title == "Нельзя брать более 1 задания одновременно") {
                    setTimeout(function() {task_start();}, 1000);
                  } else {
                    close_task();
                  }
              } else {
                sync_data("<task_start>;"+task_list[tasks_id]);
              }
              }
            }
          } else {
            sync_data("<task_start>;"+task_list[tasks_id]);
          }
        }).fail(function() {timer_function(1, "restart", ", не удалось загрузить сайт Instagram777")});
        bot_alert("Бот выполняет задание №"+task_val);
      } else {
        if (task_list.length > 0) {
          setTimeout(function() {getlist()}, 1000);
          console.log("getlist() - 917");
        } else {
          console.log(task_list.length); 
          timer_function(1, "restart", ", из-за ошибки на сайте");
        }
      }
    }
  }
}

/// Пропустить задание 
function close_task() {
  tasks_id++;
  task_val_fail++;

  /// Остановить, если много ошибок
  if (task_val_fail >= 12) {
    sync_data("<clear_session>");
    timer_function(3, "restart", ", из-за ошибок на сайте");
  } else {
    setTimeout(function() {task_start()}, $("#delay_task_2").val() * 1000 + 500)
  }
}

/// Проверить задание
function task_check() {
  if (im_status == true) {
    bot_alert("Сайт проверяет задание №"+task_val);
    $.getJSON('https://wiq.ru/tasks/api.php?action=task_check&hash='+task_list[tasks_id], function(data) {
      console.log(data);
      change_temp = false;
      task_val++;
      if (data.status == true) {
        if (data.data.status == true) {
          task_val_true++;
          task_val_fail = 0;
          task_ava_error = 0;
          task_val_follow_fail = 0;
          bot_alert("Задание №"+(task_val-1)+" выполнено ("+task_list_count[tasks_id]+"₽)");
          im_all_balance = im_all_balance + task_list_count[tasks_id] * 1;
          $("#task_status").html(task_val_true+"/"+task_val_false);

          /// Обновить баланс
          $.getJSON('https://wiq.ru/tasks/api.php?action=balance_get', function(data) {
            console.log(data);
            if (data.status == true) {
              $("#your_balance").html(data.data+"₽");
              bot_balance_temp = ((data.data * 1) - start_balance).toFixed(2);
              $("#bot_balance").html(bot_balance_temp+"₽");
            }
            if (bot_balance_temp != 0) {
              if (bot_balance_temp/bot_balance_count > $("#telegram_balance").val() * 1) {
                bot_balance_count++
                message(4, bot_balance_temp);
              }
            }
          });

          /// Подсчет лайков/подписок
          if (filter_type == "follow_profile") {
            filter_type_follow++;
          }
          if (filter_type == "like_post") {
            filter_type_like++;
          }

          getlist_refresh = false;
          /// Смена категории (лайки на подписки)
          if ($("#delay_change_category_1").val() != 0 && filter_type_like != 0) {
            if (filter_type_like%$("#delay_change_category_1").val() == 0) {
              filter_type_like = 0;
              filter_type = "follow_profile";
              filter_service = "insta";
              $("#bot_category").html("Подписки");
              getlist_refresh = true;
            }
          }

          /// Смена категории (подписки на лайки)
          if ($("#delay_change_category_2").val() != 0 && filter_type_follow != 0) {
            if (filter_type_follow%$("#delay_change_category_2").val() == 0) {
              filter_type_follow = 0;
              filter_type = "like_post";
              filter_service = "insta";
              $("#bot_category").html("Лайки");
              getlist_refresh = true;
            }
          }

          /// Смена аккаунтов
          if ($("#change_account_status").prop("checked") == true && task_val_true != 0) {
            if (task_val_true%$("#change_account_task").val() == 0 && im_accounts.accounts != []) {
              change_account();
              change_temp = true;
            }
          }

        } else {
          /// Задание не выполнено
          if (im_status == true) {
            task_val_false++;
            task_val_fail++;

            if (data.data.error_title == "Время проверки истекло") {
              bot_alert("Задание №"+(task_val-1)+" не выполнено! (Время проверки истекло)");
            } else {
              bot_alert("Задание №"+(task_val-1)+" не выполнено!");
              if (filter_type == "follow_profile") {
                task_val_follow_fail++;
                if (task_val_follow_fail >= 8) {
                  task_val_follow_fail = 0;
                  sync_data("<block>");
                }
              }
            }
            $("#task_status").html(task_val_true+"/"+task_val_false);
            /// Ошибка аватарки
            if (data.error != null) {
              task_ava_error++;
              if (task_ava_error >= 4) {
                task_ava_error = 0;
                $("#start_bot").html("Запустить бота");
                sync_data("<stop>");
                sync_data("<ava_message>");
                message(3, "ava");
              }
            }
          }
        }

        /// Поиск новых заданий / Перейти к следующему заданию
        if (getlist_refresh == false) {
          if (change_temp == false) {
            tasks_id++;
            setTimeout(function() {task_start()}, $("#delay_task_1").val() * 1000);
          }
        } else {
          if (change_temp == false) {
            getlist();
            console.log("getlist() - 1035");
          }
        }
      }
    }).fail(function() {timer_function(1, "restart", ", не удалось загрузить сайт Instagram777")});
  }
}

////////////////////////////////////
///                              ///
///                              ///
///      АККАУНТЫ INSTAGRAM      ///
///                              ///
///                              ///
////////////////////////////////////

/// Добавить аккаунт Лог/Пасс
$("#add_account_log_pass").click(function() {
  $("#change_account").append(`
    <div class="log_pass">
      <div class="form-group col-md-6">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><i class="fa fa-user"></i></span>
          </div>
          <input type="text" class="form-control change_account_log" placeholder="Логин" aria-label="Логин" aria-describedby="basic-addon1">
        </div>
      </div>
      <div class="form-group col-md-6">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><i class="fa fa-key"></i></span>
          </div>
          <input type="password" class="form-control change_account_pass" placeholder="Пароль" aria-label="Пароль" aria-describedby="basic-addon1">
        </div>
      </div>
      <div class="info"><span class="badge badge-outline-success">Статус <i class="fa fa-trash mr-2 trash"></i></span></div>
    </div>`);

  $(".change_account_log").change(function(){
    get_account();
  });

  $(".change_account_pass").change(function(){
    get_account();
  });

  $(".trash").on('click', function() {
    $(this).parent().parent().parent().remove();
    get_account();
  });
});

/// Добавить аккаунт Куки
$("#add_account_log_cookie").click(function() {
  $("#change_account").append(`
    <div class="log_pass log_cookie">
      <div class="form-group col-md-6">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><i class="fa fa-database"></i></span>
          </div>
          <input type="text" class="form-control change_account_log" placeholder="Формат JSON" aria-label="Формат JSON" aria-describedby="basic-addon1">
        </div>
      </div>
      <div class="info"><span class="badge badge-outline-success">Статус <i class="fa fa-trash mr-2 trash"></i></span></div>
    </div>
  `);

  $(".change_account_log").change(function(){
    get_account();
  });

  $(".trash").on('click', function() {
    $(this).parent().parent().parent().remove();
    get_account();
  });
});

/// Сохранить все аккаунты
function get_account() {
  accounts_success = 0;
  accounts_warning = 0;
  accounts_danger = 0;
  accs = $("#change_account");
  accounts = [];
  for (var i = 0; i < accs.find(".log_pass").length; i++) {
    elem = accs.find(".log_pass").eq(i);
    login = elem.find(".change_account_log").eq(0).val();
    if (elem.find(".change_account_pass").length > 0) {
      /// Логин / Пароль аккаунт
      pass = elem.find(".change_account_pass").eq(0).val();
      if (elem.find(".info").eq(0).html().indexOf("badge-outline-warning") == -1) {
        if (login == "" || pass == "") {
          accounts_danger++;
          elem.find(".info").eq(0).html(`<span class="badge badge-outline-danger">Ошибка <i class="fa fa-trash mr-2 trash"></i></span>`);
        } else {
          accounts_success++;
          elem.find(".info").eq(0).html(`<span class="badge badge-outline-success">Готово <i class="fa fa-trash mr-2 trash"></i></span>`);
        }
      } else {
        accounts_warning++;
      }
      status = elem.find(".info").eq(0).html();
      accounts.push(login + "<log_pass>" + pass + "<status>" + status);
    } else {
      /// Cookie аккаунт
      if (elem.find(".info").eq(0).html().indexOf("badge-outline-warning") == -1) {
        if (login.indexOf("[{") != -1 && login.indexOf("}]") != -1) {
          if (login.match(/\[{/g).length == 1 && login.match(/\}]/g).length == 1) {
            accounts_success++;
            elem.find(".info").eq(0).html(`<span class="badge badge-outline-success">Готово <i class="fa fa-trash mr-2 trash"></i></span>`);
          } else {
            accounts_danger++;
            elem.find(".info").eq(0).html(`<span class="badge badge-outline-danger">Ошибка <i class="fa fa-trash mr-2 trash"></i></span>`);
          }
        } else {
          accounts_danger++;
          elem.find(".info").eq(0).html(`<span class="badge badge-outline-danger">Ошибка <i class="fa fa-trash mr-2 trash"></i></span>`);
        }
      } else {
        accounts_warning++;
      }
      status = elem.find(".info").eq(0).html();
      accounts.push(login + "<status>" + status);
    }
  }
  $(".trash").on('click', function() {
    $(this).parent().parent().parent().remove();
    get_account();
  });
  im_accounts.accounts = accounts;
  chrome.storage.local.set({'im_accounts': im_accounts}); 

  $("#accounts_success").html("Рабочие аккаунты: "+accounts_success);
  $("#accounts_warning").html("В блокировке: "+accounts_warning);
  $("#accounts_danger").html("Ошибок: "+accounts_danger);
  console.log(accounts);
}

/// Восстановить аккаунты 
function add_list_accounts(val) {
  $("#change_account").html("");
  for (var i = 0; i < val.length; i++) {
    if (val[i].split("<status>")[1].indexOf("badge-outline-warning") != -1) {
      status = `<span class="badge badge-outline-success">Готово <i class="fa fa-trash mr-2 trash"></i></span>`;
    } else {
      status = val[i].split("<status>")[1];
    }
    if (val[i].indexOf("<log_pass>") != -1) {
      $("#change_account").append(`
        <div class="log_pass">
          <div class="form-group col-md-6">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fa fa-user"></i></span>
              </div>
              <input type="text" class="form-control change_account_log" placeholder="Логин" aria-label="Логин" aria-describedby="basic-addon1" value='`+val[i].split("<log_pass>")[0]+`'>
            </div>
          </div>
          <div class="form-group col-md-6">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fa fa-key"></i></span>
              </div>
              <input type="password" class="form-control change_account_pass" placeholder="Пароль" aria-label="Пароль" aria-describedby="basic-addon1" value='`+val[i].split("<log_pass>")[1].split("<status>")[0]+`'>
            </div>
          </div>
          <div class="info">`+status+`</div>
        </div>`);
    } else {
      $("#change_account").append(`
        <div class="log_pass log_cookie">
          <div class="form-group col-md-6">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="fa fa-database"></i></span>
              </div>
              <input type="text" class="form-control change_account_log" placeholder="Формат JSON" aria-label="Формат JSON" aria-describedby="basic-addon1" value='`+val[i].split("<status>")[0]+`'>
            </div>
          </div>
          <div class="info">`+status+`</div>
        </div>
      `);
    }
  }
  $(".change_account_log").change(function(){
    get_account();
  });

  $(".change_account_pass").change(function(){
    get_account();
  });

  $(".trash").on('click', function() {
    $(this).parent().parent().parent().remove();
    get_account();
  });
  get_account();
}

/// Сменить аккаунт
function change_account() {
  sync_data("<stop>");
  bot_alert("Смена аккаунта");
  acc = im_accounts.accounts;
  if (acc.length > 0) {
    temp_account_block = true;
    for (var i = 0; i < acc.length; i++) {
      if ($("#change_account").find(".log_pass").eq(i).find(".info").eq(0).html().indexOf("badge-outline-success") != -1) {
        temp_account_block = false;
      }
    }

    /// Проверка на рабочие аккаунты в списке
    if (temp_account_block == true) {
      if ($("#change_account_use").prop("checked") == false) {
        temp_account_block_count = 0;
        for (var i = 0; i < acc.length; i++) {
          if ($("#change_account").find(".log_pass").eq(i).find(".info").eq(0).html().indexOf("badge-outline-danger") != -1) {
            temp_account_block_count++;
          }
        }
        if (temp_account_block_count == acc.length) {
          sync_data("<message_block_all>");
          temp_account_num = 0;
          bot_alert("Ваши аккаунты заблокированы! Бот остановлен");
          $("#start_bot").html("Запустить бота");
          stopwatch_fun(false);
          sync_data("<stop>");
          message(5, "block");
        } else {
          //// Уйти в сон из-за того, что все аккаунты в блокировке
          temp_account_num = 0;
          timer_function($("#change_account_sleep").val() * 1, "block", ", все аккаунты в блокировке!");
        }
      } else {
        sync_data("<message_block_all>");
        bot_alert("Ваши аккаунты заблокированы! Бот остановлен");
        $("#start_bot").html("Запустить бота");
        stopwatch_fun(false);
        sync_data("<stop>");
        message(5, "block");
      }
    } else {
      if (temp_account_num < acc.length) {
        if ($("#change_account").find(".log_pass").eq(temp_account_num).find(".info").eq(0).html().indexOf("badge-outline-success") != -1 
         || $("#change_account").find(".log_pass").eq(temp_account_num).find(".info").eq(0).html().indexOf("badge-outline-warning") != -1) {

          if ($("#change_account_use").prop("checked") == true && $("#change_account").find(".log_pass").eq(temp_account_num).find(".info").eq(0).html().indexOf("badge-outline-warning") != -1) {
            /// Не использовать акки, которые в блоке
            temp_account_num++;
            change_account();
          } else {
            /// Сменить аккаунт
            if (acc[temp_account_num].split("<status>")[0].indexOf("<log_pass>") != -1) {
              val_acc = acc[temp_account_num].split("<status>")[0].split("<log_pass>")[0] + ":" + acc[temp_account_num].split("<status>")[0].split("<log_pass>")[1];
            } else {
              val_acc = acc[temp_account_num].split("<status>")[0];
            }
            chrome.storage.local.set({'im_acc_login': val_acc});
            temp_account = val_acc;
            chrome.storage.local.set({'im_logout': "true0"});
            sync_data("<change_acc>");
            temp_account_num++;
            reload_timer_2 = setTimeout(function() {
              ///temp_account_num = 0;
              login_error++;
              if (login_error >= 3) {
                bot_alert("Не удалось войти в ваши аккаунты! Бот остановлен");
                $("#start_bot").html("Запустить бота");
                chrome.storage.local.set({'im_logout': "false"});
                stopwatch_fun(false);
                login_error = 0;
                sync_data("<stop>");
                message(9, "block");
              } else {
                bot_alert("Не удалось войти в аккаунт!");
                message(7, "");
                sync_data("<block>");
              }
            }, 3 * 25000);
          }
        } else {
          temp_account_num++;
          change_account();
        }
        $("#account_num").html("№"+(temp_account_num));
      } else {
        temp_account_num = 0;
        change_account();
      }
    }
  } else {
    sync_data("<message_block_all>");
    bot_alert("Ваши аккаунты заблокированы! Бот остановлен");
    $("#start_bot").html("Запустить бота");
    stopwatch_fun(false);
    sync_data("<stop>");
    message(5, "block");
  }
}

/// Загрузить аккаунт
$("#upload_account").on('change', function() {
  input = this;
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function() {
    acounts = reader.result.split("\n");
    acc_array = [];
    for (var i = 0; i < acounts.length; i++) {
      if (acounts[i] != "") {
        if (acounts[i].indexOf("[{") != -1 && acounts[i].indexOf("}]") != -1) {
          acc = acounts[i] + `<status><span class="badge badge-outline-success">Готово <i class="fa fa-trash mr-2 trash"></i></span>`;
          acc_array.push(acc);
        } else {
          if (acounts[i].indexOf(":") != -1) {
            acc = acounts[i].split(":")[0]+"<log_pass>"+acounts[i].split(":")[1] + `<status><span class="badge badge-outline-success">Готово <i class="fa fa-trash mr-2 trash"></i></span>`;
            acc_array.push(acc);
          }
        }
      }
    }
    console.log(acc_array);
    add_list_accounts(acc_array);
    get_account();
  }
  reader.onerror = function() {
    bot_alert("Ошибка! Не удалось прочитать файл");
  }
});

/// Скачать аккаунты
var downloadURL = function(url, name) {
  var link = document.createElement('a');
  if(name == undefined || name == ''){name = url};
  link.setAttribute('href',url);
  link.setAttribute('download',name);
  onload = link.click();
};
$(function() {
  $('#save_account').click(function() {
    save_acc = im_accounts.accounts;
    save_accounts = "";
    for (var i = 0; i < save_acc.length; i++) {
      if (save_acc[i].indexOf("<log_pass>") != -1) {
        save_accounts = save_accounts + save_acc[i].replace("<log_pass>", ":").split("<status>")[0] + "\n";
      } else {
        save_accounts = save_accounts + save_acc[i].split("<status>")[0] + "\n";
      }
    }
    downloadURL('data:text/plain;charset=UTF-8,'+save_accounts, 'Аккаунты Instagram');
  })
});

/// Очистить все аккаунты 
$("#clear_accounts").on('click', function() {
  $("#change_account").html("");
  get_account();
});

////////////////////////////////////
///                              ///
///                              ///
///        СИНХРОНИЗАЦИЯ         ///
///                              ///
///                              ///
////////////////////////////////////


/// Синхронизация 
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.data !== undefined) {
    console.log(changes.data.newValue);
    data = changes.data.newValue.split(";");
    if (im_status == true) {
      clearTimeout(reload_timer);
      reload_timer = setTimeout(function() {
        if (im_status == true) {
          im_status = false;
          sync_data("<stop_page>");
          chrome.storage.local.set({"im_status": im_status});
          bot_alert("Перезапуск бота!");
          setTimeout(function() {sync_data("<start>")}, 1000);
        }
      }, (30 + $("#delay_task_1").val() * 1 + $("#delay_task_2").val() * 1) * 1000);

      if (data[0] == "<check_task>") {
        setTimeout(function() {task_check()}, $("#delay_task_2").val() * 1000)
      }

      if (data[0] == "<close_tab>") {
        tasks_id++;
        setTimeout(function() {task_start()}, $("#delay_task_2").val() * 1000)
      }

      if (data[0] == "<close_tab_no_load>") {
        tasks_id++;
        task_val_fail++;

        /// Остановить, если много ошибок
        if (task_val_fail >= 32) {
          timer_function(3, "restart", ", из-за ошибок на сайте");
        } else {
          setTimeout(function() {task_start()}, $("#delay_task_2").val() * 1000 + 500)
        }
      }
    }

    if (data[0] == "<block>") {
      if ($("#change_account_status").prop("checked") == true) {
        console.log(temp_account_num);
        if (temp_account_num != 0) {
          if (temp_account != "") {
            $("#change_account").find(".log_pass").eq(temp_account_num-1).find(".info").eq(0).html(`<span class="badge badge-outline-warning">Блок❗<i class="fa fa-trash mr-2 trash"></i></span>`);
          } else {
            $("#change_account").find(".log_pass").eq(temp_account_num-1).find(".info").eq(0).html(`<span class="badge badge-outline-warning">Блок❗<i class="fa fa-trash mr-2 trash"></i></span>`);
          }
        }

        $(".trash").on('click', function() {
          $(this).parent().parent().parent().remove();
          get_account();
        });

        get_account();
        task_val_false++;
        $("#task_status").html(task_val_true+"/"+task_val_false);
        if ($("#bot_alert").html().indexOf("Не удалось войти в ваши аккаунты! Бот остановлен") == -1) {
          change_account();
        }
      } else {
        sync_data("<message_block>");
        bot_alert("Ваш аккаунт заблокирован! Бот остановлен");
        $("#start_bot").html("Запустить бота");
        stopwatch_fun(false);
        sync_data("<stop>");
        message(5, "block");
      }
    }

    if (data[0] == "<captcha>") {
      clearTimeout(reload_timer);
      if ($("#telegram_captcha").prop("checked") == true) {
        bot_alert("Бот ожидает, когда будет пройдена проверка");
      } else {
        bot_alert("Пройдите проверку во вкладке с заданием!");
        message(5, "captcha");
      }
    }

    if (data[0] == "<add_acc_2>") {
      chrome.storage.local.get("im_accounts", function (result) { 
        add_list_accounts(result.im_accounts.accounts);
        im_accounts = result.im_accounts;
      });
    }

    if (data[0] == "<addition>") {
      $.get(data[1], function(data) {
        console.log("CLICK: "+data[1]);
        sync_data("<check_addition>");
      }).fail(function() {
        console.log("CLICK ERROR!");
      });
    }

    if (data[0] == "<start>") {
      chrome.storage.local.set({"im_status_account": false});
      clearTimeout(reload_timer_2);
      clearInterval(get_list_timer);
      timer_data = 0;
      im_all_balance = 0.00;
      if ($("#start_bot").html() == "Остановить бота") {
        im_status = true;
        chrome.storage.local.set({"im_status": im_status});
        if (filter_type == null) {
            if (im_category.category_3 == true) {
            filter_type = "undefined";
            filter_service = "twitter";
            $("#bot_category").html("Twitter");
            }
            if (im_category.category_2 == true) {
            filter_type = "like_post";
            filter_service = "insta";
            $("#bot_category").html("Лайки");
            }
            if (im_category.category_1 == true) {
            filter_type = "follow_profile";
            filter_service = "insta";
            $("#bot_category").html("Подписки");
            }
        }
        getlist();
        console.log("getlist() - 1522");
      }
    }

    if (data[0] == "<add_pub_fol_ava>") {
      sync_data("<stop>");
      $("#start_bot").html("Запустить бота");
      stopwatch_fun(false);
      message(10, "block");
      bot_alert("Бот остановлен! Заполните свои аккаунты Instagram. Вся информация <a href='https://telegra.ph/InstaMiner-MEGA-05-02' target='_blank'>здесь</a>");
    }

    if (data[0] == "<add_pub_pid>") {
      sync_data("<stop>");
      $("#start_bot").html("Запустить бота");
      stopwatch_fun(false);
      message(10, "block");
      alert("Бот остановлен! У ВАС ДОЛЖНЫ БЫТЬ РАЗНЫЕ ФОТОГРАФИИ В ПРОФИЛЕ");
    }

    if (data[0] == "<stop>") {
      clearTimeout(reload_timer);
      im_status = false;
      message(8, "");
      chrome.storage.local.set({"im_status": im_status});
    }
  }
});

/// Синхронизация 
function sync_data(val) {
  val = val+";"+"<script>";
  chrome.storage.local.set({
      data: val
  });
}

/// Сообщение в Telegram
function message(status, val) {
  /// Включить уведомления
  mess = "";
  if (status == 2) {
    mess = $("#telegram_browser").val()+": Вы включили уведомления!";
  }

  /// Уведомления об ошибках
  if (status == 3) {
    /// Не установлен аватар
    if (val == "ava") {
      mess = $("#telegram_browser").val()+": У вас не установлено фото в профиле соц. сети! Бот остановлен";
    }
  }

  /// Уведомление о заработке
  if (status == 4) {
    mess = $("#telegram_browser").val()+": Бот заработал "+val+"₽";
  }

  /// Капча или блок
  if (status == 5) {
    if (val == "captcha") {
      mess = $("#telegram_browser").val()+": Пройдите проверку на сайте!";
    }
    if (val == "block") {
      mess = $("#telegram_browser").val()+": Ваш аккаунт попал под временную блокировку! Бот остановлен";
    }
  }

  /// Бот ушел в сон
  if (status == 6) {
    mess = $("#telegram_browser").val()+": "+val;
  }

  /// Не удалось войти в аккаунт
  if (status == 7) {
    mess = $("#telegram_browser").val()+": Не удалось войти в аккаунт!";
  }

   /// Не удалось войти в аккаунт
  if (status == 9) {
    mess = $("#telegram_browser").val()+": Не удалось войти в ваши аккаунты! Бот остановлен";
  }

  if (status == 10) {
    mess = $("#telegram_browser").val()+": Бот остановлен! Заполните свои аккаунты Instagram. Вся информация в боте";
  }

  if (status == 0) {
    $.getJSON('https://instaminer.goh.su/InstaMinerMega/sync.php?ver='+manifestData.version+"."+version_script+'&status='+status+'&telegram_id='+im_telegram_id+'&browser='+$("#telegram_browser").val()+'&val='+val, function(data) {
      if (data.status == null) {
        sync_data("<stop>");
        timeMinut = -99;
        im_telegram_id = false; 
        chrome.storage.local.set({'im_telegram_id': im_telegram_id}); 
        im_welcome = false; 
        chrome.storage.local.set({'im_welcome': im_welcome});
        bot_alert(`Вам заблокирован доступ! Вы не сможете использовать эту программу`);
        card($(".nav-item").eq(0), 0);
      } 
      if (data.status == false) {
        $("#start_bot").html(`Обновите бота!`);
        bot_alert(`<a href="https://t.me/instaminer_official" target="_blank" style="color: #9fcfff;">Обновить бота, чтобы начать работать!</a>`);
      }
      if (data.ref == true && ref_status == false) {
        ref_status = true;
        ///$("#manifest_version").html($("#manifest_version").html()+`<span class="badge badge-pill badge-success" style="height: 10px; width: 10px; padding: 0; margin-left: 5px;"> </span>`)
      }
    })
  } else {
    if (status == 8) {
      $.getJSON('https://instaminer.goh.su/InstaMinerMega/sync.php?ver='+manifestData.version+"."+version_script+'&status='+status+'&telegram_id='+im_telegram_id+'&browser='+$("#telegram_browser").val()+'&val='+im_all_balance.toFixed(2), function(data) {
        im_all_balance = 0.00;
      });
    } else {
      if (im_values_1.telegram_message == true && $("#telegram_token").val() != "") { 
        $.getJSON("https://api.telegram.org/bot"+$("#telegram_token").val()+"/sendMessage?chat_id="+im_telegram_id+"&text="+mess, function(data) {});
      }
    }
  }
}

function telegram_sync(val) {
  if (val == true) {
    telegram_sync_interval = setInterval(function() { 
      if (last_message != null) {
        $.getJSON("https://api.telegram.org/bot"+im_values_1.telegram_token+"/getUpdates", function(data) {
          data = data.result[data.result.length - 1].message;
          if (last_message != data.message_id) {
            last_message = data.message_id;
            this_browser = $("#telegram_browser").val();

            function case_start() {
              if ($("#start_bot").html() != "Обновите бота!") {
                if ($("#start_bot").html() == "Запустить бота") {
                  $("#start_bot").html("Остановить бота");
                  sync_data("<start>");
                  stopwatch_fun(true);
                  $.getJSON("https://api.telegram.org/bot"+im_values_1.telegram_token+"/sendMessage?chat_id="+im_telegram_id+"&text="+this_browser+": Бот запущен", function(data) {});
                } else {
                  $.getJSON("https://api.telegram.org/bot"+im_values_1.telegram_token+"/sendMessage?chat_id="+im_telegram_id+"&text="+this_browser+": Бот и так запущен!", function(data) {});
                }
              } else {
                $.getJSON("https://api.telegram.org/bot"+im_values_1.telegram_token+"/sendMessage?chat_id="+im_telegram_id+"&text="+this_browser+": Обновите бота!", function(data) {});
              }
            }

            function case_stop() {
              if ($("#start_bot").html() != "Обновите бота!") {
                if ($("#start_bot").html() == "Запустить бота") {
                  $.getJSON("https://api.telegram.org/bot"+im_values_1.telegram_token+"/sendMessage?chat_id="+im_telegram_id+"&text="+this_browser+": Бот и так не запущен!", function(data) {});
                } else {
                  $("#start_bot").html("Запустить бота");
                  sync_data("<stop>");
                  stopwatch_fun(false);
                  bot_alert("Бот ожидает вашего запуска "+emoji[Math.floor(Math.random() * emoji.length)]);
                  timeMinut = -99;
                  $.getJSON("https://api.telegram.org/bot"+im_values_1.telegram_token+"/sendMessage?chat_id="+im_telegram_id+"&text="+this_browser+": Бот остановлен", function(data) {});
                }
              } else {
                $.getJSON("https://api.telegram.org/bot"+im_values_1.telegram_token+"/sendMessage?chat_id="+im_telegram_id+"&text="+this_browser+": Обновите бота!", function(data) {});
              }
            }

            function case_info() {
              info = 'Ваш баланс: '+$("#your_balance").html()+'%0A' +
              'Бот выполнил: '+$("#task_status").html()+' заданий%0A'+
              'Бот заработал: '+$("#bot_balance").html()+'%0A' +
              'Бот работает: '+$("#stopwatch").html()+'%0A' +
              'Категория: '+$("#bot_category").html()+'%0A' +
              'Аккаунт: '+$("#account_num").html()+'%0A' +
              'Статус: '+$("#bot_alert").html();
              $.getJSON("https://api.telegram.org/bot"+im_values_1.telegram_token+"/sendMessage?chat_id="+im_telegram_id+"&text=----- "+this_browser+" -----%0A"+info, function(data) {});
            }

            function case_acc_info() {
              info = $("#accounts_success").html()+'%0A' +
              $("#accounts_warning").html()+'%0A' +
              $("#accounts_danger").html();
              $.getJSON("https://api.telegram.org/bot"+im_values_1.telegram_token+"/sendMessage?chat_id="+im_telegram_id+"&text=----- "+this_browser+" -----%0A"+info, function(data) {});
            }

            switch (data.text) {
              case "/get_bots":
                $.getJSON("https://api.telegram.org/bot"+im_values_1.telegram_token+"/sendMessage?chat_id="+im_telegram_id+"&text="+this_browser, function(data) {});
                break;
              case "/start "+this_browser:
                case_start()
                break;
              case "/stop "+this_browser:
                case_stop()
                break;
              case "/info "+this_browser:
                case_info();
                break;
              case "/acc_info "+this_browser:
                case_acc_info();
                break;
              case "/stop_timer "+this_browser:
                timeMinut = -99;
                $.getJSON("https://api.telegram.org/bot"+im_values_1.telegram_token+"/sendMessage?chat_id="+im_telegram_id+"&text="+this_browser+": Таймер пропущен!", function(data) {});
                break;
              case "/start":
                case_start();
                break;
              case "/stop":
                case_stop();
                break;
              case "/info":
                case_info();
                break;
              case "/acc_info":
                case_acc_info();
                break;
            }
          }
        })
      } else {
        $.getJSON("https://api.telegram.org/bot"+im_values_1.telegram_token+"/getUpdates", function(data) {
          data = data.result[data.result.length - 1].message;
          last_message = data.message_id;
        });
      }
    }, im_values_1.telegram_sync_2 * 1000);
  } else {
    clearInterval(telegram_sync_interval);
  }
}

////////////////////////////////////
///                              ///
///                              ///
///           ЛОГ БОТА           ///
///                              ///
///                              ///
////////////////////////////////////

$("#browser_focus").on('click', function() { 
  sync_data("<focus>");
});

function bot_alert(mess) {
  if (im_status == true) {
    $("#bot_alert").html(mess+" "+emoji[Math.floor(Math.random() * emoji.length)]);
    if ($(this).height() < 5) {
      $("title").html(im_values_1.telegram_browser+": "+mess);
    }
  }
  if (mess.indexOf("Бот ожидает вашего запуска") != -1 || 
      mess.indexOf('Вы допутили где-то ошибку, <a href="https://telegra.ph/Uvedomleniya-v-Telegram-03-25" target="_blank">прочитайте инструкцию</a>') != -1 || 
      mess.indexOf('Вам заблокирован доступ! Вы не сможете использовать эту программу') != -1 || 
      mess.indexOf('Вы не ввели свой Telegram ID <a href="https://telegra.ph/Uvedomleniya-v-Telegram-03-25" target="_blank">Как его получить?</a>') != -1 ||
      mess.indexOf('<a href="https://t.me/instaminer_official" target="_blank" style="color: #0080ff;">Обновить бота, чтобы начать работать!</a>') != -1 ||
      mess.indexOf("Бот ушел в сон на") != -1 ||
      mess.indexOf("Ваши аккаунты заблокированы") != -1 ||
      mess.indexOf("Ваш аккаунт заблокирован") != -1 ||
      mess.indexOf("Ошибка! Не удалось прочитать файл") != -1 ||
      mess.indexOf("Не удалось войти в ваши аккаунты! Бот остановлен") != -1 ||
      mess.indexOf("Заполните свои аккаунты Instagram. Вся информа") != -1) {
    $("#bot_alert").html(mess);
  }
}

$("#testaddition_2").on('click', function() {
  testaddition = true;
});

function visible(target_val) {
    target = document.getElementById(target_val);
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

        left = parseInt((window.outerWidth - window.innerWidth) + coord.left - 6 + window.screenLeft + elem_addition.clientWidth / 2);
        top_val = parseInt((window.outerHeight - window.innerHeight) + coord.top - 6 + window.screenTop + elem_addition.clientHeight / 2);
        $.get("http://localhost:35536/click?left="+left+"&top="+top_val+"&rand="+Math.random(), function(data) {
          setTimeout(function() {
            if (testaddition == true) {
              alert("Отлично, дополнение откалибровано!");
            } else {
              alert("Откройте расширение на весь экран!");
              im_addition = false; 
              $("#im_addition").prop('checked', false);
              chrome.storage.local.set({'im_addition': im_addition});
            }
          }, 100);
        }).fail(function() {
          alert("У вас не запущено или не работает дополнение! Прочитайте инструкцию");
          im_addition = false; 
          $("#im_addition").prop('checked', false);
          chrome.storage.local.set({'im_addition': im_addition});
        });
    } else {
      document.getElementById(target_val).scrollIntoView({block: 'center', inline: 'center'});
      click(target_val)
    };
}

console.output = [];
console.log = (function(log) {
  return function() {
    log.apply(console, arguments);
    console.output.push(JSON.stringify(arguments));
    $("#console_log").val(console.output);
    if (console.output.length > 80) {
      console.output = [];
      console.clear();
    }
  }
}(console.log));