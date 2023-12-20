import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import './Clicker.scss'

export const Clicker = () => {
    const [counter, setCounter] = useState (0)

    const incrementar = () => {
        setCounter( counter + 1)
    }

    const restar = () => {
        setCounter ( counter - 1 )
    }

    const resetear = () => {
        setCounter (0)
    }


    useEffect(()=> {
        const maxLS = localStorage.getItem('max') || 0
        if (counter > maxLS) {
            localStorage.setItem('max', counter)
        }
    }, [counter])

    useEffect(() => {
        console.log("render")
        return(
            console.log("limpieza")
        )
    }, [counter])


    const today = useRef (new Date())


  return (
    <>
        <div className="contenedorButton">
            
            <p className='flex'>Hour: {today.current.toLocaleTimeString()}</p>

            <button className="btn1" onClick={incrementar}>Suma</button>
            <button className="btn2" onClick={restar}>Resta</button>
            <button className="btn3" onClick={resetear}>Resetea</button>
        </div>
        <div className="ContenedorCounter">
            <p className='text-xl'>Clicks: {counter}</p>
        </div>
    </>
  )
}
