import ReactDOM from "react-dom"
import { App } from "./App"
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom"

  const app = ReactDOM.createRoot(
    document.getElementById("app")
  );

  app.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
