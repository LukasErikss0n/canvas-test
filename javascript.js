const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
console.log(context); // kan se alla atribut till canvasen, glöm ej att ta bort

canvas.width = 1000;
canvas.height = 400;

const gravity = 0.2;
class Player {
  constructor() {
    this.height = 50;
    this.width = 50;

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
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
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

class Obsticals {
  constructor() {
    this.width = 600;
    this.height = 80;

    this.position = {
      x: 400,
      y: canvas.height - this.height,
    };
    this.acceleration = {
      x: 0.5,
      y: 0,
    };
    this.speed = {
      x: 0.05,
      y: 0,
    };
  }

  obsticalDraw() {
    context.fillStyle = "black";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  updateObstical() {
    this.obsticalDraw();
    this.position.x -= this.acceleration.x;
    this.acceleration.x += this.speed.x;
  }
}

const player = new Player();
const obstical = new Obsticals();

function animation() {
  requestAnimationFrame(animation);
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.updatePos();
  obstical.updateObstical(); // ändra sen till updateObstical

  //crash detection
  if (
    player.position.y + player.height <= obstical.position.y &&
    player.position.y + player.height + player.velocity.y >=
      obstical.position.y &&
    player.position.x + player.width >= obstical.position.x &&
    player.position.x <= obstical.position.x + obstical.width
  ) {
    player.velocity.y = 0; // ändra till att man dör vid nud istället för att åka på objekt
    console.log("Nuddade topen av blocket");
  } else if (
    player.position.x + player.width >= obstical.position.x &&
    player.position.y + player.velocity.y >= obstical.position.y
  ) {
    console.log("nudd frånt");
    obstical.acceleration.x = 0; //ändra till att man dör vid nud istället för att åka på objekt
  }
}

animation();

window.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    if (player.velocity.y == 0) {
      player.velocity.y -= 8;
    }
  }
});
