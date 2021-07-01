$(document).ready(function() {
	if ($("#login").length > 0) {
		sync_data("<update>");
	}
});

/// Синхронизация 
function sync_data(val) {
  val = val+";"+"<script-2>";
  chrome.storage.local.set({
      data: val
  });
}