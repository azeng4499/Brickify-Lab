import React, { useEffect, useState } from "react";
import ImageCropper from "../Utils/ImageCropper";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setBackupCropInfo,
  setOriginalImage,
  uploadCroppedImage,
} from "../Store/Actions";
import { Link as LinkR } from "react-router-dom";
import { BiZoomIn, BiZoomOut } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
import Header from "./Header";

const ImageSettings = () => {
  const [imageToCrop, setImageToCrop] = useState();
  const [croppedImage, setCroppedImage] = useState();
  const [imageDimensions, setImageDimensions] = useState({
    height: 0,
    widht: 0,
  });
  const uploadedCroppedImage = useSelector((state) => state.croppedImage);
  const originalImage = useSelector((state) => state.originalImage);
  const backupCropInfo = useSelector((state) => state.cropInfo);
  const [maxSize, setMaxSize] = useState();
  const [cropConfig, setCropConfig] = useState({
    unit: "px",
    height: 0,
    width: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (uploadedCroppedImage && originalImage && backupCropInfo) {
      setImageToCrop(originalImage);
      setCroppedImage(uploadedCroppedImage);
      setCropConfig(backupCropInfo);
    }
  }, []);

  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = reader.result;
        const checkDimensions = new Image();
        checkDimensions.src = image;

        checkDimensions.onload = function () {
          var height = this.height;
          var width = this.width;
          setImageDimensions({
            height: height,
            width: width,
          });
        };

        dispatch(setOriginalImage(image));

        setImageToCrop(image);
        setCroppedImage(image);
      });

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-[800px] md:min-h-[1100px] lg:min-h-[700px] lg:h-[calc(100vh-100px)] h-screen w-screen flex justify-evenly items-center bg-dark-blue flex-col">
        <div>
          <div>
            <div className="h-[50px] bg-black p-[10px] flex justify-center items-center">
              <div className="font-bold text-white text-sm">
                Please upload desired image and crop.
              </div>
            </div>
            <div className="grid lg:flex bg-black p-[10px]">
              <div className="flex justify-evenly items-center bg-white h-[275px] w-[275px] md:h-[400px] md:w-[400px] xl:h-[500px] xl:w-[500px] overflow-hidden">
                {imageToCrop ? (
                  <ImageCropper
                    imageToCrop={imageToCrop}
                    onImageCropped={(croppedImage) =>
                      setCroppedImage(croppedImage)
                    }
                    imageDimensions={imageDimensions}
                    setMaxSize={setMaxSize}
                    cropConfig={cropConfig}
                    setCropConfig={setCropConfig}
                    // className="max-h-full max-w-full"
                  />
                ) : (
                  <div className="font-bold">Please Upload Image to Crop</div>
                )}
              </div>
              <div className="m-[10px] text-white flex lg:list-item">
                <BiZoomIn
                  onClick={() =>
                    setCropConfig((cropConfig) => ({
                      ...cropConfig,
                      unit: "px",
                      height:
                        cropConfig.height === 48 ? 48 : cropConfig.height - 48,
                      width:
                        cropConfig.height === 48 ? 48 : cropConfig.width - 48,
                    }))
                  }
                  size="2rem"
                />
                <BiZoomOut
                  onClick={() =>
                    setCropConfig((cropConfig) => ({
                      ...cropConfig,
                      unit: "px",
                      height:
                        cropConfig.height === maxSize
                          ? maxSize
                          : cropConfig.height + 48,
                      width:
                        cropConfig.height === maxSize
                          ? maxSize
                          : cropConfig.width + 48,
                    }))
                  }
                  size="2rem"
                />
              </div>
              {croppedImage ? (
                <img
                  className="h-[275px] w-[275px] md:h-[400px] md:w-[400px] xl:h-[500px] xl:w-[500px] object-fit"
                  src={croppedImage}
                />
              ) : (
                <div className="h-[275px] w-[275px] md:h-[400px] md:w-[400px] xl:h-[500px] xl:w-[500px] bg-white flex justify-center items-center">
                  <div className="font-bold">No Preview to Show</div>
                </div>
              )}
            </div>
            <div className="h-[50px] p-[10px] bg-black flex items-center justify-between">
              <input
                type="button"
                id="loadFileXml"
                value="Upload Image"
                onClick={() => document.getElementById("file").click()}
                className="rounded font-bold text-black bg-white px-[10px]"
              />
              <input
                type="file"
                accept="image/*"
                onChange={onUploadFile}
                id="file"
                name="file"
                className="text-white max-w-[150px] md:max-w-[300px] hidden"
              />
              <LinkR
                to={croppedImage ? "/choose-palette" : "#"}
                onClick={() => {
                  dispatch(uploadCroppedImage(croppedImage));
                  dispatch(setBackupCropInfo(cropConfig));
                }}
                className="flex justify-center items-center"
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

export default ImageSettings;
