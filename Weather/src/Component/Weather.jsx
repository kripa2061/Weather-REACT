import React, { useEffect, useState ,useRef} from 'react'
import humidity from '../assets/humidity.png'
import search from '../assets/search.jpg'
import wind from '../assets/wind.png'

const Weather = () => {
    const inputref=useRef()
    const [weather, setWeather] = useState(false) 

    // const Allicon = {
    //     "01d": "https://openweathermap.org/img/wn/01d@2x.png",
    //     "02d": "https://openweathermap.org/img/wn/02d@2x.png",
    //     "03d": "https://openweathermap.org/img/wn/03d@2x.png",
    //     "04d": "https://openweathermap.org/img/wn/04d@2x.png",
    //     "09d": "https://openweathermap.org/img/wn/09d@2x.png",
    //     "10d": "https://openweathermap.org/img/wn/10d@2x.png",
    //     "11d": "https://openweathermap.org/img/wn/11d@2x.png",
    //     "13d": "https://openweathermap.org/img/wn/13d@2x.png",
    //     "01n": "https://openweathermap.org/img/wn/01n@2x.png",
    //     "02n": "https://openweathermap.org/img/wn/02n@2x.png",
    //     "03n": "https://openweathermap.org/img/wn/03n@2x.png",
    //     "04n": "https://openweathermap.org/img/wn/04n@2x.png",
    //     "09n": "https://openweathermap.org/img/wn/09n@2x.png",
    //     "10n": "https://openweathermap.org/img/wn/10n@2x.png",
    //     "11n": "https://openweathermap.org/img/wn/11n@2x.png",
    //     "13n": "https://openweathermap.org/img/wn/13n@2x.png"
    // }

    const handleClick = async (city) => {
        if(city===""){
            alert("enter city name")
            return
        }
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4ecf88f33ac95968ee5dd3ad18172a1d&units=metric`
        )
        const data = await res.json()
        console.log(data)
        console.log("Current icon code:", data.weather[0].icon); 

        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

        setWeather({
            temperature: Math.floor(data.main.temp),
            humidity: data.main.humidity,
            windSpeed: Math.floor(data.wind.speed * 3.6),
            location: data.name,
            condition: icon
        })
    }

    useEffect(() => {
        handleClick("kathmandu")
    }, []);
    
    return (
        <div className='flex justify-center items-center h-screen bg-white'>
            <div className='w-full max-w-md p-6  bg-gradient-to-br from-blue-100 to-sky-300  rounded-xl shadow-lg space-y-6'>
                <div className='flex items-center space-x-4'>
                    <input 
                        ref={inputref} 
                        type='text' 
                        className='flex-1 p-2 border border-gray-400 rounded-2xl text-black'
                        placeholder='Enter city'
                    />
                    <img 
                        onClick={()=>handleClick(inputref.current.value)} 
                        src={search}  
                        alt='search'
                        className='h-9 w-10 cursor-pointer rounded-3xl'
                    />
                </div>

                <div className='text-center space-y-2'>
                   
                            <img src={weather.condition} alt="weather-icon" className='mx-auto' />
                            <p className='text-3xl font-semibold'>{weather.temperature}°C</p>
                            <p className='text-xl'>{weather.location}</p>
                       
                </div>

                <div className='flex justify-between my-5 p-5'>
                    <div className='flex flex-col items-center'>
                        <img className="h-20 w-20" src={humidity} alt="humidity" />
                        <p className='text-xl'>{weather.humidity} %</p>
                        <span className='text-sm'>Humidity</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img className="h-20 w-20 " src={wind} alt="humidity" />
                        <p className='text-xl'>{weather.windSpeed} km/h</p>
                        <span className='text-sm'>Wind speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather
