function ApplicationWindow(title) {

  var conf = require('Config').conf;

	var self = Ti.UI.createWindow({
		title:title,
    layout:'vertical',
		backgroundColor:'white'
	});
	
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	self.add(button);
	
	button.addEventListener('click', function() {
    var Window = require('ui/handheld/Place');
    var window = new Window();
    self.containingTab.open(window);
	});

  var data = [];
  var table = Ti.UI.createTableView({
    top:10
  });
  table.setData(data);
  self.add(table);

  table.addEventListener('click', function(e){
    var place = e.rowData.place;
    var Window = require('ui/handheld/Map');
    var window = new Window(place);
    self.containingTab.open(window);
  });


  function onLoad(e){
    if(e.success){
      var response = e.places;
      var len = response.length;
      var data = [];
      for(var i = 0; i < len; i++){
          data.push({title:response[i].address, place:response[i]});
      }
      table.setData(data);
    }
  }
  var Cloud = require('ti.cloud');
  var login_params = {
    login: Ti.App.Properties.getString('username'),
    password: Ti.App.Properties.getString('password')
  };
  Cloud.Users.login(login_params, function(){
    Cloud.Places.query({}, onLoad);
  });
	
	return self;
}

module.exports = ApplicationWindow;
