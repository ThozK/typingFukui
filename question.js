qConLen = questionContainer.length;

let topicNum = 0;
let targetWord = 0;

if (questionContainer[topicNum][5][0] === '"') {
    targetWord = 1;
}

document.getElementById("info").innerHTML = questionContainer[topicNum][1] + "年" + questionContainer[topicNum][2] + "月" + questionContainer[topicNum][3] + "日　" + questionContainer[topicNum][4];

document.getElementById("dateId").innerHTML = questionContainer[topicNum][0];

if (questionContainer[topicNum][5][0] !== '"') {
    document.getElementById("word").innerHTML = '<span class="target">' +
        questionContainer[topicNum][5].substring(0, 1) +
        '</span><span>' + questionContainer[topicNum][5].substring(1) +
        '</span>';
} else {
    document.getElementById("word").innerHTML = '<span class="target">' +
        questionContainer[topicNum][5].substring(1, 2) +
        '</span><span>' + questionContainer[topicNum][5].substring(2, questionContainer[topicNum][5].length - 1) +
        '</span>';
}

function endgame() {
    topicNum = 0;
    targetWord = 0;
    document.getElementById("word").innerHTML = "";
    let infoHTML = "<br>お疲れさまでした。今回のお題↓（リンクはgoogle検索）<br><br>";
    for (let i = 0; i < 5; i++) {
        infoHTML += '<div class="resultBox" onmouseover=" highlightYear('+questionContainer[i][0]+')"><b>' + questionContainer[i][0] + "年 (" +
            questionContainer[i][1] + "年) " + questionContainer[i][2] + "月" + questionContainer[i][3] + "日" + "</b><br>" +
            '<a href="https://www.google.com/search?q='+questionContainer[i][4]+'" target="_blank">'+questionContainer[i][4] + '</a><br><span class="colored">' + questionContainer[i][5] + "</span></div>"
    }
    document.getElementById("result").innerHTML = infoHTML + '<button id="restart" class="restartButton">もう一回</button>';
    document.getElementById("result").classList.add('result');
    document.getElementById("info").innerHTML = "";
    document.getElementById("dateId").innerHTML = "";
    document.getElementById("restart").addEventListener("click", function (event) {
        document.getElementById("result").innerHTML = "";
        document.getElementById("result").classList.remove('result');
        reset();
        displayTopic();
        highlightYear(yearList[topicNum]);

    }
    );
}


function displayTopic() {
    console.log(questionContainer);
    if (questionContainer[topicNum][5][0] === '"') {
        targetWord = 1;
    }

    document.getElementById("info").innerHTML = questionContainer[topicNum][1] + "年" + questionContainer[topicNum][2] + "月" + questionContainer[topicNum][3] + "日　" + questionContainer[topicNum][4];

    document.getElementById("dateId").innerHTML = questionContainer[topicNum][0];

    if (questionContainer[topicNum][5][0] !== '"') {
        document.getElementById("word").innerHTML = '<span class="target">' +
            questionContainer[topicNum][5].substring(0, 1) +
            '</span><span>' + questionContainer[topicNum][5].substring(1) +
            '</span>';
    } else {
        document.getElementById("word").innerHTML = '<span class="target">' +
            questionContainer[topicNum][5].substring(1, 2) +
            '</span><span>' + questionContainer[topicNum][5].substring(2, questionContainer[topicNum][5].length - 1) +
            '</span>';
    }
}


document.addEventListener('keypress', function (event) {
    if (questionContainer[topicNum][5][0] === '"') {
        if ((event.key === questionContainer[topicNum][5][targetWord]) | (event.key.toUpperCase() === questionContainer[topicNum][5][targetWord])) {
            const coloredText = '<span class="colored">' +
                questionContainer[topicNum][5].substring(1, targetWord + 1) +
                '</span><span class="target">' + questionContainer[topicNum][5].substring(targetWord + 1, targetWord + 2) +
                '</span><span>' + questionContainer[topicNum][5].substring(targetWord + 2, questionContainer[topicNum][5].length - 1) +
                '</span>';
            document.getElementById("word").innerHTML = coloredText;
            targetWord++;
            if (targetWord === (questionContainer[topicNum][5].length - 1)) {
                topicNum++;
                if (topicNum === 5) {
                    endgame();
                    return;
                }
                if (questionContainer[topicNum][5][0] === '"') {
                    targetWord = 1;
                } else { targetWord = 0; };
                displayTopic();
                highlightYear(yearList[topicNum]);
            }
        } else {
            const indiEl = document.getElementById("yeartab");
            indiEl.classList.add("misAni");
            setTimeout(() => {
                indiEl.classList.remove("misAni");
            }, 200);
        }
    } else {
        if ((event.key === questionContainer[topicNum][5][targetWord]) || (event.key.toUpperCase() === questionContainer[topicNum][5][targetWord])) {
            const coloredText = '<span class="colored">' +
                questionContainer[topicNum][5].substring(0, targetWord + 1) +
                '</span><span class="target">' + questionContainer[topicNum][5].substring(targetWord + 1, targetWord + 2) +
                '</span><span>' + questionContainer[topicNum][5].substring(targetWord + 2) +
                '</span>';
            document.getElementById("word").innerHTML = coloredText;
            targetWord++;
            if (targetWord === questionContainer[topicNum][5].length) {
                topicNum++;
                if (topicNum === 5) {
                    endgame();
                    return;
                }
                if (questionContainer[topicNum][5][0] === '"') {
                    targetWord = 1;
                } else { targetWord = 0; };
                displayTopic();
                highlightYear(yearList[topicNum]);
            }
        } else {
            const indiEl = document.getElementById("yeartab");
            indiEl.classList.add("misAni");
            setTimeout(() => {
                indiEl.classList.remove("misAni");
            }, 100);
        }
    };
})

document.getElementById("fin").addEventListener("click", function (event) {
    endgame();
    event.target.blur(); 

}
);

document.getElementById("next").addEventListener("click", function (event) {
    topicNum++;
    if (topicNum === 5) {
        endgame();
        return;
    }
    if (questionContainer[topicNum][5][0] === '"') {
        targetWord = 1;
    } else { targetWord = 0; };
    displayTopic();
    highlightYear(yearList[topicNum]);
    event.target.blur(); // ボタンからフォーカスを外す


})

document.getElementById("letsgo").addEventListener("click",function(){
    document.getElementById("goannnai").style.display = "none";
    document.getElementById("setumei").style.display = "none";
    document.getElementById("letsgo").style.display = "none";
    document.getElementById("title").style.display = "block";
    document.getElementById("dateId").style.display = "block";
    document.getElementById("word").style.display = "block";
    document.getElementById("info").style.display = "block";
    document.getElementById("next").style.display = "block";
    document.getElementById("fin").style.display = "block";
    highlightYear(yearList[topicNum]);
    canvas.style.display = 'block';
})

window.addEventListener("keypress", function(event) {
    if (event.keyCode === 32 && event.target == document.body) { //space key
      event.preventDefault(); // デフォルトの動作をキャンセル
    }
  });







