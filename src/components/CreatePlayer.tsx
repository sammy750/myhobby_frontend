import React, { useState } from 'react';
import axios from "axios";
import classes from './createPlayer.module.css';


const CreatePlayer: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Create a new player object with the entered details
    axios.post(`http://localhost:8000/api/players`, { name, age, team, position })
      .then((res) => {
        window.location.reload();

      })
    // Clear the form inputs
    setName('');
    setAge('');
    setTeam('');
    setPosition('');
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <h3>Create Players</h3>
      <label>
        <span> Name: </span>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <br />
      <label>
        <span>Age:</span>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
      </label>
      <br />
      <label>
        <span>Team:</span>
        <input type="text" value={team} onChange={(e) => setTeam(e.target.value)} required />
      </label>
      <br />
      <label>
        <span>Position:</span>
        <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
      </label>
      <br />
      <button className={classes.button} type="submit">Create Player</button>
    </form>
  );
};

export default CreatePlayer;