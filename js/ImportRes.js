// 加载游戏资源
"use strict";
/**
 * @param progressTimer 加载定时器
 */

let startWidth = 0;
let progressTimer;
let img = [];
let mulitImg = [
  '../img/pipeline.png',
  '../img/inpipelineout.png',
  '../img/pipelineout.png',
  '../img/bgcloud2.png',
  '../img/bgcloud.png',
  '../img/bghouse.png',
  '../img/bgsky.png',
  '../img/floor2.png',
  '../img/birdstatic.png',
  '../img/birdup.png',
  '../img/birddown.png'
];
let loadImg = mulitImg;
let failLoad = [];
let result = false;
const Loading = {
  elem: document.getElementById("myBar"),
  loadProgress: 0,
  loadTimes: 0,
  loadRes: function () {
    if (this.loadTimes != 0) {
      console.log('第' + this.loadTimes + '重试');
    }
    let j = 0;
    let promiseAll = [];
    for (let i = 0; i < loadImg.length; i++) {
      promiseAll[i] = new Promise((resolve, reject) => {
        img[i] = new Image();
        img[i].src = loadImg[i];
        img[i].onload = () => {
          //第i张加载完成
          this.loadProgress++;
          resolve('success');
        }
        img[i].onerror = function () {
          //第i张加载失败
          resolve(i);
        }
      })
    }
    return Promise.all(promiseAll).then((value) => {
      for (let x in value) {
        if (value[x] != 'success') {
          failLoad.push(value[x]);
        }
      }
    }).catch((value) => {
      console.log(value);
    })
  },
  move: function () {
    if (Loading.loadTimes < 1) {
      if (startWidth == Math.floor((Loading.loadProgress / mulitImg.length) * 100)) {
        if (failLoad.length != 0) {
          Loading.loadTimes++;
          failLoad = [];
          clearInterval(progressTimer);
          progressTimer = setInterval(Loading.move, 0);
          createLoad();
        }
        if (result == true) {
          clearInterval(progressTimer);
          initGame();
          startGamePanelController(true);
          stopGamePanelController(false);
          document.getElementById('progress-box').style.display = 'none';
        }
      } else {
        startWidth++;
        Loading.elem.style.width = startWidth + '%';
        Loading.elem.innerHTML = startWidth * 1 + '%';
      }
    } else {
      clearInterval(progressTimer);
      alert('资源加载失败');
    }
  }
};

async function createLoad() {
  await Loading.loadRes();
  if (failLoad.length != 0) {
    result = false;
    loadImg = [];
    for (let i = 0; i < failLoad.length; i++) {
      loadImg[i] = mulitImg[failLoad[i]];
    }
  } else {
    result = true;
  }
}