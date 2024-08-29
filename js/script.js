/** @type {HTMLCanvasElement} */
/** @type {CanvasRenderingContext2D} */

let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let figures = [];
let circleColors = [];
const CANT_FIGURES = 15; //debe ser un multiplo de 3 para que funcione correctamente por el pedido del problema
let mouseDown = false;
let alertMessage = document.getElementById('alert');
alertMessage.textContent = 'No image selected';
let circleNumber = 0; // esto sirve porque se generanen orden
let squareNumber = 0;
let rectangleNumber = 0;
let figureSelectedIndex = -1;
let figureSelected = null;
let hasMoved = false;

canvas.addEventListener('mousedown', (e) => {
    mouseDown = true;
    if (figureSelected != null) {
        figureSelected.selected(false);
    } 
    let pos = getMousePos(e);
    let i = 0;
    while (i<figures.length && !figures[i].isThePoint(pos.posX,pos.posY)){
        i++;
    }
    if (i<figures.length) {
        figureSelectedIndex = i;
        figureSelected = figures[i];
        figureSelected.selected(true);
        inicialPosX = pos.posX - figures[figureSelectedIndex].posX;
        inicialPosY = pos.posY - figures[figureSelectedIndex].posY;
        hasMoved = false;            
        alertMessage.textContent = 'Moving a ' + figures[i].getName();
        alertMessage.hidden = false;
    } else{
        alertMessage.textContent = 'No image selected';
        figureSelectedIndex = -1;
        if (figureSelected != null) {
            figureSelected.selected(false);
        } 
        figureSelected = null;
    }
    redrawCanvas();
})

canvas.addEventListener('mousemove', (e) => {
    if (mouseDown && figureSelectedIndex !== -1) {
        hasMoved = true;
        let pos = getMousePos(e);
        // Mover la figura a partir de usar los datos offSet recaudados al hacer el click
        // y calcula el movimiento que debe hacer en cada movimiento de mouse para que lo mueva completamente
        figures[figureSelectedIndex].moveTo(pos.posX - inicialPosX, pos.posY - inicialPosY);
        
        redrawCanvas(); // redibuja el canvas en cada posicion
    }
})

canvas.addEventListener('mouseup', (e) => {
    if (figureSelected != null) {
        figureSelected.selected(true); // Aplicar estilo al hacer clic sin mover
        alertMessage.textContent = 'Figure selected: ' + figureSelected.getName();
    }
    mouseDown = false;
    hasMoved = false;
    redrawCanvas();

})

canvas.addEventListener('mouseout', (e) => { //eso es para que si estoy llevando una imagen y el mouse sale del canvas se deseleccione la imagen
    // Manejar el caso cuando el cursor sale del área del canvas
    if (mouseDown && figureSelected != null) {
        figureSelected.selected(false);
        mouseDown = false;
        figureSelectedIndex = -1;
        figureSelected = null;
        hasMoved = false;
        alertMessage.textContent = 'No image selected';
        redrawCanvas();
    }
});

document.addEventListener('keydown', (e) => { //verifica que este una imagen seleccionada, entonces la mueve
    if (figureSelected != null) {
        switch (e.key) {
            case 'ArrowUp':
                figureSelected.moveTo(figureSelected.posX, --figureSelected.posY);
                break;
            case 'ArrowDown':
                figureSelected.moveTo(figureSelected.posX, ++figureSelected.posY);
                break;
            case 'ArrowLeft':
                figureSelected.moveTo(--figureSelected.posX, figureSelected.posY);
                break;
            case 'ArrowRight':
                figureSelected.moveTo(++figureSelected.posX, figureSelected.posY);
                break;
        }
        redrawCanvas();
    }
});

function getMousePos(e) {
    let posX = e.offsetX;
    let posY = e.offsetY;
    return { posX, posY };
}

function redrawCanvas() { // limpia el canvas y lo vuelve a dibujar con las medidas nuevas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    figures.forEach(figure => { //uso un foreach porque debe dibujar el arreglo de figuras completo, si lo hago solo con el i se rompe
        figure.draw();
    });
}


function main(){//aplica las funciones base para cumplir con los pedidos del practicos
    paintCanvas();
    createFigures();
}

function paintCanvas(){//pinta  deja preparada el area inicial del canvas para dibujar
    let fixedColor = 'rgba(245,245,245,255)';
    let rectangle = new Rectangle (0, 0 , width-1, height-1, fixedColor, ctx, true);
    rectangle.draw();
}

function createFigures(){//agregar una figura al arreglo para luego crearla 

    if(figures.length < CANT_FIGURES){
        addFigure();

        figures[figures.length-1].draw();

        setTimeout(() => {//use recursividad en vez de bucles
            createFigures();  }, 100);
    }
}

function addFigure(){//agregar una figura al arreglo
    let posX = randomNumber(width, 0);
    let posY = randomNumber(height, 0);
    let colorValues = randomColorValues();
    let color = toRGBA(colorValues);

    if(figures.length < (CANT_FIGURES/3)){
        circleNumber++;
        squareNumber = 0;
        rectangleNumber = 0;
        figures.push(new Circle(posX, posY, randomNumber(60, 3), color, ctx, false, "Circle " + circleNumber));
        circleColors.push(colorValues);
    } else if (figures.length >= (CANT_FIGURES/3) && figures.length < (CANT_FIGURES*2/3)){
        circleNumber = 0;
        squareNumber++;
        rectangleNumber = 0;
        figures.push(new Square (posX, posY, randomNumber(100, 5), colorForSquare(circleColors[0]), ctx, false, "Square " + squareNumber));
        circleColors.shift();
    } else {
        circleNumber = 0;
        squareNumber = 0;
        rectangleNumber++;
        figures.push(new Rectangle (posX, posY, randomNumber(200, 5), randomNumber(200, 5), color, ctx, false, "Rectangle " + rectangleNumber));
    }
}

function colorForSquare(colorArray){//deben ser complementarios a los de los circulos
    // Extraer los valores de r, g, b y a usando una expresión regular
    let [r, g, b, a] = colorArray
    if (colorArray.length == 4) {
        // Calcula los valores complementarios
        const complementR = 255 - r;
        const complementG = 255 - g;
        const complementB = 255 - b;
        // Devuelve el color complementario en formato rgba
        return `rgba(${complementR}, ${complementG}, ${complementB}, ${a})`;
    } else {
        throw new Error('El arreglo debe contener exactamente 4 colores para ser un Formato de color RGBA no válido');
    }
}

function randomColorValues() {
    let r = randomNumber(255, 0);
    let g = randomNumber(255, 0);
    let b = randomNumber(255, 0);
    let a = 255;

    // Devuelve un arreglo con los valores de los colores
    return [r, g, b, a];
}

function toRGBA(colorArray) {
    // Desestructura el arreglo para obtener los valores
    const [r, g, b, a] = colorArray;

    // Devuelve el color en formato rgba
    return `rgba(${r}, ${g}, ${b}, ${a})`; // Ajusta alpha a un rango entre 0 y 1
}

function randomColor() {
    const { r, g, b, a } = randomColorValues();  // Obtener los valores de los colores
    return toRGBA(r, g, b, a);  // Convertir los valores a formato RGBA
}

function randomNumber(product, add) {
    return Math.round(Math.random() * product + add);
}
