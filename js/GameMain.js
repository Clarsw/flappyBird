"use strict";

function Pipeline() {}

let aPipeline = [];
Pipeline.prototype = {
    autoCreate: function (aPipeline) { //自动生成合适上下高度，上下偏移量，左右距离的管道
        let betweenX = 0;
        let pipelineX;
        let upPipelineH;
        let downPipelineH;
        let upPipelineY;
        let downPipelineY;
        let upPipelineOutY;
        let downPipelineOutY;
        let pipelineState = 0;
        // console.log("math: "+(Math.random() * (5 - 3) + 3.5));
        // var pipelineSpace=(Math.floor(Math.random() * (6 - 4+ 1)) + 4)*birdPH;//4-6个小鸟高度
        let pipelineSpace;
        if (gameHard == 1) { //难度一
            if (height >= 500) {
                pipelineSpace = (Math.floor((Math.random() * (7 - 5)) + 5)) * birdPH; //4-6个小鸟高度
            } else {
                pipelineSpace = (Math.floor((Math.random() * (10 - 7)) + 7)) * birdPH; //5-8个小鸟高度
            }
        } else if (gameHard == 2) { //难度二
            if (height >= 500) {
                pipelineSpace = (Math.floor((Math.random() * (6 - 4)) + 4)) * birdPH; //2.5-4个小鸟高度
            } else {
                pipelineSpace = (Math.floor((Math.random() * (9 - 6)) + 6)) * birdPH; //4-7个小鸟高度
            }
        }
        let allPipelineH = height - floorPH - 2 * pipelineOutPH - pipelineSpace; //管道两端总高度
        if (aPipeline.length === 0) { //两个管道中间距离
            betweenX = Math.floor(Math.random() * (600 - 500) + 500);
            pipelineX = betweenX;
        } else {
            // console.log("length :");
            betweenX = Math.floor(Math.random() * (width * 0.32 - width * 0.19) + width * 0.19); //(400 - 300) + 300
            // console.log(aPipeline[aPipeline.length-1].x);
            pipelineX = aPipeline[aPipeline.length - 1].x + betweenX;
        }
        upPipelineH = Math.floor(Math.random() * allPipelineH);
        // console.log("upH: "+upPipelineH);
        downPipelineH = allPipelineH - upPipelineH;
        // console.log("dnH: "+downPipelineH);
        if (upPipelineH < 10) {
            pipelineState = 2;
        } else if (downPipelineH < 10) {
            pipelineState = 1;
        }
        upPipelineY = 0;
        downPipelineY = height - floorPH - downPipelineH;
        upPipelineOutY = upPipelineH - 5;
        downPipelineOutY = downPipelineY - pipelineOutPH + 5;
        this.init(pipelinePW, pipelineOutPW, upPipelineH, downPipelineH, 60, pipelineX, upPipelineY, downPipelineY, upPipelineOutY, downPipelineOutY, pipelineState); //w:110 ow:120
        this.draw();
    },
    init: function (w, ow, uh, dh, oh, x, uy, dy, ouy, ody, state) {
        this.w = w; //管道的宽度
        this.ow = ow; //管道口的宽度
        this.uh = uh; //上管道高度
        this.dh = dh; //下管道高度
        this.oh = oh; //管道口高度
        this.x = x;
        this.ox = this.x - (pipelineOutPW - pipelinePW) / 2; //this.x - 5;->this.x - (pipelineOutPW - pipelinePW)/2
        this.uy = uy; //上管道y偏移量
        this.dy = dy; //下管道y偏移量
        this.ouy = ouy;
        this.ody = ody;
        this.state = state;
        this.pipelinePicture = pipelineImg;
        this.pipelineOutPicture = pipelineOutImg;
        this.inPipelineOutPicture = inPipelineOutImg;
    },
    draw: function () {
        // ctx.drawImage(this.pipelinePicture,this.x+5,this.y+60,this.w,this.h);
        // ctx.drawImage(this.piplineOutPicture,this.x,this.y,this.ow,this.oh);
        // console.log(this.state+"  :state");
        if (this.state === 0) {
            ctx2.drawImage(this.pipelinePicture, this.x, this.uy, this.w, this.uh);
            ctx2.drawImage(this.pipelinePicture, this.x, this.dy, this.w, this.dh);
            ctx2.drawImage(this.inPipelineOutPicture, this.ox, this.ouy, this.ow, this.oh);
            ctx2.drawImage(this.pipelineOutPicture, this.ox, this.ody, this.ow, this.oh);
        } else if (this.state === 1) { //只有上管道
            ctx2.drawImage(this.pipelinePicture, this.x, this.uy, this.w, this.uh);
            ctx2.drawImage(this.inPipelineOutPicture, this.ox, this.ouy, this.ow, this.oh);
        } else if (this.state === 2) { //只有下管道
            ctx2.drawImage(this.pipelinePicture, this.x, this.dy, this.w, this.dh);
            ctx2.drawImage(this.pipelineOutPicture, this.ox, this.ody, this.ow, this.oh);
        }

    },
    move: function () {
        this.x--;
        this.ox--;
        if (this.state === 0) {
            ctx2.drawImage(this.pipelinePicture, this.x, this.uy, this.w, this.uh);
            ctx2.drawImage(this.pipelinePicture, this.x, this.dy, this.w, this.dh);
            ctx2.drawImage(this.inPipelineOutPicture, this.ox, this.ouy, this.ow, this.oh);
            ctx2.drawImage(this.pipelineOutPicture, this.ox, this.ody, this.ow, this.oh);
        } else if (this.state === 1) { //只有上管道
            ctx2.drawImage(this.pipelinePicture, this.x, this.uy, this.w, this.uh);
            ctx2.drawImage(this.inPipelineOutPicture, this.ox, this.ouy, this.ow, this.oh);
        } else if (this.state === 2) { //只有下管道
            ctx2.drawImage(this.pipelinePicture, this.x, this.dy, this.w, this.dh);
            ctx2.drawImage(this.pipelineOutPicture, this.ox, this.ody, this.ow, this.oh);
        }


    }
};

