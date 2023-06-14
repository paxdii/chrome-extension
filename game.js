let player;
let obstacles = [];
let score = 0;
let obstacleRate = 60;
let framesSinceLastObstacle = 0;
let gameOver = false;
let highScore = 0;
let playerImg;
let obstacleImg;

function preload() {
  playerImg = loadImage('./content/player.png');
  obstacleImg = loadImage('./content/enemy.png');
  bg = loadImage('./content/background.jpg');
}

function setup() {
  const canvas = createCanvas(800, 400);
  canvas.parent("game-container");
  player = new Player();
  frameRate(60);  // Setzt die Bildwiederholrate auf 60 FPS
  setTimeout(() => {
    const startScreen = document.getElementById('start-screen');
    startScreen.style.opacity = '0';
    startScreen.style.pointerEvents = 'none';
  }, 2000);
}

function draw() {
  background(250);
  image(bg, 0, 0, width, height);

  if (gameOver) {
    showGameOverScreen();
    return;
  }

  player.show();
  player.move();

  framesSinceLastObstacle++;
  if (framesSinceLastObstacle >= obstacleRate) {
    obstacles.push(new Obstacle());
    obstacleRate = random(30, 90);
    framesSinceLastObstacle = 0;
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

  fill(0);
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
  gameOverContainer.style.opacity = '1';

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
    this.size = 60;  // Größe des Spielers erhöhen
    this.x = 50;
    this.y = height - this.size;
    this.velocityY = 0;
    this.gravity = 1.5;
    this.jumpForce = -20;
  }

  show() {
    image(playerImg, this.x, this.y, this.size, this.size);
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
    let hitboxHeight = this.size / 2;  // Hitbox-Höhe auf die Hälfte der Spielergröße setzen
    let hitboxWidth = this.size / 2;  // Hitbox-Breite auf die Hälfte der Spielergröße setzen
    return !(this.x + hitboxWidth < obstacle.x || 
             this.x + this.size - hitboxWidth > obstacle.x + obstacle.size || 
             this.y + hitboxHeight < obstacle.y ||
             this.y + this.size - hitboxHeight > obstacle.y + obstacle.size);
  }
}

class Obstacle {
  constructor() {
    this.size = 60;  // Größe der Hindernisse erhöhen
    this.x = width;
    this.y = height - this.size;
    this.speed = 5;
  }

  show() {
    image(obstacleImg, this.x, this.y, this.size, this.size);
  }

  move() {
    this.x -= this.speed;
  }
}
