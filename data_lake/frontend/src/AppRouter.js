import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PageLayout from "./components/layout/PageLayout";

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route
                exact
                path="/"
                key="/"
                element={
                    <PageLayout key="/">
                        <HomePage />
                    </PageLayout>
                }
            ></Route>
        </Routes>
    </BrowserRouter>
);

export default AppRouter;