function Cloud() {}

let aCloud = [];
Cloud.prototype = {
    init: function (w, h, x, y) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.picture = cloudImg;
    },
    draw: function () {
        ctx.drawImage(this.picture, this.x, this.y, this.w, this.h);
    },
};

function Sky() {}

Sky.prototype = {
    init: function (w, h) {
        this.w = w;
        this.h = h;
        this.picture = skyImg;
    },
    draw: function () {
        ctx.drawImage(this.picture, 0, 0, this.w, this.h);
    }
};

function BGCloud() {}

BGCloud.prototype = {
    init: function (w, h) {
        this.w = w;
        this.h = h;
        this.picture = bgCloudImg;
    },
    draw: function () {
        ctx.drawImage(this.picture, 0, 0, this.w, this.h);
    }
};

function House() {}

let aHouse = [];
House.prototype = {
    init: function (w, h, x, y) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        this.picture = houseImg;
    },
    draw: function () {
        ctx.drawImage(this.picture, this.x, this.y, this.w, this.h);
    },
};

function Floor() {}

let aFloor = [];
Floor.prototype = {

    init: function (w, h, x, y) {
        this.w = w;
        this.h = h;
        this.x = x;
        this.y = y;
        // this.picture=floorPicture;
        this.picture = floorImg;
    },
    draw: function () {
        ctx2.drawImage(this.picture, this.x, this.y, this.w, this.h);
    },
    move: function () {
        if (this.x < 0 && Math.abs(this.x) === this.w - 1) {
            this.x = (floorNumber - 1) * this.w - floorNumber;
            this.draw();
        } else {
            ctx2.drawImage(this.picture, this.x - 1, this.y, this.w, this.h);
            this.x--;
        }

    }
};

function createCan(state) {
    if (state == null) {
        let sky = new Sky();
        sky.init(width, height);
        sky.draw();
        let bgCloud = new BGCloud();
        bgCloud.init(bgCloudPW, bgCloudPH);
        bgCloud.draw();
        for (let i = 0; i < floorNumber; i++) {
            let floor = new Floor();

            // floor.init(floorPW, floorPH, i * (floorPW - 1), 505);
            floor.init(floorPW, floorPH, i * (floorPW - 1), height - floorPH);
            floor.draw();
            aFloor.push(floor);
        }
        for (let j = 0; j < houseNumber; j++) {
            let house = new House();
            // house.init(housePW, housePH, j * (housePW), 425);
            house.init(housePW, housePH, j * (housePW), height - floorPH - housePH);
            house.draw();
            aHouse.push(house);
        }
        for (let k = 0; k < cloudNumber; k++) {
            let cloud = new Cloud();
            cloud.init(cloudPW, cloudPH, k * (cloudPW), bgCloudPH);
            cloud.draw();
            aCloud.push(cloud);
        }
    }

    for (let l = 0; l < 6; l++) { //5
        let channel = new Pipeline();
        channel.autoCreate(aPipeline);
        aPipeline.push(channel);

    }
    gameProgress = setInterval(function () {
        let pipeline;
        ctx2.beginPath();
        ctx2.clearRect(0, 0, width, height);
        // sky.draw();
        // bgCloud.draw();

        // for (let house of aHouse) {
        //     house.draw();
        // }
        // for (let cloud of aCloud) {
        //     cloud.draw();
        // }
        if (gameState === 1) {
            checkGameState();
            for (pipeline of aPipeline) {
                pipeline.move();
            }
            recordScore();
        } else if (gameState === 0) {
            for (pipeline of aPipeline) {
                pipeline.draw();
            }
        }
        if (aPipeline.length === 6 && aPipeline[0].x < -120) { //5
            let channel = new Pipeline();
            channel.autoCreate(aPipeline);
            aPipeline.shift();
            aPipeline.push(channel);
        }
        for (let floor of aFloor) {
            floor.move();
        }


    }, 1000 / 120)

}

