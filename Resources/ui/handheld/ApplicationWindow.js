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
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		}));
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


  var url = "http://" + conf.host + "/places.json";
  var http = Ti.Network.createHTTPClient({timeout:10000});
  function onLoad(){
    var json_data = http.responseText;
    var response = JSON.parse(json_data);
    var len = response.length;
    var data = [];
    for(var i = 0; i < len; i++){
        data.push({title:response[i].address, place:response[i]});
    }
    table.setData(data);
  }
  http.onload = onLoad;
  http.open('GET', url);
  http.send();
	
	return self;
};

module.exports = ApplicationWindow;
