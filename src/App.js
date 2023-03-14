import "./App.css";
import ChampionScreen from "./screens/ChampionScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ItemScreen from "./screens/ItemScreen";
import LoginScreen from "./screens/LoginScreen";
import Header from "./components/Header";
import ItemBuildScreen from "./screens/ItemBuildScreen";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/authContext";
import SignUp from "./screens/RegisterScreen";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ChampionScreen />}></Route>
        <Route path="/champions" element={<ChampionScreen />}></Route>
        <Route path="/items" element={<ItemScreen />}></Route>
        <Route
          path="/login"
          element={token ? <ProfileScreen /> : <LoginScreen />}
        ></Route>
        <Route
          path="/profile"
          element={token ? <ProfileScreen /> : <LoginScreen />}
        ></Route>
        <Route
          path="/items/new-build"
          element={token ? <ItemBuildScreen /> : <LoginScreen />}
        ></Route>
        <Route
          path="/signup"
          element={token ? <ProfileScreen /> : <SignUp />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
