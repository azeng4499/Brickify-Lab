import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import MosaicPreview from "../Utils/MosaicPreview";
import { getSetInfo } from "../SetInfo/SetInfo";
import { findColor } from "../Utils/MathUtils";
import { useNavigate } from "react-router-dom";
import { Link as LinkR } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const Instructions = () => {
  const [chosenSquare, setChoseSquare] = useState(0);
  const selectedPalette = useSelector((state) => state.selectedPalette);
  const extraPieces = useSelector((state) => state.extraPieces);
  const pixelArray = useSelector((state) => state.pixelArray);
  const colors = selectedPalette ? getSetInfo(selectedPalette, "c") : {};
  const navigate = useNavigate();
  var x = [...Array(9).keys()];
  var y = [...Array(16).keys()];
  var z = [...Array(16).keys()];
  const [paletteToNum, setPaletteToNum] = useState({});

  useEffect(() => {
    if (!selectedPalette) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    let paletteToNumLocal = {};
    var counter = 1;
    const palette = getSetInfo(selectedPalette, "c");

    for (const [key] of Object.entries(palette)) {
      paletteToNumLocal[key] = counter;
      counter += 1;
    }

    setPaletteToNum(paletteToNumLocal);
  }, [selectedPalette]);

  return (
    <>
      <Header />
      <div className="min-h-[800px] md:min-h-[1100px] lg:min-h-[700px] lg:h-[calc(100vh-100px)] h-screen w-screen flex justify-evenly items-center bg-dark-blue flex-col">
        <div className="flex flex-col justify-center items-center">
          <div className="h-fit w-fit bg-black border-2 px-[5px]">
            <div className="h-fit w-full flex justify-center items-center font-bold text-white text-sm">
              Extra Pieces You'll Need
            </div>
            <div className="h-fit w-full flex justify-center items-center gap-5 pt-[5px]">
              {Object.entries(extraPieces).map((piece) => {
                return (
                  <div className="text-white flex flex-col justify-center item-center">
                    <div
                      key={"extra" + piece}
                      className="text-white h-[20px] w-[20px] rounded-full border-2 border-white"
                      style={{ background: piece[0] }}
                    ></div>
                    x {piece[1]}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex">
            <div className="w-[28px] h-full bg-black justify-center grid justify-evenly items-center gap-1 py-[5px]">
              {Object.entries(colors).map((color) => {
                return (
                  <div
                    className={`h-[25px] w-[25px] rounded-full border-2 flex justify-center items-center ${
                      color[0] === "#FFF" ? "text-black" : "text-white"
                    }`}
                    style={{ background: color[0] }}
                    key={color}
                  >
                    {paletteToNum[color[0]]}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col lg:flex-row bg-black p-[5px] justify-center items-center">
              <div className="bg-gray-500 h-[260px] w-[260px] md:h-[400px] md:w-[400px] xl:h-[500px] xl:w-[500px] grid grid-cols-16">
                {y.map((y) => {
                  return z.map((z) => {
                    const colorCoord = findColor(y, z, chosenSquare);
                    const color =
                      pixelArray[colorCoord[0] + " " + colorCoord[1]];
                    return (
                      <div
                        className="h-full w-full rounded-full flex justify-center items-center text-xs"
                        style={{
                          background: color,
                          color: color === "#FFF" ? "black" : "white",
                        }}
                      >
                        {paletteToNum[color]}
                      </div>
                    );
                  });
                })}
              </div>
              <div className="h-[275px] w-[275px] md:h-[400px] md:w-[400px] xl:h-[500px] xl:w-[500px] bg-black flex justify-center items-center">
                <div>
                  <div className="h-[240px] w-[240px] md:h-[335px] md:w-[335px] lg:h-[385px] lg:w-[385px] xl:h-[480px] xl:w-[480px] absolute grid grid-cols-3">
                    {x.map((number) => {
                      return (
                        <div
                          className={`h-full w-full border-2 bg-black ${
                            chosenSquare === number ? "opacity-0" : "opacity-75"
                          } flex justify-center items-center`}
                          onClick={() => setChoseSquare(number)}
                          key={number}
                        >
                          {chosenSquare !== number && (
                            <div className="text-white">{number + 1}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <MosaicPreview propPixelArray={pixelArray} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[50px] p-[10px] w-full bg-black flex items-center justify-end">
            <LinkR
              to="/"
              className="flex justify-end items-center"
            >
              <div className="font-bold text-white text-lg">Back To Home</div>{" "}
              <AiOutlineArrowRight size="2em" color="white" />
            </LinkR>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instructions;
