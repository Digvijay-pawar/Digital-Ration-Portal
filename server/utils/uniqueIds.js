import Tehsil from "../models/tehsil.js";

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
