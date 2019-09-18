'use strict';

let loadingCheck;
let gameHard = 1;
let ImageLoadSuccess = false;
const height = window.innerHeight;//640 ->730
const width = window.innerWidth; //1100 ->1540
// height=window.innerHeight*0.8;
// width=window.innerWidth*0.8;
/*
构建背景
*/
let gameState = 0;
let gameProgress;
const c = document.getElementById("background");

c.width = width;
c.height = height;
let ctx = c.getContext("2d");
/*
构建小鸟
*/
const c1 = document.getElementById("bird");
c1.width = width;
c1.height = height;
let ctx1 = c1.getContext("2d");
// ctx1.globalAlpha=0;
/*文档标签*/
let currentScore = document.getElementById('current-score');

//////////
let historyScoreArray;
let currentPage;
let submitState = 0;
let score = 0;
let bird;
let birdPH = 20;//28
let birdPW = 28;//40
if (height >= 500) {
    birdPH = 28;
    birdPW = 40;
}
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

/*背景图*/
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

function beforeInit() {
    Loading.loadRes();
    loadingCheck = setInterval(Loading.checkProgress, 1000);
}


function initGame() {
    if (ImageLoadSuccess === true) {
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
        pipelinePH = Math.ceil(height * 0.06);//40 没用参数
        pipelinePW = Math.ceil( width * 0.07);//110
        pipelineOutPH = Math.ceil(height * 0.08);//60
        pipelineOutPW = Math.ceil(width * 0.077);//120
        bgCloudPH = Math.ceil(height * 0.45);//300
        bgCloudPW = width;
        cloudPH = Math.ceil(height * 0.16);//100
        cloudPW = Math.ceil(width * 0.15);//240
        skyPH = height;
        skyPW = width;
        housePH = Math.ceil(height * 0.15);//80
        housePW = Math.ceil(width * 0.25);//240
        houseNumber = Math.ceil(width / housePW);
        cloudNumber = Math.ceil(width / cloudPW);
        floorPW = floorImg.width;// floorImg.width
        floorPH = Math.ceil(height * 0.15);//floorImg.height
        floorNumber = Math.ceil(width / (floorPW - 1)) + 5;
        aBird = [birdUpImg, birdStaticImg, birdDownImg, birdStaticImg];
        aFloor = [];
        aCloud = [];
        aHouse = [];
        aPipeline = [];
        submitState = 0;
        birdCurrentLocation = 0;
        resetScore();
        createCan();
        ctx1.clearRect(0,0,width,height);
        // startGame();
    }
}

