let player;
let bikeStations = [];
const stationLabels = [
  "North Parking Lot",
  "Forsyth St at Huntington Ave",
  "Ruggles T Stop - Columbus Ave at Melnea Cass Blvd",
  "Mass Ave."
];
const stationValues = [18, 8, 3, 4];

function setup() {
  createCanvas(400, 400);
  player = new Player();

  // Create bike stations
  for (let i = 0; i < stationLabels.length; i++) {
    let station = {
      position: createVector(random(width), random(height)),
      label: stationLabels[i],
      value: stationValues[i]
    };
    bikeStations.push(station);
  }
}

function draw() {
  background(220);

  // Display bike stations
  for (let station of bikeStations) {
    let d = dist(station.position.x, station.position.y, mouseX, mouseY);

    fill(173, 216, 230); // Light blue color
    noStroke();
    rectMode(CENTER);
    rect(station.position.x, station.position.y, 20, 20);

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
}

function keyPressed() {
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

class Player {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.speed = 3;
    this.size = 20;
  }

  move(x, y) {
    this.pos.x += x * this.speed;
    this.pos.y += y * this.speed;
  }

  show() {
    fill(255);
    stroke(0);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  update() {
    this.pos.x = constrain(this.pos.x, 0, width - this.size);
    this.pos.y = constrain(this.pos.y, 0, height - this.size);
  }
}
