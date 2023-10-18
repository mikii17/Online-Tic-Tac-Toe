type isTicTacToeCompleteResult = {winner: "x", winLine: [number, number, number]} | {winner: "o", winLine: [number, number, number]}  | "Draw" | "Incomplete";

export function isTicTacToeComplete(board: string[]): isTicTacToeCompleteResult {
    // Define winning combinations
    const winCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
  
    // Check for a win
    for (const combo of winCombinations) {
      const [a, b, c] = combo;
      if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
        return {winner: board[a] as "x" | "o", winLine: combo as [number, number, number]};
      }
    }
  
    // Check for a draw
    if (!board.includes("")) {
      return "Draw";
    }
  
    // Game is still ongoing
    return "Incomplete";
  }
  