/*
小鸟飞行动画

*/

let fallDownTimer;
let flyUpTime = 0; //记录鼠标点击事件，则是小鸟向上飞的次数
function Bird() {}

Bird.prototype = {
    init: function (w, h, x, y) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.angle = 0;
        this.v = 0;
    },
    flyUp: function () {
        for (let i = 0; i < 12; i++) {
            (function (i) {
                //  console.log(i);
                setTimeout(function () {
                    if (i < 4) {
                        // console.log(this.angle);
                        ctx1.save();
                        this.y = this.y - 8;
                        ctx1.beginPath();
                        ctx1.clearRect(0, 0, width, height);
                        ctx1.translate(this.x + this.w / 2, this.y + this.h / 2);
                        ctx1.rotate(-4 * this.angle * Math.PI / 180);
                        ctx1.drawImage(aBird[i % 4], -this.w / 2, -this.h / 2, this.w, this.h);
                        ctx1.restore();
                        if (this.angle < 11) {
                            this.angle++;
                        }
                    } else if (i >= 4 && i < 8) {
                        // console.log(this.angle);
                        ctx1.save();
                        this.y = this.y - 4;
                        ctx1.beginPath();
                        ctx1.clearRect(0, 0, width, height);
                        ctx1.translate(this.x + this.w / 2, this.y + this.h / 2);
                        ctx1.rotate(-4 * this.angle * Math.PI / 180);
                        ctx1.drawImage(aBird[i % 4], -this.w / 2, -this.h / 2, this.w, this.h);
                        ctx1.restore();
                        if (this.angle < 11) {
                            this.angle++;
                        }
                    } else if (i >= 8) {
                        // console.log(this.angle);
                        ctx1.save();
                        this.y = this.y - 2;
                        ctx1.beginPath();
                        ctx1.clearRect(0, 0, width, height);
                        ctx1.translate(this.x + this.w / 2, this.y + this.h / 2);
                        ctx1.rotate(-4 * this.angle * Math.PI / 180);
                        ctx1.drawImage(aBird[i % 4], -this.w / 2, -this.h / 2, this.w, this.h);
                        ctx1.restore();
                        if (this.angle < 11) {
                            this.angle++;
                        }

                        if (i === 11) {
                            flyUpTime--;
                            if (flyUpTime !== 0) {
                                // console.log(flyUpTime+"flyTime");
                            } else {

                                this.state = 0;
                                this.fallDown();
                            }
                        }
                    }
                }.bind(bird), i * 1000 / 60)
            })(i)
        }

    },
    fallDown: function () {
        fallDownTimer = setInterval(function () {
            if (this.angle > -11) {
                this.angle--;
            }
            // console.log(this.angle+"::::");
            ctx1.save();
            ctx1.beginPath();
            ctx1.clearRect(0, 0, width, height);
            //自由落体 V2=V0+a(t2-t1)
            this.v = this.v + 10 * (1 / 60);
            // console.log(this.v);
            // if(this.y+this.v>=505){
            //     this.y=200;
            //     this.v=0;
            // } else{
            this.y += this.v;
            // }
            ctx1.translate(this.x + this.w / 2, this.y + this.h / 2);
            ctx1.rotate(-4 * this.angle * Math.PI / 180);
            ctx1.drawImage(birdStaticImg, -this.w / 2, -this.h / 2, this.w, this.h);
            ctx1.restore();
            if (this.y >= height - floorPH - birdPH) {
                clearInterval(fallDownTimer);
            }
        }.bind(this), 1000 / 60)

    }

};