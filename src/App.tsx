import './App.css';
import Home from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Myprofile from './pages/myprofile';
import Login from './pages/login';
// import Recipes from './pages/recipes/recipes';
import Favorites from './pages/favorites';
import Lists from './pages/lists';
import { Recipes } from './pages/recipes/recipes';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}></Route>
          <Route path="myprofile" element={<Myprofile/>}></Route>
          <Route path="login" element={<Login/>}></Route>
          <Route path="recipes" element={<Recipes/>}></Route>
          <Route path="favorites" element={<Favorites/>}></Route>
          <Route path="lists" element={<Lists/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
