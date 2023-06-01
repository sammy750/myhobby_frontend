import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditPlayer from './EditPlayer';

interface FootballPlayer {
  id: number;
  name: string;
  position: string;
  age: number;
}

const API_URL = 'http://localhost:8000/api/players';

const App: React.FC = () => {
  const [players, setPlayers] = useState<FootballPlayer[]>([]);
  const [editPlayerId, setEditPlayerId] = useState<number | null>(null);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(API_URL);
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const handleDeletePlayer = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPlayers();
    } catch (error) {
      console.error('Error deleting player:', error);
    }
  };

  const handleEditPlayer = (id: number) => {
    setEditPlayerId(id);
  };

  const handleCancelEdit = () => {
    setEditPlayerId(null);
  };

  const handleUpdatePlayer = () => {
    fetchPlayers();
    handleCancelEdit();
  };

  return (
    <div>
      <h1>Football Players</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} - {player.position} (Age: {player.age})
            <button onClick={() => handleDeletePlayer(player.id)}>Delete</button>
            <button onClick={() => handleEditPlayer(player.id)}>Edit</button>
          </li>
        ))}
      </ul>

      {editPlayerId && (
        <EditPlayer
          playerId={editPlayerId}
          onCancel={handleCancelEdit}
          onUpdate={handleUpdatePlayer}
        />
      )}
    </div>
  );
};

export default App;