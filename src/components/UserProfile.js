import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // Fetch user profile
    axios.get('http://localhost:5000/api/users/profile', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => setProfile(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {profile.username}</p>
      <p>Language: {profile.language}</p>
      <p>Proficiency: {profile.proficiency}</p>
    </div>
  );
};

export default UserProfile;
