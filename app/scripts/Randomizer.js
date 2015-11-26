;(function RandomScope(nsp) {
    'use strict';

    var SECOND = 1000;

    var Randomizer = function(items) {
        this.items = items;
        this.randomTimeout = null;
    };

    Randomizer.prototype.getRandomly = function(count, cb) {
        var items = [];

        for (var i = 0; i < count; i++) {
            var item = this.items[_.random(0, this.items.length - 1)];

            if (items.indexOf(item) < 0) {
                cb(item);
                items.push(item);
            } else {
                i--;
            }
        }

        return this;
    };

    Randomizer.prototype.start = function(from, to, cb) {
        this.randomTimeout = setTimeout(function() {
            this.start(from, to, cb);
            cb(this.items[_.random(0, this.items.length - 1)]);
        }.bind(this), _.random(from, to) * SECOND);
        return this;
    };

    Randomizer.prototype.stop = function() {
        clearInterval(this.randomTimeout);
        return this;
    };

    nsp.Randomizer = Randomizer;

})(window.APP);
