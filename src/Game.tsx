import React, { useEffect, useState } from 'react';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': '#282c34'
}

const boardStyle: (winner: boolean) => React.CSSProperties = (winner) => ({
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid',
  pointerEvents: winner ? 'none' : 'all',
})

const containerStyle: React.CSSProperties = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

interface SquareContent {
  content: string;
}

interface SquarePosition {
  x: number;
  y: number;
}

interface SquareProps {
  playing: string;
  onClick: (position: SquarePosition) => void;
  position: SquarePosition;
  value: string;
}

function Square({ playing, onClick, position, value }: SquareProps) {
  const [content, setContent] = useState(value);

  useEffect(() => {
    setContent(value)
  }, [value])

  const handleClick = () => {
    if (content === '') {
      setContent(playing)
      !!onClick && onClick(position);
    }
  }

  return (
    <div
      className="square"
      style={squareStyle}
      onClick={handleClick}
    >
      {content}
    </div>
  );
}

function Board() {
  const [winner, setWinner] = useState('-');
  const [player, setPlayer] = useState('X');
  const [rows, setRows] = useState<SquareContent[][]>([
    [{ content: '' }, { content: '' }, { content: '' }],
    [{ content: '' }, { content: '' }, { content: '' }],
    [{ content: '' }, { content: '' }, { content: '' }],
  ]);

  useEffect(() => {
    if (winner !== '-') {
      alert(`Player ${winner} WINS!`)
    }
  }, [winner])

  const switchPlayer = () => {
    if (player === 'X') {
      setPlayer('O');
    } else {
      setPlayer('X');
    }
  }

  const onSquareClick = (position: SquarePosition) => {
    rows[position.x][position.y] = { content: player };
    switchPlayer();
    hasWon(player);
  }

  const hasMadeRow = (player: string) => {
    let row1 = rows[0][0].content === player && rows[0][1].content === player && rows[0][2].content === player
    let row2 = rows[1][0].content === player && rows[1][1].content === player && rows[1][2].content === player
    let row3 = rows[2][0].content === player && rows[2][1].content === player && rows[2][2].content === player
    return (row1 || row2 || row3);
  }

  const hasMadeColumn = (player: string) => {
    let col1 = rows[0][0].content === player && rows[1][0].content === player && rows[2][0].content === player
    let col2 = rows[0][1].content === player && rows[1][1].content === player && rows[2][1].content === player
    let col3 = rows[0][2].content === player && rows[1][2].content === player && rows[2][2].content === player
    return (col1 || col2 || col3);
  }

  const hasMadeDiagonal = (player: string) => {
    let leftDiagonal = rows[0][0].content === player && rows[1][1].content === player && rows[2][2].content === player;
    let rightDiagonal = rows[0][2].content === player && rows[1][1].content === player && rows[2][0].content === player;
    return (leftDiagonal || rightDiagonal)
  }

  const hasWon = (playerToken: string) => {
    if (hasMadeRow(player) || hasMadeColumn(player) || hasMadeDiagonal(player)) {
      setWinner(player);
      setPlayer('-')
    }
  }

  const handleReset = () => {
    setPlayer('X');
    setWinner('-')
    setRows([
      [{ content: '' }, { content: '' }, { content: '' }],
      [{ content: '' }, { content: '' }, { content: '' }],
      [{ content: '' }, { content: '' }, { content: '' }],
    ])
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{player}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner}</span></div>
      <button style={buttonStyle} onClick={handleReset}>Reset</button>
      <div style={boardStyle(winner !== '-')}>
        {rows.map((row, xIndex) => (
          <div className="board-row" style={rowStyle} key={`x-${xIndex}`}>
            {row.map((square, yIndex) => (
              <Square
                key={`y-${yIndex}`}
                playing={player}
                value={square.content}
                onClick={onSquareClick}
                position={{ x: xIndex, y: yIndex }} />
            ))}
          </div>
        )
        )}
      </div>
    </div>
  );
}

export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}