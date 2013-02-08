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
    editable: true,
    top:10
  });
  table.setData(data);
  self.add(table);

  var edit_button = Ti.UI.createButton({
    systemButton: Ti.UI.iPhone.SystemButton.EDIT
  });

  var cancel_button = Ti.UI.createButton({
    systemButton: Ti.UI.iPhone.SystemButton.CANCEL
  });

  self.rightNavButton = edit_button;
  edit_button.addEventListener('click', function(e){
    table.editing = true;
    self.rightNavButton = cancel_button;
  });
  cancel_button.addEventListener('click', function(e){
    table.editing = false;
    self.rightNavButton = edit_button;
  });

  table.addEventListener('delete', function(e){
    var place_id = e.rowData.place.id;
    var Cloud = require('ti.cloud');
    Cloud.debug = true;
    var login_params = {
      login: Ti.App.Properties.getString('username'),
      password: Ti.App.Properties.getString('password')
    };
    Cloud.Users.login(login_params, function(e){
      Cloud.Places.remove({place_id: place_id}, function(e){
        alert(e);
      });
    });
  });

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
  self.addEventListener('focus', function(){
    var Cloud = require('ti.cloud');
    var login_params = {
      login: Ti.App.Properties.getString('username'),
      password: Ti.App.Properties.getString('password')
    };
    Cloud.Users.login(login_params, function(){
      Cloud.Places.query({per_page: 50, order:"-created_at"}, onLoad);
    });
  });
	
	return self;
}

module.exports = ApplicationWindow;
