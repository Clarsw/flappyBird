"use strict";

let loadingCheck;
let gameHard = 1;
let height;
let width;

/** 
 *构建背景画布
 */
let gameState = 0;
let gameProgress;
let c = document.getElementById("background");

c.width = width;
c.height = height;
let ctx = c.getContext("2d", {
    alpha: false
});
/**
 * 构建地板画布
 */

let c2 = document.getElementById("floor");

c2.width = width;
c2.height = height;
let ctx2 = c2.getContext("2d", {
    alpha: true
});
/** 
 *构建小鸟画布
 */
let c1 = document.getElementById("bird");
c1.width = width;
c1.height = height;
let ctx1 = c1.getContext("2d", {
    alpha: true
});

/**
 * 游戏元素变量
 * currentPage 分数排行当前页数
 */
let currentScore = document.getElementById('current-score');
let historyScoreArray;
let currentPage;
let submitState = 0;
let score = 0;
let bird;
let birdPH; //28 20
let birdPW; //40 28
let birdCurrentLocation;
let pipelinePW;
let pipelinePH;
let pipelineOutPW;
let pipelineOutPH;
let floorPW;
let floorPH;
let skyPW;
let skyPH;
let housePW;
let housePH;
let cloudPW;
let cloudPH;
let bgCloudPW;
let bgCloudPH;
let floorNumber;
let houseNumber;
let cloudNumber;

/**
 * 游戏图片
 */
let pipelineImg;
let inPipelineOutImg;
let pipelineOutImg;
let bgCloudImg;
let cloudImg;
let houseImg;
let skyImg;
let floorImg;
let birdStaticImg;
let birdUpImg;
let birdDownImg;
let aBird = [];

/**
 * 判断游戏加载是否完成，完成初始化游戏  
 */

function beforeInit() {
    progressTimer = setInterval(Loading.move, 0);
    createLoad();

    // let loadState = await Loading.loadRes();
    // console.log(loadState)
    // if (loadState == true) {
    //     initGame();
    // } else {
    //     // alert("游戏加载失败");
    // }
}


/**
 * 初始化游戏 
 */

function initGame(state) {
    if (state == null) {
        height = window.innerHeight;
        width = window.innerWidth;
        c.width = width;
        c.height = height;
        c1.width = width;
        c1.height = height;
        c2.width = width;
        c2.height = height;
        if (height >= 500) {
            birdPH = 28;
            birdPW = 40;
        } else {
            birdPH = 20;
            birdPW = 28;
        }
        pipelineImg = img[0];
        inPipelineOutImg = img[1];
        pipelineOutImg = img[2];
        bgCloudImg = img[3];
        cloudImg = img[4];
        houseImg = img[5];
        skyImg = img[6];
        floorImg = img[7];
        birdStaticImg = img[8];
        birdUpImg = img[9];
        birdDownImg = img[10];
        pipelinePH = Math.ceil(height * 0.06);
        pipelinePW = Math.ceil(width * 0.07);
        pipelineOutPH = Math.ceil(height * 0.08);
        pipelineOutPW = Math.ceil(width * 0.077);
        bgCloudPH = Math.ceil(height * 0.45);
        bgCloudPW = width;
        cloudPH = Math.ceil(height * 0.16);
        cloudPW = Math.ceil(width * 0.15);
        skyPH = height;
        skyPW = width;
        housePH = Math.ceil(height * 0.15);
        housePW = Math.ceil(width * 0.25);
        houseNumber = Math.ceil(width / housePW);
        cloudNumber = Math.ceil(width / cloudPW);
        floorPW = floorImg.width;
        floorPH = Math.ceil(height * 0.15);
        floorNumber = Math.ceil(width / (floorPW - 1)) + 5;
        aBird = [birdUpImg, birdStaticImg, birdDownImg, birdStaticImg];
        aFloor = [];
        aCloud = [];
        aHouse = [];
    }
    aPipeline = [];
    submitState = 0;
    birdCurrentLocation = 0;
    resetScore();
    ctx2.clearRect(0, 0, width, height);
    createCan(state);
    // ctx1.clearRect(0, 0, width, height);

}
/**
 * 获取游戏状态
 */
