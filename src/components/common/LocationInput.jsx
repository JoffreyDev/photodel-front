import React from "react";
import Location from "../../img/profile/location.svg";
import { ProfileMap } from "..";

const LocationInput = ({
  width,
  height,
  addressLine,
  setAddressLine,
  coords,
  setCoords,
  label,
}) => {
  const [mapActive, setMapActive] = React.useState(false);

  return (
    <div>
      <div className="common_location_input_wrapper" onClick={() => setMapActive(true)}>
        <label className="common_location_input_label">{label}</label>
        <input
          style={width ? { width: `${width}`, height: `${height}` } : {}}
          value={addressLine}
          type="text"
          className="common_location_input"
        />
        <img
          src={Location}
          alt="location"
          className="common_location_input_image"
        />
      </div>

      {mapActive && (
        <ProfileMap
          open={mapActive}
          setOpen={setMapActive}
          setAddressLine={setAddressLine}
          setCoords={setCoords}
        />
      )}
    </div>
  );
};

export default LocationInput;