function checkGameState() {
    let canvasLimitUpHeight = 0;
    let canvasLimitDownHeight = height - floorPH - birdPH;
    let pipelineLimitUpHeight;
    let pipelineLimitDownHeight;
    // if (bird.x > aPipeline[0].x + pipelinePW && bird.x < aPipeline[1].x) {
    //     birdCurrentLocation = 1;
    // } else {
    //     birdCurrentLocation = 0;
    // }
    for (let i=0 ; i<aPipeline.length;i++){
        if (aPipeline[i].x + pipelineOutPH > bird.x){
            // console.log(aPipeline[i].x + pipelineOutPH +"   :"+i);
            birdCurrentLocation = i;
            break;
        }
    }
    // console.log(birdCurrentLocation);
    if (bird.y <= canvasLimitUpHeight || bird.y >= canvasLimitDownHeight) {
        gameOver();
    // } else if (birdCurrentLocation === 0) {
    //     if (aPipeline[0].state === 0) {
    //         pipelineLimitUpHeight = aPipeline[0].oh + aPipeline[0].ouy;
    //         pipelineLimitDownHeight = aPipeline[0].ody - birdPH;
    //     } else if (aPipeline[0].state === 1) {
    //         pipelineLimitUpHeight = aPipeline[0].oh + aPipeline[0].ouy;
    //         pipelineLimitDownHeight = canvasLimitDownHeight;
    //     } else if (aPipeline[0].state === 2) {
    //         pipelineLimitUpHeight = canvasLimitUpHeight;
    //         pipelineLimitDownHeight = aPipeline[0].ody - birdPH;
    //     }
    //     if (bird.x + birdPW >= aPipeline[0].x && bird.x + birdPW / 4 <= aPipeline[0].x + pipelinePW) {
    //
    //         if (bird.y <= pipelineLimitUpHeight || bird.y >= pipelineLimitDownHeight) {
    //             gameOver();
    //         }
    //     }
    // } else if (birdCurrentLocation === 1) {
    //     if (aPipeline[1].state === 0) {
    //         pipelineLimitUpHeight = aPipeline[1].oh + aPipeline[1].ouy;
    //         pipelineLimitDownHeight = aPipeline[1].ody - birdPH;
    //     } else if (aPipeline[0].state === 1) {
    //         pipelineLimitUpHeight = aPipeline[1].oh + aPipeline[1].ouy;
    //         pipelineLimitDownHeight = canvasLimitDownHeight;
    //     } else if (aPipeline[0].state === 2) {
    //         pipelineLimitUpHeight = canvasLimitUpHeight;
    //         pipelineLimitDownHeight = aPipeline[1].ody - birdPH;
    //     }
    //     if (bird.x >= aPipeline[1].x && bird.x + birdPW / 4 <= aPipeline[1].x + pipelinePW) {
    //
    //         if (bird.y <= pipelineLimitUpHeight || bird.y >= pipelineLimitDownHeight) {
    //             gameOver();
    //         }
    //     }
    // }
        }else{
        // console.log(aPipeline[birdCurrentLocation].x + pipelineOutPH  +"  "+birdCurrentLocation) ;
        if(bird.x ===aPipeline[birdCurrentLocation].x + pipelineOutPW ){
            console.log(aPipeline[birdCurrentLocation].x);
        }
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
                if (bird.x +birdPW >= aPipeline[birdCurrentLocation].x && bird.x <= aPipeline[birdCurrentLocation].x +pipelineOutPW ) {//&& (bird.x + birdPW /2) <= (aPipeline[birdCurrentLocation].x + pipelineOutPW)
                    if (bird.y <= pipelineLimitUpHeight || bird.y >= pipelineLimitDownHeight) {
                        gameOver();
                    }
                }

    }

}

function resetScore() {
    score = 0;
}

function recordScore() {
    if (bird.x +1 === aPipeline[birdCurrentLocation].x + pipelineOutPH ) {
        score++;
    }
    ctx.font="20px Georgia";
    ctx.fillStyle="#FFFFFF";
    ctx.fillText( score ,width - 20,20);
}

function gameOver() {
    clearInterval(gameProgress);
    // clearInterval(fallDownTimer);
    setStopScore();
    stopGamePanelController(true);
    gameState = 0;
}

function startGame(hard) {
    gameHard = hard
    gameState = 1;
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
    gameHard = 1;
    initGame();
    startGame(gameHard);
    stopGamePanelController(false);
}

function backHomePage(){
    initGame();
    stopGamePanelController(false);
    startGamePanelController(true);
}

//提交分数
function submitScore() {
    if (submitState === 0){
        if(!window.localStorage){
            alert("不支持localstorage");
            return false;
        }else{
            let storage=window.localStorage;
            if(storage.getItem('scoreData')){
                // 取：
                historyScoreArray = JSON.parse(storage.getItem('scoreData'));
            }
            else {
                historyScoreArray=[];
            }
            let newScoreArray =historyScoreArray;
            let newScore = {"data":currentTime(),"score":score};
            historyScoreArray.push(newScore);
            // 存：
            storage.setItem('scoreData',JSON.stringify(newScoreArray));
            submitState = 1;
            handleSubmitTip('提交成功');
            console.log("提交成功");
        }
    }else{
        handleSubmitTip('提交失败，数据已存在');
        console.log("提交失败，数据已存在");
    }
}