function checkGameState() {
    let canvasLimitUpHeight = 0;
    let canvasLimitDownHeight = height - floorPH - birdPH;
    let pipelineLimitUpHeight;
    let pipelineLimitDownHeight;
    for (let i = 0; i < aPipeline.length; i++) {
        if (aPipeline[i].ox + pipelineOutPW > bird.x) {
            birdCurrentLocation = i;
            break;
        }
    }
    if (bird.y <= canvasLimitUpHeight || bird.y >= canvasLimitDownHeight) {
        gameOver();
    } else {
        if (aPipeline[birdCurrentLocation].state === 0) {
            pipelineLimitUpHeight = aPipeline[birdCurrentLocation].oh + aPipeline[birdCurrentLocation].ouy;
            pipelineLimitDownHeight = aPipeline[birdCurrentLocation].ody - birdPH;
        } else if (aPipeline[birdCurrentLocation].state === 1) {
            pipelineLimitUpHeight = aPipeline[birdCurrentLocation].oh + aPipeline[1].ouy;
            pipelineLimitDownHeight = canvasLimitDownHeight;
        } else if (aPipeline[birdCurrentLocation].state === 2) {
            pipelineLimitUpHeight = canvasLimitUpHeight;
            pipelineLimitDownHeight = aPipeline[birdCurrentLocation].ody - birdPH;
        }
        if (bird.x + birdPW >= aPipeline[birdCurrentLocation].ox && bird.x <= aPipeline[birdCurrentLocation].ox + pipelineOutPW) {
            if (bird.y <= pipelineLimitUpHeight || bird.y >= pipelineLimitDownHeight) {
                gameOver();
            }
        }

    }

}

/**
 * 重置分数
 */
function resetScore() {
    score = 0;
}

/**
 * 绘制分数
 */
function recordScore() {
    if (bird.x + 1 === aPipeline[birdCurrentLocation].x + pipelineOutPH) {
        score++;
    }
    ctx2.font = "20px Georgia";
    ctx2.fillStyle = "#FFFFFF";
    ctx2.fillText(score, width - 20, 20);
}

function gameOver() {
    clearInterval(gameProgress);
    setStopScore();
    stopGamePanelController(true);
    gameState = 0;
}

function startGame(hard) {
    gameHard = hard
    gameState = 1;
    if (bird) {
        bird = null;
    }
    clearInterval(fallDownTimer);
    bird = new Bird();
    bird.init(birdPW, birdPH, 200, 200);
    flyUpTime++;
    bird.state = 1;
    bird.flyUp();
    startGamePanelController(false);
}

function startGamePanelController(state) {
    let startGamePanel = document.getElementById("start-game-panel");
    if (state === false) {
        startGamePanel.style.display = "none";
    } else {
        startGamePanel.style.display = "block";
    }

}

function stopGamePanelController(state) {
    let stopGamePanel = document.getElementById("stop-game-panel");
    if (state === false) {
        stopGamePanel.style.display = "none";
    } else {
        stopGamePanel.style.display = "block";
    }
}

function restartGame() {
    // debugger
    initGame('restart');
    startGame(gameHard);
    stopGamePanelController(false);
}

function backHomePage() {
    initGame();
    stopGamePanelController(false);
    startGamePanelController(true);
}

//提交分数
function submitScore() {
    if (submitState === 0) {
        if (!window.localStorage) {
            alert("不支持localstorage");
            return false;
        } else {
            let storage = window.localStorage;
            if (storage.getItem('scoreData')) {
                // 取：
                historyScoreArray = JSON.parse(storage.getItem('scoreData'));
            } else {
                historyScoreArray = [];
            }
            let newScoreArray = historyScoreArray;
            let newScore = {
                "data": currentTime(),
                "score": score
            };
            historyScoreArray.push(newScore);
            // 存：
            storage.setItem('scoreData', JSON.stringify(newScoreArray));
            submitState = 1;
            handleSubmitTip('提交成功');
            console.log("提交成功");
        }
    } else {
        handleSubmitTip('提交失败，数据已存在');
        console.log("提交失败，数据已存在");
    }
}

//提交分数提示信息
function handleSubmitTip(message) {
    let tip = document.createElement('p');
    tip.setAttribute('id', 'tip');
    tip.innerText = message;
    document.body.appendChild(tip);
    setTimeout(removeTip, 1000);

    function removeTip() {
        let tip = document.getElementById('tip');
        tip.parentNode.removeChild(tip);
    }
}

