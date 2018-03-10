const getPixels = require("get-pixels");

let glyphSize = 16;
let glyph = {};

getPixels("glyph/a.png", function(err, pixels) {
  if(err) {
    console.log("Bad image path");
    return;
  }

});
