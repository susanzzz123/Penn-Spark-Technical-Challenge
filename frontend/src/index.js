import ReactDOM from "react-dom"
import { App } from "./App"
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
        <Route path="/" element={<App />}>
          {/* <Route index element={<Home />} />
          <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
