import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const Map = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDm2xZ7BDh7qboJJRlJwpmqceUmrmApw5c&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  return (
  <GoogleMap key={props.data.length} defaultZoom={1} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
      {props.data && props.data.map(ele=>{console.log(ele)
        return <Marker  position={{ lat: ele.lat, lng: ele.lon }} />
      })}
  </GoogleMap>
)}
);

export default Map