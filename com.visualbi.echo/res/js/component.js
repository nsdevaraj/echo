define(["sap/designstudio/sdk/component","css!../css/component.css","./socket"], function(Component, css,io) {
	Component.subclass("com.visualbi.echo.Echo", function() {

		var that = this;
		var this_dashboardinfo='sample;working;fine';
		var this_maxmininfo='Product A has the highest Revenue and Product B has the lowest Revenue;Region A has the highest profit and Region B has the lowest Profit.';
		var this_url='http://localhost:3000/';
		var socket;

		this.init = function() {			
			this.$().hide();
			this.$().click(function() {
				that.fireEvent("onclick");
			});
		
			this.$().append('<div id="messages"/>');
			
			console.log(this_url)
			
			socket = io.connect(this_url);
			
			socket.on('open', function(msg){
				console.log('app opened');
		      });
			socket.on('view',function(data){
				console.log(data);
				that.callZTLFunction('setview', function(value) {
					//	alert(value);
					},data);
			});
			socket.on('zoom',function(data){
				console.log(data);
				that.callZTLFunction('setzoom', function(value) {
					//	alert(value);
					},data);
			});
			
			
			socket.on('kpi',function(data){
				console.log(data);
				that.callZTLFunction('kpisummary', function(value) {
					//	alert(value);
					},data);
			});
			
			socket.on('locationfilter',function(data){
				console.log(data);
				that.callZTLFunction('locationfilter', function(value) {
					//	alert(value);
					},data);
			});
			
			
			
			socket.on('filter',function(data){
				console.log(data);
				var dimname=data.split(':');
				that.callZTLFunction('filterDim', function(value) {
					//	alert(value);
					},dimname[0],dimname[1]);
			});
			
			
			socket.on('stop',function(data){
				console.log(data);
				that.callZTLFunction('restart', function(value) {
					//	alert(value);
					});
			});
			  
		};
		
		this.afterUpdate=function(){
			setTimeout(function(){socket.emit('userdashboardinfo', this_dashboardinfo); }, 1000);
		};
		
		this.url=function(value){
			if (value === undefined) {
				return this_url;
			} else {
				this_url=value;
				return this_url;
			}
		}
		

		this.dashboardinfo=function(value){
			if (value === undefined) {
				return this_dashboardinfo;
			} else {
				this_dashboardinfo=value;
				return this_dashboardinfo;
			}
		}
		
		this.maxmininfo=function(value){
			if (value === undefined) {
				return this_maxmininfo;
			} else {
				this_maxmininfo=value;
				return this_maxmininfo;
			}
		}
		
	});	
});
    
