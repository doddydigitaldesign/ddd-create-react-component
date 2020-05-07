export const capitalize = (arg: string) => {
  const [leadingChar, ...rest] = arg.split("");
  return leadingChar.toUpperCase().concat(rest.join(""));
};
