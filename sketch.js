const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight
const waveHeight = 200
let pendulums
let xSpace = 50
let ySpace = 50
let button1;
let button2;
let button3;

function setup() {
  createCanvas(canvasWidth, canvasHeight)
  // pendulums = Array.from({ length: canvasWidth / xSpace + 100}, (el, i) => {
  //   return createPendulum({x: xSpace*i, y: ySpace*i}, {c1: 10, c2: i, c3: 200})
  // })
  pendulums = Array.from({ length: canvasWidth / xSpace + 100}, (el, i) => {
    return Array.from({length: canvasHeight / ySpace + 100}, (el2, j) => {
      return createPendulum({x: xSpace*i, y: ySpace*j}, {c1: 10, c2: i * 10, c3: 200}, (i + 35) + (i * 2))
    })
  })
  // pendulum = createPendulum()
  // button1 = createButton('DISCO');
  // button1.size(100,75)
  // button1.position(canvasWidth - 125, canvasHeight - 100);
  // button1.mousePressed(changeMode);

  button2 = createButton('RESET');
  button2.size(100,75)
  button2.position(canvasWidth - 125, canvasHeight - 100);
  button2.mousePressed(reset);

  button3 = createButton('HALT');
  button3.size(100,75)
  button3.position(canvasWidth - 250, canvasHeight - 100);
  button3.mousePressed(halt);
}

// function changeMode() {
//   let color = getRandomColor()
//   pendulums.forEach((pendulumArr) => {pendulumArr.forEach((pendulum) => {
//       pendulum.color = color
//     })
//   })
// }

function draw() {
  background(210,180,140);
  pendulums.forEach((pendulumArr) => {pendulumArr.forEach((pendulum) => updatePendulumAngle(pendulum))})
  pendulums.forEach((pendulumArr) => {pendulumArr.forEach((pendulum) => updatePendulumPosition(pendulum))})
  pendulums.forEach((pendulumArr) => {pendulumArr.forEach((pendulum) => drawPendulum(pendulum))})
}

const drawLine = (pendulum) => {
    stroke(255)
    line(pendulum.center.x, pendulum.center.y, pendulum.lineStart.x, pendulum.lineStart.y)
}

const drawCircle = (pendulum) => {
  // if (pendulum.mode == 0) {
  //   fill(pendulum.color)
  //   stroke(pendulum.color)
  // } else {
  //   let color = getRandomColor()
  //   fill(color)
  //   stroke(color)
  // }
  fill(pendulum.color)
  stroke(pendulum.color)
  ellipse(pendulum.center.x, pendulum.center.y, pendulum.size)
}

const drawPendulum = (pendulum) => {
    drawLine(pendulum)
    drawCircle(pendulum)
}

const getRandomColor = () =>`#${Math.floor(Math.random() * 2 ** 24).toString(16)}`;

function reset() {
  pendulums.forEach((pendulumArr) => {
    pendulumArr.forEach((pendulum) => {
      pendulum.mode = 0
      pendulum.angle = PI/2
      pendulum.damping = 0.9995
    })
  })
}

function halt() {
  pendulums.forEach((pendulumArr) => {
    pendulumArr.forEach((pendulum) => {
      pendulum.mode = 0
      pendulum.damping = 0
      pendulum.angle = 0
    })
  })
}

const updatePendulumAngle = (pendulum) => {
    pendulum.acceleration = (-1 * pendulum.gravity / pendulum.size) * sin(pendulum.angle)
    pendulum.velocity += pendulum.acceleration
    pendulum.damping -= 0.00001
    pendulum.velocity *= pendulum.damping
    pendulum.angle += pendulum.velocity 
}

const updatePendulumPosition = (pendulum) => {
    pendulum.center.x = sin(pendulum.angle) * pendulum.swingRadius + pendulum.lineStart.x
    pendulum.center.y = cos(pendulum.angle) * pendulum.swingRadius + pendulum.lineStart.y
}

const createPendulum = ({x, y}, {c1, c2, c3}, size) => {
    return {
        // origin: {x: canvasWidth/2, y: 500},
        // center: {x: canvasWidth/2, y: 500},
        // lineStart: {x: canvasWidth/2, y: 300},
        mode: 0,
        origin: {x: x, y: y},
        center: {x: x, y: y},
        lineStart: {x: x, y: y - 50},
        size: size,
        swingRadius: 20,
        color: [c1, c2, c3],
        angle: PI/2,
        gravity: 0.9,
        damping: 0.9995,
        acceleration: 0,
        velocity: 0,
    }
}