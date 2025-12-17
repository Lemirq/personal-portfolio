'use client';
import React, { useState } from 'react';

// import optional tippy styles for tooltip support
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import dynamic from 'next/dynamic';

const ReactGlobe = dynamic(import('react-globe'), { ssr: false });
export function MyGlobe() {
	// support rendering markers with simple data
	const markers: Array<{
		id: string;
		city: string;
		color: string;
		coordinates: [number, number];
		value: number;
	}> = [
		{
			id: 'marker1',
			city: 'Singapore',
			color: 'red',
			coordinates: [1.3521, 103.8198],
			value: 50,
		},
		{
			id: 'marker2',
			city: 'New York',
			color: 'blue',
			coordinates: [40.73061, -73.935242],
			value: 25,
		},
		{
			id: 'marker3',
			city: 'San Francisco',
			color: 'orange',
			coordinates: [37.773972, -122.431297],
			value: 35,
		},
		{
			id: 'marker4',
			city: 'Beijing',
			color: 'gold',
			coordinates: [39.9042, 116.4074],
			value: 135,
		},
		{
			id: 'marker5',
			city: 'London',
			color: 'green',
			coordinates: [51.5074, 0.1278],
			value: 80,
		},
		{
			id: 'marker6',
			city: 'Los Angeles',
			color: 'gold',
			coordinates: [29.7604, -95.3698],
			value: 54,
		},
	];

	// simple and extensive options to configure globe
	const options = {
		ambientLightColor: 'red',
		cameraRotateSpeed: 0.5,
		focusAnimationDuration: 2000,
		focusEasingFunction: ['Linear', 'None'] as ['Linear', 'None'],
		pointLightColor: 'gold',
		pointLightIntensity: 1.5,
		globeGlowColor: 'blue',
		markerTooltipRenderer: (marker: any) => `${marker.city || 'Unknown'} (${marker.value || 0})`,
	};

	const [globe, setGlobe] = useState<any>(null);
	console.log(globe); // captured globe instance with API methods

	// simple component usage
	return (
		<ReactGlobe
			height="100vh"
			// globeBackgroundTexture="https://your/own/background.jpg"
			globeCloudsTexture={null}
			globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg"
			initialCoordinates={[1.3521, 103.8198]}
			markers={markers}
			options={options}
			width="100%"
			onClickMarker={(marker: any, markerObject: any, event: any) => console.log(marker, markerObject, event)}
			onGetGlobe={(globe: any) => setGlobe(globe)}
			onMouseOutMarker={(marker: any, markerObject: any, event: any) => console.log(marker, markerObject, event)}
			onGlobeTextureLoaded={() => console.log('globe loaded')}
			onMouseOverMarker={(marker: any, markerObject: any, event: any) => console.log(marker, markerObject, event)}
		/>
	);
}
