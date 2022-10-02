import { Route, Routes } from 'react-router-dom'

import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Chats from './components/Chats'
import Profile from './components/Profile'
import SendText from './components/SendText'

import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/chats' element={<Chats />} />
        <Route path='/send/' element={<SendText />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
