;(function(nsp) {
    'use strict';

    var Buildings = function(buildings) {
        this.collection = [];
        buildings.forEach(this.add.bind(this));
    };

    Buildings.prototype.add = function(data) {
        var building = new nsp.Building(data);
        building.render();
        this.collection.push(building);
    };

    Buildings.prototype.setDarkness = function(value) {
        this.collection.forEach(function(building) {
            building.setDarkness(value);
        });
    };

    nsp.Buildings = Buildings;

})(window.APP);
