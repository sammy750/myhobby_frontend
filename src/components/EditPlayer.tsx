import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
  playerId: number;

}

const API_URL = 'http://localhost:8000/api/players';

const EditPlayer: React.FC<Props> = ({ playerId }) => {
  const [editPlayerName, setEditPlayerName] = useState('');
  const [editPlayerPosition, setEditPlayerPosition] = useState('');
  const [editPlayerAge, setEditPlayerAge] = useState<number | null>(null);
  const [editPlayerTeam, setEditPlayerTeam] = useState('')
  useEffect(() => {
    fetchPlayerData();
  }, []);

  const fetchPlayerData = async () => {
    try {
      const response = await axios.get(`${API_URL}/${playerId}`);
      const player = response.data;
      setEditPlayerName(player.name);
      setEditPlayerPosition(player.position);
      setEditPlayerAge(player.age);
      setEditPlayerTeam(player.team);
    } catch (error) {
      console.error('Error fetching player data:', error);
    }
  };

  const handleUpdatePlayer = async () => {
    try {
      if (editPlayerName && editPlayerPosition && editPlayerAge) {
        await axios.put(`${API_URL}/${playerId}`, {
          name: editPlayerName,
          position: editPlayerPosition,
          age: editPlayerAge,
          team: editPlayerTeam
        });
        window.location.reload();

      }
    } catch (error) {
      console.error('Error updating player:', error);
    }
  };

  return (
    <div>
      <h2>Edit Player</h2>
      <input
        type="text"
        value={editPlayerName}
        onChange={(e) => setEditPlayerName(e.target.value)}
      />
      <input
        type="text"
        value={editPlayerPosition}
        onChange={(e) => setEditPlayerPosition(e.target.value)}
      />
      <input
        type="number"
        value={editPlayerAge || ''}
        onChange={(e) => setEditPlayerAge(parseInt(e.target.value))}
      />
      <input
        type="text"
        value={editPlayerTeam || ''}
        onChange={(e) => setEditPlayerTeam(e.target.value)}
      />
      <button onClick={handleUpdatePlayer}>Save</button>

    </div>
  );
};

export default EditPlayer;