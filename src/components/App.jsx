import { useState } from "react"
import uniqueRandom from "unique-random"
import Card from "./card"
import _ from "lodash";
import { shuffle } from "lodash";


function App() {
  const [ids, setIds] = useState([])
  const [numberOfPokemon, setNumberOfPokemon] = useState(5);
  const [numberOfVisible, setnumberOfVisible] = useState(3);
  const [configVisibile, setConfigVisibile] = useState(true);

  function generateIds() {
    const random = uniqueRandom(1, 1010)
    const newIds = []
    for (let i = 0; i < numberOfPokemon; i++) {
      newIds.push(random())
    }
    setIds([...newIds])
  }

  const cards = ids.slice(0, numberOfVisible).map(id => 
    <Card key={id} id={id}/>
    )

    function shuffle() {
      setIds([..._.shuffle(ids)])
    }

  return (
    <div>
      <h1>Memory cards</h1>
      {
        configVisibile && 
        <div>
        <input type="number" value={numberOfPokemon} min={5} max={20} onChange={(e) => (setNumberOfPokemon(e.target.value))} id="numOfPokemon"/>
        <button onClick={() => {
          generateIds()
          setConfigVisibile(false)
          }}>set</button>
        </div>
      }
      
      {cards}

      <button onClick={shuffle}>shuffle</button>
    </div>
  )
}

export default App
