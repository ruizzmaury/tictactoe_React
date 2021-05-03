import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

function Game() {
  
  const [mainHistory, setMainHistory] = useState([
    { squares: Array(9).fill(null) },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setxIsNext] = useState(true);



  const handleClick = (i) => {
    const historyState = mainHistory.slice(0, stepNumber + 1); // el estado actual del historial de tableros
    const current = historyState[historyState.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    

    setMainHistory(
      historyState.concat({
        squares: squares, // añado un nuevo array de squares a history
      })
    );
    setStepNumber(historyState.length);
    setxIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setxIsNext(step % 2 === 0);
  };

  const history = mainHistory;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares); // es current.squares, ya que history
  // guarda objetos y podría tener más atributos
  // aparte de squares

  const moves = history.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = "The winner is " + winner;
  } else {
    status = xIsNext ? "Next player: X" : "Next player: O";
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

