function AppViewModel() {
    this.firstName = ko.observable("hello");
    this.lastName = ko.observable("world");

    this.fullText = ko.pureComputed(function() {
    	return this.firstName() + " " + this.lastName();
    }, this);
}

ko.applyBindings(new AppViewModel());