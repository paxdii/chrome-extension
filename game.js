let player;
let obstacles = [];
let score = 0;
let obstacleRate = 60;
let framesSinceLastObstacle = 0;
let gameOver = false;
let highScore = 0;
let playerImg;
let obstacleImg;
let gamePaused = false;

function preload() {
  playerImg = loadImage('./content/player.png');
  obstacleImg = loadImage('./content/enemy.png');
  bg = loadImage('./content/background.jpg');
}

function setup() {
  const canvas = createCanvas(800, 400);
  canvas.parent("game-container");
  player = new Player();
  frameRate(60);
  setTimeout(() => {
    const startScreen = document.getElementById('start-screen');
    startScreen.style.opacity = '0';
    startScreen.style.pointerEvents = 'none';
  }, 2000);

  highScore = localStorage.getItem('highScore') || 0;

  document.getElementById('restart-button').addEventListener('click', function() {
    location.reload();
  });
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
    if (gamePaused) {
      return;
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

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
  }
}
