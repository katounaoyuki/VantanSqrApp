function Place(){
  var self = Ti.UI.createWindow({
    backgroundColor: 'White'
  });

  var wrap = Ti.UI.createScrollView({
    contentHeight: 'auto',
    contentWidth: 'auto',
    layout: 'vertical'
  });

  Ti.Geolocation.purpose = "あなたの居場所をみんなに言いふらして追い込むため";
  Ti.Geolocation.getCurrentPosition(function(e){
    var latitude, longitude;
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
          if(e.index == 0){
            //camera
          }else if(e.index == 1){
            //ギャラリー
          }
        });
      });

    }
  });

  self.add(wrap);
  return self;
}

module.exports = Place;
