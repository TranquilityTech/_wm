// rm filename space by shell
// https://www.linuxcommands.site/linux-text-processing-commands/linux-awk-command/linux-shell-batch-move-files-delete-spaces-rename-files/
// ls | while read i; do mv "$i" $(echo $i|tr -d ' '); done

const path = require('path');
const fs = require('fs');
const ffmpeg = require('ffmpeg');
//joining path of directory
const input = "/home/tranquility/Downloads/del/temp/vv/input";
const output = "/home/tranquility/Downloads/del/temp/vv/output";
const directoryPath = path.join(input);
//passsing directoryPath and callback function
fs.readdir(directoryPath, (err, files) => {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach((file, index) => {
        setTimeout(() => {
            // watermark with video
            try {
                new ffmpeg(`${input}/${file}`, (err, video) => {
                    if (!err) {
                        console.log('The video is ready to be processed');

                        video.fnAddWatermark('/home/tranquility/Downloads/del/temp/vv/T.png', `${output}/${file}`, {
                            position: 'SW',
                            margin_west: 5,
                            margin_sud: 5
                        }, (error, file) => {
                            if (!error)
                                console.log('New video file: ' + file);
                        });
                    } else {
                        console.log('Error: ' + err);
                    }
                });
            } catch (e) {
                console.log(e.code);
                console.log(e.msg);
            }
        }, index * 10000);
    });
});
