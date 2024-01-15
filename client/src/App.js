import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './component/page/Home';
import About from './component/page/About';
import Profile from './component/page/Profile'
import SignIn from './component/page/SignIn';
import SignUp from './component/page/SignUp'
import Header from './component/Header';
import PrivateRoute from './component/PrivateRoute';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>

          <Route element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
          </Route>

          <Route path='/signin' element={<SignIn/>}/>
          
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
