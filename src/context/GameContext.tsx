import { createContext, useContext, useState, useEffect, useRef } from "react"

type Cell = {
  value: number | null   
  isPreset: boolean     
  isError: boolean      
}

type GameContextType = {
  board: Cell[][]
  playerName: string
  seconds: number
  gameOver: boolean
  setPlayerName: (name: string) => void
  updateCell: (row: number, col: number, value: number | null) => void
  resetGame: () => void
}

const INITIAL_PUZZLE: (number | null)[][] = [
  [1, null, null, 2, null, null],
  [null, null, 2, null, null, 1],
  [null, 1, null, null, 3, null],
  [null, 3, null, null, 1, null],
  [3, null, null, 1, null, null],
  [null, null, 1, null, null, 3],
]

function buildBoard(puzzle: (number | null)[][]): Cell[][] {
  return puzzle.map(row =>
    row.map(value => ({
      value,
      isPreset: value !== null,
      isError: false,
    }))
  )
}


function hasConflict(board: Cell[][], row: number, col: number, value: number): boolean {

  for (let c = 0; c < 6; c++) {
    if (c !== col && board[row][c].value === value) return true
  }

  for (let r = 0; r < 6; r++) {
    if (r !== row && board[r][col].value === value) return true
  }

  const blockRow = Math.floor(row / 2) * 2
  const blockCol = Math.floor(col / 3) * 3
  for (let r = blockRow; r < blockRow + 2; r++) {
    for (let c = blockCol; c < blockCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c].value === value) return true
    }
  }
  return false
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [board, setBoard] = useState<Cell[][]>(buildBoard(INITIAL_PUZZLE))
  const [playerName, setPlayerName] = useState("")
  const [seconds, setSeconds] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (gameOver) return
    timerRef.current = setInterval(() => {
      setSeconds(s => s + 1)
    }, 1000)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [gameOver])

  function updateCell(row: number, col: number, value: number | null) {
    
    if (value !== null && (value < 1 || value > 6)) return

    setBoard(prev => {
      const newBoard = prev.map(r => r.map(cell => ({ ...cell })))
      newBoard[row][col].value = value
      newBoard[row][col].isError = value !== null && hasConflict(newBoard, row, col, value)

      const allFilled = newBoard.every(r => r.every(cell => cell.value !== null))
      const noErrors = newBoard.every(r => r.every(cell => !cell.isError))
      if (allFilled && noErrors) setGameOver(true)

      return newBoard
    })
  }

  function resetGame() {
    setBoard(buildBoard(INITIAL_PUZZLE))
    setSeconds(0)
    setGameOver(false)
  }

  return (
    <GameContext.Provider value={{ board, playerName, seconds, gameOver, setPlayerName, updateCell, resetGame }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  return useContext(GameContext)!
}