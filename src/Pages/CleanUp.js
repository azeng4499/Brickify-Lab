import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSetInfo } from "../SetInfo/SetInfo";
import Header from "./Header";
import { Link as LinkR, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { setExtraPieces, setPixelArray } from "../Store/Actions";

const CleanUp = () => {
  const [currentSelected, setCurrentSelect] = useState([]);
  const [colorCount, setColorCount] = useState({});
  const pixelArrayRedux = useSelector((state) => state.pixelArray);
  const [localPixelArray, setLocalPixelArray] = useState(pixelArrayRedux);
  const selectedPalette = useSelector((state) => state.selectedPalette);
  const colorsCountIncluded = getSetInfo(selectedPalette, "#");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basePlateLength = 48;

  useEffect(() => {
    if (!selectedPalette) {
      navigate("/choose-palette");
    }
  }, []);

  useEffect(() => {
    let colorCountLocal = {};
    Object.entries(pixelArrayRedux).map((pixel) => {
      return (colorCountLocal[pixel[1]] = colorCountLocal[pixel[1]]
        ? colorCountLocal[pixel[1]] + 1
        : 1);
    });

    setColorCount(colorCountLocal);
  }, [selectedPalette]);

  var x = [...Array(basePlateLength).keys()],
    y = [...Array(basePlateLength).keys()];

  return (
    <>
      <Header />
      <div className="min-h-[900px] md:min-h-[1200px] lg:min-h-[700px] lg:h-[calc(100vh-100px)] h-screen w-screen flex justify-evenly items-center bg-dark-blue">
        <div>
          <div className="h-[50px] bg-black flex justify-center items-center text-center px-[5px]">
            <div className="font-bold text-white text-sm max-w-[300px] md:max-w-[1000px]">
              Edit Any Mismatched Pixels.
            </div>
          </div>
          <div className="flex flex-col items-center justfiy-center lg:flex-row gap-5 bg-black p-[10px]">
            <div>
              <div className="flex items-center justfiy-center text-center text-white w-[300px] lg:w-[150px] bg-black p-[10px]">
                {currentSelected.length === 0 ? (
                  <div>Select one or more cells to change color</div>
                ) : (
                  <div>Change selected cells to</div>
                )}
              </div>
              <div className="grid grid-cols-6 lg:grid-cols-3">
                {Object.entries(colorCount).map((color) => {
                  return (
                    <div
                      className="h-[20px] w-[20px] flex items-center m-[10px] border-2 border-white"
                      key={color}
                      style={{ background: color[0] }}
                      onClick={() => {
                        setColorCount((colorCount) => ({
                          ...colorCount,
                          [color[0]]:
                            colorCount[color[0]] + currentSelected.length,
                        }));

                        currentSelected.forEach((selected) => {
                          setLocalPixelArray((localPixelArray) => ({
                            ...localPixelArray,
                            [selected.y + " " + selected.x]: color[0],
                          }));

                          setColorCount((colorCount) => ({
                            ...colorCount,
                            [selected.originalColor]:
                              colorCount[selected.originalColor] - 1,
                          }));
                        });

                        setCurrentSelect([]);
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div className="bg-black">
              {y.map((yIndex) => {
                return (
                  <div className="flex" key={yIndex + "row"}>
                    {x.map((xIndex) => {
                      return (
                        <div
                          key={yIndex + " " + xIndex}
                          onClick={() => {
                            if (
                              localPixelArray[yIndex + " " + xIndex] ===
                              "#FF0000"
                            ) {
                              const originialColor = currentSelected.find(
                                (selected) =>
                                  selected.x === xIndex && selected.y === yIndex
                              ).originalColor;
                              setLocalPixelArray((localPixelArray) => ({
                                ...localPixelArray,
                                [yIndex + " " + xIndex]: originialColor,
                              }));
                              setCurrentSelect(
                                currentSelected.filter(
                                  (selected) =>
                                    !(
                                      selected.x === xIndex &&
                                      selected.y === yIndex
                                    )
                                )
                              );
                            } else {
                              setCurrentSelect((currentSelected) => [
                                ...currentSelected,
                                {
                                  x: xIndex,
                                  y: yIndex,
                                  originalColor:
                                    localPixelArray[yIndex + " " + xIndex],
                                },
                              ]);
                              setLocalPixelArray((localPixelArray) => ({
                                ...localPixelArray,
                                [yIndex + " " + xIndex]: "#FF0000",
                              }));
                            }
                          }}
                          className="h-[6px] w-[6px] sm:h-[8px] sm:w-[8px] md:h-[10px] md:w-[10px] lg:h-[10px] lg:w-[10px] rounded-full"
                          style={{
                            background: localPixelArray[yIndex + " " + xIndex],
                          }}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1">
              {Object.entries(colorCount).map((color) => {
                return (
                  <div
                    className="flex items-center pb-[10px] pl-[10px]"
                    key={color}
                  >
                    <div
                      className="w-[20px] h-[20px] mr-[10px] rounded flex justify-center items-center border-2 border-white"
                      style={{ background: color[0] }}
                    ></div>
                    <div
                      className={`${
                        color[1] > colorsCountIncluded[color[0]]
                          ? "text-red-500"
                          : "text-green-500"
                      } ml-[10px] text-md font-bold text-white`}
                    >
                      {color[1]}/{colorsCountIncluded[color[0]]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="h-[50px] p-[10px] bg-black flex items-center justify-end">
            <LinkR
              to={"/instructions"}
              className="flex justify-end items-center"
              onClick={() => {
                dispatch(setPixelArray(localPixelArray));

                let extraPieces = {};
                for (const [key, value] of Object.entries(colorCount)) {
                  if (value > colorsCountIncluded[key]) {
                    extraPieces[key] = value - colorsCountIncluded[key];
                  }
                }

                dispatch(setExtraPieces(extraPieces));
              }}
            >
              <div className="font-bold text-white text-lg">NEXT</div>{" "}
              <AiOutlineArrowRight size="2em" color="white" />
            </LinkR>
          </div>
        </div>
      </div>
    </>
  );
};

export default CleanUp;
