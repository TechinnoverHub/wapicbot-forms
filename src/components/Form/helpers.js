import NaijaStates from "naija-state-local-government";
const allLgasObj = {};
NaijaStates.all().forEach((st) => {
  allLgasObj[st.state] = st.lgas.map((lg) => ({ value: lg }));
});
export const manufacturers = [
  {
    value: "Acura",
  },
  {
    value: "Audi",
  },
  {
    value: "BMW",
  },
  {
    value: "Cadillac",
  },
  {
    value: "Chevrolet",
  },
  {
    value: "Chrysler",
  },
  {
    value: "Dodge",
  },
  {
    value: "Ferarri",
  },
  {
    value: "Ford",
  },
  {
    value: "GMC",
  },
  {
    value: "Honda",
  },
  {
    value: "Hummer",
  },
  {
    value: "Hyundai",
  },
  {
    value: "Infiniti",
  },
  {
    value: "Isuzu",
  },
  {
    value: "Jaguar",
  },
  {
    value: "Jeep",
  },
  {
    value: "Kia",
  },
  {
    value: "Land Rover",
  },
  {
    value: "Lexus",
  },
  {
    value: "Lincoln",
  },
  {
    value: "Mazda",
  },
  {
    value: "Mercedes-Benz",
  },
  {
    value: "Nissan",
  },
  {
    value: "MINI",
  },
  {
    value: "Mitsubishi",
  },
  {
    value: "Pontaic",
  },
  {
    value: "Porsche",
  },
  {
    value: "Rolls-Royce",
  },
  {
    value: "Saab",
  },
  {
    value: "Saturn",
  },
  {
    value: "Toyota",
  },
  {
    value: "Subaru",
  },
  {
    value: "Suzuki",
  },
  {
    value: "Volkswagen",
  },
  {
    value: "Volvo",
  },
  {
    value: "Mercury",
  },
  {
    value: "Rover",
  },
  {
    value: "Opel",
  },
  {
    value: "Land Rover Discovery",
  },
  {
    value: "Skoda",
  },
  {
    value: "Renault",
  },
  {
    value: "MACK",
  },
  {
    value: "Liberty",
  },
  {
    value: "Jinbei",
  },
  {
    value: "Fiat",
  },
  {
    value: "Peugeot",
  },
  {
    value: "SCANIA",
  },
  {
    value: "Geely",
  },
];

