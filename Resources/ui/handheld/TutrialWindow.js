function TutrialWindow(){
  var self = Ti.UI.createWindow({
    backgroundColor:'White'
  });

  var close_button = Ti.UI.createButton({
    title:'Close',
    height:Ti.UI.SIZE,
    width:Ti.UI.SIZE
  });
  close_button.addEventListener('click', function(e){
    self.close();
  });
  self.add(close_button);

  return self;
}

module.exports = TutrialWindow;
