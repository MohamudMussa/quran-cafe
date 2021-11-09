import { IMAGES } from "../../config/constants";


export const getImage = () => {
  const number = Math.floor(Math.random() * IMAGES.length);
  return IMAGES[number];
};

export const getStation = (stations) => {
  const numberStation = Math.floor(Math.random() * stations.length);
  return stations[numberStation];
};
