const getPixels = require("pixel-getter").get;

const bitMaskMap = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768];
const glyphMapLayout = [
    [65,66,67,68,69,70,71,72,73,74,75,76,77],
    [78,79,80,81,82,83,84,85,86,87,88,89,90]
];
const glyphSize = 16;

let output = require("./bitfontmaker2.json");

// Import image, get pixels
let glyphPixels;
let glyphMapDimensions = {
    height: 128,
    width: 208
}
let glyphMapOutput = {};

getPixels("glyph/template.png", function(err, pixels) {
    if(err) {
        console.log(err);
        return;
    }

    glyphPixels = pixels[0];
    processPixels();
});

function processPixels() {
    let outerIndex = {x:-1, y: 0};
    let innerIndex = {x:0, y: 0};

    glyphPixels.some((pixel, index) => {
        // Set inner x to be 0 - 15 based on modulo of current index
        innerIndex.x = index % glyphSize;

        // if inner x is 0, increase outer x
        if (innerIndex.x == 0) {
            outerIndex.x++;

            // if outer x will be out of bounds (13)
            // reset it to 0, bump the inner y
            if (outerIndex.x == 13) {
                outerIndex.x = 0;
                innerIndex.y++;

                // if inner y is out of bounds (16)
                // reset it to 0, bump the outer y
                if (innerIndex.y == 16) {
                    innerIndex.y = 0;
                    outerIndex.y++;
                }
            }
        }

        if (outerIndex.y == 2) return true;

        if (pixel.r == 0 && pixel.g == 0 && pixel.b == 0) {
            output[glyphMapLayout[outerIndex.y][outerIndex.x]][innerIndex.y] += bitMaskMap[innerIndex.x];
        }
    });

    console.log(JSON.parse(output));
}
