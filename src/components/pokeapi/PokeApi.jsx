/* import {useState} from 'react'
import { useEffect } from 'react'

export const PokeApi = ( {txt} )=> {
    const [pokemon, setPokemon] = useState(null);
    const [id, setId] = useState(1)

        const id = 1
    
    useEffect(() => {

        fetch('https://pokeapi.co/api/v2/pokemon/${id}')
        .then((response) => response.json())
        .then((data) => {
            setPokemon(data)
        })
    }, [id]);


    const handleAnterior = () => {
        id > 1 && setId(id-1)
    }
  

    const handleSiguiente = () =>{
        setId(id + 1)
    }


    return (
        <div>
            <h2>{txt}</h2>
            <hr />

            {
                pokemon &&
                <>
                    <h2></h2>
                </>
            }
        </div>
  )
} */
