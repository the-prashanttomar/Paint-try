const canvas = document.querySelector("#my-canvas");
const ctx = canvas.getContext("2d");


function linecall() {
  let mouseDown = false;
  let startPoint;
  let endPoint;
  let canvasSnapShot;
  canvas.addEventListener("mousedown", function (e) {
    mouseDown = true;
    startPoint = new Point(e.clientX, e.clientY);
    canvasSnapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(e.clientX, e.clientY);
  });
  canvas.addEventListener("mouseup", function (e) {
    mouseDown = false;
    startPoint = null;
    endPoint = null;
    canvasSnapShot = null;
    console.log(e.clientX, e.clientY);

  });
  canvas.addEventListener("mousemove", function (e) {
    if (mouseDown) {
      endPoint = new Point(e.clientX, e.clientY);
      drawline();
      console.log(e.clientX, e.clientY);
      ctx.restore();
    } else {
      ctx.save();
    }
  });

  function drawline() {
    ctx.putImageData(canvasSnapShot, 0, 0);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endPoint.x, endPoint.y);
    ctx.stroke();
    ctx.closePath();
  }
}

function circlecall() {
  let mouseDown = false;
  let startPoint;
  let endPoint;
  let canvasSnapShot;
  canvas.addEventListener("mousedown", function (e) {
    console.log("mouse event", e);
    mouseDown = true;
    startPoint = new Point(e.clientX, e.clientY);
    canvasSnapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  });
  canvas.addEventListener("mouseup", function (e) {
    mouseDown = false;
    startPoint = null;
    endPoint = null;
    canvasSnapShot = null;
  });
  canvas.addEventListener("mousemove", function (e) {
    if (mouseDown) {
      endPoint = new Point(e.clientX, e.clientY);
      drawcircle();
      ctx.restore();
    }
  });

  function drawcircle() {
    ctx.putImageData(canvasSnapShot, 0, 0);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(
      startPoint.x,
      startPoint.y,
      endPoint.hypotenuse(startPoint),
      0,
      Math.PI * 2
    );
    ctx.stroke();
    ctx.closePath();
  }
}

function rectcall() {
  let mouseDown = false;
  let startPoint;
  let endPoint;
  let canvasSnapShot;
  canvas.addEventListener("mousedown", function (e) {
    console.log("mouse event", e);
    mouseDown = true;
    startPoint = new Point(e.clientX, e.clientY);
    canvasSnapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  });
  canvas.addEventListener("mouseup", function (e) {

    mouseDown = false;
    startPoint = null;
    endPoint = null;
    canvasSnapShot = null;
  });
  canvas.addEventListener("mousemove", function (e) {
    if (mouseDown) {
      endPoint = new Point(e.clientX, e.clientY);
      drawrect();
      ctx.restore();
    }
  });

  function drawrect() {
    ctx.putImageData(canvasSnapShot, 0, 0);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(
      startPoint.x,
      startPoint.y,
      endPoint.distance(startPoint).x,
      endPoint.distance(startPoint).y
    );
    ctx.stroke();
    ctx.closePath();
  }
}

function brushcall() {

  let painting = false;

  function startPoint(e) {
    painting = true;
    drawbrush(e);
  };

  function endPoint() {
    painting = false;
    ctx.beginPath();
  };

  canvas.addEventListener("mousedown", startPoint);
  canvas.addEventListener("mouseup", endPoint);
  canvas.addEventListener("mousemove", drawbrush);

  function drawbrush(e) {
    if (!painting) {
      return;
    }
    ctx.lineWidth = 45;
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX, e.clientY);
    ctx.closePath();
  }
}
//   let painting = false;
//   let startPoint;
//   let endPoint;

//  canvas.addEventListener("mousedown", function (e) {
//   painting=true;

//     startPoint = new Point(e.clientX, e.clientY);
//     drawbrush();
//    console.log(e.clientX, e.clientY)
//   });

//  canvas.addEventListener("mouseup", function (e) { 
//   painting=false;
//   startPoint = null;
//   endPoint = null;
//   ctx.beginPath();

// });

//    canvas.addEventListener("mousemove", function (e) {
//    if (painting) {
//       endPoint = new Point(e.clientX, e.clientY);
//       drawbrush();
//       ctx.restore();
//   }
//   });

//   function drawbrush() {

//     ctx.lineWidth = 45;
//     ctx.lineCap="round";

//     ctx.lineTo(endPoint.x, endPoint.y);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(startPoint.x, startPoint.y);
//     ctx.closePath();
//   }
// }

function clearcall() {
  ctx.clearRect(0, 0, 600, 600);
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  hypotenuse(point) {
    return Math.sqrt(
      Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2)
    );
  }
  distance(point) {
    return new Point(Math.abs(this.x - point.x), Math.abs(this.y - point.y));
  }
}















// var xdown;
// var ydown;
// var xup;
// var yup;

// function linetool() {
//   canvas.addEventListener("mousedown", function(e)  {
//     xdown=e.clientX;
//     ydown=e.clientY
//   });
//   canvas.addEventListener("mouseup", function(e){
//     xup=e.clientX;
//     yup=e.clientY;
//   });

// //   function locationDown(e) {
// //     xdown = e.clientX;
// //     ydown = e.clientY;
// //   }
// //   function locationUp(e) {
// //     xup = e.clientX;
// //     yup = e.clientY;
// //   }

//   linedraw(xdown, ydown, xup, yup);
// }

// function ChangeTool(tool) {
//   switch (tool) {
//     case "line":
//       linetool();
//       console.log("line h ");

//       break;

//     case "brush":
//       console.log("brush h ");

//       break;

//     case "rectangle":
//       console.log("rectangle h ");

//       break;

//     case "circle":
//       console.log("circle h ");

//       break;

//     default:
//       break;
//   }
// }

// function linedraw(xdown, ydown, xup, yup) {

//   console.log(xup, yup);
//   ctx.beginPath();
//   ctx.moveTo(xdown, ydown);
//   ctx.lineTo(xup, yup);
//   ctx.stroke();
//   ctx.closePath();
// }