export const carModels = {
  Acura: [
    {
      value: "MDX",
    },
    {
      value: "RDX",
    },
    {
      value: "RL",
    },
    {
      value: "TL",
    },
    {
      value: "TSX",
    },
    {
      value: "EL",
    },
  ],
  Audi: [
    {
      value: "A3",
    },
    {
      value: "A4",
    },
    {
      value: "A5",
    },
    {
      value: "A6",
    },
    {
      value: "A8",
    },
    {
      value: "Q7",
    },
    {
      value: "R8",
    },
    {
      value: "RS 4",
    },
    {
      value: "S4",
    },
    {
      value: "S8",
    },
    {
      value: "TT",
    },
    {
      value: "Q5",
    },
  ],
  BMW: [
    {
      value: "128",
    },
    {
      value: "135",
    },
    {
      value: "328",
    },
    {
      value: "335",
    },
    {
      value: "528",
    },
    {
      value: "535",
    },
    {
      value: "550",
    },
    {
      value: "650",
    },
    {
      value: "750",
    },
    {
      value: "760",
    },
    {
      value: "Alpina B7",
    },
    {
      value: "M3",
    },
    {
      value: "M5",
    },
    {
      value: "M6",
    },
    {
      value: "X3",
    },
    {
      value: "X5",
    },
    {
      value: "X6",
    },
    {
      value: "Z4",
    },
    {
      value: "Z4 M",
    },
    {
      value: "",
    },
  ],
  Cadillac: [
    {
      value: "CTS",
    },
    {
      value: "DTS",
    },
    {
      value: "Escalade",
    },
    {
      value: "Escalade ESV",
    },
    {
      value: "Escalade EXT",
    },
    {
      value: "SRX",
    },
    {
      value: "STS",
    },
    {
      value: "XLR",
    },
  ],
  Chevrolet: [
    {
      value: "Avalanche",
    },
    {
      value: "Aveo",
    },
    {
      value: "Cobalt",
    },
    {
      value: "Colorado Crew Cab",
    },
    {
      value: "Colorado Extended Cab",
    },
    {
      value: "Colorado Regular Cab",
    },
    {
      value: "Corvette",
    },
    {
      value: "Equinox",
    },
    {
      value: "Express 1500 Cargo",
    },
    {
      value: "Express 1500 Passenger",
    },
    {
      value: "Express 2500 Cargo",
    },
    {
      value: "Express 2500 Passenger",
    },
    {
      value: "Express 3500 Cargo",
    },
    {
      value: "Express 3500 Passenger",
    },
    {
      value: "HHR",
    },
    {
      value: "Impala",
    },
    {
      value: "Malibu",
    },
    {
      value: "Malibu (Classic)",
    },
    {
      value: "Silverado 1500 Crew Cab",
    },
    {
      value: "Silverado 1500 Extended Cab",
    },
    {
      value: "Silverado 1500 Regular Cab",
    },
    {
      value: "Silverado 2500 HD Crew Cab",
    },
    {
      value: "Silverado 2500 HD Extended Cab",
    },
    {
      value: "Silverado 2500 HD Regular Cab",
    },
    {
      value: "Silverado 3500 HD Crew Cab",
    },
    {
      value: "Silverado 3500 HD Extended Cab",
    },
    {
      value: "Silverado 3500 HD Regular Cab",
    },
    {
      value: "Suburban 1500",
    },
    {
      value: "Suburban 2500",
    },
    {
      value: "Tahoe",
    },
    {
      value: "TrailBlazer",
    },
    {
      value: "Traverse",
    },
    {
      value: "Uplander Cargo",
    },
    {
      value: "Uplander Passenger",
    },
    {
      value: "Cruze 1.8L",
    },
    {
      value: "Tracker",
    },
    {
      value: "Optra",
    },
    {
      value: "Sail ",
    },
    {
      value: "Camaro",
    },
  ],
  Chrysler: [
    {
      value: "10 68|300",
    },
    {
      value: "spen",
    },
    {
      value: "Crossfire",
    },
    {
      value: "Pacifica",
    },
    {
      value: "PT Cruiser",
    },
    {
      value: "Sebring",
    },
    {
      value: "Town & Country",
    },
  ],
  Dodge: [
    {
      value: "Avenger",
    },
    {
      value: "Caliber",
    },
    {
      value: "Caravan Grand Cargo",
    },
    {
      value: "Caravan Grand Passenger",
    },
    {
      value: "Challenger",
    },
    {
      value: "Charger",
    },
    {
      value: "Dakota Crew Cab",
    },
    {
      value: "Dakota Extended Cab",
    },
    {
      value: "Durango",
    },
    {
      value: "Journey",
    },
    {
      value: "Magnum",
    },
    {
      value: "Nitro",
    },
    {
      value: "Ram 1500 Crew Cab",
    },
    {
      value: "Ram 1500 Mega Cab",
    },
    {
      value: "Ram 1500 Quad Cab",
    },
    {
      value: "Ram 1500 Regular Cab",
    },
    {
      value: "Ram 2500 Mega Cab",
    },
    {
      value: "Ram 2500 Quad Cab",
    },
    {
      value: "Ram 2500 Regular Cab",
    },
    {
      value: "Ram 3500 Mega Cab",
    },
    {
      value: "Ram 3500 Quad Cab",
    },
    {
      value: "Ram 3500 Regular Cab",
    },
    {
      value: "Sprinter 2500 Cargo",
    },
    {
      value: "Sprinter 2500 Passenger",
    },
    {
      value: "Sprinter 3500 Cargo",
    },
    {
      value: "Viper",
    },
    {
      value: "Mikallo",
    },
  ],
  Ferarri: [
    {
      value: "430 Scuderia",
    },
    {
      value: "599 GTB Fiorano",
    },
    {
      value: "612 Scaglietti",
    },
    {
      value: "F430",
    },
  ],
  Ford: [
    {
      value: "E150 Cargo",
    },
    {
      value: "E150 Super Duty Passenger",
    },
    {
      value: "E250 Cargo",
    },
    {
      value: "E350 Super Duty Cargo",
    },
    {
      value: "E350 Super Duty Passenger",
    },
    {
      value: "Edge",
    },
    {
      value: "Escape",
    },
    {
      value: "Expedition",
    },
    {
      value: "Expedition EL",
    },
    {
      value: "Explorer",
    },
    {
      value: "Explorer Sport Trac",
    },
    {
      value: "F150 Regular Cab",
    },
    {
      value: "F150 Super Cab",
    },
    {
      value: "F150 SuperCrew Cab",
    },
    {
      value: "F250 Super Duty Crew Cab",
    },
    {
      value: "F250 Super Duty Regular Cab",
    },
    {
      value: "F250 Super Duty Super Cab",
    },
    {
      value: "F350 Super Duty Crew Cab",
    },
    {
      value: "F350 Super Duty Regular Cab",
    },
    {
      value: "F350 Super Duty Super Cab",
    },
    {
      value: "F450 Super Duty Crew Cab",
    },
    {
      value: "Flex",
    },
    {
      value: "Focus",
    },
    {
      value: "Fusion",
    },
    {
      value: "Mustang",
    },
    {
      value: "Ranger Regular Cab",
    },
    {
      value: "Ranger Super Cab",
    },
    {
      value: "Taurus",
    },
    {
      value: "Taurus X",
    },
    {
      value: "windstar",
    },
    {
      value: "ECOSPORT",
    },
    {
      value: "Mondeo",
    },
  ],
  GMC: [
    {
      value: "Acadia",
    },
    {
      value: "Canyon Crew Cab",
    },
    {
      value: "Canyon Extended Cab",
    },
    {
      value: "Canyon Regular Cab",
    },
    {
      value: "Envoy",
    },
    {
      value: "Savana 1500 Cargo",
    },
    {
      value: "Savana 1500 Passenger",
    },
    {
      value: "Savana 2500 Cargo",
    },
    {
      value: "Savana 2500 Passenger",
    },
    {
      value: "Savana 3500 Cargo",
    },
    {
      value: "Savana 3500 Passenger",
    },
    {
      value: "Sierra 1500 Crew Cab",
    },
    {
      value: "Sierra 1500 Extended Cab",
    },
    {
      value: "Sierra 1500 Regular Cab",
    },
    {
      value: "Sierra 2500 HD Crew Cab",
    },
    {
      value: "Sierra 2500 HD Extended Cab",
    },
    {
      value: "Sierra 2500 HD Regular Cab",
    },
    {
      value: "Sierra 3500 HD Crew Cab",
    },
    {
      value: "Sierra 3500 HD Extended Cab",
    },
    {
      value: "Sierra 3500 HD Regular Cab",
    },
    {
      value: "Yukon",
    },
    {
      value: "Yukon XL 1500",
    },
    {
      value: "Yukon XL 2500",
    },
    {
      value: "Sierra Pick Up",
    },
  ],
  Honda: [
    {
      value: "Accord",
    },
    {
      value: "Civic",
    },
    {
      value: "CR-V",
    },
    {
      value: "Element",
    },
    {
      value: "Fit",
    },
    {
      value: "Odyssey",
    },
    {
      value: "Pilot",
    },
    {
      value: "Ridgeline",
    },
    {
      value: "S2000",
    },
    {
      value: "Crosstour",
    },
    {
      value: "pluto",
    },
    {
      value: "City",
    },
    {
      value: "HR-V",
    },
    {
      value: "Shuttle Bus",
    },
    {
      value: "CR-V",
    },
    {
      value: "Accord Hybrid",
    },
    {
      value: "Insight",
    },
    {
      value: "CR-Z",
    },
  ],
  Hummer: [
    {
      value: "H2",
    },
    {
      value: "H3",
    },
  ],
  Hyundai: [
    {
      value: "Accent",
    },
    {
      value: "Azera",
    },
    {
      value: "Elantra",
    },
    {
      value: "Entourage",
    },
    {
      value: "Genesis",
    },
    {
      value: "Santa Fe",
    },
    {
      value: "Sonata",
    },
    {
      value: "Tiburon",
    },
    {
      value: "Tucson",
    },
    {
      value: "Veracruz",
    },
    {
      value: "i10",
    },
    {
      value: "ix 35",
    },
    {
      value: "ix35 elegance ",
    },
    {
      value: "H1",
    },
  ],
  Infiniti: [
    {
      value: "EX35",
    },
    {
      value: "FX35",
    },
    {
      value: "FX45",
    },
    {
      value: "FX50",
    },
    {
      value: "G35",
    },
    {
      value: "G37",
    },
    {
      value: "M35",
    },
    {
      value: "M45",
    },
    {
      value: "QX56",
    },
    {
      value: "",
    },
    {
      value: "QX4",
    },
    {
      value: "Q30t",
    },
  ],
  Isuzu: [
    {
      value: "Ascender",
    },
    {
      value: "i-290 Extended Cab",
    },
    {
      value: "i-370 Crew Cab",
    },
    {
      value: "i-370 Extended Cab",
    },
  ],
  Jaguar: [
    {
      value: "S-Type",
    },
    {
      value: "X-Type",
    },
    {
      value: "XF",
    },
    {
      value: "XJ Series",
    },
    {
      value: "XK Series",
    },
  ],
  Jeep: [
    {
      value: "Commander",
    },
    {
      value: "Compass",
    },
    {
      value: "Grand Cherokee",
    },
    {
      value: "Liberty",
    },
    {
      value: "Patriot",
    },
    {
      value: "Wrangler",
    },
    {
      value: "toyota",
    },
  ],
  Kia: [
    {
      value: "Amanti",
    },
    {
      value: "Borrego",
    },
    {
      value: "Optima",
    },
    {
      value: "Rio",
    },
    {
      value: "Rondo",
    },
    {
      value: "Sedona",
    },
    {
      value: "Sorento",
    },
    {
      value: "Spectra",
    },
    {
      value: "Sportage",
    },
    {
      value: "cerato",
    },
    {
      value: "picanto",
    },
    {
      value: " Carens",
    },
  ],
  "Land Rover": [
    {
      value: "LR2",
    },
    {
      value: "LR3",
    },
    {
      value: "Range Rover",
    },
    {
      value: "Range Rover Sport",
    },
    {
      value: "Range Rover Evoque",
    },
    {
      value: "Free Lander",
    },
    {
      value: "Range Rover HSE",
    },
  ],
  Lexus: [
    {
      value: "ES 350",
    },
    {
      value: "GS 350",
    },
    {
      value: "GS 450h",
    },
    {
      value: "GS 460",
    },
    {
      value: "GX 470",
    },
    {
      value: "IS 250",
    },
    {
      value: "IS 350",
    },
    {
      value: "IS F",
    },
    {
      value: "LS 460",
    },
    {
      value: "LS 600h",
    },
    {
      value: "LX 570",
    },
    {
      value: "RX 350",
    },
    {
      value: "RX 400h",
    },
    {
      value: "SC 430",
    },
    {
      value: "jeep",
    },
    {
      value: "GX460",
    },
    {
      value: "RX300",
    },
    {
      value: "RX330",
    },
    {
      value: "ES330",
    },
  ],
  Lincoln: [
    {
      value: "Mark LT",
    },
    {
      value: "MKS",
    },
    {
      value: "MKX",
    },
    {
      value: "MKZ",
    },
    {
      value: "Navigator",
    },
    {
      value: "Navigator L",
    },
    {
      value: "Town Car",
    },
  ],
  Mazda: [
    {
      value: "B-Series Extended Cab",
    },
    {
      value: "B-Series Regular Cab",
    },
    {
      value: "CX-7",
    },
    {
      value: "CX-9",
    },
    {
      value: "MAZDA3",
    },
    {
      value: "MAZDA5",
    },
    {
      value: "MAZDA6",
    },
    {
      value: "Miata MX-5",
    },
    {
      value: "RX-8",
    },
    {
      value: "Tribute",
    },
    {
      value: "Kool",
    },
    {
      value: "626",
    },
    {
      value: "MPV",
    },
  ],
  "Mercedes-Benz": [
    {
      value: "C-Class",
    },
    {
      value: "CL-Class",
    },
    {
      value: "CLK-Class",
    },
    {
      value: "CLS-Class",
    },
    {
      value: "E-Class",
    },
    {
      value: "G-Class",
    },
    {
      value: "GL-Class",
    },
    {
      value: "ML-Class",
    },
    {
      value: "R-Class",
    },
    {
      value: "S-Class",
    },
    {
      value: "SL-Class",
    },
    {
      value: "SLK-Class",
    },
    {
      value: "SLR McLaren",
    },
    {
      value: "R280",
    },
    {
      value: "ML350",
    },
    {
      value: "200",
    },
    {
      value: "GL450",
    },
    {
      value: "GL 550",
    },
    {
      value: "Truck",
    },
    {
      value: "C300",
    },
    {
      value: "C350",
    },
    {
      value: "G50",
    },
    {
      value: "JEEP",
    },
    {
      value: "JEEP",
    },
    {
      value: "C240",
    },
    {
      value: "230",
    },
    {
      value: "E 300",
    },
    {
      value: "E 350",
    },
    {
      value: "E 550",
    },
  ],
  Nissan: [
    {
      value: "Frontier ",
    },
    {
      value: "350Z",
    },
    {
      value: "Altima",
    },
    {
      value: "Armada",
    },
    {
      value: "Frontier Crew Cab",
    },
    {
      value: "Frontier King Cab",
    },
    {
      value: "GT-R",
    },
    {
      value: "Maxima",
    },
    {
      value: "Murano",
    },
    {
      value: "Pathfinder",
    },
    {
      value: "Quest",
    },
    {
      value: "Rogue",
    },
    {
      value: "Sentra",
    },
    {
      value: "Titan Crew Cab",
    },
    {
      value: "Titan King Cab",
    },
    {
      value: "Versa",
    },
    {
      value: "Xterra",
    },
    {
      value: "nissan",
    },
    {
      value: "Sunny",
    },
    {
      value: "tiida",
    },
    {
      value: "premeire",
    },
    {
      value: " INFINITY JEEP",
    },
    {
      value: "Nissan Murano",
    },
    {
      value: "Infinity QX4",
    },
    {
      value: "X-Trail",
    },
    {
      value: "Qashqai",
    },
    {
      value: "Bluebird",
    },
    {
      value: "Teana",
    },
    {
      value: "Almera",
    },
    {
      value: "Titan",
    },
  ],
  MINI: [
    {
      value: "Cooper",
    },
  ],
  Mitsubishi: [
    {
      value: "Eclipse",
    },
    {
      value: "Endeavor",
    },
    {
      value: "Galant",
    },
    {
      value: "Lancer",
    },
    {
      value: "Outlander",
    },
    {
      value: "Raider Double Cab",
    },
    {
      value: "Raider Extended Cab",
    },
    {
      value: "Montero",
    },
    {
      value: "PAJERO",
    },
    {
      value: "L300",
    },
    {
      value: "Space Wagon 2.4 GDI",
    },
    {
      value: "Nativa",
    },
    {
      value: "Canter",
    },
    {
      value: "truck",
    },
  ],
  Pontaic: [
    {
      value: "G5",
    },
    {
      value: "G6",
    },
    {
      value: "G8",
    },
    {
      value: "Grand Prix",
    },
    {
      value: "Solstice",
    },
    {
      value: "Torrent",
    },
    {
      value: "Vibe",
    },
  ],
  Porsche: [
    {
      value: "Macan",
    },
    {
      value: "Boxster",
    },
    {
      value: "Cayenne",
    },
    {
      value: "Cayman",
    },
    {
      value: "911",
    },
    {
      value: "Panamera",
    },
    {
      value: "918 Spyder",
    },
  ],
  "Rolls-Royce": [
    {
      value: "Phantom",
    },
  ],
  Saab: [
    {
      value: "9-7X",
    },
  ],
  Saturn: [
    {
      value: "Astra",
    },
  ],
  Toyota: [
    {
      value: "Hilux",
    },
    {
      value: "Avensis",
    },
    {
      value: "4Runner",
    },
    {
      value: "Avalon",
    },
    {
      value: "Camry",
    },
    {
      value: "Corolla",
    },
    {
      value: "FJ Cruiser",
    },
    {
      value: "Highlander",
    },
    {
      value: "Land Cruiser",
    },
    {
      value: "Matrix",
    },
    {
      value: "Prius",
    },
    {
      value: "RAV4",
    },
    {
      value: "Sequoia",
    },
    {
      value: "Sienna",
    },
    {
      value: "Solara",
    },
    {
      value: "Tacoma Access Cab",
    },
    {
      value: "Tacoma Double Cab",
    },
    {
      value: "Tacoma Regular Cab",
    },
    {
      value: "Tundra CrewMax",
    },
    {
      value: "Tundra Double Cab",
    },
    {
      value: "Tundra Regular Cab",
    },
    {
      value: "Yaris",
    },
    {
      value: "Prado",
    },
    {
      value: "Hiace",
    },
    {
      value: "Avanza",
    },
    {
      value: "Venza",
    },
    {
      value: "Carina-E",
    },
    {
      value: "Previa",
    },
    {
      value: "Fortuner",
    },
    {
      value: "Carina ll",
    },
    {
      value: "Picnic",
    },
    {
      value: "Coaster",
    },
    {
      value: "Pick Up",
    },
    {
      value: "Dyna",
    },
    {
      value: "Tundra",
    },
    {
      value: "Corona",
    },
  ],
  Subaru: [
    {
      value: "Forester",
    },
    {
      value: "Impreza",
    },
    {
      value: "Legacy",
    },
    {
      value: "Outback",
    },
    {
      value: "Tribeca",
    },
  ],
  Suzuki: [
    {
      value: "Forenza",
    },
    {
      value: "Grand Vitara",
    },
    {
      value: "Reno",
    },
    {
      value: "SX4",
    },
    {
      value: "XL7",
    },
  ],
  Volkswagen: [
    {
      value: "Passat CC",
    },
    {
      value: "Eos",
    },
    {
      value: "GLI",
    },
    {
      value: "GTI Hatchback",
    },
    {
      value: "Jetta",
    },
    {
      value: "New Beetle",
    },
    {
      value: "V/W Passat",
    },
    {
      value: "R32",
    },
    {
      value: "Rabbit",
    },
    {
      value: "Routan",
    },
    {
      value: "Tiguan",
    },
    {
      value: "Touareg",
    },
    {
      value: "Touareg 2",
    },
    {
      value: "Wagon Golf",
    },
    {
      value: "Passat Wagon",
    },
    {
      value: "LT28",
    },
    {
      value: "Golf",
    },
    {
      value: "V/W TOUAREG",
    },
    {
      value: "Bus",
    },
    {
      value: "vento",
    },
  ],
  Volvo: [
    {
      value: "C30",
    },
    {
      value: "C70",
    },
    {
      value: "S40",
    },
    {
      value: "S60",
    },
    {
      value: "S80",
    },
    {
      value: "V50",
    },
    {
      value: "V70",
    },
    {
      value: "XC70",
    },
    {
      value: "XC90",
    },
    {
      value: "850",
    },
    {
      value: "V40",
    },
    {
      value: "",
    },
  ],
  Mercury: [
    {
      value: "Villager Van",
    },
  ],
  Rover: [
    {
      value: "623",
    },
  ],
  Opel: [
    {
      value: "Frontera",
    },
  ],
  "Land Rover Discovery": [
    {
      value: "LR4",
    },
  ],
  Skoda: [
    {
      value: "Octavia",
    },
    {
      value: "Fabia",
    },
    {
      value: "Superb",
    },
    {
      value: "Roomster",
    },
    {
      value: "Yeti",
    },
    {
      value: "Rapid",
    },
    {
      value: "Citigo",
    },
  ],
  Renault: [
    {
      value: "Logan",
    },
  ],
  MACK: [
    {
      value: "TIPPER",
    },
  ],
  Liberty: [
    {
      value: "Jeep",
    },
  ],
  Jinbei: [
    {
      value: "Bus",
    },
  ],
  Fiat: [
    {
      value: "Ducato",
    },
  ],
  Peugeot: [
    {
      value: "Boxer",
    },
  ],
  SCANIA: [
    {
      value: "TRUCK",
    },
  ],
  Geely: [
    {
      value: "Saloon",
    },
  ],
};

