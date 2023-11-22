import { useEffect, useState } from "react"
import axios from "axios"
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

export default function Card({id, handleClick}) {
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        setPokemon(response.data)
      })
  }, [id])

  if (pokemon !== null) {
    return (
    <div onClick={() => handleClick(id)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
      <span>{pokemon.name}</span>
    </div>
  )
  } else {
    return (
      <Icon path={mdiLoading} size={1} />
    )
  }
  
}