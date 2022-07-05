import Tool from "./Tool";

export default class Circle extends Tool {
  constructor(canvas){
    super(canvas);
    this.listen();
  }
  
  listen(){
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
  }

  mouseUpHandler(e){
    this.mouseDown = false;
  }
  mouseDownHandler(e){
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL()
  }
  mouseMoveHandler(e){
    if(this.mouseDown){
      let rad = e.pageX - e.target.offsetLeft - e.pageY + e.target.offsetTop;
      this.draw(this.startX,this.startY, rad)
    }
  }

  draw(x,y, rad){ 
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
      this.ctx.drawImage(img,0,0,this.canvas.width,this.canvas.height)
      this.ctx.beginPath();
      this.ctx.arc(x,y,rad,0,2*Math.PI)
      this.ctx.fill();
      this.ctx.stroke();
    }

  }
}