import Color from "https://colorjs.io/dist/color.js";

const RGBToHSL = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    Math.round(60 * h < 0 ? 60 * h + 360 : 60 * h),
    Math.round(
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)
    ),
    Math.round((100 * (2 * l - s)) / 2),
  ];
};

export const findClosestColor = (rgb, colors, algorithm) => {
  let closestColor = null;
  let smallestDistance = 10000;
  const hslValues = RGBToHSL(rgb[0], rgb[1], rgb[2]);
  const hslColorObj = new Color("hsl", hslValues);

  for (const [key, value] of Object.entries(colors)) {
    const distance = hslColorObj.deltaE(value, algorithm);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestColor = key;
    }
  }

  return closestColor;
};

export const mostFreqRBG = (arr) => {
  var obj = {},
    mostFreq = 0,
    which = [];

  arr.forEach((ea) => {
    if (!obj[ea]) {
      obj[ea] = 1;
    } else {
      obj[ea]++;
    }

    if (obj[ea] > mostFreq) {
      mostFreq = obj[ea];
      which = [ea];
    } else if (obj[ea] === mostFreq) {
      which.push(ea);
    }
  });

  if (which.length === 1) {
    const RGBvalues = which[0].split(" ");
    return RGBvalues.map((rgb) => parseInt(rgb));
  } else {
    const RGBvalues = which.map((rgb) => {
      const rgbString = rgb.split(" ");
      return rgbString.map((rgbs) => parseInt(rgbs));
    });
    var r = 0,
      g = 0,
      b = 0;
    const arrayLength = RGBvalues.length;
    RGBvalues.forEach((rgb) => {
      r += rgb[0];
      g += rgb[1];
      b += rgb[2];
    });

    return [
      Math.round(r / arrayLength),
      Math.round(g / arrayLength),
      Math.round(b / arrayLength),
    ];
  }
};

export const findColor = (x, y, chosenSquare) => {
  switch (chosenSquare) {
    case 0:
      return [x, y];
    case 1:
      return [x, y + 16];
    case 2:
      return [x, y + 32];
    case 3:
      return [x + 16, y];
    case 4:
      return [x + 16, y + 16];
    case 5:
      return [x + 16, y + 32];
    case 6:
      return [x + 32, y];
    case 7:
      return [x + 32, y + 16];
    case 8:
      return [x + 32, y + 32];
  }
};
