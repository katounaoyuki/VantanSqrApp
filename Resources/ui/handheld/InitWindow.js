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

  var password_field = Ti.UI.createTextField({
    passwordMask: true,
    hintText:'パスワードを入力してね',
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    color: '#336699',
    top: 10, left: 10,
    width: 250, height: 60
  });

  var password_confirmation_field = Ti.UI.createTextField({
    passwordMask: true,
    hintText:'確認のためにもう一度パスワードを入力してね',
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    color: '#336699',
    top: 10, left: 10,
    width: 250, height: 60
  });

  var submitButton = Ti.UI.createButton({
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE,
    title: '登録',
    top: 10
  });
  view.add(textField);
  view.add(password_field);
  view.add(password_confirmation_field);
  view.add(submitButton);

  submitButton.addEventListener('click', function(e){
    if(Ti.Network.online){
      var Cloud = require('ti.cloud');
      Cloud.debug = true;
      var username = textField.value;
      var password = password_field.value;
      var password_confirmation = password_confirmation_field.value;
      var params = {
        username: username,
        password: password,
        password_confirmation: password_confirmation
      };

      function validate(p){
        alert(p);
        var error_messages = [];
        if(p.username === ""){
          error_messages.push("ユーザー名を入れろ");
        }
        if(p.password.length < 4){
          error_messages.push("パスワードが短すぎます（4文字以上でお願いします）");
        }
        if(p.password.length > 20){
          error_messages.push("ええ、安全第一ですけど、いくらなんでもパスワードが長いです");
        }
        if(p.password != p.password_confirmation){
          error_messages.push("パスワードが一致していません");
        }
        return error_messages;
      }

      var error_messages = validate(params);

      if(error_messages.length <= 0){
        //alert(params);
        Cloud.Users.create(params, function(e){
          if(e.success){
            //登録成功
            Ti.App.Properties.setString('username', username);
            Ti.App.Properties.setString('password', password);
            var Tutrial = require('ui/handheld/TutrialWindow');
            var tutrial = new Tutrial();
            tutrial.addEventListener('close', function(){
              self.close();
            });
            tutrial.open();
          }else{
            //登録失敗のエラー処理
            alert(e.message);
          }
        });
      }else{
        alert(error_messages.join("\n"));
      }
    }else{
      alert("ごめんね、ネットワークが繋がってないみたい。調べてみて！");
    }
  });
	
  self.add(view);
	
	return self;
}

module.exports = InitWindow;
