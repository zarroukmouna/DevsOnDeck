import React, { useState } from 'react';
import './Home.css';

const HomePage = () => {


  return (
    <div className="homepage">
      <header className="homepage-header">
        <h2 className="title">Welcome to Devs On Deck</h2>

        <div className="search-bar">
          <input type="text" placeholder="Search for jobs or companies..." />
          <button>Search</button>
        </div>
      </header>

     
    </div>
  );
};

export default HomePage;

