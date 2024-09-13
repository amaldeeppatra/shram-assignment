import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import axios from 'axios';
import '../styles/Game.css';
import { Link } from 'react-router-dom';

function Game() {
  const apiURL = import.meta.env.VITE_API_URL;
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [username, setUsername] = useState('');

  function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
  }

  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleGuess = () => {
    const userGuess = parseInt(guess);
    if (userGuess === targetNumber) {
      const newScore = score + 10;
      setScore(newScore);
      setGameOver(true);
      handleGameEnd(newScore);
    } else {
      setScore(score - 2);
    }
  };

  const handleGameEnd = async (newScore) => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await axios.post(`${apiURL}/users/update-score`, { userId, score: newScore });
      const { highScore: updatedHighScore } = response.data;
      console.log(response.data);

      if (newScore > localStorage.getItem('highScore')) {
        setCelebrate(true);
      } else {
        setCelebrate(false);
      }

      setHighScore(updatedHighScore);
      localStorage.setItem('highScore', updatedHighScore);
    } catch (error) {
      console.error('Failed to update score', error);
    }
  };

  function resetGame() {
    setTargetNumber(generateRandomNumber());
    setGuess('');
    setGameOver(false);
    setCelebrate(false);
  }

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('highScore');
    setUsername('');
    setScore(0);
    setHighScore(0);
    setGameOver(false);
    setCelebrate(false);
    window.location.href = '/';
  };

  return (
    <div className="game-container">
      <h1>Number Guessing Game</h1>
      <p>Welcome, {username}!</p>
      <Link onClick={handleLogout} className='logout'>Logout</Link>
      {celebrate && <Confetti className="confetti-container" />}
      <h3>Current Score: {score}</h3>
      <h3>High Score: {highScore}</h3>
      {!gameOver ? (
        <>
          <p>Guess the number (between 1 and 10):</p>
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button onClick={handleGuess}>Guess</button>
        </>
      ) : (
        <>
          <p>Congratulations! You guessed the number.</p>
          <button onClick={resetGame}>Play Again</button>
        </>
      )}
    </div>
  );
}

export default Game;