
import React, { useState, useEffect } from 'react';
import { db, auth } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Confetti from 'react-confetti';
import './Game.css';

const Game = () => {
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [highScore, setHighScore] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      fetchHighScore(auth.currentUser.uid);
    }
  }, []);

  // Function to generate random number between 1 and 100
  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Fetch high score from Firestore
  const fetchHighScore = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setHighScore(docSnap.data().highScore || 100); // Set default high score to 100
    }
  };

  // Save high score to Firestore
  const saveHighScore = async (userId, score) => {
    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, { highScore: score }, { merge: true });
  };

  // Function to handle user guess
  const handleGuess = () => {
    const numericGuess = parseInt(guess);
    if (isNaN(numericGuess)) {
      setMessage('Please enter a valid number!');
      return;
    }

    setAttempts(attempts + 1);

    if (numericGuess === targetNumber) {
      setMessage(`Correct! It took you ${attempts + 1} attempts.`);
      checkHighScore(attempts + 1);
      setShowConfetti(true);
    } else if (numericGuess < targetNumber) {
      setMessage('Too low! Try again.');
    } else {
      setMessage('Too high! Try again.');
    }
  };

  // Check if the current score is a new high score
  const checkHighScore = (newScore) => {
    if (highScore === null || newScore < highScore) {
      setHighScore(newScore);
      saveHighScore(auth.currentUser.uid, newScore);
      setShowConfetti(true);
      alert('New high score!');
    }
  };

  // Reset the game for a new round
  const handlePlayAgain = () => {
    setTargetNumber(generateRandomNumber());
    setAttempts(0);
    setGuess('');
    setMessage('');
    setShowConfetti(false);
  };

  return (
    <div className="game-container">
      {showConfetti && (
        <div className="confetti-container">
          <Confetti className="confetti" />
        </div>
      )}
      <h1>Number Guessing Game</h1>
      <p>Try to guess the number between 1 and 100!</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
      />
      <button onClick={handleGuess}>Submit Guess</button>

      <p className="message">{message}</p>

      <p>Attempts: {attempts}</p>
      {highScore !== null && <p>High Score (Fewest Attempts): {highScore}</p>}

      <button className="play-again-btn" onClick={handlePlayAgain}>
        Play Again
      </button>
    </div>
  );
};

export default Game;
