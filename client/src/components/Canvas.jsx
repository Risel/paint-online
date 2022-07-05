import React, { useEffect, useRef, useState } from 'react'
import '../styles/canvas.scss'
import { observer } from 'mobx-react-lite'
import canvasState from '../store/canvasState'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import Rect from '../tools/Rect';
import  {Modal, Button} from "react-bootstrap";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Canvas = observer(() => {
  const params = useParams();
  const canvasRef = useRef();
  const usernameRef = useRef();
  const [modal, setModal] = useState(true);

  
  useEffect(()=>{
    canvasState.setCanvas(canvasRef.current)
    axios.get(`http://localhost:5000/image?id=${params.id}`)
    .then(res=>{
      const img = new Image();
      img.src = res.data;
      img.onload = () => {
      this.ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
      this.ctx.drawImage(img,0,0,canvasRef.current.width , canvasRef.current.height)
      }
    })
  },[])

  useEffect(()=>{
    if (canvasState.username){
      const socket = new WebSocket(`ws://localhost:5000/`)
      canvasState.setSocket(socket)
      canvasState.setSessionId(params.id)
      toolState.setTool(new Brush(canvasRef.current, socket, params.id))

      socket.onopen = () => {
        console.log('Подключено')
        socket.send(JSON.stringify({
          id:params.id,
          username: canvasState.username,
          method: "connection"
        }))
      }
      socket.onmessage = (e) => {
        let msg = JSON.parse(e.data)
        switch(msg.method){
          case "connection":
            console.log(`Пользователь ${msg.username} подключился`)
          break

          case "draw":
            drawHandler(msg)
          break
        }
      }
    }
  },[canvasState.username])

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL())
    axios.post(`http://localhost:5000/image?id=${params.id}`, {img: canvasRef.current.toDataURL()})
        .then(response => console.log(response.data))
}
  const connectionHandler = () => {
    canvasState.setUsername(usernameRef.current.value)
    setModal(false)
  }

  const drawHandler = (msg) => {
    const figure = msg.figure
    const ctx = canvasRef.current.getContext('2d')
    
    switch(figure.type){
      case 'brush':
        Brush.draw(ctx, figure.x, figure.y)
      break
      case 'rect':
        Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
      break
      case 'finish':
        ctx.beginPath()
      break
    }

  }

  

  return (
    <div className='canvas'>
      <Modal show={modal} onHide={() => {}}>
          <Modal.Header >
            <Modal.Title>Введите имя</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <input type="text" ref={usernameRef}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => connectionHandler()}>
              Войти
            </Button>
          </Modal.Footer>
        </Modal>
        <canvas onMouseDown = {()=>mouseDownHandler()} ref={canvasRef} width={800} height={600}/>
    </div>
  )
}
)

export default Canvas