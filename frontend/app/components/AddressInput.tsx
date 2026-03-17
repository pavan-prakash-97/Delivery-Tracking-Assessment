import { useState } from "react";
import { geocodeAddress, autocompleteAddress } from "../services/api";
import { Address, AddressSuggestion } from "../types/address";

type AddressInputProps = {
  onLocation: (address: Address) => void;
};

export default function AddressInput({ onLocation }: AddressInputProps) {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);

  const search = async (value?: string) => {
    const query = value ?? address;
    if (!query) return;

    const data = await geocodeAddress(query);

    setAddress(query);
    setSuggestions([]);
    onLocation(data);
  };
  

  const handleChange = async (value: string) => {
    setAddress(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    const results: AddressSuggestion[] = await autocompleteAddress(value);
    setSuggestions(results);
  };

  return (
    <div style={{ position: "relative", width: 350 }}>
      <input
        placeholder="Enter full address"
        value={address}
        onChange={(e) => handleChange(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          outline: "none",
          fontSize: "14px",
        }}
      />

      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "45px",
            width: "100%",
            background: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            listStyle: "none",
            padding: 0,
            margin: 0,
            maxHeight: "250px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {suggestions.map((s) => (
            <li
              key={s.place_id}
              onClick={() => search(s.display_name)}
              style={{
                padding: "12px 14px",
                cursor: "pointer",
                fontSize: "14px",
                borderBottom: "1px solid #f3f4f6",
                color: "#6b7280", // gray text
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f3f4f6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
