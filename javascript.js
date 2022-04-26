const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
console.log(context); // kan se alla atribut till canvasen, glöm ej att ta bort

canvas.width = 1000;
canvas.height = 400;

const gravity = 0.2;
class Player {
  constructor() {
    this.height = 50;
    this.with = 50;

    this.position = {
      x: 30,
      y: canvas.height - this.height,
    };
    this.velocity = {
      x: 0,
      y: 1,
    };
  }
  playerDraw() {
    context.fillStyle = "green";
    context.fillRect(this.position.x, this.position.y, this.with, this.height);
  }

  updatePos() {
    this.playerDraw();
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

class Opsticals {
  constructor() {
    this.width = 40;
    this.height = 80;

    this.position = {
      x: 200,
      y: canvas.height - this.height,
    };
  }
  opsticalDraw() {
    context.fillStyle = "black";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const player = new Player();
const opsticals = new Opsticals();

function animation() {
  requestAnimationFrame(animation);
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.updatePos();
  opsticals.opsticalDraw();
}

animation();

window.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    if (player.velocity.y == 0) {
      player.velocity.y -= 8;
    }
  }
});
