let player;
let obstacles = [];
let score = 0;
let obstacleRate = 60;
let framesSinceLastObstacle = 0;  // Neuer Zähler für die Frames seit dem letzten Hindernis
let gameOver = false;
let highScore = 0;

function setup() {
  const canvas = createCanvas(800, 400);
  canvas.parent("game-container");
  player = new Player();
}

function draw() {
  background(255);  

  if (gameOver) {
    showGameOverScreen();
    return;
  }

  player.show();
  player.move();

  framesSinceLastObstacle++;  // Zähler für die Frames seit dem letzten Hindernis erhöhen
  if (framesSinceLastObstacle >= obstacleRate) {
    obstacles.push(new Obstacle());
    obstacleRate = random(30, 90);  // Hindernisse erscheinen in einem zufälligen Intervall zwischen 30 und 90 Frames
    framesSinceLastObstacle = 0;  // Zähler für die Frames seit dem letzten Hindernis zurücksetzen
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    obs.show();
    obs.move();

    if (player.hits(obs)) {
      gameOver = true;
      if (score > highScore) {
        highScore = score;
      }
    }

    if (obs.x + obs.size < 0) {
      obstacles.splice(i, 1);
    }
  }

  fill(0);  // Farbe des Textes auf Schwarz setzen
  textSize(32);
  text('Score: ' + score, 10, 50);
  score++;
}

function keyPressed() {
  if (key === ' ' && !gameOver && player.y === height - player.size) {
    player.jump();
  }
}

function showGameOverScreen() {
  const gameOverContainer = document.getElementById('game-over-container');
  gameOverContainer.style.display = 'flex';

  const highScoreText = document.getElementById('high-score-text');
  highScoreText.innerText = 'High Score: ' + highScore;

  const restartButton = document.getElementById('restart-button');
  restartButton.addEventListener('click', restartGame);
}

function restartGame() {
  location.reload();
}

class Player {
  constructor() {
    this.size = 40;
    this.x = 50;
    this.y = height - this.size;
    this.velocityY = 0;
    this.gravity = 1.5;
    this.jumpForce = -22;
  }

  show() {
    fill(0, 200, 100);
    rect(this.x, this.y, this.size, this.size);
  }

  jump() {
    this.velocityY = this.jumpForce;
  }

  move() {
    this.y += this.velocityY;
    this.velocityY += this.gravity;

    if (this.y > height - this.size) {
      this.y = height - this.size;
      this.velocityY = 0;
    }
  }

  hits(obstacle) {
    let hitboxHeight = this.velocityY < 0 ? this.size / 2 : this.size - 10;
    return !(this.x > obstacle.x + obstacle.size || 
             this.x + this.size < obstacle.x || 
             this.y > obstacle.y + obstacle.size ||
             this.y + hitboxHeight < obstacle.y);
  }
}

class Obstacle {
  constructor() {
    this.size = 50;
    this.x = width;
    this.y = height - this.size;
    this.speed = 5;
  }

  show() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.size, this.size);
  }

  move() {
    this.x -= this.speed;
  }
}
