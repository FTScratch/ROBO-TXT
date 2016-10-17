
var IO = {

	// the URL of the host application interfacing the ROBO-LT
	host: 'http://localhost:8000/',
	
	// the latest result of updateStatus()
	status: {status: 1, msg: 'Connecting'},
	
	// request timeout after x msec
	timeout: 500,

	// get the current time as string
	getTimeString: function() {
		var d = new Date();
		var h = d.getHours();	h = (h<10) ? ('0'+h) : (h);
		var m = d.getMinutes();	m = (m<10) ? ('0'+m) : (m);
		var s = d.getSeconds();	s = (s<10) ? ('0'+s) : (s);
		return '(' + h + ':' + m + ':' + s + ') ';
	},
	
	// ping the host application
	updateStatus: function() {
		try {
			var time = this.getTimeString();
			var self = this;
			this.doGet('status')
				.done( function(dev)	{self.status = {status: 2, msg: time + dev[0]};} )							// app responded
				.fail( function()		{self.status = {status: 0, msg: time + 'Application not responding'};} );	// app did not respond within timeout
		} catch (err) {return {status: 1, msg: 'Connecting'};}
		return this.status;
	},

	// POST the given command and corresponding values to the host application
	doPost: function(command, values) {
		return $.ajax({
              async: true,
			  url: this.host + command,
              dataType: 'json',
			  method: 'POST',
			  data: JSON.stringify(values),
			  crossDomain: true,
        });
	},
	
	// GET the given command and return the response data from the host application
	doGet: function(command) {
		return $.ajax({
              async: true,
			  timeout: this.timeout,
			  url: this.host + command,
              dataType: 'json',
			  method: 'GET',
			  crossDomain: true,
        });
	},

	
};
