const canvasWidth = window.innerWidth
const canvasHeight = window.innerHeight
const waveHeight = 200
let pendulum

function setup() {
  createCanvas(canvasWidth, canvasHeight)
  pendulum = createPendulum()
}

function draw() {
  background(30);
  updatePendulumAngle(pendulum);
  updatePendulumPosition(pendulum);
  drawPendulum(pendulum);
}

const drawLine = (pendulum) => {
    stroke(255)
    line(pendulum.center.x, pendulum.center.y, pendulum.lineStart.x, pendulum.lineStart.y)
}

const drawCircle = (pendulum) => {
  fill(pendulum.color)
  ellipse(pendulum.center.x, pendulum.center.y, pendulum.size)
}

const drawPendulum = (pendulum) => {
    drawLine(pendulum)
    drawCircle(pendulum)
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

const createPendulum = () => {
    return {
        origin: {x: canvasWidth/2, y: 500},
        center: {x: canvasWidth/2, y: 500},
        lineStart: {x: canvasWidth/2, y: 300},
        size: 100,
        swingRadius: 200,
        color: [120,200,120],
        angle: PI/2,
        gravity: 0.9,
        damping: 0.9995,
        acceleration: 0,
        velocity: 0,
    }
}