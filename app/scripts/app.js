;(function AppScope(nsp) {
    'use strict';

    var start = function() {
        /**
         * Remove loader and show scene
         */
        document.querySelector('.page-loader').addEventListener(transitionend, function(e) {
            e.target.parentNode.removeChild(e.target);
        });
        document.body.classList.remove('loading');

        /**
         * Initialize parallax
         */
        var scene = document.getElementById('scene');
        var parallax = new Parallax(scene);

        /**
         * Initialize buildings
         */
        var buildings = new nsp.Buildings([].slice.call(document.querySelectorAll('.building')).map(function(buildingEl) {
            return {el: buildingEl};
        }));

        /**
         * Birds
         */
        var birds = new nsp.Motion({
            el: document.getElementById('birds'),
            direction: 'left',
            duration: 50,
            delay: 10
        });
        birds.start();

        /**
         * Info box
         */
        var infoBox = new nsp.JustModal(document.getElementById('info-box'), {
            openKeyCode: 73
        });
        document.getElementById('info-box-trigger').addEventListener('click', infoBox.open.bind(infoBox));

        /**
         * Initialize clouds
         */
        var clouds = new nsp.Clouds([
            {
                el: document.getElementById('cloud-1'),
                duration: 60,
                delay: 0,
                startLeft: 40
            }, {
                el: document.getElementById('cloud-2'),
                duration: 45,
                delay: 10,
                startLeft: 50
            }, {
                el: document.getElementById('cloud-3'),
                duration: 50,
                delay: 25
            }
        ]);
        clouds.start();
    };

    nsp.imagesPreLoader.load(nsp.images).then(start).catch(function(e) {
        window.console.error(e.stack);
    });

})(window.APP);
