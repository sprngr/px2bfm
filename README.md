<h1 align="center">
	<img src="logo.png" alt="px2bfm">
</h1>

> Parse pixels to [BitFontMaker2](http://www.pentacom.jp/pentacom/bitfontmaker2/) JSON font format

![From Pittsburgh With Love](https://img.shields.io/badge/from%20pittsburgh%20with-%E2%9D%A4-yellow.svg?style=for-the-badge)

Pixels 2 [BitFontMaker2](http://www.pentacom.jp/pentacom/bitfontmaker2/) (aka px2bfm) is a simple command line tool with the intention of
allowing you to use your desired pixel editor to create font glyphs, creating compatible JSON, and importing it into BitFontMaker2 to generate a new bitmap font.

# Table of Contents

- [Installation](#installation)
	- [Alternative Installation](#alternative-installation)
- [Usage](#usage)
	- [Important Notes](#important-notes)
	- [Example Sprite Sheet & Output](#example-sprite-sheet-output)
- [Character Support](#character-support)
- [Download Template](#download-template)
- [License](#license)

# Installation
> This package requires npm and node.js. If you don't have npm or node.js on your local machine, check out [this guide on getting setup](https://docs.npmjs.com/getting-started/installing-node).

```shell
$ npm install --global px2bfm
```

## Alternative Installation

If you don't feel like installing it globally via npm, you can clone this repo and run the script directly:
```shell
$ ./bin/px2bfm
```

# Usage
```shell
$ px2bfm

  Usage: px2bfm [options] <file>

  Parse pixels to BitFontMaker2 JSON font format
  For more info visit https://github.com/sprngr/px2bfm

  Options:

    -v, --version              output the version number
    -f, --fontname <fontname>  add name of the font
    -c, --creator <creator>    add name of the font creator
    -h, --help                 output usage information
```

The `fontname` and `creator` arguments are optional, but you'll probably want to set that at some point.

Example:
```shell
$ px2bfm yourFileHere.png
# Output: {A lot of JSON}
```

To get this into a file:
```shell
$ px2bfm yourFileHere.png > bfm2.json # Or whatever you want to call it
```

To put it on the clipboard to paste into the textfield on the web app:

**MacOS**
```shell
$ px2bfm yourFileHere.png | pbcopy
```

**Windows**
```shell
# I'm pretty sure this is a standard tool
$ px2bfm yourFileHere.png | clip
```

**Linux**
```shell
# Let's be honest, if you're on linux you're a pro at this so why do I need to tell you
$ px2bfm yourFileHere.png | xclip
```

## Important Notes

Using one of the font templates provided (or your own, as long as it fits within required dimensions), create a pixel font.

Sprite sheets must have a width of 208px to maintain some parity with the layout of BitFontMaker2.
The height of the file must be a power of 16 (default is 128px), this will allow for future support of extended character sets.

Be sure to use black (hex #000000 / rgba 255, 255, 255, 255) for glyph pixels, the image parser only cares about those. Any other colors are ignored.

Each glyph must fit within a 16x16 pixel block, this is required by the web app.

## Example Sprite Sheet & Output

> Input

<img src="templates/test.png"/>

> Output

```JSON
{
	"33": [0, 0, 0, 0, 8, 8, 8, 8, 8, 8, 0, 8, 0, 0, 0, 0],
	"34": [0, 0, 0, 0, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	"35": [0, 0, 0, 0, 0, 40, 40, 124, 40, 124, 40, 40, 0, 0, 0, 0],
	...
	"name": "PixelFont",
	"copy": "PixelFontMaker",
	"letterspace": "64",
	"basefont_size": "357",
	"basefont_left": "62",
	"basefont_top": "0",
	"basefont": "None",
	"basefont2": ""
}
```

# Character Support
Currently this supports the first set of 104 characters on BitFontMaker2:
```
# Set 1
ABCDEFGHIJKLM
NOPQRSTUVWXYZ
abcdefghijklm
nopqrstuvwxyz
0123456789!"#
$%&'()*+,-./:
;<=>?@[\]^_`{
|}~¡¢£€¤¥¦§¨©
```
Extended character support is planned for the future, as well as the additional 90 character slots allowed.

# Download Template
Font template includes guides. The blue dotted line creates the grid of 16x16 blocks, the red lines are the baseline like in the web app.

<img src="templates/template.png"/>

## Downloads
* [.ase (Aseprite) format](https://github.com/sprngr/px2bfm/blob/master/templates/template.ase?raw=true)
* [.png format](https://github.com/sprngr/px2bfm/blob/master/templates/template.png?raw=true)

# License
MIT &copy; [Michael Springer](https://github.com/sprngr) 2018
