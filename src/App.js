import { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('')
  const [data, setData] = useState({})
  // const [loading, setLoading] = useState(true)
  const [er, setEr] = useState(false)
  const main_url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        await axios.get(main_url).then((response) => {
          setData(response.data)
        });
      }
      catch (err) {
        console.error(err)
        console.error(err.response.data)
        if (err.response.data.cod === 404) {
          setEr(true)
        }
      }
      setQuery('')
    }
  }

  return (
    <div className="bg-slate-900 bg-[url('../public/bgimage4.jpg')] bg-cover w-full h-full left-0 top-0 bg-center absolute bg-no-repeat">
    <div className="font-nova text-white w-full h-screen">
      <div className='searchBar pt-5 space-x-2 flex items-center justify-center mb-52'>
        <img width="48" height="48" src="https://img.icons8.com/doodle/48/search--v1.png" alt="search--v1"/>
        <input 
        className='rounded-full p-2 text-white bg-slate-500 outline-teal-500 outline-none' placeholder='Search places' 
        value={query}
        onChange={event => setQuery(event.target.value)}
        type='text'
        onKeyDown={searchLocation}/>
      </div>
      {data.cod === 404 && <div>
        <span className='text-6xl text-cyan-600'>Did you type that correctly?</span>
        <span className='text-3xl'>Make sure you are searching a valid place!</span>
      </div>}
      {!data.main && !er && <div className='flex justify-center items-center flex-col p-5 space-y-3'>
        <span className='text-6xl text-violet-700'>Weather App</span>
        <span>Search for any place above!</span>
      </div>}
      {data.main && <div className='-space-y-36'>
      <div className='placeandtemp flex flex-col justify-center items-center space-y-3 text-amber-900 font-bold'>
        <span className='text-4xl mt-50'>{data.name}</span>
        <span className='text-2xl'>{data.main.temp}&deg; F</span>
        <span className='text-md'>Feels like {data.main.feels_like}&deg; F</span>
        <span className='text-xl'>{data.weather[0].description}</span>
        <span className='text-lg'>Humidity: {data.main.humidity}</span>
        <div className='flex justify-between space-x-72'>
          <div className='flex justify-center items-center flex-col'>
          <p className=''>MIN</p>
          <p>{data.main.temp_min}&deg; F</p>
          </div>
          <div className='flex justify-center items-center flex-col'>
          <p className=''>MAX</p>
          <p>{data.main.temp_max}&deg; F</p>
          </div>
        </div>
      </div>
      <div className='float-right flex flex-col space-y-16 items-center justify-center max-w-screen'>
        <span className='-rotate-90 text-cyan-500'>Wind: {data.wind.speed}mph</span>
        <img className='-rotate-90 pr-2' width="48" height="48" src="https://img.icons8.com/fluency/48/wind.png" alt="wind"/>
      </div>
      </div>}

    </div>
    </div>
  );
}

export default App;
