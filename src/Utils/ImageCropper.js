import React, { useEffect, useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useSelector } from "react-redux";

function ImageCropper(props) {
  const { imageToCrop, onImageCropped, setMaxSize, cropConfig, setCropConfig } =
    props;
  const [imageRef, setImageRef] = useState();
  const [reactCropDimensions, setReactCropDimensions] = useState({
    height: 0,
    width: 0,
  });
  const ref = useRef(null);
  const height = useSelector((state) => state.windowHeight);

  useEffect(() => {
    setReactCropDimensions({
      height: ref.current.clientHeight,
      width: ref.current.clientWidth,
    });
  }, [imageToCrop, height]);

  useEffect(() => {
    const smallerDimension = Math.min(
      reactCropDimensions.width,
      reactCropDimensions.height
    );
    const biggestMultiple = Math.floor(smallerDimension / 48) * 48;
    setMaxSize(biggestMultiple);
    setCropConfig((cropConfig) => ({
      ...cropConfig,
      unit: "px",
      height: biggestMultiple,
      width: biggestMultiple,
    }));
  }, [imageToCrop, reactCropDimensions, height]);

  async function cropImage(crop) {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop,
        "croppedImage.jpeg"
      );
      onImageCropped(croppedImage);
    }
  }

  function getCroppedImage(sourceImage, cropConfig, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        blob.name = fileName;
        const croppedImageUrl = window.URL.createObjectURL(blob);
        resolve(croppedImageUrl);
      }, "image/jpeg");
    });
  }

  return (
    <div className="flex">
      <div ref={ref}>
        <ReactCrop
          src={imageToCrop}
          crop={cropConfig}
          onImageLoaded={(imageRef) => setImageRef(imageRef)}
          onComplete={(cropConfig) => cropImage(cropConfig)}
          onChange={(cropConfig) => setCropConfig(cropConfig)}
          locked
          style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }}
        ></ReactCrop>
      </div>
    </div>
  );
}

ImageCropper.defaultProps = {
  onImageCropped: () => {},
};

export default ImageCropper;
