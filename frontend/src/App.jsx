import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import TestPage from './pages/test'
import LoginPage from './pages/loginPage'

function App() {

  return (
    
      <div className='w-full h-screen  flex justify-center items-center relative bg-primary text-secondary'>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/admin/*' element={<AdminPage/>} />
          <Route path='/test' element={<TestPage/>} />
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
        {/*<div className='w-[600px] h-[600px] bg-amber-400 flex flex-col justify-center items-center relative'>
        <div className='w-[70px] h-[70px] bg-blue-600'></div>
        <div className='w-[70px] h-[70px] bg-green-500'></div>
        <div className='w-[70px] h-[70px] bg-orange-600 fixed bottom-[50px] right-[79px]'></div>
        <div className='w-[70px] h-[70px] bg-white '></div>
        <div className='w-[70px] h-[70px] bg-pink-600 absolute top-[10px] right-[10px]'></div>
        <div className='w-[70px] h-[70px] bg-black'></div> 

        </div>*/}
        
      </div>

    
  )
}

export default App
