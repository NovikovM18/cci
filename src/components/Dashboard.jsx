import React, {useState, useEffect} from "react";
import { auth, db } from '../firebase';
import { AppState } from '../AppContext';
import LogOut from "./LogOut";
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function Dashboard() {
  const { user } = AppState();

  return (
    <div className="container">
      <div className="dashboard">
        <Link className="logo" to='/dashboard'>
          <p className="logo__text">CIC</p>
        </Link>

        <div className="links">
          <Link className="user-info" to='updateuser'>
            <img src={user.photoURL} alt="" />
            <p>
              {user.displayName}
            </p>
          </Link>
        </div>

        <LogOut />
        
        <div className="nav">
          <NavLink className="nav__link" to='users'>users</NavLink>
          <NavLink className="nav__link" to='todos'>toDos</NavLink>
          <NavLink className="nav__link" to='common-chat'>common chat</NavLink>
          <NavLink className="nav__link" to='chats'>chats</NavLink>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
