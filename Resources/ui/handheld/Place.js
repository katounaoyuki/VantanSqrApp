function Place(){
  var self = Ti.UI.createWindow({
    backgroundColor: 'White'
  });

  var wrap = Ti.UI.createView({
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
    }
  });

  self.add(wrap);
  return self;
}

module.exports = Place;
