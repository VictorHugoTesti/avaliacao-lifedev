import "./App.css"

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import {onAuthStateChanged} from "firebase/auth"

import {useState, useEffect, use} from "react"
import {userAuthentication} from "./hooks/useAuthentication"

import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Post from "./pages/Post/Post"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import CreatePost from "./pages/CreatePost/CreatePost"
import Search from "./pages/Search/Search"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Dashboard from "./pages/Dashboard/Dashboard"
import EditPost from "./pages/EditPost/EditPost"

import {AuthProvider} from "./context/AuthContext"
import PrivateRoute from "./Routes/PrivateRoutes"
import ScrollTotop from "./utilities/ScrollToTop"

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = userAuthentication()
  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <ScrollTotop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route 
              path="/posts/create"
              element={<PrivateRoute> <CreatePost /> </PrivateRoute>} 
              />
              <Route
              path="/posts/edit/:id"
              element={<PrivateRoute> <EditPost /> </PrivateRoute>}
              />
              <Route path="/posts/:id" element={<PrivateRoute> <Post /> </PrivateRoute>}/>
              <Route path="/search" element={<Search />} />
              <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
              path="/dashboard"
              element={<PrivateRoute> <Dashboard /> </PrivateRoute>}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App