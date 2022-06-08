import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {Context} from "./index";
import {Navigate} from "react-router";
import Journal from "./pages/Journal";
import Categories from "./pages/Categories";
import Chart from "./pages/Chart";
import Change from "./pages/Change";
import Invite from "./pages/Invite";
import Invitations from "./pages/Invitations";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

const AppRouter = () => {
    const {isAuth, setIsAuth} = useContext(Context);
    const {hasJournal, setHasJournal} = useContext(Context);
    const {isAdmin, setIsAdmin} = useContext(Context);

    return (
        isAuth
            ?
            hasJournal
                ?
                isAdmin
                    ?
                    <Routes>
                        <Route path="/journal" element={<Journal/>}/>
                        <Route path="/categories" element={<Categories/>}/>
                        <Route path="/chart" element={<Chart/>}/>
                        <Route path="/change" element={<Change/>}/>
                        <Route path="/invite" element={<Invite/>}/>
                        <Route path="/invitations" element={<Invitations/>}/>
                        <Route path="*" element={<Navigate replace to="/journal"/>}/>
                    </Routes>
                    :
                    <Routes>
                        <Route path="/journal" element={<Journal/>}/>
                        <Route path="/categories" element={<Categories/>}/>
                        <Route path="/chart" element={<Chart/>}/>
                        <Route path="/change" element={<Change/>}/>
                        <Route path="/invitations" element={<Invitations/>}/>
                        <Route path="*" element={<Navigate replace to="/journal"/>}/>
                    </Routes>
                :
                <Routes>
                    <Route path="/change" element={<Change/>}/>
                    <Route path="/invitations" element={<Invitations/>}/>
                    <Route path="*" element={<Navigate replace to="/change"/>}/>
                </Routes>
            :
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="*" element={<Navigate replace to="/login"/>}/>
            </Routes>
    );
};

export default AppRouter;