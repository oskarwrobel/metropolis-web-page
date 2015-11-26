;(function(nsp) {
    'use strict';

    var DEFAULTS = {
        activeClass: 'active',
        sensitivityFrom: 8,
        sensitivityTo: 12,
        durationFrom: 0.4,
        durationTo: 1
    };

    var SECOND = 1000;

    var Blink = function(el, data) {
        this.el = el;

        data = _.defaults(_.defaults(data || {}, this.getDatasetConfig()), DEFAULTS);
        this.activeClass = data.activeClass;
        this.sensitivityFrom = data.sensitivityFrom;
        this.sensitivityTo = data.sensitivityTo;
        this.durationFrom = data.durationFrom;
        this.durationTo = data.durationTo;
        this.timeout = null;
    };

    Blink.prototype.getDatasetConfig = function() {
        return _.reduce(DEFAULTS, function(result, val, key) {
            var data = this.el.dataset[key];
            if (data) {
                result[key] = data;
            }
            return result;
        }.bind(this), {});
    };

    Blink.prototype.start = function() {
        this.timeout = setTimeout(function() {
            this.blink(this.start.bind(this));
        }.bind(this), _.random(this.sensitivityFrom, this.sensitivityTo) * SECOND);
    };

    Blink.prototype.stop = function() {
        clearTimeout(this.timeout);
        this.el.classList.remove(this.activeClass);
    };

    Blink.prototype.blink = function(cb) {
        this.el.classList.add(this.activeClass);
        setTimeout(function() {
            this.el.classList.remove(this.activeClass);
            cb();
        }.bind(this), _.random(this.durationFrom, this.durationTo) * SECOND);
    };

    nsp.Blink = Blink;

    [].forEach.call(document.querySelectorAll('[data-blink]'), function(el) {
        (new Blink(el)).start();
    });

})(window.APP);
