class Rectangle extends Figure{

    constructor(posX, posY, width, height, fill, ctx, style, name){
        //super(posX - width, posY - height) para que no se salgan del canvas;
        super(posX, posY, fill, ctx, style, name);
        this.width = width;
        this.height = height;
    }

    draw(){
        this.ctx.fillStyle = this.fill; //color de relleno
        this.ctx.beginPath();
        this.ctx.rect(this.posX, this.posY, this.width, this.height);
        this.ctx.fill();

        if(this.style)
                this.ctx.stroke();
    }

    isThePoint(posX, posY){
        return (
            (posX >=this.posX) && (posX <= (this.posX + this.width)) &&
            (posY >= this.posY) && (posY <= (this.posY + this.height))
        )
    }
    
}