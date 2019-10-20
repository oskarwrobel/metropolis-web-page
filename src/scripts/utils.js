/* eslint-env browser */

export function loadImages( images, onProgress ) {
	let loadedImages = 0;

	return Promise.all( images.map( imagePath => {
		return new Promise( ( resolve, reject ) => {
			const imageElement = new Image();

			imageElement.addEventListener( 'load', () => {
				onProgress( ( ++loadedImages * 100 ) / images.length );
				resolve();
			} );
			imageElement.addEventListener( 'error', reject );
			imageElement.src = imagePath;
		} );
	} ) );
}

export function horizontalMove( element, direction, duration, delay ) {
	repeat( async () => {
		const elementWidth = element.clientWidth;
		const leftBound = -elementWidth + 'px';
		const rightBound = `calc( 100% + ${ elementWidth }px )`;

		element.style.width = element.clientWidth + 'px';

		await requestAnimationFramePromise( () => {
			element.style.transition = null;
		} );

		await requestAnimationFramePromise( () => {
			element.style.left = ( direction === 'right' ? leftBound : rightBound );
		} );

		await wait( delay );

		await requestAnimationFramePromise( () => {
			element.style.transition = `left ${ duration }s linear ${ delay }s`;
		} );

		await requestAnimationFramePromise( () => {
			element.style.left = ( direction === 'right' ? rightBound : leftBound );
		} );
	}, () => duration + delay );
}

export function blink( element, getBlinkingDuration, getRepeatDelay ) {
	repeat( async () => {
		element.classList.add( 'blink' );
		await wait( getBlinkingDuration() );
		element.classList.remove( 'blink' );
	}, getRepeatDelay );
}

export function random( min, max ) {
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

export function wait( time ) {
	return new Promise( resolve => setTimeout( resolve, time * 1000 ) );
}

export function repeat( callback, getRepeatDelay, howMany = Infinity ) {
	let repeatCounter = 0;

	callback();

	if ( howMany !== Infinity ) {
		repeatCounter++;

		if ( repeatCounter > howMany ) {
			return;
		}
	}

	setTimeout( () => {
		repeat( callback, getRepeatDelay );
	}, getRepeatDelay() * 1000 );
}

export function requestAnimationFramePromise( cb ) {
	return new Promise( resolve => requestAnimationFrame( () => {
		cb();
		resolve();
	} ) );
}
