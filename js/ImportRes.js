// 加载游戏资源
'use strict';
let img=[];
const Loading ={
    progress : 0,
    loadSuccess : false,
    loadRes: function () {
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
        let promiseAll = [], imgTotal = mulitImg.length;
        for (let i = 0; i < imgTotal; i++) {
            promiseAll[i] = new Promise((resolve, reject) => {
                img[i] = new Image();
                img[i].src = mulitImg[i];
                img[i].onload = function () {
                    //第i张加载完成
                    this.progress = i;
                    // console.log(this.progress);
                    resolve(img[i])
                }
            })
        }
        Promise.all(promiseAll).then((img) => {
            //全部加载完成
            this.loadSuccess = true;
            // console.log(this.loadSuccess);
        });
    },
    checkProgress : function () {
        if (Loading.loadSuccess === true){
            clearInterval(loadingCheck);
            ImageLoadSuccess = true;
            initGame();
            console.log('加载完成');
        }
    }
};
