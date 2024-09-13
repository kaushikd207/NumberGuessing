
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

const Scoreboard = ({ user }) => {
  const [scores, setScores] = useState([]);
  console.log(user);
  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const scoresData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setScores(scoresData.sort((a, b) => b.highScore - a.highScore));
  };
  return (
    <div>
      <h2>Top Scores</h2>
      <ul>
        {scores.map((u) =>
          u.id === user.uid ? (
            <li key={u.id}>
              {user.email}: {u.highScore}
            </li>
          ) : (
            <li key={u.id}>
              {"Anonymous"}: {u.highScore}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Scoreboard;
