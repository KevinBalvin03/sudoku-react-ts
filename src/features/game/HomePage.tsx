import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useGame } from "../../context/GameContext"

export default function HomePage() {
  const { setPlayerName, resetGame } = useGame()
  const [inputName, setInputName] = useState("")
  const navigate = useNavigate()

  function handleStart() {
    if (!inputName.trim()) return
    setPlayerName(inputName.trim())
    resetGame()
    navigate("/board")
  }

  return (
    <div>
      <h1>SudokuX React</h1>
      <p>Ingresa tu nombre para comenzar</p>

      <input
        type="text"
        placeholder="Tu nombre..."
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />

      <button onClick={handleStart}>Jugar</button>
    </div>
  )
}