import {Routes, Route} from 'react-router-dom';
/*
  Outlets are used in nested routes for rendering child components along with the parent
  without outlets, only parent will be rendered
*/
// IMPORT Routes //
import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import SignIn from './routes/signIn/sign-in.component';
///////////////////
const Shop = ()=>{
  return <h1>I'm the shop 🛒</h1>
}
const App = ()=>{
  return (
  <Routes>
    <Route path='/' element={<Navigation/>}>
      <Route index={true} element={<Home />}></Route> 
      {/* index here means if router matches '/'path then default component that should be render is Home*/}
      <Route path='shop' element={<Shop />}></Route>
      <Route path='sign-in' element={<SignIn />}></Route>
    </Route>
  </Routes>
  )
}

export default App;
