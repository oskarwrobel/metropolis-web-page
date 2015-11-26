;(function(nsp) {
    'use strict';

    var Lights = function(elements, config) {
        this.randomizer = new nsp.Randomizer(elements.map(function(el) {
            return new nsp.Light(el);
        }));
        this.sensitivityStart = config.sensitivityStart || 2.5;
        this.sensitivityStop = config.sensitivityStop || 6;
        this.onAtStart = this.parseOnAtStartConfig(config.onAtStart);
        this.max = config.max;
    };

    Lights.prototype.parseOnAtStartConfig = function(config) {
        return config === 'half' ? Math.floor(this.randomizer.items.length / 2) : parseInt(config) || 0;
    };

    Lights.prototype.render = function() {
        if (!this.randomizer.items.length) {
            return;
        }

        this.randomizer.getRandomly(this.onAtStart, this.toggle.bind(this));
        this.randomizer.start(this.sensitivityStart, this.sensitivityStop, this.toggle.bind(this));
    };

    Lights.prototype.getTurnedOnLights = function() {
        return _.where(this.randomizer.items, {isOn: true}) || [];
    };

    Lights.prototype.toggle = function(light) {
        if (this.max && this.getTurnedOnLights().length >= this.max && !light.isOn) {
            return;
        }

        light.toggle();
    };

    nsp.Lights = Lights;

})(window.APP);
