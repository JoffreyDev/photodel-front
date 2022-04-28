import React from "react";

const DatesInput = ({
  width,
  height,
  setTempLocationStartDate,
  setTempLocationEndDate,
  tempLocationEndDate,
  tempLocationStartDate,
}) => {
  const [currentStage, setCurrentStage] = React.useState(0);
  const secondDate = React.useRef(null);

  return (
    <div>
      {(currentStage === 0 || currentStage === 1) && (
        <div className="common_text_input_wrapper">
          <label className="common_text_input_label">
            Дата начала пребывания
          </label>
          <input
            style={width ? { width: `${width}`, height: `${height}` } : {}}
            onChange={(e) => {
              setCurrentStage(2);
              setTempLocationStartDate(e.target.value);
              secondDate.current.click();
            }}
            type="date"
            value={tempLocationStartDate}
            onClick={() => {
              if (currentStage === 0) setCurrentStage(1);
            }}
            className="common_text_input"
          />
        </div>
      )}

      <div
        style={{ display: `${currentStage === 2 ? "block" : "none"}` }}
        className="common_text_input_wrapper"
      >
        <label
          htmlFor="profile_date_second"
          className="common_text_input_label"
          ref={secondDate}
        >
          Дата конца пребывания
        </label>
        <input
          style={
            width
              ? {
                  width: `${width}`,
                  height: `${height}`,
                }
              : {}
          }
          value={tempLocationEndDate}
          onChange={(e) => {
            setCurrentStage(0);
            setTempLocationEndDate(e.target.value);
          }}
          type="date"
          className="common_text_input"
          id="profile_date_second"
        />
      </div>
    </div>
  );
};

export default DatesInput;
