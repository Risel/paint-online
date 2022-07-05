import Tool from "./Tool";

export default class Eraser extends Tool {
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
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
  }
  mouseMoveHandler(e){
    if(this.mouseDown){
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    }
  }

  draw(x,y){
    this.ctx.strokeStyle = 'white';
    this.ctx.lineTo(x,y);
    this.ctx.stroke();
  }

}