export const allStates = NaijaStates.states().map((st) => ({ value: st }));
export const allLgas = allLgasObj;
export const allBanks = [
  {
    value: "ACCESS BANK PLC",
  },
  {
    value: "CITIBANK NIGERIA PLC",
  },
  {
    value: "ACCESS(DIAMOND) BANK PLC",
  },
  {
    value: "ECOBANK NIGERIA PLC",
  },
  {
    value: "FIDELITY BANK PLC",
  },
  {
    value: "FIRST BANK NIGERIA LIMITED",
  },
  {
    value: "FIRST CITY MONUMENT BANK PLC",
  },
  {
    value: "GLOBUS BANK LTD",
  },
  {
    value: "GUARANTY TRUST BANK PLC",
  },
  {
    value: "HERITAGE BANK PLC",
  },
  {
    value: "KEY STONE BANK",
  },
  {
    value: "POLARIS BANK LIMITED",
  },
  {
    value: "PROVIDUS BANK LIMITED",
  },
  {
    value: "STANBIC IBTC BANK LTD",
  },
  {
    value: "STANDARD CHARTERED BANK NIGERIA LTD",
  },
  {
    value: "STERLING BANK PLC",
  },
  {
    value: "SUNTRUST BANK NIGERIA LTD",
  },
  {
    value: "TITAN TRUST BANK LTD",
  },
  {
    value: "UNION BANK OF NIGERIA PLC",
  },
  {
    value: "UNITED BANK FOR AFRICA PLC",
  },
  {
    value: "UNITY BANK PLC",
  },
  {
    value: "WEMA BANK PLC",
  },
  {
    value: "ZENITH BANK PLC",
  },
];
