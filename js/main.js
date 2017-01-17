var initLocation = {lat: 21.030708, lng: 105.852405};
var wikiURL ='https://en.wikipedia.org/w/api.php?action=opensearch&format=json&callback=wikiCallBack&search=';
var infoWindow; 
var filterText = ko.observable("");

var placesData = 
[
	{
		position: {lat: 21.023418, lng: 105.8516438},
		title: "Vietnamese Women's Museum",
		search: "Vietnamese Women's Museum"
	},
	{
		position: {lat: 21.030708, lng: 105.852405},
		title: "Hoan Kiem Lake",
		search: "Hoàn Kiếm Lake"
	},
	{
		position: {lat: 21.035302, lng: 105.849257},
		title: "Old Quarter",
		search: "Hoàn Kiếm District"
	},
	{
		position: {lat: 21.036713, lng: 105.834731},
		title: "Ho Chi Minh Mausoleum",
		search: "Ho Chi Minh Mausoleum"
	},
	{
		position: {lat: 21.047953, lng: 105.836979},
		title: "Pagoda Trấn Quốc",
		search: "Trấn Quốc Pagoda"
	}
];

var Place = function(data, map){
	var self = this;
	this.position = ko.observable(data.position);
	this.title = ko.observable(data.title);
	this.wikiValue = data.search;
	this.content = '<h3>' + self.title() + '</h3>';

	this.marker = new google.maps.Marker({
		position: self.position(),
		title: self.title()
	});

	google.maps.event.addListener(self.marker, 'click', function(){
		self.showInfo();
	});

	$.ajax({
		url: wikiURL+self.wikiValue,
		dataType: 'jsonp',
		timeout: 1000
	}).done(function(data) {
		  self.content = '<h3>' + self.title() + '</h3>'+'<p>' + data[2][0] + '<span> more on' + '<a href=' + data[3][0] + ' target="blank"> Wikipedia</a></p>';
	}).fail(function(jqXHR, textStatus){
			alert("failed to get wikipedia resources");
	});

	this.showInfo = function() {
		infoWindow.setContent(self.content);
		infoWindow.open(map, self.marker);
	}	

	this.visible = ko.computed(function(){
		if (filterText().length > 0){
			return (self.title().toLowerCase().indexOf(filterText().toLowerCase()) > -1);
		}
		else{
			return true;
		}
	});

	this.setMarker = ko.computed(function(){
		if (self.visible()) {
			self.marker.setMap(map);
		} else {
			self.marker.setMap(null);
		}
	});
};

function ViewModel() {
	var self = this;

	this.placesList = ko.observableArray([]);
	this.map = initMap();

	placesData.forEach(function(data){
		var placeToAdd = new Place(data, self.map);
		self.placesList.push(placeToAdd);
	});

	this.filterList = ko.computed(function() {
		var filtered = [];
		self.placesList().forEach(function(place){
			if (place.visible()) {
				filtered.push(place);
			}
		});	
		return filtered;
	});

	this.resultClickHandler = function(place, event){
		place.showInfo();
	}

}

function initMap() {
	return new google.maps.Map(document.getElementById('map'), {
		center: initLocation,
		zoom: 13
	});
}


function start(){
	infoWindow = new google.maps.InfoWindow();	
	ko.applyBindings(new ViewModel());
}

function googleError() {
	alert("failed to get google map resources");
}