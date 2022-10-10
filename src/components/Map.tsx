import React, { useEffect } from 'react';
import { Feature, Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Attribution } from 'ol/control';
import { Coordinate } from 'ol/coordinate';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">`
  + `<defs></defs>`
  + `<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >`
  + `<path d="M 45 90 c -1.652 0 -3.135 -1.016 -3.731 -2.558 c -1.345 -3.478 -2.727 -7.037 -4.108 -10.597 c -7.378 -19.008 -14.348 -36.961 -16.501 -44.348 c -0.676 -2.306 -1.02 -4.709 -1.02 -7.137 C 19.64 11.376 31.016 0 45 0 c 13.983 0 25.36 11.376 25.36 25.36 c 0 2.425 -0.344 4.828 -1.021 7.141 c -2.15 7.377 -9.112 25.312 -16.483 44.299 c -1.388 3.574 -2.775 7.149 -4.126 10.642 C 48.135 88.984 46.652 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(229,0,39); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />`
  + `<circle cx="45" cy="24.08" r="12.5" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>`
  + `</g>`
  + `</svg>`;

export const PurdueMap = ({
  setMarker,
} : {
  setMarker: (marker: Coordinate) => void,
}) => {
  
	// Load the map
	useEffect(() => {

    // Adding new marker to the map to show currently selected location
    // @see https://openlayers.org/en/latest/examples/icon.html
    const markerFeature = new Feature({
      geometry: new Point([0, 0]),
    });
    const markerStyle = new Style({
      image: new Icon({
        src: 'data:image/svg+xml;utf8,' + svg,
        scale: 0.2,
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
      }),
    });
    markerFeature.setStyle(markerStyle);
    let marker = new VectorLayer({
      source: new VectorSource({
        features: [ markerFeature ],
      })
    });

		const map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM()
				}),
        marker,
			],
			view: new View({
				center: [-9675229.852431227, 4928229.067349787],
        enableRotation: false,
        projection: 'EPSG:3857',
        extent: [-9679486.434005389, 4924732.073305725, -9673292.560761487, 4930441.84794688],
        constrainOnlyCenter: true,
        smoothExtentConstraint: true,
				zoom: 17,
        minZoom: 15,
        maxZoom: 20,
        
			}),
      keyboardEventTarget: document,
      controls: [
        new Attribution(),
      ]
		});

    // Update marker position on click and call callback function
    map.on('click', (evt) => {
      markerFeature.getGeometry()?.setCoordinates(evt.coordinate);
      setMarker(evt.coordinate);
    });
	}, []);

  return (
    <div className='map-container'>
			<div id='map' />
    </div>
  );
}
