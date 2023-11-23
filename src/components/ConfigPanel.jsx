import ScoreBoard from "./Scoreboard"

export default function ConfigPanel({IsFirstRound, isWin, numberOfVisible, numberOfPokemon, setNumberOfPokemon, setnumberOfVisible, start, currentScore, highScore}) {
  return (
    <div className="config-panel">
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
  )
}