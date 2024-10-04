import Tehsil from "../models/tehsil.js";
import fps from "../models/fps.js";

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

export const generatefpsId = async () => {
  const regionCode = "FPS";
  const currentYear = new Date().getFullYear().toString();

  const lastfps = await fps.findOne({
    fpsId: { $regex: `^${regionCode}${currentYear}` },
  }).sort({ fpsId: -1 });

  let newNumber = "0001";

  if (lastfps) {
    const lastNumber = parseInt(lastfps.fpsId.slice(-4));
    newNumber = (lastNumber + 1).toString().padStart(4, "0");
  }

  return `${regionCode}${currentYear}${newNumber}`;
};

