import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ScoreBoard.css';

const ScoreBoard = () => {
  const apiURL = import.meta.env.VITE_API_URL;
  const [highScore, setHighScore] = useState(0);
  const [pastScores, setPastScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      try {
        // GET: fetches all past scores of user
        const response = await axios.get(`${apiURL}/scores/${userId}`);
        setHighScore(response.data.highScore);
        setPastScores(response.data.pastScores);
      } catch (error) {
        console.error('Failed to fetch user scores', error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="score-board">
      <h2>Your High Score: {highScore}</h2>
      <h3>Past Scores:</h3>
      <div className="scrollable-scores">
        
        {pastScores.length > 0 ? (
          <ul>
            {pastScores.map((score, index) => (
              <li key={index}>Game {index + 1}: {score}</li>
            ))}
          </ul>
        ) : (
          <p>No past scores available.</p>
        )}

      </div>
    </div>
  );
};

export default ScoreBoard;
