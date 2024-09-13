
import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import Game from "./components/Game";
import Scoreboard from "./components/Scoreboard";
import { auth } from "../src/components/firebase";
import { signOut } from "firebase/auth";

const App = () => {
  const [user, setUser] = useState(null);

  // Persist user authentication state across sessions
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Function to log the user out
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="App">
      {user ? (
        <>
          <div
            className="nav"
            style={{
              background: "#2196f3",
              height: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              paddingRight: "20px",
            }}
          >
            {" "}
            <button onClick={handleLogout}>Logout</button>
          </div>

          <Game />
          <Scoreboard user={user} />
        </>
      ) : (
        <Auth setUser={setUser} />
      )}
    </div>
  );
};

export default App;
