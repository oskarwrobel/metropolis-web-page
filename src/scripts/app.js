/* eslint-env browser */

import Parallax from 'parallax-js';
import { random, repeat, wait, requestAnimationFramePromise } from './utils';

import '../styles/app.scss';

const progressElement = document.querySelector( '#progress' );

loadImages(
	window.appData.images,
	value => ( progressElement.style.width = `${ value }%` )
).then( () => {
	document.body.classList.remove( 'loading' );

	// Parallax effect.
	// eslint-disable-next-line no-new
	new Parallax( document.getElementById( 'scene' ) );

	// Moving clouds and birds on the sky.
	horizontalMove( document.querySelector( '#birds' ), 'left', 50, 10 );
	horizontalMove( document.querySelector( '#cloud-1' ), 'right', 60, 0 );
	horizontalMove( document.querySelector( '#cloud-2' ), 'right', 45, 15 );
	horizontalMove( document.querySelector( '#cloud-3' ), 'right', 55, 10 );

	// Blinking "Kosmos" neon.
	blink(
		document.querySelector( '#neon' ),
		() => random( 0.4, 1 ),
		() => random( 8, 12 )
	);

	// Lights inside a buildings.
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
} ).catch( error => console.error( error ) );

function loadImages( images, onProgress ) {
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

function blink( element, getBlinkingDuration, getRepeatDelay ) {
	repeat( async () => {
		element.classList.add( 'blink' );
		await wait( getBlinkingDuration() );
		element.classList.remove( 'blink' );
	}, getRepeatDelay );
}
