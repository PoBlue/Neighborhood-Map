var initLocation = {lat: 21.030708, lng: 105.852405};
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
	this.wiki = data.search;
	this.content = '<h3>' + self.title() + '</h3>';

	this.marker = new google.maps.Marker({
		position: self.position(),
		map: map,
		title: self.title()
	});
};

function ViewModel() {
	var self = this;

	this.map = new google.maps.Map(document.getElementById('map'), {
		center: initLocation,
		zoom: 13
	});

	this.placesList = ko.observableArray([]);
		placesData.forEach(function(data){

			var placeToAdd = new Place(data, self.map);
			google.maps.event.addListener(placeToAdd.marker, 'click', function(){
				self.clickPlace(placeToAdd);
			});

			self.placesList.push(placeToAdd);
	});

	var infoWindow = new google.maps.InfoWindow();	
	this.clickPlace = function(place){
		infoWindow.setContent(place.content);
		infoWindow.open(this.map, place.marker);
		place.animate();
	};

}


function start(){
	ko.applyBindings(new ViewModel());
}

function googleError() {
	alert("failed to get google map resources");
}