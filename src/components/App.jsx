import { useState } from "react"
import uniqueRandom from "unique-random"
import Card from "./Card"
import _ from "lodash";
import ScoreBoard from "./Scoreboard";
import ConfigPanel from "./ConfigPanel";


export default function App() {
  const [ids, setIds] = useState([])
  const [numberOfPokemon, setNumberOfPokemon] = useState(5);
  const [numberOfVisible, setnumberOfVisible] = useState(3);
  const [configVisibile, setConfigVisibile] = useState(true);
  const [gameVisibile, setGameVisibile] = useState(false);
  const [clickedIds, setClickedIds] = useState([])
  const [currentScore, setCurrentScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [isWin, setIsWin] = useState(false)
  const [IsFirstRound, setIsFirstRound] = useState(true)
  const [currentClass, setCurrentClass] = useState('back')

  function generateIds() {
    const random = uniqueRandom(1, 1010)
    const newIds = []
    for (let i = 0; i < numberOfPokemon; i++) {
      newIds.push(random())
    }
    setIds([...newIds])
  }

  function checker (arr, target) {target.every(v => arr.includes(v))}

  function shuffle() {
    const newIds = _.shuffle(ids)
    if(checker(clickedIds, newIds)) {
      shuffle()
    } else {
      setIds([...newIds])
    }
  }

  function checkHightScore() {
    if (highScore <= currentScore) {
      setHighScore(highScore => highScore + 1)
    }
  }

  function checkWin() {
    if (currentScore+1 === numberOfPokemon) {
      setIsWin(true)
      setGameVisibile(false)
      setConfigVisibile(true)
    }
  }

  function handleCardClick(id) {
    if (clickedIds.includes(id)) {
      setConfigVisibile(true)
      setGameVisibile(false)
      setClickedIds([])
    } else {
      shuffle()
      setClickedIds([...clickedIds, id])
      setCurrentScore(currentScore => currentScore+1)
      checkHightScore()
      checkWin()
      setCurrentClass('back')
    }
  }

  const cards = ids.slice(0, numberOfVisible).map(id => 
    <Card key={id} id={id} handleClick={handleCardClick} currentClass={currentClass} setCurrentClass={setCurrentClass}/>
    )

    function start() {
      generateIds()
      setConfigVisibile(false)
      setGameVisibile(true)
      setCurrentScore(0)
      setIsWin(false)
      setIsFirstRound(false)
      setCurrentClass('back')
    }

  return (
    <div>
      <h1>Memory cards</h1>
      {
        configVisibile && 
        <ConfigPanel 
        IsFirstRound={IsFirstRound}
        isWin={isWin}
        numberOfVisible={numberOfVisible}
        numberOfPokemon={numberOfPokemon}
        setNumberOfPokemon={setNumberOfPokemon}
        setnumberOfVisible={setnumberOfVisible}
        start={start}
        currentScore={currentScore}
        highScore={highScore}/>
      }
      
      {
      gameVisibile && cards
      }
      {
      gameVisibile && <ScoreBoard currentScore={currentScore} highScore={highScore}/>
      }
    </div>
  )
}


