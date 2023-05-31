"use client"

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"

import { Input } from "@/components/ui/input"

interface PlacesAutocompleteProps {
  setSelected: any
}

export function PlacesAutocomplete({ setSelected }: PlacesAutocompleteProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  })
  const handleInput = (e: any) => {
    setValue(e.target.value)
  }

  const handleSelect =
    ({ description }: any) =>
    () => {
      setValue(description, false)
      clearSuggestions()

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0])
        setSelected({ lat, lng })
        console.log({ lat, lng })
      })
    }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      )
    })

  return (
    <>
      <Input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search location..."
      />
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </>
  )
}
