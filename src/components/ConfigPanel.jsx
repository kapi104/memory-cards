import ScoreBoard from "./Scoreboard"
import '../css/config-panel.css'

export default function ConfigPanel({IsFirstRound, isWin, numberOfVisible, numberOfPokemon, setNumberOfPokemon, setnumberOfVisible, start, currentScore, highScore}) {
  return (
    <div className="config-panel">
        {
        IsFirstRound ? null :

        isWin ? <h1>Good Job!</h1> :
        <h1>You Lost.</h1>
        }
        <span>How many pokemon do you want in your game?</span>
        <input type="number" value={numberOfPokemon} min={5} max={30} onChange={(e) => {
          setNumberOfPokemon(e.target.value)
        }}
        id="numOfPokemon"/>
        <span>How many of them do you want to see at the time?</span>
        <input type="number" value={numberOfVisible} min={3} max={Math.ceil(numberOfPokemon*0.6)} onChange={(e) => (setnumberOfVisible(e.target.value))} id="numOfVisible"/>
        {IsFirstRound ? null : <ScoreBoard currentScore={currentScore} highScore={highScore}/>}
        <button onClick={() => {
          start()
          }}>{IsFirstRound ? 'Start' : 'Try again'}</button>
        </div>
  )
}