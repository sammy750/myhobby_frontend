import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreatePlayer from './CreatePlayer';
import EditPlayer from './EditPlayer';
import classes from './playerList.module.css';

type Player = {
  _id: Key | null | undefined;
  id: number;
  name: string;
  position: string;
  age: number;
  team: string;
  // Add any other attributes you have for each player
};

const PlayerList: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [editPlayerId, setEditPlayerId] = useState<number | null>(null);
  const [playerData, setPlayerData] = useState('Loading...');
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    // Fetch the list of players from your football API
    const Data = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/players');
        setPlayers(response.data);
        setFilteredPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    Data();
  }, []);



  useEffect(() => {
    // Filter the list of players based on the search term
    const filtered = players.filter(
      (player) =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.team.toLowerCase().includes(searchTerm.toLowerCase())
      // Add additional filtering based on other attributes if needed
    );
    setFilteredPlayers(filtered);
  }, [searchTerm, players]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetch('/api/w/api.php?action=query&format=json&prop=extracts&exintro=&titles=Lionel_Messi')
      .then(response => response.json())
      .then(data => {
        const pages = data.query.pages;
        const pageId = Object.keys(pages)[0];
        const extract = pages[pageId].extract;

        // Extracting height information from the Wikipedia page
        const heightRegex = /height:\s(\d+\.\d+)\sm/;
        const heightMatch = extract.match("Number");
        const height = heightMatch ? heightMatch[1] : 'N/A';

        const parser = new DOMParser();
        setPlayerData(extract);
        const doc = parser.parseFromString(extract, 'text/html');
        console.log(doc ,"popop")
      })
      .catch(error => {
        console.error('Error fetching data from Wikipedia:', error);
      });
  }, []);

  const handleDeletePlayer = async (id: number) => {

    console.log(id)
    try {
      await axios.delete(`http://localhost:8000/api/players/${id}`);
      //       Data();
      console.log("Deleted");
      window.location.reload();
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

    handleCancelEdit();
  };



  return (
    <div className={classes.root}>
      <div className={classes.leftContainer}>
        
        <input className={classes.search} type="text" placeholder="Search Player" value={searchTerm} onChange={handleSearch} />

        <ul>
          {filteredPlayers.map((player) => (
            <div key={player._id}>
              <h2>{player.name}</h2> 
              <p>Position: {player.position} </p>
              <p>Team: {player.team} </p>
              <p>Age:{player.age}</p>
            
              {/* {playerData} */}
              <button className={classes.delete} onClick={() => handleDeletePlayer(player._id)}>Delete</button>
              <button className={classes.edit} onClick={() => handleEditPlayer(player._id)}>Edit</button>
              
              {/* Display additional information from the football API or website */}
            </div>
          ))}
        </ul>

        {editPlayerId && (
          <EditPlayer
            playerId={editPlayerId}
          />
        )}
      </div>
      <div className={classes.rightContainer}>
        <CreatePlayer />
      </div>
    </div >
  );
};

export default PlayerList;