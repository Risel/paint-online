export default class Tool {
  constructor(canvas, socket, id) {
    this.canvas = canvas;
    this.socket = socket;
    this.id = id;
    this.ctx = canvas.getContext('2d')
    this.destroyEvents();
  }

      /**
   * @param {any} color
   */
      set fillColor(color) {
      this.ctx.fillStyle = color
    }
    /**
   * @param {any} color
   */
      set strokeColor(color) {
      this.ctx.strokeStyle = color
    }

    /**
   * @param {any} width
   */
      set lineWidth(width) {
      this.ctx.lineWidth = width
    }

  destroyEvents() {
    this.canvas.onmouseup = null;
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
  }
}