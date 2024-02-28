
async function loadCSV(filename) {
    const response = await fetch(filename); 
    const data = await response.text(); 
    return data;
}

let countLoad = 0;
let questionContainer = [];
let alldata;

const csvFilePath = '507to1995.csv';

loadCSV(csvFilePath)
    .then(csvData => {
        alldata = csvData;
        arrangeData();
        
        if (countLoad === 0) {
            const scriptElement = document.createElement('script');
            scriptElement.src = 'question.js';
            scriptElement.defer = true;
            document.body.appendChild(scriptElement);
            const scriptElement2 = document.createElement('script');
            scriptElement2.src = 'timeline.js';
            scriptElement2.defer = true;
            document.body.appendChild(scriptElement2);
            countLoad++;
        }
    })
    .catch(error => {
        console.error('CSV読み込みエラー:', error);
    });

function reset() {
    questionContainer =[];
    arrangeData();
}

let yearList =[];

function arrangeData() {
    const lines = alldata.split('\r\n'); //or\r 
        const headers = lines[0].split(',');
        const yearIndex = headers.indexOf('year');
        const warekiIndex = headers.indexOf('wareki');
        const monthIndex = headers.indexOf('month');
        const dayIndex = headers.indexOf('day');
        const happenIndex = headers.indexOf('text');
        const englishIndex = headers.indexOf('english');
        const shorterIndex = headers.indexOf('ov150words');


        const filteredLines = lines.filter(line => {
            const columns = line.split(',');
            const year = parseInt(columns[yearIndex]);
            const short = parseInt(columns[shorterIndex]);
            return year >= 1900 && year <= 1995 && short === 1; //年の範囲指定と、150文字以上テキストは除外
        });
         
        const randomIndexes = [];
        const questionLen = 5;
        while (randomIndexes.length < questionLen) {
            const randomIndex = Math.floor(Math.random() * filteredLines.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }

        randomIndexes.sort((a, b) => a - b);
        const randomLines = randomIndexes.map(index => filteredLines[index]);
               
        yearList=[];

        for (let i = 0; i < questionLen; i++) {

            const columns = randomLines[i].split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
            const year = columns[yearIndex]
            const wareki = columns[warekiIndex];
            const month = columns[monthIndex];
            const day = columns[dayIndex];
            const happen = columns[happenIndex];
            const english = columns[englishIndex];
            questionContainer.push([year, wareki, month, day, happen, english]);
            yearList.push(year);
        }
}








