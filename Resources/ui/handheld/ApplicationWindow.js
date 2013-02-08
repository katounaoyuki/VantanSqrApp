function ApplicationWindow(title) {

  var conf = require('Config').conf;

	var self = Ti.UI.createWindow({
		title:title,
		backgroundColor:'white'
	});

  var wrap = Ti.UI.createView({
    layout: 'vertical'
  });
	
	var button = Ti.UI.createButton({
		height:44,
		width:200,
		title:L('openWindow'),
		top:20
	});
	wrap.add(button);
	
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
  wrap.add(table);

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
    var loading = Ti.UI.createView({
      backgroundColor: 'Black',
      opacity: 0.7, top:0, width: Ti.UI.FILL, height: Ti.UI.FILL
    });
    var ind = Ti.UI.createActivityIndicator({message:'削除中', color:'White',width:Ti.UI.SIZE});
    loading.add(ind);
    ind.show();
    self.add(loading);

    var place_id = e.rowData.place.id;
    var Cloud = require('ti.cloud');
    Cloud.debug = true;
    var login_params = {
      login: Ti.App.Properties.getString('username'),
      password: Ti.App.Properties.getString('password')
    };
    Cloud.Users.login(login_params, function(e){
      if(e.success){
        Cloud.Places.remove({place_id: place_id}, function(e){
          self.remove(loading);
        });
      }else{
        self.remove(loading);
      }
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
	
  self.add(wrap);
	return self;
}

module.exports = ApplicationWindow;
