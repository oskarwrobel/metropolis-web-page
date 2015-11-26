;(function imagesPreLoaderScope(nsp) {
    'use strict';

    var imagesPreLoader = (function() {
        var CLASS_ERROR = 'error';
        var MIN_LOADING_TIME = 600;

        function loadImage(image) {
            var d = Q.defer();

            function loaded() {
                d.resolve();
            }

            function error() {
                image.classList.add(CLASS_ERROR);
                loaded();
            }

            image.addEventListener('load', loaded);
            image.addEventListener('error', error);

            if (image.complete) {
                loaded();
            }

            return d.promise;
        }

        function createImage(path) {
            var img = document.createElement('img');
            img.src = path;
            return img;
        }

        function load(images) {
            var startTime = +new Date();
            var d = Q.defer();
            var promises = [];

            images.forEach(function(img) {
                promises.push(loadImage(createImage(img)));
            });

            Q.all(promises).then(function() {
                var loadingTime = +new Date() - startTime;
                var delay = loadingTime < MIN_LOADING_TIME ? MIN_LOADING_TIME - loadingTime : 0;

                setTimeout(function() {
                    d.resolve();
                }, delay);
            });

            return d.promise;
        }

        return {
            load: load
        };
    })();

    nsp.imagesPreLoader = imagesPreLoader;

})(window.APP);
