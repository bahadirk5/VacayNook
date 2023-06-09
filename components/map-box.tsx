"use client"

import * as React from "react"
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"

import { Card } from "@/components/ui/card"

interface LocationProps {
  latlng: {
    lat: number
    lng: number
  }
}

export function MapBox({ latlng }: LocationProps) {
  console.log(latlng)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  })

  if (!isLoaded) return <div>Loading map...</div>

  return (
    <Card className="relative mt-5">
      <GoogleMap
        zoom={15}
        center={latlng}
        mapContainerClassName="map-container"
      >
        <MarkerF position={latlng} />
      </GoogleMap>
    </Card>
  )
}
