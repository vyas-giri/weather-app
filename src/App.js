import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('')
  const [data, setData] = useState({})
  // const [loading, setLoading] = useState(true)
  const [er, setEr] = useState(false)
  const main_url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        await axios.get(main_url).then((response) => {
          setData(response.data)
          setEr(false)
        });
      }
      catch (err) {
        console.error(err)
        console.error(err.response.data)
        if (err.response.data.cod === '404') {
          setEr(true)
        }
      }
      setQuery('')
    }
  }

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : 'system'
  );
  const element = document.documentElement
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const options = [
    {
      icon: "sunny",
      text: "light"
    },
    {
      icon: "moon",
      text: "dark"
    },
    {
      icon: "desktop-outline",
      text: "system"
    }
  ];
  function onWindowMatch () {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }

  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case 'dark':
        element.classList.add('dark')
        localStorage.setItem('theme', 'dark')
        break;
      case 'light':
        element.classList.remove("dark");
        localStorage.setItem("theme", "light")
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme])

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  return (
    <div className="bg-slate-900 bg-[url('../public/bgimage4.jpg')] dark:bg-[url('../public/bgimage5.jpg')] bg-cover w-full h-full left-0 top-0 bg-center absolute bg-no-repeat duration-100">
    <div className="font-nova w-full h-screen">
      <div className='sm:fixed absolute bottom-3 right-5 sm:bottom-auto sm:top-5 sm:right-10 duration-100 dark:bg-slate-700 bg-gray-100 rounded'>
        {
          options?.map(opt => (
            <button 
            key={opt.text}
            onClick={() => setTheme(opt.text)}
            className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${theme === opt.text && "text-sky-600"}`}>
              <ion-icon name={opt.icon}></ion-icon>
            </button>
          ))
        }
      </div>
      <div className='searchBar pt-5 space-x-2 flex items-center justify-center mb-52'>
        <img width="48" height="48" src="https://img.icons8.com/doodle/48/search--v1.png" alt="search--v1"/>
        <input 
        className='rounded-full p-2 text-white bg-slate-500 outline-teal-500 outline-none' placeholder='Search places' 
        value={query}
        onChange={event => setQuery(event.target.value)}
        type='text'
        onKeyDown={searchLocation}/>
      </div>
      {er && <div className='flex flex-col items-center justify-center space-y-3'>
        <span className='text-xl sm:text-5xl text-purple-700 dark:text-amber-500'>Did you type that correctly?</span>
        <span className='text-sm sm:text-2xl dark:text-white'>Make sure you are searching for a valid place!</span>
      </div>}
      {!data.main && !er && <div className='flex justify-center items-center flex-col p-5 space-y-3'>
        <span className='text-4xl sm:text-5xl text-violet-700 dark:text-cyan-600 duration-100'>Weather App</span>
        <span className='text-md dark:text-slate-300 duration-100'>Search for any place above!</span>
      </div>}
      {data.main && !er && <div className='-space-y-36'>
      <div className='placeandtemp flex flex-col justify-center items-center space-y-3 text-amber-900 dark:text-yellow-600 font-bold'>
        <span className='text-4xl mt-50'>{data.name}</span>
        <span className='text-2xl'>{data.main.temp}&deg; C</span>
        <span className='text-md'>Feels like {data.main.feels_like}&deg; C</span>
        <span className='text-xl'>{data.weather[0].description}</span>
        <span className='text-lg'>Humidity: {data.main.humidity}</span>
        <div className='flex justify-between space-x-5 sm:space-x-72'>
          <div className='flex justify-center items-center flex-col'>
          <p className=''>MIN</p>
          <p>{data.main.temp_min}&deg; C</p>
          </div>
          <div className='flex justify-center items-center flex-col'>
          <p className=''>MAX</p>
          <p>{data.main.temp_max}&deg; C</p>
          </div>
        </div>
      </div>
      <div className='float-right flex flex-col justify-end items-end space-y-16 w-auto'>
        <span className='-rotate-90 text-cyan-500 dark:text-green-400 float-right -mr-7 sm:-mr-10'>Wind: {data.wind.speed} mph</span>
        <img className='-rotate-90 sm:pr-2 float-right mr-1' width="48" height="48" src="https://img.icons8.com/fluency/48/wind.png" alt="wind"/>
      </div>
      </div>}

    </div>
    </div>
  );
}

export default App;
