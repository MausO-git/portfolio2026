import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import Works from "./pages/Works/Works";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./components/PrivateRoute";
import { toast, ToastContainer } from "react-toastify";
import ScrollToTop from "./tools/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";
import HomeAdmin from "./pages/admin/HomeAdmin/HomeAdmin";
import AuthContext from "./contexts/AuthContext";
import authAPI from "./services/authAPI";
import { useState } from "react";
import Login from "./pages/Login/Login";
import WorksAdmin from "./pages/admin/WorksAdmin/WorksAdmin";
import WorkAdmin from "./pages/admin/WorkAdmin/WorkAdmin";
import Error404 from "./pages/Error404/Error404";
import ToolsAdmin from "./pages/admin/ToolsAdmin/ToolsAdmin";
import ToolAdmin from "./pages/admin/ToolAdmin/ToolAdmin";
import usePageTitle from "./tools/usePageTitle";

authAPI.setup()

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(authAPI.isAuthenticated())

  const contextValue = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated
  }

  return (
    <AuthContext.Provider value={contextValue} >
      <Router>
        <ScrollToTop />
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/works' element={<Works />} />
            <Route path='/admin' element={
              <PrivateRoute>
                <HomeAdmin />
              </PrivateRoute>
            }  />
            <Route path='/admin/works' element={
              <PrivateRoute>
                <WorksAdmin />
              </PrivateRoute>
            } />
            <Route path='/admin/skills' element={
              <PrivateRoute>
                <ToolsAdmin />
              </PrivateRoute>
            } />
            <Route path='/admin/works/:id' element={
              <PrivateRoute>
                <WorkAdmin />
              </PrivateRoute>
            } />
            <Route path='/admin/skills/:id' element={
              <PrivateRoute>
                <ToolAdmin />
              </PrivateRoute>
            } />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <ToastContainer position="bottom-left" />
    </AuthContext.Provider>
  );
}

export default App;
