import { useEffect, useState } from "react"
import axios from "axios"
import '../css/card.css'

export default function Card({id, handleClick, currentClass, setCurrentClass}) {
  const [pokemon, setPokemon] = useState(null)
  setTimeout(() => {
    setCurrentClass('front')
  }, 500);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        setPokemon(response.data)
      })
  }, [id])

    return (
    <div onClick={() => handleClick(id)} className={`card ${currentClass === 'back' && 'card-cover'}`}>
      <img src={pokemon !== null ? pokemon.sprites.front_default : '#'} alt={pokemon !== null ? pokemon.name : ''}/>
      <span>{pokemon !== null ? pokemon.name : ''}</span>
    </div>
  )

}