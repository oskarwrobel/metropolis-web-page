;(function(global) {
    'use strict';

    global.transitionend = global.transitionEnd = (function() {
        var i;
        var el = document.createElement('div');
        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

        for (i in transitions) {
            if (transitions.hasOwnProperty(i) && typeof el.style[i] !== 'undefined') {
                return transitions[i];
            }
        }

        //TODO: throw 'TransitionEnd event is not supported in this browser';
    })();

})(window);
