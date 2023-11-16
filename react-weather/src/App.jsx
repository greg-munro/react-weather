import './App.css'
import Weather from './Components/Weather'
import Header from './Components/Header'
import Forecast from './Components/Forecast'

function App() {
  return (
    <>
      <div className='main-container'>
        <Header />
        <Weather />
        {/* <Forecast /> this is why you need to call at a top level, 
        so when clicked, search will make 2 calls, current and forecast and have the data 
        available at top level for various components */}
      </div>
    </>
  )
}

export default App
