temp_block = "<block>";
temp_block_2 = "<block_2>";
temp_next = "<close_tab_no_load>";
temp_next_task = "<next_task>";
stat = true;
class Android {
	next() {
		if (stat == true) {
			stat = false;
	   		sync_data(temp_next);
	   		temp_block = "<close_tab_no_load_temp>";
   		}
	}

	next_task() {
		if (stat == true) {
			stat = false;
			sync_data(temp_next_task);
	   		temp_block = "<next_task_temp>";
   		}
	}

	next_task_2() {
		sync_data("<next_task>");
	}

	check_task() {
		if (stat == true) {
			stat = false;
      		sync_data("<check_task>");
  		}
	}

	block(val) {
		stat = false;
		sync_data(temp_block+";"+val);
		temp_block = "<block_temp>";
	}

	block_2(val) {
		stat = false;
		sync_data(temp_block_2+";"+val);
		temp_block = "<block_temp>";
	}

	add_acc() {
		sync_data("<add_acc>");
	}

	clear_acc() {
		sync_data("<clear_acc>");
	}

	login_cookie_acc(val) {
		sync_data("<login_cookie_acc>;"+val);
	}

	addition(val) {
		sync_data("<addition>;"+val);
	}
}

let android = new Android();

/// Синхронизация 
function sync_data(val) {
	val = val+";"+"<social>";
	chrome.storage.local.set({
	  	data: val
	});
}