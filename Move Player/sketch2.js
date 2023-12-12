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
  createCanvas(850,600);
  player = new Player();

  // Create bike stations
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
      value: floor(random(5, 20)) // Random bike counts between 5 and 20
    };
    bikeStations.push(station);
  }
}

function draw() {
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
