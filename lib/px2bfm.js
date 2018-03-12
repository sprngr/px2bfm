'use strict';

// Required Modules
const Jimp = require('jimp');

// bitmask values for each column
const bitMaskMap = [1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768];

// Currently supports first set of glyphs BitFontMaker2, extended set soon
const glyphMapLayout = require('./glyphMap.json');

// Size of glyph canvas, 16x16 is used by BitFontMaker2
const glyphSize = 16;

// Boilerplate output JSON
let outputJSON = require('./bitfontmaker2.json');

// Default dimensions; width is constant, height can be changed by user input
let glyphMapDimensions = {
    height: 128,
    width: 208
}

// Output JSON of glyphs for BitFontMaker2
let glyphMapOutput = {};

// Entry point of the library
//
// imagePath - the path of the image to be processed
// name - name of the font, defaults to "PixelFont"
// creator - name of the font creator, defaults to "PixelFontMaker"
//
// Returns promise which resolves as the font JSON string
module.exports = function (imagePath, name, creator) {
    // Set font information
    outputJSON.name = name || "PixelFont";
    outputJSON.copy = creator || "PixelFontMaker";

    return Jimp.read(imagePath)
        .then((image) => {
            let height = image.bitmap.height;
            let width = image.bitmap.width;

            // Check width
            if (width != glyphMapDimensions.width) {
                console.error('Image must be 208 pixels wide (13 16x16 glyphs across)');
                return;
            }

            // Check height (could be more or less)
            if (height % glyphSize !== 0) {
                console.error('Glyph heights must be a power of 16 (128, 256, etc)');
                return;
            } else if (height !== glyphMapDimensions.height) {
                glyphMapDimensions.height = height;
            }

            return processPixels(getPixelsFromBuffer(image.bitmap.data));
        })
        .catch(function (err) {
            console.error(err)
            return;
        });
}

// Converts Buffer into array of pixels
//
// buffer - Buffer created from jimp of input image
//
// Returns array of objects containing rgba values
function getPixelsFromBuffer(buffer) {
    let pixelData = [...buffer];
    let results = [];

    for (let i = 0; i < pixelData.length; i += 4) {
      results.push({
          r: pixelData[i+0],
          g: pixelData[i+1],
          b: pixelData[i+2],
          a: pixelData[i+3]
      })
    }
    return results;
}

// Processes value stored at glyphPixels
function processPixels(pixels) {
    let outerIndex = {x:-1, y: 0};
    let innerIndex = {x:0, y: 0};

    pixels.some((pixel, index) => {
        // Set inner x to be 0 - 15 based on modulo of current index
        innerIndex.x = index % glyphSize;

        // if inner x is 0, increase outer x
        if (innerIndex.x == 0) {
            outerIndex.x++;

            // if outer x will be out of bounds (13)
            // reset it to 0, bump the inner y
            if (outerIndex.x == glyphMapDimensions.width / glyphSize) {
                outerIndex.x = 0;
                innerIndex.y++;

                // if inner y is out of bounds (16)
                // reset it to 0, bump the outer y
                if (innerIndex.y == glyphSize) {
                    innerIndex.y = 0;
                    outerIndex.y++;
                }
            }
        }

        // Math it up. If rgb is 0, it's part of the glyph.
        if (pixel.r + pixel.g + pixel.b == 0) {
            outputJSON[glyphMapLayout[outerIndex.y][outerIndex.x]][innerIndex.y] += bitMaskMap[innerIndex.x];
        }
    });

    return JSON.stringify(outputJSON);
}
