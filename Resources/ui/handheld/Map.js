function Map(place){
  Ti.API.info(JSON.stringify(place));
  var self = Ti.UI.createWindow({
    backgroundColor: 'White',
    title: '地図',
    layout: 'vertical',
    tabBarHidden: true
  });

  var wrap = Ti.UI.createScrollView({
    layout: 'vertical',
    contentWidth: 'auto',
    contentHeight: 'auto',
    width: Ti.UI.FILL,
    height: Ti.UI.SIZE
  });

  var annotation = Ti.Map.createAnnotation({
    pincolor: Titanium.Map.ANNOTATION_GREEN,
    title: place.user.username,
    latitude: place.latitude,
    longitude: place.longitude
  });

  var map = Ti.Map.createView({
    width: Ti.UI.FILL,
    height: Ti.Platform.displayCaps.platformHeight / 2.5,
    annotations: [annotation],
    mapType: Titanium.Map.STANDARD_TYPE,
    animate:true,
    region: {
      latitude: place.latitude,
      longitude: place.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    },
    regionFit:true,
    userLocation:false
  });
  wrap.add(map);

  if(place.comment){
    wrap.add(Ti.UI.createLabel({
      text: place.comment,
      top: 5,
      height: Ti.UI.SIZE,
      left: 10,
      right: 10
    }));
  }

  if(place.photo){
    wrap.add(Ti.UI.createImageView({
      image: place.photo.urls.original,
      top: 5,
      width: Ti.Platform.displayCaps.platformWidth,
      height: Ti.UI.SIZE
    }));
  }

  self.add(wrap);

  return self;

}

module.exports = Map;
