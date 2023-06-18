"use client"

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete"

import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

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
      })
    }

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion

      return (
        <>
          <li
            key={place_id}
            className="flex cursor-pointer items-center gap-2 p-1"
            onClick={handleSelect(suggestion)}
          >
            <h4 className="scroll-m-20 font-semibold tracking-tight">
              {main_text}
            </h4>
            <p className="text-sm text-muted-foreground">{secondary_text}</p>
          </li>
          <Separator />
        </>
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
