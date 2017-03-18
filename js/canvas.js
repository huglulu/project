 var c = document.getElementById("myCanvas");

    var ctx = c.getContext("2d");
    ctx.strokeStyle = "#ccc";
    ctx.translate(0.5, 0.5);
    var curR = 0;
    var centerX = 700;
    var centerY = 500;
    var currentX = 0;
    var currentY = 0;
    var angle = 0;

    var skill_data1 = [1, 0.9, 0.5, 0.8, 0.6, 0.8, 0.8, 0.8];
    var skill_data2 = [0.8, 0.8, 0.6, 0.7, 0.7, 0.6, 0.9, 0.7];

    function drawsettings(node, width, height, len, fillcolor, textfill) {
        node.strokeStyle = fillcolor;
        node.beginPath();

        node.moveTo(width, height);
        node.lineTo(width + len, height);
        node.lineTo(width + len, height + len);
        node.lineTo(width, height + len);
        node.lineTo(width, height);
        node.stroke();
        node.fillStyle = fillcolor;
        node.fill();
        node.fillStyle = fillcolor;
        node.font = "24px Arial";
        node.beginPath();
        node.fillText(textfill, width + 30, height + 20);

    }
    drawsettings(ctx, 480, 20, 20, "#2bb0d4", "兴趣");
    drawsettings(ctx, 900, 20, 20, "#61c191", "能力");

    function drawpic(node, radius, horn, num) {

        node.strokeStyle = "#ccc";
        angle = (Math.PI * 2 / horn);

        var r = radius / num; //r是蜘蛛丝之间的间距
        for (var i = 1; i < num + 1; i++) { //中心点不用绘制
            curR = r * i; //当前半径
            node.beginPath();
            for (var j = 0; j <= horn; j++) {
                if (j == 0) {
                    node.moveTo(centerX + curR, centerY);
                } else {
                    //根据半径，计算出蜘蛛丝上每个点的坐标
                    currentX = (centerX + curR * Math.cos(angle * j));
                    currentY = (centerY + curR * Math.sin(angle * j));
                    node.lineTo(currentX, currentY);
                    node.stroke();
                }
            }
        }
    }

    function drawLines(node, radius, horn) {
        node.strokeStyle = "#ccc";
        for (var i = 0; i <= horn; i++) {
            node.beginPath();
            node.moveTo(centerX, centerY);
            currentX = (centerX + radius * Math.cos(angle * i));
            currentY = (centerY + radius * Math.sin(angle * i));
            node.lineTo(currentX, currentY);
            node.stroke();
        }
    }

    function drawRegion(node, radius, horn, linecolor, fillcolor, skill_data) {
        node.strokeStyle = linecolor;
        var endpoint = 0;
        for (var i = 0; i <= horn; i++) {

            currentX = (centerX + radius * Math.cos(angle * i) * skill_data[i]);

            currentY = (centerY + radius * Math.sin(angle * i) * skill_data[i]);
            if (i == 0) {
                endpoint = currentX;
                node.beginPath();
                node.moveTo(currentX, currentY);
            } else
            if (i == horn) {
                node.lineTo(endpoint, centerY);
                node.stroke();
            } else {
                node.lineTo(currentX, currentY);
                node.stroke();
            }



        }


        node.fillStyle = fillcolor;
        node.fill();


    }

    function drawText(node, radius, horn) {
        node.fillStyle = "#000";
        node.font = "24px Arial";
        node.beginPath();
        for (var i = 0; i <= horn; i++) {

            currentX = (centerX + radius * Math.cos(angle * i));

            currentY = (centerY + radius * Math.sin(angle * i));
            if (i == 0) {
                node.fillText("JavaScript", currentX + 10, currentY);
            } else
            if (i == 1) {
                node.fillText("jQuery", currentX + 10, currentY + 60);
            } else
            if (i == 2) {
                node.fillText("Bootstrap", currentX - 30, currentY + 30);
            } else
            if (i == 3) {
                node.fillText("Vue.js", currentX - 60, currentY + 60);
            } else
            if (i == 4) {
                node.fillText("CSS 3", currentX - 100, currentY);
            } else
            if (i == 5) {
                node.fillText("Node.js", currentX - 100, currentY - 20);
            }
            if (i == 6) {
                node.fillText("HTML", currentX - 30, currentY - 20);
            } else
            if (i == 7) {
                node.fillText("CSS", currentX + 30, currentY - 20);
            }

            //绘制小圆点

        }
    }
    drawpic(ctx, 400, 8, 5);
    drawLines(ctx, 400, 8);
    drawRegion(ctx, 400, 8, "#89cfad", "rgba(97,193,145,.2)", skill_data2);
    drawRegion(ctx, 400, 8, "#61c3dd", "rgba(43,176,212,.2)", skill_data1);
    drawText(ctx, 400, 8);
    c.style.display = "block";
