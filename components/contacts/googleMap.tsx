"use client"
import React, { useEffect, useRef } from 'react'
import {Loader} from "@googlemaps/js-api-loader"


const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};
const GoogleMapComponent = () => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const initializeMap=async()=>{
      const loader = new Loader({
        apiKey:process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version:"quartely"
      } );

      const {Map} = await loader.importLibrary('maps');
      const locationInMap = {
        lat: 9.0241,
        lng: 38.7623
    };
    
      // MARKER
			const { Marker } = (await loader.importLibrary(
				'marker'
			)) as google.maps.MarkerLibrary;

			const options: google.maps.MapOptions = {
				center: locationInMap,
				zoom: 15,
				mapId: 'NEXT_MAPS_TUTS',
			};

      const map = new Map(mapRef.current as HTMLDivElement, options);

			// add the marker in the map
			const marker = new Marker({
				map: map,
				position: locationInMap,
			});
		};

		initializeMap();

    
  },[]);

  return <div className="h-[600px]" ref={mapRef} />;
}

export default GoogleMapComponent