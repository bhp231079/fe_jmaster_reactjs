import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginTemplates from "./templates/LoginTemplates";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import HomeTemplate from "./templates/HomeTemplate";
import CategoryHOC from "./HOC/CategoryHOC/CategoryHOC";

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import Loading from "./HOC/EffectLoading/Loading";
import Post from "./pages/Post/Post";
import Comments from "./pages/Comments/Comments";
import User from "./pages/Users/User";
import Register from "./pages/Register/Register";
import Authencation, { ProtectedRoute } from "./utils/Auth/Authencation";
import ClientTemplates from "./templates/ClientTemplates";
import CPost from "./pages/Client/CPost";
import DetailPost from "./pages/Client/DetailPost";
import { AuthProvider } from "./utils/CustomHook/AuthContext";
export const history = createBrowserHistory({ window });
function App() {
  return (
    <HistoryRouter history={history}>
      <Loading />
      <CategoryHOC />
    
      <Routes>
        <Route element={<LoginTemplates />}>
          <Route path="login" index element={<Login />} />
          <Route path="register" index element={<Register />} />
        </Route>


          <Route path="admin" element={  <AuthProvider><ProtectedRoute><HomeTemplate /></ProtectedRoute></AuthProvider>}>
            <Route index element={<Categories />} />
            <Route index path="categories" element={<Categories />} />
            <Route index path="post" element={<Post />} />
            <Route index path="comments" element={<Comments />} />
            <Route index path="users" element={<User />} />
          </Route>
   
          <Route path="" element={<ClientTemplates />}>
          <Route index element={<CPost/>} />
          <Route index path="post/detai/:id" element={<DetailPost/>} />
          </Route>
      </Routes>

    </HistoryRouter>
  );
}

export default App;
