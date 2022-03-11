import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Layout from './pages/Layout';
import Myprofile from './pages/myprofile';
import Login from './pages/login';
import Recipes from './pages/recipes';
import Favorites from './pages/favorites';
import Lists from './pages/lists';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="myprofile" element={<Myprofile/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="recipes" element={<Recipes/>}/>
          <Route path="favorites" element={<Favorites/>}/>
          <Route path="lists" element={<Lists/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
