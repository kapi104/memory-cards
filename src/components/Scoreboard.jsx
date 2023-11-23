export default function ScoreBoard({currentScore, highScore}) {
return (
<div>
          <span>Current score: {currentScore}</span>
          <span>High score: {highScore}</span>
        </div>
        )
}