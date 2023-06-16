// https://api.openweathermap.org/data/2.5/weather?q=BEGUSARAI &appid=7040c3e104fbf07e16214cffb2179173

import React, { useEffect, useState } from 'react'
import "./style.css"
import  Weathercard from "./weathercard.js"

const Temp = () => {

    const [searchValue,setSearchValue]=useState("Begusarai")
    const [tempInfo,setTempInfo]=useState({})
    const getWeatherInfo=async()=>{
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}
             &appid=7040c3e104fbf07e16214cffb2179173&units=metric `
            const res= await fetch(url);
            const data=await res.json();
           
            const{temp,humidity,pressure}=data.main;
            const {main:weathermood}=data.weather[0];
            const {name}=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys;

            const myNewWeatherInfo ={
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                country,
                speed,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);



        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        getWeatherInfo();
    });

  return (
    <>
    <div className="wrap">
        <div className="search">
            <input type="search"
            placeholder='search..'
            autoFocus
            id='search'
            className='searchTerm'
            value={searchValue}
            onChange={(e)=>setSearchValue(e.target.value)}
            />

            <button className="searchButton" type='button' 
            onClick={getWeatherInfo}>
                search
            </button>
        </div>
    </div>

{/* Temp Card */}

<Weathercard  tempInfo={tempInfo}/>
    


    </>
  )
}

export default Temp