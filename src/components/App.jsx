import { useState } from "react"
import uniqueRandom from "unique-random"
import Card from "./card"
import _ from "lodash";
import ScoreBoard from "./scoreboard";


function App() {
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

  function generateIds() {
    const random = uniqueRandom(1, 1010)
    const newIds = []
    for (let i = 0; i < numberOfPokemon; i++) {
      newIds.push(random())
    }
    setIds([...newIds])
  }

  function shuffle() {
    const newIds = _.shuffle(ids)
    if(newIds.slice(0, numberOfVisible).every(id => ids.includes(id))) {
      shuffle
    }
    setIds([...newIds])
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
    }
  }

  const cards = ids.slice(0, numberOfVisible).map(id => 
    <Card key={id} id={id} handleClick={handleCardClick}/>
    )

    function start() {
      generateIds()
      setConfigVisibile(false)
      setGameVisibile(true)
      setCurrentScore(0)
      setIsWin(false)
      setIsFirstRound(false)
    }

  return (
    <div>
      <h1>Memory cards</h1>
      {
        configVisibile && 
        <div>
        {
        IsFirstRound ? null :

        isWin ? <h1>Good Job!</h1> :
        <h1>You Lost.</h1>
        }
        <input type="number" value={numberOfVisible} min={3} max={Math.ceil(numberOfPokemon*0.6)} onChange={(e) => (setnumberOfVisible(e.target.value))} id="numOfVisible"/>
        <input type="number" value={numberOfPokemon} min={5} max={30} onChange={(e) => {
          setNumberOfPokemon(e.target.value)
          if (numberOfVisible > Math.floor(numberOfPokemon*0.6)) {
            setnumberOfVisible(numberOfVisible => numberOfVisible - 1)
          }
        }} id="numOfPokemon"/>
        {IsFirstRound ? null : <ScoreBoard currentScore={currentScore} highScore={highScore}/>}
        <button onClick={() => {
          start()
          }}>{IsFirstRound ? 'Start' : 'Try again'}</button>
        </div>
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

export default App
