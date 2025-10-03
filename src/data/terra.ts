export const MISSION_STATS = {
  launchDate: "18 December 1999",
  launchVehicle: "Atlas IIAS (Vandenberg)",
  massKg: 5190,
  orbit: "Sun-synchronous, ~705 km",
  orbitsPerDay: 14,
  dataProducts: 83,
  archiveSizePB: 6.2,
  yearsActive: 25,
  instruments: ["MODIS", "ASTER", "MOPITT", "MISR", "CERES"],
  operationalNotes:
    "Designed for ~6 years; operating 25+ years. Orbit drift and fuel constraints since ~2020.",
};

export const TIMELINE = [
  {
    year: 1999,
    label: "Launch (Vandenberg)",
    text: "Terra launched 18 Dec 1999",
  },
  {
    year: 2000,
    label: "Science Ops",
    text: "Start of routine science operations",
  },
  {
    year: 2010,
    label: "Archive Growth",
    text: "Data archive grows to petabytes",
  },
  {
    year: 2020,
    label: "Orbit Drift",
    text: "Fuel limitations — orbit drift begins",
  },
  {
    year: 2025,
    label: "25+ Years",
    text: "Terra still operating and serving data",
  },
];
