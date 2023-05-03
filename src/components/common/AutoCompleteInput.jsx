import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AutoCompleteInput = ({
  label,
  values,
  onChange,
  value,
  placeholder,
  width,
}) => {
  return (
    <div className="common_text_input_wrapper">
      <label className="common_text_input_label">{label}</label>
      <Autocomplete
        sx={
          width
            ? {
                width: width,
                fontFamily: "Montserrat",
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: "13px",
                color: "#9CA3A1",

                " &MuiInputLabel-root": {
                  fontFamily: "Montserrat",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "13px",
                  color: "#9CA3A1",
                },
              }
            : ""
        }
        id="size-small-standard"
        size="small"
        multiple
        limitTags={2}
        options={values}
        onChange={onChange}
        value={value}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label={placeholder ? placeholder : ""} />
        )}
        autoHighlight
      />
    </div>
  );
};

export default AutoCompleteInput;
