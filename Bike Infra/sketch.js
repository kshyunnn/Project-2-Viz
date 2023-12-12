let spr1, spr2;

function setup() {
  createCanvas(400, 400);

  // Create sprites and set their properties
  spr1 = createSprite(width / 2, height / 3, 100, 100);
  spr1.shapeColor = color(255);
  spr1.mouseActive = true;

  spr2 = createSprite(width / 2, height * 0.67, 100, 100);
  spr2.shapeColor = color(0);
  spr2.mouseActive = true;
}

function draw() {
  // Draw city block grid background
  for (let x = 0; x < width; x += 20) {
    for (let y = 0; y < height; y += 20) {
      fill(100); // Grey color
      rect(x, y, 20, 20);
    }
  }

  // Change color to represent streets
  for (let x = 0; x < width; x += 40) {
    for (let y = 0; y < height; y += 40) {
      fill(34, 139, 34); // Forest green color for streets
      rect(x, y, 20, 20);
    }
  }

  // Perform actions based on sprite interaction
  background(50);
  if (spr1.mouseIsOver) {
    background(100);
  }
  if (spr2.mouseIsOver && mouseIsPressed) {
    spr2.rotation += 4;
  }

  drawSprites();
}
