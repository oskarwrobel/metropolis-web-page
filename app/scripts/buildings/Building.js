;(function(nsp) {
    'use strict';

    var Building = function(data) {
        this.el = data.el;
        this.lights = new nsp.Lights([].slice.call(this.el.querySelectorAll('.light')), {
            sensitivityStart: data.lightsSensitivityStart || parseInt(this.el.dataset.lightsSensitivityStart),
            sensitivityStop: data.lightsSensitivityStop || parseInt(this.el.dataset.lightsSensitivityStop),
            onAtStart: data.lightsOnAtStart || this.el.dataset.lightsOnAtStart,
            max: data.maxLights || this.el.dataset.maxLights
        });
    };

    Building.prototype.render = function() {
        this.lights.render();
    };

    nsp.Building = Building;

})(window.APP);
