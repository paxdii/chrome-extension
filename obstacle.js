class Obstacle {
    constructor() {
      this.size = 60;
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
  