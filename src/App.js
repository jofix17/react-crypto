import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './components/Coin';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&order=market_cap_desc&per_page=100&page=1&sparkline=false'

function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get(API_URL)
    .then((resp) => {
      setCoins(resp.data);
    })
    .catch(error => console.log(error));
  });

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a current currency</h1>
        <form>
          <input
            type="text"
            className="coin-input"
            placeholder='Search'
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            price={coin.current_price}
            volume={coin.total_volume}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        )
      })}
    </div>
  );
}

export default App;
