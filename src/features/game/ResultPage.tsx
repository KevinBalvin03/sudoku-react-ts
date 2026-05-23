import { useNavigate } from "react-router-dom"
import { useGame } from "../../context/GameContext"
import "./ResultPage.css"

export default function ResultPage() {
  const { playerName, seconds, resetGame } = useGame()
  const navigate = useNavigate()

  function formatTime(s: number) {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  function handlePlayAgain() {
    resetGame()
    navigate("/")
  }

  return (
    <div className="result-contenedor">
      <h1>¡Felicidades, {playerName}!</h1>
      <p>Completaste el Sudoku en {formatTime(seconds)}</p>
      <button onClick={handlePlayAgain}>Jugar de nuevo</button>
    </div>
  )
}