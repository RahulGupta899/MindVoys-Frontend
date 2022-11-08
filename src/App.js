import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Scorecard from './components/Scorecard';
import Transcriptions from './components/TranscriptionsPage';
import Homepage from './components/Homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        {/* <Route path='/transcriptions' element={<Transcriptions/>}/>
        <Route path='/scorecard' element={<Scorecard/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
