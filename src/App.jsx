import React from 'react';
import { useState, useRef } from 'react'
import './App.css'
import Input from './components/Input'
import Button from './components/Button';
import MeasurementCard from './components/MeasurementCard'
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer, } from '@react-google-maps/api';
import Navbar from './components/Navbar';

const center = {
  lat: 23.2177,
  lng: 77.4086
};

function App() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAolXVBph__8LXk-JukgnxDUI4LPDQAsxQ",
    libraries: ['places'],
  })

  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')

  const originRef = useRef()
  const destinationRef = useRef()

  const [originInput, setoriginInput] = useState('')
  const [destinationInput, setdestinationInput] = useState('')


  if (!isLoaded) {
    return
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setoriginInput(originRef.current.value)
    setdestinationInput(destinationRef.current.value)
  }

  return (
    <>
    <Navbar/>
      <header><h2>Let's calculate <span> distance </span> from Google maps</h2></header>
      <main>
        <div className='container'>
          <div className='field-container'>
            <div className='field'>
              <div className='input-field'>
                <Autocomplete>
                  <Input
                    id="Origin"
                    icon={<i className="fa-solid fa-circle"></i>}
                    color='green'
                    innerRef={originRef}
                  />
                </Autocomplete>
                <Autocomplete>
                  <Input
                    id="Stop"
                    icon={<i className="fa-solid fa-circle-stop"></i>}
                    color='black'
                    access = 'disabled'
                  />
                </Autocomplete>
                <Autocomplete>
                  <Input
                    id="Destination"
                    icon={<i className="fa-solid fa-location-dot"></i>}
                    color='black'
                    innerRef={destinationRef}
                  />
                </Autocomplete>
              </div>
              <div>
                <Button
                  text="Calculate"
                  onClick={calculateRoute}
                />
              </div>
            </div>
            <div>
              <MeasurementCard
              unitType="Distance"
              unitValue={distance}
              origin = {originInput}
              destination = {destinationInput}
              />
            </div>
          </div>
          <div className="map">
            <div className='map-container'>
              <GoogleMap
                center={center}
                zoom={15}
                mapContainerStyle={{ width: "100%", height: "100%", margin : "0 auto" }}
                options={{
                  zoomControl: false,
                  fullscreenControl: false,
                  streetViewControl: false,
                  mapTypeControl: false,
                }}
              >
                <Marker position={center} />
                {directionsResponse && (
                  <DirectionsRenderer directions={directionsResponse} />
                )}
              </GoogleMap>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
