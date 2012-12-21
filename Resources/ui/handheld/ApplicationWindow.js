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
		//containingTab attribute must be set by parent tab group on
		//the window for this work
		self.containingTab.open(Ti.UI.createWindow({
			title: L('newWindow'),
			backgroundColor: 'white'
		}));
	});

  var data = [];
  //data.push({title:'東京都練馬区谷原0-0-0', user:{username:'yagi1'}});
  //data.push({title:'東京都練馬区谷原1-1-1', user:{username:'yagi2'}});
  //data.push({title:'東京都練馬区谷原2-2-2', user:{username:'yagi3'}});
  var table = Ti.UI.createTableView({
    top:10
  });
  table.setData(data);
  self.add(table);

  var url = "http://" + conf.host + "/places.json";
  var http = Ti.Network.createHTTPClient({timeout:10000});
  function onLoad(){
    var json_data = http.responseText;
    var response = JSON.parse(json_data);
    var len = response.length;
    var data = [];
    for(var i = 0; i < len; i++){
        data.push({title:response[i].address, user:response[i].user});
    }
    table.setData(data);
  }
  http.onload = onLoad;
  http.open('GET', url);
  http.send();
	
	return self;
};

module.exports = ApplicationWindow;
