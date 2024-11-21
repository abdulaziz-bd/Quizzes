export const fontJaro = {
  fontFamily: "Jaro",
};

export const rankPosition = (number) => {
  const remainder = number % 100;
  if (remainder >= 11 && remainder <= 13) {
    return "th";
  }
  switch (number % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
