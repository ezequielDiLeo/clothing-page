import React, { useEffect, useState } from 'react'
import './PokeApi.scss'
import { Button } from '../../components/Button/Button'
import { useFetch } from '../../hooks/useFetch'


export const PokeApi = () => {
    const [id, setId] = useState(1)
    const {data: pokemon} = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`, [id])

    const handleAnterior = () => {
       id > 1 && setId (id - 1)
    }

    const handleSiguiente = () => {
       id < 50 && setId (id + 1)
    }

  return (
    <>
        <div className='contenedor-api'>
            <h2 className='title-contenedor-api'>Pokeapi</h2>
            <hr />
            {
                pokemon && //cuando tenga los pokemon (&& entonces)
                <>
                    <div className='contenedor-poke'>
                        <h2>{pokemon.name}</h2>
                        <img className='imagen' src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quisquam enim sunt veritatis consectetur sint ut libero quas cumque sapiente similique saepe repellendus illum, maxime eligendi odio natus ab. Aperiam?</h4>
                    </div>
                    
                </>
            }

            <div className='flex gap-5'>
                <Button onClick={handleAnterior}>Anterior</Button>
                <Button onClick={handleSiguiente}>Siguiente</Button>
            </div>

        </div>
        
    </>
  )
}
