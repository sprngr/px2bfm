<h1 align="center">
	<img src="logo.png" alt="px2bfm">
</h1>
# WIP

> Parse pixels to [BitFontMaker2](http://www.pentacom.jp/pentacom/bitfontmaker2/) font JSON format

![From Pittsburgh With Love](https://img.shields.io/badge/from%20pittsburgh%20with-%E2%9D%A4-yellow.svg?style=for-the-badge)

Pixels 2 [BitFontMaker2](http://www.pentacom.jp/pentacom/bitfontmaker2/) (aka px2bfm) is a simple command line tool with the intention of
allowing you to use your desired pixel editor to create font glyphs, creating compatible JSON, and importing it into BitFontMaker2 to generate a new bitmap font.


# Installation
> Note: not published to NPM yet

```shell
$ npm install --global px2bfm
```

# Usage
Using one of the font templates provided (or your own, as long as it fits within required dimensions), create a pixel font.

From the command line, run `px2bfm` and follow the prompts to generate your JSON.

Sprite sheets must have a width of 208px to maintain some parity with the layout of BitFontMaker2. The height of the file must be a power of 16 (default is 128px), this will allow for future support of extended character sets.

Be sure to use black (hex #000000 / rgba 255, 255, 255, 255) for glyph pixels, the image parser only cares about those. Any other colors are ignored.

Each glyph must fit within a 16x16 pixel block, this is required by the web app.

## Example px2bfm compatible sprite sheet

<img src="templates/test.png"/>

# Character Support
Currently this supports the first set of 104 characters on BitFontMaker2:
```
// Set 1
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

# Templates & Downloads
> Font Template includes guides

* [.ase (Aseprite) format](https://github.com/sprngr/px2bfm/blob/master/templates/template.ase?raw=true)
* [.png format](https://github.com/sprngr/px2bfm/blob/master/templates/template.png?raw=true)

The blue dotted line creates the grid of 16x16 blocks, the red aligns with the red
baseline in the web app.

<img src="templates/template.png"/>

# License
MIT &copy; [Michael Springer](https://github.com/sprngr) 2018
