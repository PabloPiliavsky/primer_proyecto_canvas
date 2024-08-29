class Square extends Figure{

    constructor(posX, posY, side, fill, ctx, style, name){
        super(posX, posY, fill, ctx, style, name);
        this.side = side;
    }

    draw(){
        this.ctx.fillStyle = this.fill; //color de relleno
        this.ctx.beginPath();
        this.ctx.rect(this.posX, this.posY, this.side, this.side);//de esta forma hago un cuadrado que es un rectangulo de lados iguales
        this.ctx.fill();
        if(this.style)
                this.ctx.stroke();
    }

    isThePoint(posX, posY){//uso la misma que la del rectangulo
        return (
            (posX >=this.posX) && (posX <= (this.posX + this.side)) &&
            (posY >= this.posY) && (posY <= (this.posY + this.side))
        )
    }
}