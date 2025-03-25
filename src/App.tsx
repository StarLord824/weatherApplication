import './App.css'
import HomeScreen from './components/Home/HomeScreen'
function App() {

  const link="https://www.iconfinder.com/icons/4102326/cloud_sun_sunny_weather_icon"
  return (
    <>
      <HomeScreen cityName="New York" temperature={70} weather="Sunny" logo={<img src={link} alt="Weather Logo" />} />
    </>
  )
}

export default App
