import { ElvisColors, ElvisColorsCountIncluded } from "./Sets/Elvis";
import {
  MarilynMonroeColors,
  MarilynMonroeColorsCountIncluded,
} from "./Sets/MarilynMonroe";
import { BatmanColors, BatmanColorsCountIncluded } from "./Sets/Batman";
import {
  MickeyMouseColors,
  MickeyMouseColorsCountIncluded,
} from "./Sets/MickeyMouse";
import {
  HarryPotterColors,
  HarryPotterColorsCountIncluded,
} from "./Sets/HarryPotter";
import ElvisImg from "../Images/elvis-lego-set.png";
import MickeyMouseImg from "../Images/mickey-mouse.png";
import MarilynMonroeImg from "../Images/marilyn-monroe.png";
import BatmanImg from "../Images/batman-set.png";
import HarryPotterImg from "../Images/harry-potter.png";

export const getSetInfo = (title, type) => {
  switch (title) {
    case "Elvis Presley":
      return type === "c"
        ? ElvisColors
        : type === "#"
        ? ElvisColorsCountIncluded
        : ElvisImg;
    case "Mickey Mouse":
      return type === "c"
        ? MickeyMouseColors
        : type === "#"
        ? MickeyMouseColorsCountIncluded
        : MickeyMouseImg;
    case "Marilyn Monroe":
      return type === "c"
        ? MarilynMonroeColors
        : type === "#"
        ? MarilynMonroeColorsCountIncluded
        : MarilynMonroeImg;
    case "Batman":
      return type === "c"
        ? BatmanColors
        : type === "#"
        ? BatmanColorsCountIncluded
        : BatmanImg;
    case "Harry Potter":
      return type === "c"
        ? HarryPotterColors
        : type === "#"
        ? HarryPotterColorsCountIncluded
        : HarryPotterImg;
    default:
      return null;
  }
};
