<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>爱你贴贴</title>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <style>
    html,
    body {
      height: 100%;
      padding: 0;
      margin: 0;
      background: #000;
    }

    * {
      margin: 0;
      padding: 0;
    }
  </style>
</head>

<body>

  <canvas id="pinkboard" style="display: block;"></canvas>

  <script>
    // 初始化 画布大小
    let canvas = document.getElementById("pinkboard");
    canvas.height = window.screen.availHeight;
    canvas.width = window.screen.availWidth;

    class AllLover {
      constructor() {
        this.loverList = [];
      }

      addLover(lover) {
        this.loverList.push(lover);
      }

      show() {
        // 清空画布
        let canvas = document.getElementById("pinkboard");
        canvas.height = window.screen.availHeight;
        canvas.width = window.screen.availWidth;
        // 绘制
        for (let lover in this.loverList) {
          this.loverList[lover].show();
        }
      }

      start() {
        setInterval(this.show.bind(this), 1000 / 60);
      }

    }

    class Lover {

      constructor(func) {
        // 初始化必要参数
        this.loveList = [];
        this.nowLove = [];
        this.nowTime = 0;
        // 变换函数 x y t 
        this.func = func;
      }

      init(func) {
        this.func = func;
      }

      addLove(lovePoint) {
        this.loveList.push(lovePoint);
      }

      drawPoint(point) {
        // 获取画布
        let ctx = this.getCTX();

        // 设置绘制颜色
        let r = 0xFF;
        let g = parseInt(Math.random() * 0) + 0xA0;
        let b = parseInt(Math.random() * 0) + 0xB0;
        this.r = Math.floor(255);
        this.g = Math.floor(Math.random() * 100 + 100);
        this.b = Math.floor(Math.random() * 100 + 100);
        ctx.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',1)';
        // 绘制成矩形
        let k = 0.8 * Math.random() + 0.5;
        let x = parseInt(point.x + ctx.width / 2);
        let y = parseInt(point.y + ctx.height / 2);
        let size = Math.random() * 1.3 + 0.1
        ctx.fillRect(x, y, size, size);

      }

      show() {
        // 清空画布
        // 初始化 画布大小
        // 计算现在各点的位置
        this.nowLove = [];
        for (let love in this.loveList) {
          this.nowLove.push(this.func(this.loveList[love], this.nowTime));
        }
        // 绘制
        for (let love in this.nowLove) {
          this.drawPoint(this.nowLove[love]);
        }
        this.nowTime++;
      }

      start() {
        setInterval(this.show.bind(this), 1000 / 60);
      }

      getCTX() {
        let canvas = document.getElementById("pinkboard");
        let ctx = canvas.getContext("2d");
        ctx.height = canvas.height;
        ctx.width = canvas.width;
        return ctx;
      }

    }


    // 添加点
    function getPoint() {
      // 生成内布景
      var allLover = new AllLover();
      var love_0 = new Lover(function (a) { return a });
      for (let t = 0; t < 10000; t += 1) {
        let rand = (Math.random());
        rand = Math.pow(rand, 0.12);
        let k = 8;
        let x = 16 * Math.pow(Math.sin(t), 3) * rand * 8;
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * rand * k;
        if (x > -1 && x < 1) {
          //continue;
        }
        love_0.addLove({
          x: x,
          y: y,
          t: t
        });
      }
      love_0.init(function (a, time) {
        let b = {
          x: a.x,
          y: a.y
        };
        time = time % 60;
        let t = a.t;
        let x = 16 * Math.pow(Math.sin(a.t), 3) * 8;
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * a.t) - 2 * Math.cos(3 * a.t) - Math.cos(4 * a.t)) * 8;

        // 距离边界的距离
        let length = Math.pow((a.x - x) * (a.x - x) + (a.y - y) * (a.y - y), 0.5) + 50;
        let phi = 0.1;

        //b.x = a.x + Math.sin((time / 60) * 3.14) * (a.x < 0 ? -phi : phi) * length + Math.random() * 2 - 1;
        //b.y = a.y + Math.sin((time / 60) * 3.14) * (a.y < 0 ? -phi : phi) * length + Math.random() * 2 - 1;
        b.x = a.x * Math.cos((Math.pow((time - 30) / 30, 6)) * (time - 30) / 60);
        b.y = a.y * Math.cos(((time - 30) / 60));

        return b;
      });
      allLover.addLover(love_0);
      // 生成外布景
      var love = new Lover(function (a) { return a });
      for (let t = 0; t < 1000; t += 1) {
        let rand = (Math.random());
        rand = Math.pow(rand, 0.12);
        let k = 8.3;
        let x = 16 * Math.pow(Math.sin(t), 3) * rand * k;
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * rand * k;
        if (x > -1 && x < 1) {
          //continue;
        }
        love.addLove({
          x: x,
          y: y
        });
      }
      love.init(function (a, time) {
        let b = {
          x: a.x,
          y: a.y
        };
        time = time % 60;
        let length = Math.pow(a.x * a.x + a.y * a.y, 0.5);
        let phi = 0.05;
        b.x = a.x + Math.sin((time / 60) * 3.14) * length * (a.x < 0 ? -phi : phi) * (Math.pow((time - 30) / 30, 6)) * Math.random() * 10;
        b.y = a.y + Math.sin((time / 60) * 3.14) * length * (a.y < 0 ? -phi : phi) * (Math.pow((time - 30) / 30, 6)) * Math.random() * 10;
        return b;
      });
      allLover.addLover(love);

      allLover.start();

    }

    getPoint();


  </script>

</body>

</html>
