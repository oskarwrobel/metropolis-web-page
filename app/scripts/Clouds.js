;(function CloudsScope(nsp) {
    'use strict';

    var Clouds = function(clouds) {
        this.collection = [];
        clouds.forEach(this.add.bind(this));
    };

    Clouds.prototype.add = function(data) {
        this.collection.push(new nsp.Motion(data));
    };

    Clouds.prototype.start = function() {
        this.collection.forEach(function(cloud) {
            cloud.start();
        }.bind(this));
    };

    Clouds.prototype.update = function() {

    };

    nsp.Clouds = Clouds;

})(window.APP);
