class Figure {

    constructor(posX, posY, fill, ctx, style, name){ // le agregue nombre para identificarlos en las muestras
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.ctx = ctx;
        this.style = style;
        this.name = name;
    }

    getName(){
        return this.name;
    }

    moveTo(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }

    selected(style){
        this.style = style;
    }

    draw(){
        //Nothing to do.
    }

    isThePoint(posX, posY){//boolean function
        return null;
    }
}