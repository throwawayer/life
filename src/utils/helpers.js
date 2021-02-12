import { gridSizeEnum } from 'consts/enums';

const capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const formatWord = (word) => word.replace(/([a-z])([A-Z])/g, '$1 $2');

const getSize = (letter) => {
  switch (letter) {
    case 'S':
      return gridSizeEnum.Small;
    case 'M':
      return gridSizeEnum.Medium;
    case 'L':
      return gridSizeEnum.Large;
    case 'H':
      return gridSizeEnum.Huge;
    default:
      return -1;
  }
};

export { capitalizeWord, formatWord, getSize };
