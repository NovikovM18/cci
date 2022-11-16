import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthGuard } from './AuthGuard';
import Chat from "./components/Chat";
import Dashboard from "./components/Dashboard";
import LogIn from "./components/LogIn";
import LoginStart from "./components/LoginStart";
import ResetPassword from "./components/ResetPassword";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ToDo from "./components/ToDo";
import ToDos from "./components/ToDos";
import UpdateUser from "./components/UpdateUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LogIn />}>
            <Route index element={<LoginStart />}/>
            <Route path='signin' element={<SignIn />}/>
            <Route path='signup' element={<SignUp />}/>
            <Route path='reset' element={<ResetPassword />}/>
          </Route>
          <Route 
            path='/dashboard' 
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            } 
          >
            <Route path='updateuser' element={<UpdateUser />} />
            <Route path='chat' element={<Chat />} />
            <Route path='todos' element={<ToDos />}>
              <Route path=':id' element={<ToDo />} />
            </Route>
          </Route>
          <Route path='*' element={<Navigate to='/dashboard' replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
