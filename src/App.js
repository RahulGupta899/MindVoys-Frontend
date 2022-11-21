import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HealthCheck from './components/HealthCheck';
import HomePage from './components/Homepage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/healthcheck' element={<HealthCheck/>}/>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
