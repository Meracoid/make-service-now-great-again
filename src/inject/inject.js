chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		l('Document loaded, injecting scripts.');
		try {
			configureUpdateSetPicker();
		} catch (e) {
			l('Could not configure update set picker. ', e)
		}
	}
	}, 10);
});

function configureUpdateSetPicker() {
	var pickerIcon = $('.concourse-update-set-picker > div > .icon-document-multiple');
	pickerIcon.click(function() {
		var name = $('select#update_set_picker_select > option:selected')[0].label;
		pickerIcon[0].classList.remove('icon-document-multiple');
		pickerIcon[0].classList.add('icon-article-document');
		setTimeout(function() {
			pickerIcon[0].classList.remove('icon-article-document');
			pickerIcon[0].classList.add('icon-document-multiple');
		}, 200);
		chrome.runtime.sendMessage({
			'action': 'copy',
			'value': /^(.*) \[.*\]$/g.exec(name)[1]
		});
	});
	pickerIcon[0].title = 'Copy current update set to clipboard';
	pickerIcon.before(function () {
		var e = document.createElement('span');
		e.classList.add('label-icon', 'icon-console');
		e.style.marginRight = '10px';
		e.style.cursor = 'pointer';
		e.title = 'Go to current update set';
		e.onclick = function() {
			$("#gsft_main")[0].src = '/sys_update_set.do?sys_id=' + 
				$('select#update_set_picker_select > option:selected').val().split(':')[1];
		}
		return e;
	})
}

function l(message, e) {
	console.log('[MSGA] ' + message);
	e ? console.log('[MSGA] Detail: ' + e) : {};
}