const nanoid = function (targetLength: number): string {
  const codes = "1234567890abcdefghijklmnopqrstuvwxyz";
  const codesLength = codes.length;

  let result = "";

  for (let i = 0; i < targetLength; i++) {
    const codeIndex = Math.floor(Math.random() * codesLength);
    result += codes[codeIndex];
  }

  return result;
};

export default nanoid;
