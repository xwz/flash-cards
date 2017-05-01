import * as PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as _ from 'lodash';

const words = [
    'sat', 'mat', 'am',
    'come', 'here', 'the', 'fat', 'rat', 'ram', 'tram',
    'and', 'said', 'you', 'got', 'dog', 'hot', 'frog',
    'where', 'are', 'oh', 'bus', 'bun', 'sun', 'lost',
    'my', 'go', 'so', 'pot', 'vet', 'pen', 'drip',
    'what', 'some', 'no', 'jet', 'box', 'wet', 'stop',
    'they', 'me', 'she', 'zip', 'quit', 'clock', 'happy',
    'put', 'be', 'give', 'clock', 'sock', 'sky', 'happy',
    'we', 'by', 'to', 'good', 'look', 'moon', 'zoo',
    'out', 'of', 'saw', 'feet', 'bee', 'green', 'see',

    // https://www.det.nsw.edu.au/eppcontent/glossary/app/resource/factsheet/4109.pdf
    'after', 'again', 'and', 'at', 'away', 'because',
    'been', 'before', 'big', 'boy', 'by', 'came', 'come',
    'could', 'dad', 'didn’t', 'do', 'down', 'for', 'friend',
    'from', 'gave', 'get', 'girl', 'give', 'goes', 'good',
    'had', 'have', 'he', 'her', 'him', 'his', 'how', 'I',
    'if', 'in', 'into', 'is', 'it', 'like', 'little',
    'looked', 'love', 'made', 'make', 'me', 'mum', 'my',
    'not', 'of', 'off', 'on', 'one', 'our', 'out', 'over',
    'people', 'play', 'run', 'said', 'saw', 'say', 'school',
    'see', 'she', 'should', 'so', 'stayed', 'that', 'the',
    'their', 'them', 'then', 'there', 'they', 'this',
    'to', 'too', 'upon', 'two', 'up', 'us', 'use',
    'very', 'was', 'we', 'went', 'were', 'what', 'when',
    'where', 'which', 'who', 'why', 'will', 'with', 'you', 'your',
];

const A4 = {width: 592, height: 842};

const doc = new PDFDocument({autoFirstPage: false, margin: 0});
doc.pipe(fs.createWriteStream('cards.pdf'));

const rows = 4;
const cols = 2;
const width = A4.width / cols;
const height = A4.height / rows;
const size = 72;
const offset = 70;

let placeWords = function (words) {
    doc.lineWidth(0.25);
    doc.font('fonts/nsw_foundation_font_regular.ttf')
        .fontSize(size);
    let index = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            doc.rect(j * width, i * height, width, height).stroke();
            if (index < words.length) {
                const para = {width: width, height: size, align: 'center'};
                doc.text(words[index], j * width, i * height + offset, para);
            }
            index++;
        }
    }
};
for (let group of _.chunk(_.uniq(words), rows * cols)) {
    doc.addPage({size: [A4.width, A4.height]});
    placeWords(group);
}

doc.save();
doc.end();