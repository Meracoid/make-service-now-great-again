chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  	sendResponse({
      'copy': function() {
        var sandbox = document.getElementById('sandbox');
        sandbox.value = request.value;
        sandbox.select();
        document.execCommand('copy');
        sandbox.value = '';
      },
      '': function() {}
    }[request['action']]());
});

// copies str to clipboard - chrome.extension.getBackgroundPage().copy(str)
function copy(str) {
    var sandbox = document.getElementById('sandbox');
    sandbox.value = str;
    sandbox.select();
    document.execCommand('copy');
    sandbox.value = '';
}