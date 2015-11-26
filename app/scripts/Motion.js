;(function(nsp) {
    'use strict';

    var Motion = function(data) {
        this.el = data.el;
        this.width = this.el.clientWidth;
        this.duration = data.duration || 10;
        this.delay = data.delay | 0;
        this.repeatDelay = data.repeatDelay | 0;
        this.ease = data.ease || Linear.easeNone;
        this.position = data.position | 0;
        this.direction = data.direction || 'right';
        this.tween = null;
    };

    Motion.prototype.start = function() {
        if (this.direction === 'left') {
            this.el.style.left = window.innerWidth + this.width + 'px';
        }

        this.tween = TweenMax.to(this.el, this.duration, {
            x: this.direction === 'right' ? window.innerWidth + this.width : -(window.innerWidth + this.width),
            delay: this.delay,
            repeatDelay: this.repeatDelay,
            ease: this.ease,
            repeat: Infinity
        });

        return this.tween;
    };

    Motion.prototype.stop = function() {
        if (this.tween) {
            this.tween.kill();
        }
    };

    nsp.Motion = Motion;

})(window.APP);
