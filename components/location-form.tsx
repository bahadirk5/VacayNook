"use client"

import * as React from "react"
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api"

import { Card } from "@/components/ui/card"
import { PlacesAutocomplete } from "@/components/autocomplete"

interface LocationProps {
  value: {
    lat: number
    lng: number
  }
  onChange: (value: { lat: number; lng: number }) => void
}

export function LocationForm({ value, onChange }: LocationProps) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  })

  function handleMarkerChange(e: any) {
    const latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() }
    onChange(latlng)
  }

  if (!isLoaded) return <div>Loading map...</div>

  return (
    <>
      <div className="mt-5">
        <PlacesAutocomplete setSelected={onChange} />
      </div>
      <Card className="relative mt-5">
        <GoogleMap
          zoom={15}
          center={value || { lat: 39.8944028, lng: 32.6227557 }}
          mapContainerClassName="map-container"
        >
          {value && (
            <MarkerF
              position={value}
              draggable={true}
              onDragEnd={handleMarkerChange}
            />
          )}
        </GoogleMap>
      </Card>
    </>
  )
}
