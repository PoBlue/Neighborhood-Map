var initLocation = {lat: 21.030708, lng: 105.852405};

function ViewModel() {
	this.map = new google.maps.Map(document.getElementById('map'), {
		center: initLocation,
		zoom: 13
	});
}


function start(){
	ko.applyBindings(new ViewModel());
}

function googleError() {
	alert("failed to get google map resources");
}