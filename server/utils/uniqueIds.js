import Tehsil from "../models/tehsil.js";

import Fps from "../models/fps.js"; 

export const generateTehsilId = async () => {
  const regionCode = "TH";
  const currentYear = new Date().getFullYear().toString();

  const lastTehsil = await Tehsil.findOne({
    tehsilId: { $regex: `^${regionCode}${currentYear}` },
  }).sort({ tehsilId: -1 });

  let newNumber = "0001";

  if (lastTehsil) {
    const lastNumber = parseInt(lastTehsil.tehsilId.slice(-4));
    newNumber = (lastNumber + 1).toString().padStart(4, "0");
  }

  return `${regionCode}${currentYear}${newNumber}`;
};


export const generateFpsId = async () => {
  const regionCode = "FPS"; // Set your region code for FPS
  const currentYear = new Date().getFullYear().toString();

  const lastFps = await Fps.findOne({
    fpsId: { $regex: `^${regionCode}${currentYear}` },
  }).sort({ fpsId: -1 });

  let newNumber = "0001";

  if (lastFps) {
    const lastNumber = parseInt(lastFps.fpsId.slice(-4));
    newNumber = (lastNumber + 1).toString().padStart(4, "0");
  }

  return `${regionCode}${currentYear}${newNumber}`;
};
