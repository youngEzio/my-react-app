import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = ({ language }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch leaderboard based on the selected language
    if (language) {
      axios.get(`http://localhost:5000/api/leaderboard?language=${language}`)
        .then((response) => setLeaderboard(response.data))
        .catch((error) => console.error(error));
    }
  }, [language]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((user, index) => (
          <li key={user.username}>
            {index + 1}. {user.username} - Score: {user.proficiency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
