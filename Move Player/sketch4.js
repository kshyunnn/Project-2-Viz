let state = "title"; // Initial state
let player;
let bikeStations = [];
const stationLabels = [
  "WIT - Huntington Ave @ Vancouver St",
  "Parker St @ Huntington Ave",
  "Forsyth St @ Huntington Ave",
  "Ruggles T - Columbus Ave @ Melnea Cass Blvd",
  "Flat 9 @ Whittier",
  "Mass Ave @ Columbus Ave",
  "Mass Ave T",
  "Christian Science Plaza @ Westland Ave"
];

function setup() {
  createCanvas(850, 600);
  player = new Player();

  const stationPositions = [
    { x: 100, y: 100 },
    { x: 150, y: 250 },
    { x: 400, y: 100 },
    { x: 550, y: 250 },
    { x: 100, y: 400 },
    { x: 250, y: 550 },
    { x: 400, y: 400 },
    { x: 550, y: 550 }
  ];

  for (let i = 0; i < stationLabels.length; i++) {
    let station = {
      position: createVector(stationPositions[i].x, stationPositions[i].y),
      label: stationLabels[i],
      value: floor(random(5, 20))
    };
    bikeStations.push(station);
  }
}

function draw() {
  if (state === "title") {
    drawTitleScreen();
  } else if (state === "visualization") {
    drawVisualization();
  }
}

function keyPressed() {
  if (state === "title" && (keyCode === ENTER || keyCode === RETURN)) {
    state = "visualization";
  } else if (state === "visualization") {
    if (keyCode === UP_ARROW || keyCode === 87) {
      player.move(0, -1);
    } else if (keyCode === DOWN_ARROW || keyCode === 83) {
      player.move(0, 1);
    } else if (keyCode === LEFT_ARROW || keyCode === 65) {
      player.move(-1, 0);
    } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
      player.move(1, 0);
    }
  }
}

function drawTitleScreen() {
  background(240);
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Northeastern University Blue Bike Infrastructure Map", width / 2, height / 2);
  textSize(20);
  text("Press ENTER to Start", width / 2, height / 2 + 40);
}

function drawVisualization() {
  background(240); // Light grey background

  // Draw main roads
  stroke(180); // Light grey lines for roads
  strokeWeight(8);
  line(200, 0, 200, height); // Vertical road
  line(0, 200, width, 200); // Horizontal road

  
  // Draw minor roads
  stroke(200); // Light grey lines for minor roads
  strokeWeight(4);
  for (let i = 0; i < width; i += 60) {
    line(i, 0, i, height); // Vertical minor roads
  }
  for (let j = 0; j < height; j += 60) {
    line(0, j, width, j); // Horizontal minor roads
  }

  // Display bike stations as water droplets
  for (let station of bikeStations) {
    let d = dist(station.position.x, station.position.y, mouseX, mouseY);

    // Draw water droplet icon at station position
    drawWaterDroplet(station.position.x, station.position.y);

    if (d < 10) { // Check mouse proximity to station
      fill(0);
      textSize(14);
      textAlign(CENTER, CENTER);
      text(station.label, station.position.x, station.position.y - 15);
    }
  }

  // Check if player reached any bike station
  for (let station of bikeStations) {
    let d = dist(player.pos.x, player.pos.y, station.position.x, station.position.y);
    if (d < player.size / 2 + 10) { // Player touches station
      fill(0);
      textSize(12);
      textAlign(CENTER, CENTER);
      text(station.label, width / 2, height - 50);
      text("Bikes Available: " + station.value, width / 2, height - 30);
    }
  }

  // Display player and update movement
  player.update();
  player.show();

  // Display legend
  drawLegend();
}

function drawWaterDroplet(x, y) {
  fill(139, 0, 0); // Dark red color with no stroke
  noStroke();
  beginShape();
  vertex(x, y - 22);
  bezierVertex(x + 9, y - 20, x + 14, y - 12, x, y);
  bezierVertex(x - 2, y + 0, x - 14, y - 18, x, y - 22);
  endShape(CLOSE);
}

class Player {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.speed = 3;
    this.size = 20;
  }

  move(x, y) {
    this.pos.x += x * this.speed * 5;
    this.pos.y += y * this.speed * 5;
  }

  show() {
    // Draw bicycle icon at player's position
    drawBicycle(this.pos.x, this.pos.y);
  }

  update() {
    this.pos.x = constrain(this.pos.x, 0, width - this.size);
    this.pos.y = constrain(this.pos.y, 0, height - this.size);
  }
}

function drawBicycle(x, y) {
  fill(173, 216, 230); // Light blue color
  stroke(0, 0, 139); // Dark blue stroke
  rectMode(CENTER);
  rect(x, y + 5, 20, 5);
  rect(x - 8, y - 8, 3, 10);
  rect(x + 5, y - 8, 3, 10);
  fill(255);
  ellipse(x - 7, y + 5, 5);
  ellipse(x + 7, y + 5, 5);
  fill(50);
  ellipse(x - 10, y + 15, 10);
  ellipse(x + 10, y + 15, 10);
}

function drawLegend() {
    fill(173, 216, 230);
    noStroke();
    textSize(14);
    textAlign(RIGHT, TOP); // Change alignment to RIGHT
    textFont('Arial'); // Change the font
    textStyle(BOLD); // Make the text bold
    fill(50); // Change text color to grey
    text("GOAL:", width - 10, 10); // Adjust position to be on the right
    text("USE ARROW KEYS TO FIND", width - 10, 30);
    text("AVAILABLE BlUE BIKES.", width - 10, 50);

  }
  
  