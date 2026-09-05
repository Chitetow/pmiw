//Acevedo Maximo
//Com 3 Trabajo Practico 1
//  08/26
//pmiw
let pantalla = "menu";
let fondo;
let framesQuieto = [];
let framesCaminar = [];
let framesSaltar = [];
let framesSprint = [];
let fondoGeneral;
let personaje = {
  x: 50,
  y: 255,
  suelo: 255,
  velocidadY: 0,
  gravedad: 0.8,
  fuerzaSalto: -15,
  estado: "quieto",
  frameIndex: 0,
  contador: 0,
  velocidadAnim: 6
};

let boton = {
  x: 300,
  y: 260,
  ancho: 200,
  alto: 60
};

async function preload() {
fondoGeneral = loadImage('assets/fondo/fondo.png');

  framesQuieto[0] = loadImage('assets/quieta/quieta0001.png');

  for (let i = 1; i <= 11; i++) {
    framesCaminar[i - 1] = loadImage('assets/caminar/camita' + nf(i, 4) + '.png');
  }

  for (let i = 1; i <= 11; i++) {
    framesSaltar[i - 1] = loadImage('assets/saltar/salto' + nf(i, 4) + '.png');
  }

  for (let i = 1; i <= 6; i++) {
    framesSprint[i - 1] = loadImage('assets/correr/sprint' + nf(i, 4) + '.png');
  }
}

async function setup() {
  createCanvas(800, 600);
async function dibujarJuego() {
background(135, 206, 235);
  actualizarEstado();

  let frames = obtenerFramesPorEstado(personaje.estado);
  actualizarFrame(personaje, frames.length);

  image(frames[personaje.frameIndex], personaje.x, personaje.y);

  if (personaje.x > width) {
    reiniciarTodo();
  }
}
}

async function draw() {
  if (pantalla === "menu") {
    dibujarMenu();
  } else if (pantalla === "juego") {
    dibujarJuego();
  }
}

async function dibujarMenu() {
  image(fondoGeneral, 0, 0, width, height);
  textAlign(CENTER, CENTER);
  fill(0);
  textSize(36);
  text("Sailor Moon", 400, 150);
 fill(240, 0, 76);
  textSize(20);
  text("W, salto", 200, 110);
  text("D, avanzar", 200, 70);
  text("H, correr", 200, 40);

  let sobreBoton = mouseX > boton.x && mouseX < boton.x + boton.ancho &&
                    mouseY > boton.y && mouseY < boton.y + boton.alto;

  fill(sobreBoton ? color(80, 180, 80) : color(100, 200, 100));
  rect(boton.x, boton.y, boton.ancho, boton.alto, 8);

  fill(0);
  textSize(22);
  text("INICIO", boton.x + boton.ancho / 2, boton.y + boton.alto / 2);
}

async function mousePressed() {
  if (pantalla === "menu") {
    let sobreBoton = mouseX > boton.x && mouseX < boton.x + boton.ancho &&
                      mouseY > boton.y && mouseY < boton.y + boton.alto;
    if (sobreBoton) {
      pantalla = "juego";
    }
  }
}
async function dibujarJuego() {
    image(fondoGeneral, 0, 0, width, height);

  actualizarEstado();

  let frames = obtenerFramesPorEstado(personaje.estado);
  actualizarFrame(personaje, frames.length);
console.log("estado:", personaje.estado, "frames:", frames, "index:", personaje.frameIndex);
  image(frames[personaje.frameIndex], personaje.x, personaje.y);

  if (personaje.x > width) {
    reiniciarTodo();
  }
}
async function actualizarEstado() {
  if (personaje.estado === "saltar") {
    actualizarSalto(personaje);
    if (personaje.y >= personaje.suelo) {
      cambiarEstado("quieto");
    }
    return;
  }

  if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
    cambiarEstado("saltar");
    personaje.velocidadY = personaje.fuerzaSalto;
  } else if (keyIsDown(72)) {
    cambiarEstado("sprint");
    personaje.x += 6;
  } else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
    cambiarEstado("caminar");
    personaje.x += 3;
  } else {
    cambiarEstado("quieto");
  }
}
function actualizarSalto(pj) {
  pj.velocidadY += pj.gravedad;
  pj.y += pj.velocidadY;

  if (pj.y >= pj.suelo) {
    pj.y = pj.suelo;
    pj.velocidadY = 0;
  }
}
function obtenerFramesPorEstado(estado) {
  if (estado === "saltar") return framesSaltar;
  if (estado === "sprint") return framesSprint;
  if (estado === "caminar") return framesCaminar;
  return framesQuieto;
}
async function cambiarEstado(nuevoEstado) {
  if (personaje.estado !== nuevoEstado) {
    personaje.estado = nuevoEstado;
    personaje.frameIndex = 0;
    personaje.contador = 0;
  }
}
async function actualizarFrame(pj, totalFrames) {
  pj.contador++;
  if (pj.contador >= pj.velocidadAnim) {
    pj.contador = 0;
    pj.frameIndex = (pj.frameIndex + 1) % totalFrames;
  }
}


async function reiniciarTodo() {
  pantalla = "menu";
  personaje.x = 50;
  personaje.estado = "quieto";
  personaje.frameIndex = 0;
  personaje.contador = 0;
}
