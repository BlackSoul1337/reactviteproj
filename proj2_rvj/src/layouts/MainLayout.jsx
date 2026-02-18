import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

function MainLayout() {

    const {user, logout} = useContext(AuthContext)

    return (
        <div className="p5-page-wrapper">
        <header>
            <nav className="p5-nav-container">
            <div className="main-menu">
                <div className="nav-item-wrapper">
                <div className="nav-background"></div>
                <NavLink to="/">Главная</NavLink>
                </div>
                <div className="nav-item-wrapper">
                <div className="nav-background"></div>
                <NavLink to="/events">Мероприятия</NavLink>
                </div>
                <div className="nav-item-wrapper">
                <div className="nav-background"></div>
                <NavLink to="/about">Обо мне</NavLink>
                </div>
            </div>

            <div className="auth-menu">
                {!user ? (
                <>
                    <div className="nav-item-wrapper auth-item-paper">
                    <div className="nav-background"></div>
                    <NavLink to="/login">Логин</NavLink>
                    </div>
                    <div className="nav-item-wrapper auth-item-paper">
                    <div className="nav-background"></div>
                    <NavLink to="/registration">Регистрация</NavLink>
                    </div>
                </>
                ) : (
                <>
                    <div className="nav-item-wrapper secondary">
                    <div className="nav-background"></div>
                    <NavLink to="/bookings">Бронирование</NavLink>
                    </div>
                    <div className="nav-item-wrapper secondary">
                    <div className="nav-background"></div>
                    <NavLink to="/profile">Профиль</NavLink>
                    </div>
                </>
                )}
            </div>
            </nav>
        </header>

        <main className="p5-main-content">
            <Outlet />
        </main>

        <footer className="p5-footer">
            <div className="footer-line"></div>
            <p>© хайп девелопмент</p>
        </footer>
        </div>
    )
}

export default MainLayout