import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedPalette } from "../Store/Actions";

const Palette = ({ image, colors, title }) => {
  const selectedPalette = useSelector((state) => state.selectedPalette);
  const dispatch = useDispatch();

  return (
    <div
      className={`border-4 h-fit ${
        selectedPalette === title ? "border-green-500" : "border-white"
      }`}
      onClick={() => dispatch(setSelectedPalette(title))}
    >
      <div className="flex justify-center items-center flex-col">
        <img
          src={image}
          style={{
            height: "80px",
            width: "80px",
            objectFit: "contain",
            position: "absolute",
          }}
        />
        {Object.entries(colors).map((color) => {
          return (
            <div
              style={{
                background: color[0],
                height: 80 / Object.entries(colors).length,
                width: "100%",
              }}
              key={title + color}
            ></div>
          );
        })}
      </div>
      <div className="h-[30px] text-center text-white flex items-center justify-center bg-black text-xs">
        {title}
      </div>
    </div>
  );
};

export default Palette;
