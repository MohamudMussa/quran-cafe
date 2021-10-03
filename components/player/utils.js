import { IMAGES } from "../../config/constants";

export const removeGif = () => {
  var elem = document.getElementById("vignette");

  if (typeof elem == "undefined" || elem == null) {
    document.getElementById("normal").id = "vignette";
    document.getElementById("normal").id = "vignette";
  } else {
    document.getElementById("vignette").id = "normal";
    document.getElementById("vignette").id = "normal";
  }
};

export const getImage = () => {
  const number = Math.floor(Math.random() * IMAGES.length);
  return IMAGES[number];
};

export const getStation = (stations) => {
  const numberStation = Math.floor(Math.random() * stations.length);
  return stations[numberStation];
};
