import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../../styles/Mui.css";

const SelectInput = ({
  label,
  values,
  onChange,
  value,
  width,
  nonBorder,
  fontSize,
  marginBottom,
  getName,
}) => {
  return (
    <div
      style={marginBottom ? { marginBottom: marginBottom } : {}}
      className="common_text_input_wrapper"
    >
      <label className="common_text_input_label">{label}</label>
      <FormControl
        variant="filled"
        sx={{
          m: 1,
          width: width ? width : 350,
          borderRadius: "30px",
          margin: "0px 0px 0px 0px",
          border: nonBorder ? "none" : "1px solid #D2D9D8",

          "& #demo-simple-select-filled": {
            padding: "0 10px 0 20px",
            width: "350px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            fontSize: fontSize ? fontSize : "13px",
          },

          "& #demo-simple-select-filled:focus": {
            backgroundColor: "transparent",
          },
          "& .MuiFilledInput-root": {
            backgroundColor: "transparent",
            "&.Mui-focused": {
              backgroundColor: "transparent",
              borderBottom: "none",
            },
            "&:hover:not(.Mui-disabled):before": {
              backgroundColor: "transparent",
              borderBottom: "none",
            },
            "&:hover": {
              backgroundColor: "transparent",
              borderBottom: "none",
            },
            "&:focus": {
              backgroundColor: "transparent",
            },
            "&:before": {
              borderBottom: "none",
            },
            "&:after": {
              borderBottom: "none",
            },
          },
        }}
      >
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={onChange}
          value={value}
        >
          {values &&
            values.map((item, index) => (
              <MenuItem key={index} value={getName ? item.value : item.id}>
                {item.value}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
