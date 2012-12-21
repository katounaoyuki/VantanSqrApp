function InitWindow(title) {

  var conf = require('Config').conf;

	var self = Ti.UI.createWindow({
		title:title,
    layout:'vertical',
		backgroundColor:'white'
	});

  var view = Ti.UI.createScrollView({
    layout:'vertical',
    contentWidth: 'auto',
    contentHeight: 'auto',
    showVerticalScrollIndicator: true
  });

  var label = Ti.UI.createLabel({
    top:10,
    left:10,
    right:10,
    height:Ti.UI.Size,
    text: "世界最高のパクリアプリ『5Square』をご利用いただきありがとうございます！このアプリを利用するにはユーザー登録が必要です。登録された情報は２ちゃんねるに勝手に書き込んだり第三者に金のために売り渡したりはしません（今のところ）。ユーザー名は半角英数字で４文字以上、１５文字以内で登録してください。"
  });
  view.add(label);

  var textField = Ti.UI.createTextField({
    hintText:'ユーザー名を登録してね（半角英数字）',
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    color: '#336699',
    top: 10, left: 10,
    width: 250, height: 60
  });

  textField.addEventListener('return', function(e){
    var username = e.value;

    if(Ti.Network.online){
      var url = "http://" + conf.host + "/users";
      var http = Ti.Network.createHTTPClient({timeout:10000});
      http.onload = function(){
        var response = http.responseText;
        if(response == conf.response_ok){
          Ti.App.Properties.setString(conf.username, username);

          var Tutrial = require('ui/handheld/TutrialWindow');
          var tutrial = new Tutrial();
          tutrial.open();
          tutrial.addEventListener('close', function(){
            self.close();
          });
        }else{
          //エラー処理
          alert(response);
        }
      };
      http.onerror = function(e){alert("エラー！")};
      http.open('POST', url);
      http.send({"user[username]":username});
    }else{
      alert("ごめんね、ネットワークが繋がってないみたい。調べてみて！");
    }
  });
	
  view.add(textField);
  self.add(view);
	
	return self;
};

module.exports = InitWindow;
