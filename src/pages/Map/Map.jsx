/*
API Google - Axel
AIzaSyCVLU4FFbvQ8g88L619Kj6nQ4YF0Bexrwg

Clave de API Woosmap
HEB Rewards
woos-28223f8a-ff26-3e47-bff5-47e23f405fce
*/

import React, {useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import InfoWindow from "../../components/InfoWindow";
import useScript from "../../hooks/useScript";

import './Map.css';
import conf from "./config.json";

const Map = () => {
    const [isLoading, setLoading] = useState(true);
    const mapContainerRef = useRef(null);
    const woosmapLoaded = useScript(conf.woosmapLoaderUrl);
    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            if (woosmapLoaded) {
                initMap();
            }
        }, 1000);
        }, [woosmapLoaded]);
    
        const initMap = () => {
            conf.woosmapLoadOptions.callback = () => {
                const loader = new window.woosmap.MapsLoader(conf.googleLoadOptions);
                loader.load(() => {
                    const map = new window.google.maps.Map(mapContainerRef.current, conf.googleMapsOptions);
                    const mapView = new window.woosmap.TiledView(map, conf.markersOptions);
                    const templateInfoWindow = "<div id='infoWindow-{{store_id}}'></div>";
                    const templateRenderer = new window.woosmap.TemplateRenderer(templateInfoWindow);
                    const infoWindow = new window.woosmap.LocatorWindow(map, templateRenderer);
                    infoWindow.setOpeningCallback(() => {
                        const selectedStore = infoWindow.get('selectedStore').properties;
                        return createRoot.render(
                            <InfoWindow
                                store={selectedStore}
                            />, document.getElementById(`infoWindow-${selectedStore.store_id}`)
                        );
                    });
                    mapView.bindTo("selectedStore", infoWindow);
                });
            };
            window.WoosmapLoader.load(conf.woosmapLoadOptions);
        }
    
        return (
            <div>
                <div className='mapContainer' ref={mapContainerRef}/>
            </div>
        );
    };
    
    export default Map;

