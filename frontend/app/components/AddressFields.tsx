import { Address } from "../types/address";

type AddressFieldsProps = { address?: Address }

export default function AddressFields({ address }: AddressFieldsProps) {
  if (!address) return null;

  return (
    <div>      
      <p><b>Latitude:</b> {address.lat}</p>
      <p><b>Longitude:</b> {address.lon}</p>      
    </div>
  );
}