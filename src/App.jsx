import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  createBrowserRouter,createRoutesFromElements,Route,RouterProvider,
       } from "react-router-dom";
import NetworkChecker from './NetworkChecker'

function App() {

  useEffect(()=>{
    if('serviceWorker' in navigator){
      window.addEventListener('load',()=>{
        navigator.serviceWorker.register('/sw.js')
        .then((registration)=>{
           console.log('SW registered: ' , registration);
        })
        .catch(registrationError =>{
          console.log('SW registration failed: ' , registrationError);
        })
      })

    }
  },[])

  const router = createBrowserRouter(
     createRoutesFromElements(
      <Route path='/' element={<NetworkChecker/>}/>
     )
  )

  return (
    <>
       <RouterProvider router={router}>

       </RouterProvider>
      
    </>
  )
}

export default App
