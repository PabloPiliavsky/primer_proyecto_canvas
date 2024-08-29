class Circle extends Figure{
    
    constructor(posX, posY, radius, fill, ctx, style, name){
        super(posX, posY, fill, ctx, style, name);
        this.radius = radius;
    }

    draw(){
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
        if(this.style)
            this.ctx.stroke();
    }

    isThePoint(posX, posY){
        let xx = this.posX - posX;
        let yy = this.posY - posY;
        return ((Math.sqrt(xx*xx + yy*yy) < this.radius));
    }
}