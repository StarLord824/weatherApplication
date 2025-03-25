import './App.css'
import Sidebar from './components/SideBar'
import HomeScreen from './components/Home/HomeScreen'
import SettingsScreen from './components/SettingsScreen'
function App() {

  const link="https://www.iconfinder.com/icons/4102326/cloud_sun_sunny_weather_icon"
  return (
    <>
      <Sidebar />
      <HomeScreen cityName="New York" temperature={70} weather="Sunny" logo={<img src={link} alt="Weather Logo" />} />
      <SettingsScreen />
    </>
  )
}

export default App
