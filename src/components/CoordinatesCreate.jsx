import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './style/Categories.css';

function ApikeysCreate() {
  const [newNameCoordinates, setnewNameCoordinates] = useState('');
  const [newLon, setNewLon] = useState('');
  const [newLat, setNewLat] = useState('');
  const [newRadius, setNewRadius] = useState('');

  


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Przygotuj dane do wysłania na serwer
    const apiData = {
      name: newNameCoordinates,
      lat: newLat,
      lon: newLon,
      radius: newRadius,
    };

    try {
      const response = await fetch('https://15minadmin.1213213.xyz/gmaps/coordinates/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData), // Zamień dane na format JSON
      });

      if (response.ok) {
        // Wysłano z powodzeniem
        console.log('Pomyślnie utworzono klucz API.');
        // Możesz również zaktualizować stan lub zresetować pola formularza
        setnewNameCoordinates('');
        setNewLon('');
      } else {
        console.error('Błąd podczas tworzenia klucza API.');
      }
    } catch (error) {
      console.error('Błąd podczas komunikacji z serwerem', error);
    }
  };

  return (
    <div style={{ margin: '0 auto', width: '100%', height: '100%' }}>
      <p className="border" style={{ width: '100%', height: '97%' }}>
        <h3 style={{ textAlign: 'center', marginTop: 'auto' }}>New Coordinates</h3>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Name"
            multiline
            rows={1}
            variant="outlined"
            value={newNameCoordinates}
            onChange={(e) => setnewNameCoordinates(e.target.value)}
            className="pad"
            style={{ marginRight: '20px' }}
          />
          <TextField
            label="Lon"
            multiline
            rows={1}
            variant="outlined"
            value={newLon}
            onChange={(e) => setNewLon(e.target.value)}
            className="pad"
            style={{ marginRight: '20px' }}
          />
          <TextField
            label="Lat"
            multiline
            rows={1}
            variant="outlined"
            value={newLat}
            onChange={(e) => setNewLat(e.target.value)}
            className="pad"
            style={{ marginRight: '20px' }}
          />
          <TextField
            label="Radius"
            multiline
            rows={1}
            variant="outlined"
            value={newRadius}
            onChange={(e) => setNewRadius(e.target.value)}
            className="pad"
            style={{ marginRight: '20px' }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ display: 'block', margin: '25% auto 0', backgroundColor: 'darkblue' }}
          >
            Add New Coordinates
          </Button>
        </form>
      </p>
    </div>
  );
}

export default ApikeysCreate;