;(function(nsp) {
    'use strict';

    var ACTIVE_CLASS = 'active';

    var Light = function(el) {
        this.el = el;
        this.isOn = false;
        this.blink = null;

        if (this.el.dataset.blinkClass) {
            this.blink = new nsp.Blink(this.el, {
                activeClass: this.el.dataset.blinkClass,
                durationTo: 0.8
            });
        }
    };

    Light.prototype.toggle = function() {
        if (this.isOn) {
            this.isOn = false;

            if (this.blink) {
                this.blink.stop();
            }
        } else {
            this.isOn = true;

            if (this.blink && this.isOn) {
                this.blink.start();
            }
        }

        this.el.classList.toggle(ACTIVE_CLASS, this.isOn);
    };

    nsp.Light = Light;

})(window.APP);
