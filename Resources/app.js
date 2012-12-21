if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

(function() {
  function startup(){
	  var Window;
	  Window = require('ui/handheld/ApplicationWindow');
	  var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	  new ApplicationTabGroup(Window).open();
  }

  function init_window(){
    var Window;
	  Window = require('ui/handheld/InitWindow');
    var init = new Window();
    init.addEventListener('close', function(){
      startup();
    });
    init.open();
  }

  //usernameが保存されていなければ初回起動画面を表示
  if(Ti.App.Properties.hasProperty('username')){
    startup();
  }else{
    init_window();
  }

})();
