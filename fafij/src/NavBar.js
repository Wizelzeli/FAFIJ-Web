import React, {useContext} from 'react';
import {Context} from "./index";
import {Link} from "react-router-dom";
import CustomButton from "./components/button/CustomButton";

const NavBar = () => {
    const {isAuth, setIsAuth} = useContext(Context);
    const {hasJournal, setHasJournal} = useContext(Context);
    const {isAdmin, setIsAdmin} = useContext(Context);

    const logout = () => {
        setIsAuth(false);
        setHasJournal(false);
        localStorage.removeItem('auth')
        localStorage.removeItem('journal')
        localStorage.removeItem('login')
        localStorage.removeItem('token')
        localStorage.removeItem('hasJournal')
        localStorage.removeItem('isAdult')
        localStorage.removeItem('isAdmin')
    }

    return (
        isAuth
            ?
            hasJournal
                ?
                isAdmin
                    ?
                    <header>
                        <div>
                            <ul>
                                <li>
                                    <span> </span>
                                </li>
                                <li>
                                    <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                          to="/journal"><h3>Журнал</h3></Link></li>
                                <li>
                                    <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                          to="/categories"><h3>Категории</h3></Link></li>
                                <li>
                                    <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                          to="/chart"><h3>Диаграмма</h3></Link></li>
                                <li>
                                    <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                          to="/change">
                                        <h3>Сменить журнал</h3></Link></li>
                                <li>
                                    <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                          to="/invite"><h3>Пригласить</h3></Link></li>
                                <li>
                                    <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                          to="/invitations"><h3>Приглашения</h3></Link></li>
                                <li>
                                    <CustomButton style={{width: '82px', height: '52px', marginRight: '18px'}}
                                                  onClick={logout}>
                                        Выйти
                                    </CustomButton></li>
                            </ul>
                        </div>
                    </header>
                    :
                    <header>
                        <div>
                            <ul>
                                <li>
                                    <span> </span>
                                </li>
                                <li>
                                    <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                          to="/journal"><h3>Журнал</h3></Link></li>
                                <li>
                                    <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                          to="/categories"><h3>Категории</h3></Link></li>
                                <li>
                                    <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                          to="/chart"><h3>Диаграмма</h3></Link></li>
                                <li>
                                    <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                          to="/change">
                                        <h3>Сменить журнал</h3></Link></li>
                                <li>
                                    <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                          to="/invitations"><h3>Приглашения</h3></Link></li>
                                <li>
                                    <CustomButton style={{width: '82px', height: '52px', marginRight: '18px'}}
                                                  onClick={logout}>
                                        Выйти
                                    </CustomButton></li>
                            </ul>
                        </div>
                    </header>
                :
                <header>
                    <div>
                        <ul>
                            <li>
                                <span> </span>
                            </li>
                            <li>
                                <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}} to="/change">
                                    <h3>Сменить
                                        журнал</h3></Link></li>
                            <li>
                                <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                      to="/invitations"><h3>Приглашения</h3></Link></li>
                            <li>
                                <CustomButton style={{width: '82px', height: '52px', marginRight: '18px'}}
                                              onClick={logout}>
                                    Выйти
                                </CustomButton></li>
                        </ul>
                    </div>
                </header>
            :
            <header>
                <div>
                    <ul>
                        <li>
                            <span> </span>
                        </li>
                        <li>
                            <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                  to="/login"><h3>Авторизация</h3></Link></li>
                        <li>
                            <Link style={{paddingLeft: '3px', paddingRight: '3px', color: 'black'}}
                                  to="/registration"><h3>Регистрация</h3></Link></li>
                        <li>
                            <CustomButton style={{width: '82px',
                                height: '52px',
                                marginRight: '18px',
                                background: 'transparent',
                                border: 'none',
                                fontSize: '0',
                                disabled: 'disabled',
                                cursor: 'default'}}
                                          onClick={logout}>
                                Выйти
                            </CustomButton></li>
                    </ul>

                </div>
            </header>
    );
};

export default NavBar;