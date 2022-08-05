import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mostFreqRBG, findClosestColor } from "../Utils/MathUtils";
import { getSetInfo } from "../SetInfo/SetInfo";
import { setPixelArray } from "../Store/Actions";

const MosaicPreview = ({ propPixelArray }) => {
  const [viewerPixelArray, setViewerPixelArray] = useState({});
  const basePlateLength = 48;
  const selectedPalette = useSelector((state) => state.selectedPalette);
  const imageArray = useSelector((state) => state.imageArray);
  const algorithm = useSelector((state) => state.algorithm);
  var x = [...Array(basePlateLength).keys()],
    y = [...Array(basePlateLength).keys()];
  const dispatch = useDispatch();

  useEffect(() => {
    if (!propPixelArray) {
      let localViewerPixelArray = {};
      const palette = getSetInfo(selectedPalette, "c");

      for (var y = 0, l = basePlateLength; y < l; y += 1) {
        for (var x = 0, k = basePlateLength; x < k; x += 1) {
          const array = imageArray[y + " " + x];
          const RGBValue = mostFreqRBG(array);
          const hex = findClosestColor(RGBValue, palette, algorithm);
          localViewerPixelArray[y + " " + x] = hex;
        }
      }

      setViewerPixelArray(localViewerPixelArray);
      dispatch(setPixelArray(localViewerPixelArray));
    }
  }, [selectedPalette, algorithm]);

  useEffect(() => {
    if (propPixelArray) {
      setViewerPixelArray(propPixelArray);
    }
  }, []);

  return (
    <div>
      {viewerPixelArray &&
        y.map((yIndex) => {
          return (
            <div className="flex" key={yIndex + "row"}>
              {x.map((xIndex) => {
                return (
                  <div
                    className="h-[5px] w-[5px] md:h-[7px] md:w-[7px] lg:h-[8px] lg:w-[8px] xl:h-[10px] xl:w-[10px] rounded-full"
                    key={yIndex + " " + xIndex}
                    style={{
                      background: viewerPixelArray[yIndex + " " + xIndex],
                    }}
                  />
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default MosaicPreview;
