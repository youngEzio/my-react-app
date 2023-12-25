import React, { useState } from 'react';
import axios from 'axios';

const Settings = () => {
  const [newLanguage, setNewLanguage] = useState('');

  const handleLanguageChange = () => {
    // Update user language in the backend
    axios.post('http://localhost:5000/api/users/change-language', { language: newLanguage }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => alert('Language changed successfully'))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Settings</h2>
      <p>Change Language:</p>
      <input type="text" value={newLanguage} onChange={(e) => setNewLanguage(e.target.value)} />
      <button onClick={handleLanguageChange}>Change</button>
    </div>
  );
};

export default Settings;
