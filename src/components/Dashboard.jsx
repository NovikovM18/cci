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

        <Link className="user-info" to='/dashboard/updateuser'>
          <img src={user.photoURL} alt="" />
          <p>
            {user.displayName}
          </p>
        </Link>
        
        <LogOut />

        <div className="nav">
          <NavLink className="nav__link" to='todos'>toDos</NavLink>
          <NavLink className="nav__link" to='chat'>chat</NavLink>
        </div>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
