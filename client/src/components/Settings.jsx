import React from 'react'
import toolState from '../store/toolState'
import '../styles/toolbar.scss'

const Settings = () => {
  return (
    <div className='settings'>
      <label htmlFor='lineWidth' className='settings__input'>Толщина линии</label>
      <input onChange={e=> toolState.setLineWidth(e.target.value)}
              id = "line-width" 
              type='number' 
              defaultValue = {1} 
              min={1} 
              max={50}
            />
      <label className = 'settings__input' htmlFor="stroke-color">Цвет обводки</label>
      <input onChange={e => toolState.setStrokeColor(e.target.value)} id="stroke-color" type="color"/>
    </div>
  )
}

export default Settings