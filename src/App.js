
import './App.css';
import {Routes, Route}from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';
import Company from './components/Company';
import NavBar from './components/NavBar';
import Employee from './components/Employee';
import Edit from './components/Edit';
import EditE from './components/EditE';
import CDelete from './components/CDelete';
import EDelete from './components/EDelete';

function App() {
  const mywidth = 240
  return (
    <div className="App">
      <NavBar 
        drawerWidth={mywidth}
        content = {
          <Routes>
          <Route path=""element={<Home/>}/>
          <Route path="/about"element={<About/>}/>
          <Route path="/company"element={<Company/>}/>
          <Route path="/employee"element={<Employee/>}/>
          <Route path="/edit/:id"element={<Edit/>}/>
          <Route path="/edite/:id"element={<EditE/>}/>
          <Route path="/cdelete/:id"element={<CDelete/>}/>
          <Route path="/edelete/:id"element={<EDelete/>}/>
         </Routes>
        }
      
      
      />
      
    </div>
  );
}

export default App;