//显示历史分数记录
function scorePanelController(state) {
    let scorePanel = document.getElementById("history-score");
    if (state === false) {
        scorePanel.style.display = "none";
    } else {
        scorePanel.style.display = "block";
    }
    startGamePanelController(true);
}

function showHistoryScore() {
    if (!window.localStorage) {
        alert("不支持localstorage");
        return false;
    } else {
        let storage = window.localStorage;
        historyScoreArray = JSON.parse(storage.getItem('scoreData'));
        let compare = function (obj1, obj2) { //根据score排名
            let val1 = obj1.score;
            let val2 = obj2.score;
            if (val1 > val2) {
                return -1;
            } else if (val1 < val2) {
                return 1;
            } else {
                return 0;
            }
        };
        if (historyScoreArray === null) {
            historyScoreArray = []
        }
        if (historyScoreArray.length !== 0) {
            historyScoreArray = historyScoreArray.sort(compare);
        }
        currentPage = 1;
        showCurrentPage(currentPage);
        scorePanelController(true);
        startGamePanelController(false);
    }
}

function showCurrentPage(state) {
    let pageMark = document.getElementsByClassName('page-mark')[0];
    let currentPageData = [];
    if (state === 1) {
        for (let i = 0; i < 8; i++) {
            if (historyScoreArray[i]) {
                currentPageData[i] = historyScoreArray[i];
            }
        }
    } else if (state === 'pre') {
        if (currentPage === 1) {
            return false;
        } else {
            currentPage--;
            for (let i = (currentPage - 1) * 8; i < currentPage * 8; i++) {
                if (historyScoreArray[i]) {
                    currentPageData[i % 8] = historyScoreArray[i];
                }
            }
        }
    } else if (state === 'aft') {
        let totalPage = Math.ceil(historyScoreArray.length / 8);
        if (currentPage === totalPage || totalPage === 0) {
            return false;
        } else {
            currentPage++;
            for (let i = (currentPage - 1) * 8; i < currentPage * 8; i++) {
                if (historyScoreArray[i]) {
                    currentPageData[i % 8] = historyScoreArray[i];
                }
            }
        }

    }
    pageMark.innerText = currentPage;
    console.log(currentPageData);
    showInBox(currentPageData);

    function showInBox(current) {
        let listContain = document.getElementsByClassName('list-contain')[0];
        listContain.innerHTML = null;
        let createUl = document.createElement('ul');
        for (let i = 0; i < current.length; i++) {
            let createLi = document.createElement('li');
            createLi.setAttribute('class', 'score-data');
            let span1 = document.createElement('span');
            span1.innerText = String((currentPage - 1) * 8 + i + 1);
            let span2 = document.createElement('span');
            span2.innerText = current[i].data;
            let span3 = document.createElement('span');
            span3.innerText = current[i].score;
            span1.setAttribute('class', 'rank');
            span2.setAttribute('class', 'time');
            span3.setAttribute('class', 'history-score');
            createUl.appendChild(createLi);
            createLi.appendChild(span1);
            createLi.appendChild(span2);
            createLi.appendChild(span3);
        }
        listContain.appendChild(createUl);
    }
}

//清除历史分数
function clearHistoryScore() {
    if (!window.localStorage) {
        alert("不支持localstorage");
        return false;
    } else {
        let storage = window.localStorage;
        storage.removeItem('scoreData');
    }
}

//游戏结束显示分数
function setStopScore() {
    let finalScore = document.getElementById('final-score');
    finalScore.innerText = score;
}

//监听游戏窗口点击事件
c1.addEventListener("click", function () {
    birdFly();
});

function birdFly() {
    if (gameState === 1) {
        bird.state = 1;
        bird.v = 0;
        flyUpTime++;
        clearInterval(fallDownTimer);
        bird.flyUp();
    }
}

/**
 * 获取提交分数的时间
 * @return {string}
 */
function currentTime() {
    let now = new Date();

    let year = now.getFullYear(); //年
    let month = now.getMonth() + 1; //月
    let day = now.getDate(); //日

    let hh = now.getHours(); //时
    let mm = now.getMinutes(); //分
    let ss = now.getSeconds(); //秒

    let clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}