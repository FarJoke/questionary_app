import { useState } from 'react'
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Layout } from '@consta/uikit/Layout'

import './App.css'

import HomePage from './pages/HomePage'
import MainMenu from './uicomponents/MainMenu';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './uicomponents/MainLayout';
import CreateQuestionaryPage from './pages/CreateQuestionaryPage';
import LoginPage from './pages/LoginPage';
import AuthPage from './pages/AuthPage';
import ResultPage from './pages/ResultPage';
function App() {
  return (
    <Theme preset={presetGpnDefault}>
      <Layout direction="column" style={{width: "100vw", height: "100vh", background: "#bac2c4"}}>
        <Routes>
            <Route
              path="/"
              element={
                <MainLayout/>
              }
            > 
              <Route index element={<HomePage/>} />
              <Route path="create" element={<CreateQuestionaryPage/>} />
              <Route path="results" element={<ResultPage/>} />
            </Route>
            <Route path="login" element={<LoginPage/>} />
            <Route path="auth" element={<AuthPage/>} />
            
        </Routes>
      </Layout>
    </Theme>
  )
}

export default App
