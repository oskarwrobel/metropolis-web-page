;(function MouseMoveTriggerScope(nsp) {
    'use strict';

    var DEFAULT_OPTIONS = {
        el: window,
        from: 0,
        to: 100,
        duration: 5, //seconds
        freezeTimeout: 10,
        repeatDelay: 3
    };

    var SECOND = 1000;

    var MouseMoveTrigger = function(options) {
        this.options = _.defaults(options, DEFAULT_OPTIONS);
        this.tween = null;
        this.moveTimeout = null;
        this.x = null;
        this.y = null;
        this.direction = {
            x: 'right',
            y: 'top'
        };
        this.lastMousePosition = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
        this.eventsRefs = {};
    };

    MouseMoveTrigger.prototype.start = function() {
        //this.attachEvents();
        this.moveStopped();
    };

    MouseMoveTrigger.prototype.attachEvents = function() {
        this.eventsRefs.handleMouseMove = this.handleMouseMove.bind(this);
        window.addEventListener('mousemove', this.eventsRefs.handleMouseMove);
    };

    MouseMoveTrigger.prototype.handleMouseMove = function(e) {
        if (this.tween) {
            this.tween.kill();
        }

        clearTimeout(this.moveTimeout);
        this.direction = this.detectDirection(e);
        this.moveStopped();
    };

    MouseMoveTrigger.prototype.moveStopped = function() {
        this.moveTimeout = setTimeout(this.autoPlay.bind(this), this.options.freezeTimeout * SECOND);
    };

    MouseMoveTrigger.prototype.autoPlay = function() {
        var fullDistance = this.options.to - this.options.from;
        var distanceLeft;
        var to;

        if (this.direction.x === 'left') {
            distanceLeft = this.lastMousePosition.x - this.options.from;
            to = this.options.from;
        } else {
            distanceLeft = this.options.to - this.lastMousePosition.x;
            to = this.options.to;
        }
        var timeLeft = distanceLeft * this.options.duration / fullDistance;

        var data = {x: this.lastMousePosition.x};
        this.tween = TweenMax.to(data, timeLeft, {
            x: to,
            repeat: Infinity,
            yoyo: true,
            repeatDelay: this.options.repeatDelay,
            onUpdate: function() {
                this.dispatch(data.x, this.lastMousePosition.y);
            }.bind(this),
            onComplete: function() {
                this.tween.duration(this.options.duration);
            }.bind(this),
            ease: Power0.easeNone
        });
    };

    MouseMoveTrigger.prototype.dispatch = function(x, y) {
        document.dispatchEvent(new MouseEvent('mousemove', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y
        }));
    };

    MouseMoveTrigger.prototype.detectDirection = function(e) {
        var direction = {
            x: this.lastMousePosition.x > e.clientX ? 'left' : 'right',
            y: this.lastMousePosition.y > e.clientY ? 'top' : 'bottom'
        };

        this.lastMousePosition = {
            x: e.clientX,
            y: e.clientY
        };

        return direction;
    };

    nsp.MouseMoveTrigger = MouseMoveTrigger;

})(window.APP);
