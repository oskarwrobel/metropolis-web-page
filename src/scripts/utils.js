/* eslint-env browser */

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
