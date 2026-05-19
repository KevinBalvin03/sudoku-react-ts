import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGame } from "../../context/GameContext"

export default function BoardPage() {
    const { board, playerName, seconds, gameOver, updateCell, resetGame } = useGame()
    const navigate = useNavigate()

    useEffect(() => {
        if (gameOver) navigate("/result")
    }, [gameOver])

    function formatTime(s: number) {
        const m = Math.floor(s / 60)
        const sec = s % 60
        return `${m}:${sec.toString().padStart(2, "0")}`
    }

    function handleInput(row: number, col: number, raw: string) {
        const value = raw === "" ? null : parseInt(raw)
        updateCell(row, col, value)
    }

    return (
        <div>
            <h2>Hola, {playerName}</h2>
            <p>Tiempo: {formatTime(seconds)}</p>

            <div>
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: "flex" }}>
                        {row.map((cell, colIndex) => (
                            <input
                                key={colIndex}
                                type="number"
                                min={1}
                                max={6}
                                value={cell.value ?? ""}
                                disabled={cell.isPreset}
                                onChange={(e) => handleInput(rowIndex, colIndex, e.target.value)}
                                style={{
                                    width: 40,
                                    height: 40,
                                    textAlign: "center",
                                    backgroundColor: cell.isPreset ? "#ddd" : cell.isError ? "#ffcccc" : "white",
                                    border: "1px solid #999",
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <button onClick={() => { resetGame(); navigate("/") }}>
                Volver al inicio
            </button>
            <button onClick={resetGame}>Reiniciar</button>
        </div>
    )
}