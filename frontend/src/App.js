import Header from './components/layout/header.js';
import Footer from './components/layout/footer.js';
import Home from './components/layout/home.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';



function App() {
  return (
    <Router>
      <div className="App">
      <Header/>
        <Routes>    
             <Route path = "/" element={<Home/>}/>
        </Routes>
      <Footer/>
      </div>  
    </Router>  
  );
}

export default App;
