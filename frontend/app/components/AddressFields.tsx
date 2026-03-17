import { Address } from "../types/address";

type AddressFieldsProps = { address?: Address };

export default function AddressFields({ address }: AddressFieldsProps) {
  if (!address) return null;

  const value = (val?: string | number) => val || "---------";

  return (
    <div>
      <p>
        <b>Latitude:</b> {value(address.lat)}
      </p>
      <p>
        <b>Longitude:</b> {value(address.lon)}
      </p>
      <p>
        <b>Area:</b> {value(address.area)}
      </p>
      <p>
        <b>City:</b> {value(address.city)}
      </p>
      <p>
        <b>State:</b> {value(address.state)}
      </p>
      <p>
        <b>Country:</b> {value(address.country)}
      </p>
    </div>
  );
}