//提交分数提示信息
function handleSubmitTip(message) {
    let tip =document.createElement('p');
    tip.setAttribute('id','tip');
    // tip.style.width='200px';
    // tip.style.position = 'absolute';
    // tip.style.top = '10px';
    // tip.style.zIndex = '999';
    tip.innerText = message;
    document.body.appendChild(tip);
    setTimeout(removeTip,1000);
    // var createP1=document.createElement('div');
    // var node1=document.createTextNode('这是创建的div标签');
    // createP1.appendChild(node1);
    // element.appendChild(createP1);
    // var child=document.getElementById("p1");
    // child.parentNode.removeChild(child);
    function removeTip() {
        let tip =document.getElementById('tip');
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
function showHistoryScore(){
    if(!window.localStorage){
        alert("不支持localstorage");
        return false;
    }else{
        let storage=window.localStorage;
        historyScoreArray = JSON.parse(storage.getItem('scoreData'));
        // historyScoreArray["score"].sort(function(a,b){
        //     return b-a});
        let compare =function(obj1,obj2){ //根据score排名
           let val1=obj1.score;
           let val2=obj2.score;
           if(val1>val2){
               return -1;
           }else if(val1<val2){
               return 1;
           }else{
               return 0;
           }
        } ;
        if(historyScoreArray === null){
            historyScoreArray = []
        }
        if(historyScoreArray.length !== 0){
            historyScoreArray=historyScoreArray.sort(compare);
        }
        currentPage = 1;
        showCurrentPage(currentPage);
        scorePanelController(true);
        startGamePanelController(false);
        // console.log(historyScoreArray);
    }
}

function showCurrentPage(state){
    let pageMark=document.getElementsByClassName('page-mark')[0];
    let currentPageData=[];
    if(state === 1){
            for(let i=0;i<8;i++) {
                if (historyScoreArray[i]) {
                    currentPageData[i] = historyScoreArray[i];
                }
            }
    } else if(state === 'pre'){
        if(currentPage === 1){
            return false;
        }else{
            currentPage --;
            for(let i=(currentPage-1)*8;i<currentPage*8;i++){
                if(historyScoreArray[i]) {
                    currentPageData[i%8] = historyScoreArray[i];
                }
            }
        }
    }else if(state === 'aft'){
        let totalPage = Math.ceil(historyScoreArray.length/8);
        if(currentPage === totalPage||totalPage===0){
            return false;
        }else{
            currentPage++;
            for(let i=(currentPage-1)*8;i<currentPage*8;i++){
                if(historyScoreArray[i]) {
                    currentPageData[i%8] = historyScoreArray[i];
                }
            }
        }

    }
    pageMark.innerText =currentPage;
    console.log(currentPageData);
    showInBox(currentPageData);
    function showInBox(current) {
        let listContain=document.getElementsByClassName('list-contain')[0];
        listContain.innerHTML=null;
         let createUl=document.createElement('ul');
         for(let i=0;i<current.length;i++){
             let createLi=document.createElement('li');
             createLi.setAttribute('class','score-data');
             let span1=document.createElement('span');
             span1.innerText=String((currentPage-1)*8+i+1);
             let span2=document.createElement('span');
             span2.innerText=current[i].data;
             let span3=document.createElement('span');
             span3.innerText=current[i].score;
             span1.setAttribute('class','rank');
             span2.setAttribute('class','time');
             span3.setAttribute('class','history-score');
             createUl.appendChild(createLi);
             createLi.appendChild(span1);
             createLi.appendChild(span2);
             createLi.appendChild(span3);
         }
         listContain.appendChild(createUl);

        // createP1.appendChild(node1);
        // element.appendChild(createP1);
        // var child=document.getElementById("p1");
        // child.parentNode.removeChild(child);
    }
}

//清除历史分数
function clearHistoryScore(){
    if(!window.localStorage){
        alert("不支持localstorage");
        return false;
    }else{
        let storage=window.localStorage;
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
    if(gameState === 1 ) {
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
function currentTime()
{
    let now = new Date();

    let year = now.getFullYear();       //年
    let month = now.getMonth() + 1;     //月
    let day = now.getDate();            //日

    let hh = now.getHours();            //时
    let mm = now.getMinutes();          //分
    let ss = now.getSeconds();           //秒

    let clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    if(hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return(clock);
}



