import test from 'ava';

const px2bfm = require('./lib/px2bfm.js');

test('Generates BitFontMaker2 JSON', async t => {
    const fontname = 'Test Name';
    const creator = 'Test Creator';
    const fileValue = './templates/test.png';
    const outputJSON =  '{"33":[0,0,0,0,8,8,8,8,8,8,0,8,0,0,0,0],"34":[0,0,0,0,20,20,20,0,0,0,0,0,0,0,0,0],"35":[0,0,0,0,0,40,40,124,40,124,40,40,0,0,0,0],"36":[0,0,0,16,56,84,20,56,80,84,56,16,0,0,0,0],"37":[0,0,0,0,272,296,144,128,64,576,1312,544,0,0,0,0],"38":[0,0,0,0,48,72,72,48,296,196,196,312,0,0,0,0],"39":[0,0,0,0,4,4,4,0,0,0,0,0,0,0,0,0],"40":[0,0,0,0,16,8,8,4,4,4,4,8,8,16,0,0],"41":[0,0,0,0,4,8,8,16,16,16,16,8,8,4,0,0],"42":[0,0,0,0,84,56,124,56,84,0,0,0,0,0,0,0],"43":[0,0,0,0,0,0,16,16,124,16,16,0,0,0,0,0],"44":[0,0,0,0,0,0,0,0,0,0,0,8,8,4,0,0],"45":[0,0,0,0,0,0,0,0,0,28,0,0,0,0,0,0],"46":[0,0,0,0,0,0,0,0,0,0,0,8,0,0,0,0],"47":[0,0,0,0,0,16,16,16,8,8,8,4,4,4,0,0],"48":[0,0,0,0,56,100,100,84,84,76,76,56,0,0,0,0],"49":[0,0,0,0,32,48,40,32,32,32,32,32,0,0,0,0],"50":[0,0,0,0,56,68,64,32,16,8,4,124,0,0,0,0],"51":[0,0,0,0,56,68,64,48,64,64,68,56,0,0,0,0],"52":[0,0,0,0,64,96,80,72,68,252,64,64,0,0,0,0],"53":[0,0,0,0,124,4,4,60,64,64,68,56,0,0,0,0],"54":[0,0,0,0,56,68,4,60,68,68,68,56,0,0,0,0],"55":[0,0,0,0,124,64,32,32,16,16,8,8,0,0,0,0],"56":[0,0,0,0,56,68,68,56,68,68,68,56,0,0,0,0],"57":[0,0,0,0,56,68,68,68,120,64,64,56,0,0,0,0],"58":[0,0,0,0,0,0,0,8,0,0,0,8,0,0,0,0],"59":[0,0,0,0,0,0,0,8,0,0,0,8,8,4,0,0],"60":[0,0,0,0,0,0,192,48,12,48,192,0,0,0,0,0],"61":[0,0,0,0,0,0,0,124,0,124,0,0,0,0,0,0],"62":[0,0,0,0,0,0,12,48,192,48,12,0,0,0,0,0],"63":[0,0,0,0,56,68,68,32,16,16,0,16,0,0,0,0],"64":[0,0,0,0,0,480,528,1480,1320,1320,968,1040,992,0,0,0],"65":[0,0,0,0,32,32,80,80,136,248,260,260,0,0,0,0],"66":[0,0,0,0,120,136,136,120,136,136,136,120,0,0,0,0],"67":[0,0,0,0,240,264,4,4,4,4,264,240,0,0,0,0],"68":[0,0,0,0,120,136,264,264,264,264,136,120,0,0,0,0],"69":[0,0,0,0,248,8,8,120,8,8,8,248,0,0,0,0],"70":[0,0,0,0,248,8,8,120,8,8,8,8,0,0,0,0],"71":[0,0,0,0,240,264,4,4,452,260,264,240,0,0,0,0],"72":[0,0,0,0,264,264,264,504,264,264,264,264,0,0,0,0],"73":[0,0,0,0,8,8,8,8,8,8,8,8,0,0,0,0],"74":[0,0,0,0,32,32,32,32,32,32,36,24,0,0,0,0],"75":[0,0,0,0,136,72,40,24,40,72,136,264,0,0,0,0],"76":[0,0,0,8,8,8,8,8,8,8,8,248,0,0,0,0],"77":[0,0,0,520,792,792,680,680,584,584,520,520,0,0,0,0],"78":[0,0,0,0,136,152,152,168,168,200,200,136,0,0,0,0],"79":[0,0,0,0,112,136,260,260,260,260,136,112,0,0,0,0],"80":[0,0,0,0,120,136,136,136,120,8,8,8,0,0,0,0],"81":[0,0,0,0,112,136,260,260,260,260,200,496,0,0,0,0],"82":[0,0,0,0,248,264,264,264,248,72,136,264,0,0,0,0],"83":[0,0,0,0,112,136,8,48,64,128,136,112,0,0,0,0],"84":[0,0,0,0,124,16,16,16,16,16,16,16,0,0,0,0],"85":[0,0,0,0,264,264,264,264,264,264,264,240,0,0,0,0],"86":[0,0,0,0,260,260,136,136,80,80,32,32,0,0,0,0],"87":[0,0,0,0,1028,1092,1092,680,680,680,272,272,0,0,0,0],"88":[0,0,0,0,136,80,80,32,32,80,80,136,0,0,0,0],"89":[0,0,0,0,68,68,40,40,16,16,16,16,0,0,0,0],"90":[0,0,0,0,252,128,64,32,16,8,4,252,0,0,0,0],"91":[0,0,0,0,24,8,8,8,8,8,8,8,8,24,0,0],"92":[0,0,0,0,4,4,4,8,8,8,16,16,16,0,0,0],"93":[0,0,0,0,12,8,8,8,8,8,8,8,8,12,0,0],"94":[0,0,0,0,16,40,40,68,68,0,0,0,0,0,0,0],"95":[0,0,0,0,0,0,0,0,0,0,0,0,0,252,0,0],"96":[0,0,0,0,4,8,0,0,0,0,0,0,0,0,0,0],"97":[0,0,0,0,0,0,0,56,68,120,68,120,0,0,0,0],"98":[0,0,0,0,8,8,8,8,120,136,136,120,0,0,0,0],"99":[0,0,0,0,0,0,0,56,68,4,68,56,0,0,0,0],"100":[0,0,0,0,64,64,64,120,68,68,68,120,0,0,0,0],"101":[0,0,0,0,0,0,0,56,68,124,4,120,0,0,0,0],"102":[0,0,0,0,16,8,8,28,8,8,8,8,0,0,0,0],"103":[0,0,0,0,0,0,0,56,68,68,68,120,64,56,0,0],"104":[0,0,0,0,8,8,8,120,136,136,136,136,0,0,0,0],"105":[0,0,0,0,0,8,0,8,8,8,8,8,0,0,0,0],"106":[0,0,0,0,0,8,0,8,8,8,8,8,8,4,0,0],"107":[0,0,0,0,8,8,8,72,40,24,40,72,0,0,0,0],"108":[0,0,0,0,8,8,8,8,8,8,8,8,0,0,0,0],"109":[0,0,0,0,0,0,0,440,584,584,584,584,0,0,0,0],"110":[0,0,0,0,0,0,0,120,136,136,136,136,0,0,0,0],"111":[0,0,0,0,0,0,0,56,68,68,68,56,0,0,0,0],"112":[0,0,0,0,0,0,0,120,136,136,136,120,8,8,0,0],"113":[0,0,0,0,0,0,0,120,68,68,68,120,64,64,0,0],"114":[0,0,0,0,0,0,0,104,24,8,8,8,0,0,0,0],"115":[0,0,0,0,0,0,0,56,4,24,32,28,0,0,0,0],"116":[0,0,0,0,0,8,8,28,8,8,8,16,0,0,0,0],"117":[0,0,0,0,0,0,0,136,136,136,136,240,0,0,0,0],"118":[0,0,0,0,0,0,0,68,68,40,40,16,0,0,0,0],"119":[0,0,0,0,0,0,0,292,292,340,136,136,0,0,0,0],"120":[0,0,0,0,0,0,0,68,40,16,40,68,0,0,0,0],"121":[0,0,0,0,0,0,0,68,68,40,40,16,16,12,0,0],"122":[0,0,0,0,0,0,0,124,32,16,8,124,0,0,0,0],"123":[0,0,0,0,16,8,8,8,8,4,8,8,8,8,16,0],"124":[0,0,0,0,8,8,8,8,8,8,8,8,8,8,0,0],"125":[0,0,0,0,4,8,8,8,8,16,8,8,8,8,4,0],"126":[0,0,0,0,0,0,0,80,40,0,0,0,0,0,0,0],"161":[0,0,0,0,0,0,8,0,8,8,8,8,8,8,0,0],"162":[0,0,0,0,0,0,64,56,100,20,76,56,4,0,0,0],"163":[0,0,0,112,136,136,8,60,8,8,4,252,0,0,0,0],"164":[0,0,0,0,68,56,40,56,68,0,0,0,0,0,0,0],"165":[0,0,0,0,68,68,40,40,16,56,56,16,0,0,0,0],"166":[0,0,0,0,8,8,8,8,0,0,8,8,8,8,0,0],"167":[0,0,0,0,0,112,136,8,112,136,112,128,136,112,0,0],"168":[0,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0],"169":[0,0,0,0,240,264,612,532,532,612,264,240,0,0,0,0],"8364":[0,0,0,0,224,16,8,124,124,8,16,224,0,0,0,0],"name":"Test Name","copy":"Test Creator","letterspace":"64","basefont_size":"357","basefont_left":"62","basefont_top":"0","basefont":"None","basefont2":""}';

    await Promise.resolve(px2bfm(fileValue, fontname, creator))
        .then((output) => {
            t.is(outputJSON, output);
        });
});