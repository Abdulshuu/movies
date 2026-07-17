import { useState, useEffect } from 'react'
import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './components/Login.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Index } from './Index.tsx'
import { Dashboard } from './components/Dashboard.tsx'
import { Movie } from './Movie.tsx'
import { FullCard } from './components/FullCard.tsx'


function GoogleWrapper() {

  const clientId = import.meta.env.VITE_CLIENT_ID



  return (
    <GoogleOAuthProvider clientId={clientId}>

      <Login />

    </GoogleOAuthProvider>
  )
}





function App() {


  const root = document.getElementById("root");



  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<GoogleWrapper />} />


          <Route path='/' element={<Index />}>
            <Route index element={<Dashboard />} />
            <Route path='home' element={<Movie />} />
            <Route path='movie-des/:id' element={<FullCard />} />

          </Route>



        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App