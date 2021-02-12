const gridSizes = [220, 880, 1980, 3520];
const gridSpeeds = [750, 400, 200, 100, 50];

const gridSizeEnum = Object.freeze({
  Small: 0,
  Medium: 1,
  Large: 2,
  Huge: 3,
});

const gridSpeedsEnum = Object.freeze({
  Slowest: 0,
  Slow: 1,
  Normal: 2,
  Fast: 3,
  Fastest: 4,
});

const gridPatternsEnum = Object.freeze({
  None: 0,
  GosperGliderGunM: 1,
  SimkinGliderGunL: 2,
  PulsarM: 3,
  EdenGardenL: 4,
  GliderS: 5,
  LwssS: 6,
  HwssS: 7,
  PentadecathlonS: 8,
  DieHardL: 9,
});

export { gridSizes, gridSizeEnum, gridSpeeds, gridSpeedsEnum, gridPatternsEnum };
