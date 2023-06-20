class Player {
    constructor() {
      this.size = 60;
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
      let hitboxHeight = this.size / 2;
      let hitboxWidth = this.size / 2;
      return !(this.x + hitboxWidth < obstacle.x || 
               this.x + this.size - hitboxWidth > obstacle.x + obstacle.size || 
               this.y + hitboxHeight < obstacle.y ||
               this.y + this.size - hitboxHeight > obstacle.y + obstacle.size);
    }
  }
  