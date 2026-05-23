// Verifica si un número es válido en esa posición del tablero
function isValid(board: (number | null)[][], row: number, col: number, num: number): boolean {
  for (let c = 0; c < 6; c++) {
    if (board[row][c] === num) return false
  }
  for (let r = 0; r < 6; r++) {
    if (board[r][col] === num) return false
  }
  // Revisar bloque 2x3
  const blockRow = Math.floor(row / 2) * 2
  const blockCol = Math.floor(col / 3) * 3
  for (let r = blockRow; r < blockRow + 2; r++) {
    for (let c = blockCol; c < blockCol + 3; c++) {
      if (board[r][c] === num) return false
    }
  }
  return true
}

function generateSolvedBoard(): (number | null)[][] {
  const board: (number | null)[][] = Array.from({ length: 6 }, () => Array(6).fill(null))

  function fill(row: number, col: number): boolean {
    if (row === 6) return true

    const nextCol = (col + 1) % 6
    const nextRow = nextCol === 0 ? row + 1 : row

    const numbers = [1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5)

    for (const num of numbers) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num
        if (fill(nextRow, nextCol)) return true
        board[row][col] = null
      }
    }
    return false
  }

  fill(0, 0)
  return board
}

// Quita algunos números del tablero para crear el puzzle
export function generatePuzzle(clues: number = 18): (number | null)[][] {
  const solved = generateSolvedBoard()

  // Copiamos el tablero completo
  const puzzle = solved.map(row => [...row])

  const totalCells = 36
  const toRemove = totalCells - clues

  const positions = Array.from({ length: totalCells }, (_, i) => i)
    .sort(() => Math.random() - 0.5)
    .slice(0, toRemove)

  for (const pos of positions) {
    const row = Math.floor(pos / 6)
    const col = pos % 6
    puzzle[row][col] = null
  }

  return puzzle
}