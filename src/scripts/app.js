/* eslint-env browser */

import Parallax from 'parallax-js';
import { random, repeat, wait, requestAnimationFramePromise } from './utils';

import '../styles/app.scss';

// Parallax effect.
// eslint-disable-next-line no-new
new Parallax( document.getElementById( 'scene' ) );

// Moving clouds and birds on the sky.
horizontalMove( document.querySelector( '#birds' ), 'left', 50, 10 );
horizontalMove( document.querySelector( '#cloud-1' ), 'right', 60, 0 );
horizontalMove( document.querySelector( '#cloud-2' ), 'right', 45, 10 );
horizontalMove( document.querySelector( '#cloud-3' ), 'right', 50, 25 );

// Blinking "Kosmos" neon.
blink(
	document.querySelector( '#neon' ),
	() => random( 0.4, 1 ),
	() => random( 8, 12 )
);

for ( const building of document.querySelectorAll( '.building' ) ) {
	const lights = building.querySelectorAll( '.light' );
	const length = lights.length;

	if ( length ) {
		for ( let i = 0; i < length / 2; i++ ) {
			lights[ random( 0, length - 1 ) ].classList.add( 'active' );
		}

		repeat( () => {
			lights[ random( 0, length - 1 ) ].classList.toggle( 'active' );
		}, () => random( 2.5, 6 ) );
	}
}

function blink( element, getBlinkingDuration, getRepeatDelay ) {
	repeat( async () => {
		element.classList.add( 'blink' );
		await wait( getBlinkingDuration() );
		element.classList.remove( 'blink' );
	}, getRepeatDelay );
}

function horizontalMove( element, direction, duration, delay ) {
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
