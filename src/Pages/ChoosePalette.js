import React, { useEffect } from "react";
import { getSetInfo } from "../SetInfo/SetInfo";
import { useDispatch, useSelector } from "react-redux";
import MosaicPreview from "../Utils/MosaicPreview";
import { Link as LinkR, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Header from "./Header";
import Palette from "../Utils/Palette";
import { setAlgorithm, setImageArray } from "../Store/Actions";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
var image = require("get-image-data");

const ChoosePalette = () => {
  const basePlateLength = 48;
  const croppedImage = useSelector((state) => state.croppedImage);
  const selectedPalette = useSelector((state) => state.selectedPalette);
  const algorithm = useSelector((state) => state.algorithm);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sets = [
    "Elvis Presley",
    "Mickey Mouse",
    "Marilyn Monroe",
    "Batman",
    "Harry Potter",
  ];

  useEffect(() => {
    if (!croppedImage) {
      navigate("/");
    }
  }, []);

  const options = [
    { label: "DeltaE2000", value: "2000" },
    { label: "DeltaE76", value: "76" },
    { label: "DeltaEITP", value: "ITP" },
    { label: "DeltaECMC", value: "CMC" },
  ];

  useEffect(() => {
    image(croppedImage, function (err, info) {
      if (!err) {
        const data = info.data;
        const height = info.height;
        let RGBPixelArray = [];

        for (var index = 0, l = data.length; index < l; index += 4) {
          const r = Math.round(data[index] / 5) * 5;
          const g = Math.round(data[index + 1] / 5) * 5;
          const b = Math.round(data[index + 2] / 5) * 5;
          RGBPixelArray.push(r + " " + g + " " + b);
        }

        let RGBPixelArrayGrouped = {};

        for (
          var index = 0, length = RGBPixelArray.length;
          index < length;
          index += 1
        ) {
          const y = Math.floor(index / (Math.pow(height, 2) / basePlateLength));
          const x = Math.floor((index % height) / (height / 48));

          const RGBValue = RGBPixelArray[index];

          RGBPixelArrayGrouped[y + " " + x] = RGBPixelArrayGrouped[y + " " + x]
            ? [...RGBPixelArrayGrouped[y + " " + x], RGBValue]
            : [RGBValue];
        }

        dispatch(setImageArray(RGBPixelArrayGrouped));
      }
    });
  }, [croppedImage]);

  return (
    <>
      <Header />
      <div className="min-h-[1000px] md:min-h-[1100px] lg:min-h-[700px] lg:h-[calc(100vh-100px)] h-screen w-screen flex justify-evenly items-center bg-dark-blue flex-col">
        <div>
          <div>
            <div className="h-[50px] bg-black flex justify-center items-center text-center px-[5px]">
              <div className="font-bold text-white text-sm max-w-[300px] md:max-w-[1000px]">
                Please select desired palette and color matching algorithm.
              </div>
            </div>
            <div className="grid justify-center items-center lg:flex bg-black p-[10px] gap-5">
              <div>
                <div>
                  <div className="text-white flex justify-center items-center gap-3">
                    Algorithm:{" "}
                    <Dropdown
                      options={options}
                      onChange={(selected) => {
                        dispatch(setAlgorithm(selected.value));
                      }}
                      value={algorithm}
                      placeholder="Select an option"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 justify-center items-center h-[450px] w-[275px] md:w-[400px] xl:w-[500px] overflow-hidden">
                  {sets.map((set) => {
                    return (
                      <Palette
                        image={getSetInfo(set, "i")}
                        colors={getSetInfo(set, "c")}
                        title={set}
                        key={set + "palette"}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="h-[275px] w-[275px] md:h-[400px] md:w-[400px] xl:h-[500px] xl:w-[500px] bg-black flex justify-center items-center border-2 border-white">
                {selectedPalette && algorithm ? (
                  <MosaicPreview />
                ) : (
                  <div className="font-bold text-white py-[20px]">
                    Select Palette to Preview
                  </div>
                )}
              </div>
            </div>
            <div className="h-[50px] p-[10px] bg-black flex items-center justify-end">
              <LinkR
                to={selectedPalette ? "/clean-up" : "#"}
                className="flex justify-end items-center"
              >
                <div className="font-bold text-white text-lg">NEXT</div>{" "}
                <AiOutlineArrowRight size="2em" color="white" />
              </LinkR>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoosePalette;
