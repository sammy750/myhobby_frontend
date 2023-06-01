import React from 'react';
import { render, screen } from '@testing-library/react';
import PlayerList from '../components/PlayersList';

describe('PlayerList', () => {
  test('renders player list correctly', () => {
    // Mock the players data
    const players = [
      {
      
        name: 'Lionel Messi',
        position: 'Forward',
        age: 25,
        team: 'Team A',
      },
      {
   
        name: 'Player 2',
        position: 'Midfielder',
        age: 28,
        team: 'Team B',
      },
    ];

    // Render the component with mocked players data
    render(<PlayerList players={players} />);

    // Assert that the player list is rendered correctly
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
    expect(screen.getByText('Forward')).toBeInTheDocument();
    expect(screen.getByText('Midfielder')).toBeInTheDocument();
    expect(screen.getByText('Team A')).toBeInTheDocument();
    expect(screen.getByText('Team B')).toBeInTheDocument();
  });
});