import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGame } from "../../context/GameContext"
import "./BoardPage.css"

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
        <div className="board-contenedor">
            <div className="board-header">
                <h2>Concursante, {playerName}</h2>
                <p>Tiempo: {formatTime(seconds)}</p>
            </div>

            <div className="board-grid">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="board-fila">
                        {row.map((cell, colIndex) => (
                            <input
                                key={colIndex}
                                className={`board-celda ${cell.isPreset ? "celda-preset" : ""} ${cell.isError ? "celda-error" : ""}`}
                                type="number"
                                min={1}
                                max={6}
                                value={cell.value ?? ""}
                                disabled={cell.isPreset}
                                onChange={(e) => handleInput(rowIndex, colIndex, e.target.value)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className="board-botones">
                <button onClick={() => { resetGame(); navigate("/") }}>
                    Volver al inicio
                </button>
                <button onClick={resetGame}>Reiniciar</button>
            </div>
        </div>
    )
}