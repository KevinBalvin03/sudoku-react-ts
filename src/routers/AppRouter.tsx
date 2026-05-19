import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useGame } from "../context/GameContext"

import HomePage from "../features/game/HomePage"
import BoardPage from "../features/game/BoardPage"
import ResultPage from "../features/game/ResultPage"


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { playerName } = useGame()
  if (!playerName) return <Navigate to="/" />
  return <>{children}</>
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/board" element={
          <ProtectedRoute>
            <BoardPage />
          </ProtectedRoute>
        } />

        <Route path="/result" element={
          <ProtectedRoute>
            <ResultPage />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}