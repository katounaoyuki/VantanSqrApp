function Setting(title){
  var self = Ti.UI.createWindow({
    title: title,
    backgroundColor: 'White'
  });
  var wrap = Ti.UI.createScrollView({
    top: 0,
    layout: 'vertical',
    contentWidth: 'auto',
    contentHeight: 'auto'
  });

  var username = Ti.App.Properties.getString("username");
  var password = Ti.App.Properties.getString("password");

  var username_field = Ti.UI.createTextField({
    value: username,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    color: '#336699',
    top: 10, left: 10,
    width: 250, height: 60
  });
  var password_field = Ti.UI.createTextField({
    passwordMask: true,
    hintText:'パスワードを変更する場合は入力してね',
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    color: '#336699',
    top: 10, left: 10,
    width: 250, height: 60
  });
  var password_confirmation_field = Ti.UI.createTextField({
    hintText:'パスワードを変更する場合は入力してね',
    passwordMask: true,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
    color: '#336699',
    top: 10, left: 10,
    width: 250, height: 60
  });
  var update_button = Ti.UI.createButton({
    top: 10,
    title: '更新',
    width: Ti.UI.SIZE,
    height: Ti.UI.SIZE
  });
  wrap.add(username_field);
  wrap.add(password_field);
  wrap.add(password_confirmation_field);
  wrap.add(update_button);

  update_button.addEventListener('click', function(e){

  });

  self.add(wrap);
  return self;
}

module.exports = Setting;
