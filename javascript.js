const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 400;

const gravity = 0.2;
class Cube {
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
  cubeDraw() {
    context.fillStyle = "green";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  cubeJump() {
    this.cubeDraw();
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}

class Obstacles {
  constructor({ x, height, width }) {
    this.width = width;
    this.height = height;

    this.position = {
      x: x,
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

  obstaclesDraw() {
    context.fillStyle = "darkblue";
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  moveObstical() {
    this.obstaclesDraw();
    this.position.x -= this.acceleration.x;
    this.acceleration.x += this.speed.x;
  }
}

const cube = new Cube();
const obsticals = [
  new Obstacles({ x: 200, height: 50, width: 100 }),
  new Obstacles({ x: 1000, height: 50, width: 200 }),
];

function animation() {
  requestAnimationFrame(animation);
  context.clearRect(0, 0, canvas.width, canvas.height);
  cube.cubeJump();
  obsticals.forEach(function (obstical) {
    obstical.moveObstical();
  });

  //crash detection
  obsticals.forEach(function (obstical) {
    if (
      cube.position.y + cube.height <= obstical.position.y &&
      cube.position.y + cube.height + cube.velocity.y >= obstical.position.y &&
      cube.position.x + cube.width >= obstical.position.x &&
      cube.position.x <= obstical.position.x + obstical.width
    ) {
      cube.velocity.y = 0; // ändra till att man dör vid nud istället för att åka på objekt
      console.log("Nuddade topen av blocket");
    } else if (
      cube.position.x + cube.width >= obstical.position.x &&
      cube.position.y + cube.velocity.y >= obstical.position.y
    ) {
      console.log("nudd frånt");
      obstical.acceleration.x = 0; //ändra till att man dör vid nud istället för att åka på objekt
    }
  });
}

animation();

window.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    if (cube.velocity.y == 0) {
      cube.velocity.y -= 8;
    }
  }
});
