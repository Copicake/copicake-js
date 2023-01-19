const Copicake = require("../../dist/esbuild/main").default;
const fs = require("fs");

const file = fs.readFileSync("./test.png");
const copicake = new Copicake({
  apiKey: "API_KEY",
});

copicake.utils
  .uploadTempImage(file, "png")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
