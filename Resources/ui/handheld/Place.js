function Place(){

  var image_to_send;
  var address;
  var http = Ti.Network.createHTTPClient({timeout:10000});

  var self = Ti.UI.createWindow({
    backgroundColor: 'White'
  });

  var wrap = Ti.UI.createScrollView({
    contentHeight: 'auto',
    contentWidth: 'auto',
    layout: 'vertical'
  });

  var latitude, longitude;
  Ti.Geolocation.purpose = "あなたの居場所をみんなに言いふらして追い込むため";
  Ti.Geolocation.getCurrentPosition(function(e){
    if(e.error){
      //TODO ごめん
      var image = Ti.UI.createImageView({
        top: 0,
        image:'/images/error_cat.jpg',
        width: Ti.UI.FILL
      });
      wrap.add(image);
      wrap.add(Ti.UI.createLabel({
        text:'現在位置を取得できると思ったか？',
        top:20
      }));
    }else{
      latitude = e.coords.latitude;
      longitude = e.coords.longitude;
      function open_map(){ //ReverseGeocorderが成功したら実行
        var result = JSON.parse(http.responseText);
        address = result.results[0].formatted_address;
        var map = Ti.Map.createView({
          top: 0,
          width: Ti.UI.FILL,
          height: Ti.Platform.displayCaps.platformHeight / 3,
          mapType: Titanium.Map.STANDARD_TYPE,
          animate:true,
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          },
          regionFit:true,
          userLocation:true
        });
        wrap.add(map);
        //コメントを投稿する
        var textArea = Ti.UI.createTextArea({
          hintText:'コメントを投稿',
          top: 5,
          left: 10,
          right: 10,
          height: 80,
          borderColor: '#bbb',
          borderRadius: 5,
          borderWidth: 2,
          borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
        });
        wrap.add(textArea);
        //写真を投稿するよ
        var button = Ti.UI.createButton({
          top: 10,
          title: '写真を送る',
          width: Ti.UI.SIZE,
          height: Ti.UI.SIZE
        });
        wrap.add(button);
        button.addEventListener('click', function(e){
          var dialog = Ti.UI.createOptionDialog({
            options: ['カメラで撮影', 'ライブラリから選ぶ', 'キャンセル'],
            cancel: 2
          });
          dialog.show();
          dialog.addEventListener('click', function(e){
            if(e.index === 0){
              alert("実機じゃないし");
            }else if(e.index === 1){
              //ギャラリー
              Ti.Media.openPhotoGallery({
                error: function(){alert("隊長！エラーです！");},
                success: function(e){
                  var height = e.media.height;
                  var width = e.media.width;
                  image_to_send = e.media.imageAsResized(width/3, height/3);
                }
              });
            }
          });
        });
        var submit_button = Ti.UI.createButton({
          top: 10,
          width: Ti.UI.SIZE,
          height: Ti.UI.SIZE,
          title: '投稿する'
        });

        submit_button.addEventListener('click', function(){
          //ログインしたらPlacesに投稿
          login_params = {
            login: Ti.App.Properties.getString('username'),
            password: Ti.App.Properties.getString('password')
          };
          var Cloud = require('ti.cloud');
          Cloud.debug = true;
          Cloud.Users.login(login_params, function(e){
            if(e.success){
              var place_params = {
                name: address,
                user_id: e.id,
                address: address,
                latitude: latitude,
                longitude: longitude,
                photo: image_to_send
              };
              Cloud.Places.create(place_params, function(e){
                if(e.success){
                  self.close();
                }else{
                  alert(e);
                }
              });
            }else{
              alert(e);
            }
          });
        });
        wrap.add(submit_button);
      }
      function get_lang(){
        var lang = Ti.Platform.locale;
        if(lang == 'zh_hans'){
          lang = 'zh-CN';
        }
        if(lang == 'zh_hant'){
          lang = 'zh-TW';
        }
        return lang;
      }
      var url = "http://maps.google.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true&language=" + get_lang();
      http.onload = open_map;
      http.error = function(e){alert(e);};
      http.open('GET', url);
      http.send();
    }
  });


  self.add(wrap);
  return self;
}

module.exports = Place;
