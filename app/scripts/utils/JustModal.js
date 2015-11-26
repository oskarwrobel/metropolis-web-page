;(function(nsp) {
    'use strict';

    var ACTIVE_CLASS = 'active';
    var ESC = 27;

    var DEFAULTS = {
        openKeyCode: null
    };

    var JustModal = function(el, options) {
        this.el = el;
        this.options = _.defaults(options || {}, DEFAULTS);
        this.backdropEl = this.el.querySelector('.just-modal-backdrop');
        this.closeEl = this.el.querySelector('.close');
        this.eventRefs = {};
        this.isOpen = false;

        this.attachEvents();
    };

    JustModal.prototype.open = function(e) {
        if (e) {
            e.preventDefault();
        }

        this.isOpen = true;
        this.el.classList.add(ACTIVE_CLASS);
        this.eventRefs.close = this.close.bind(this);
        this.backdropEl.addEventListener('click', this.eventRefs.close);
        this.closeEl.addEventListener('click', this.eventRefs.close);
    };

    JustModal.prototype.close = function(e) {
        if (e) {
            e.preventDefault();
        }

        this.isOpen = false;
        this.el.classList.remove(ACTIVE_CLASS);
        this.backdropEl.removeEventListener('click', this.eventRefs.close);
        this.closeEl.removeEventListener('click', this.eventRefs.close);
    };

    JustModal.prototype.toggle = function() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    };

    JustModal.prototype.keyDownHandler = function(e) {
        if (e.keyCode === ESC) {
            return this.close();
        }

        if (this.options.openKeyCode && e.keyCode === this.options.openKeyCode) {
            this.toggle();
        }
    };

    JustModal.prototype.attachEvents = function() {
        if (this.options.openKeyCode) {
            this.eventRefs.keyDownHandler = this.keyDownHandler.bind(this);
            window.addEventListener('keydown', this.eventRefs.keyDownHandler);
        }
    };

    JustModal.prototype.destroy = function() {
        this.removeEvents();
    };

    JustModal.prototype.removeEvents = function() {
        window.removeEventListener('keydown', this.eventRefs.keyDownHandler);
    };

    nsp.JustModal = JustModal;

})(window.APP);
