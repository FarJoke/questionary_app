import { useEffect, useState } from 'react'
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { Layout } from '@consta/uikit/Layout'

import './App.css'

import HomePage from './pages/HomePage'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import CreateQuestionaryPage from './pages/CreateQuestionaryPage';
import LoginPage from './pages/LoginPage';
import AuthPage from './pages/AuthPage';
import ResultPage from './pages/ResultPage';
import { userApi } from './utils/UserApi';
import { auth } from './utils/Auth';
import { CurrentUserContext } from './context/CurrentUserContext';
import QuestionaryPage from './pages/QuestionaryPage';

interface User {
  login: string;
  email: string;
  registrationDate: Date | undefined;
  _id: string;
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([userApi.getUserInfo()])
        .then(([userData]) => {
          setCurrentUser(userData);
        })
        .catch((error) => {
          console.log(`Ошибка ${error}`);
        });
    } else {
      // navigate("/auth");
    }
  }, [isLoggedIn]);

  
  useEffect(() => {
    const handleTokenCheck = () => {
      if (localStorage.getItem("token")) {
        const jwt = localStorage.getItem("token") ?? "";
        auth
          .checkToken(jwt)
          .then((data) => {
            if (!data) return;
            setIsLoggedIn(true);
            setCurrentUser(data);
          })
          .catch(() => {
            setIsLoggedIn(false);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    };
    handleTokenCheck();
  }, []);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Theme preset={presetGpnDefault}>
        <Layout direction="column" style={{width: "100vw", height: "100vh", background: "#bac2c4"}}>
          {isLoading ? (
              <div>Загрузка...</div>
            ) : (
              <Routes>
                <Route
                  path="/"
                  element={
                    isLoggedIn ? (
                      <MainLayout curUser={currentUser} />
                    ) : (
                      <Navigate to="/auth" replace />
                    )
                  }
                >
                  <Route index element={<HomePage />} />
                  <Route path="create" element={<CreateQuestionaryPage />} />
                  <Route path="results" element={<ResultPage />} />
                  <Route path="quest" element={<QuestionaryPage />} />
                </Route>
                <Route path="login" element={<LoginPage setLogin={handleLogin} />} />
                <Route path="auth" element={<AuthPage setLogin={handleLogin} />} />
              </Routes>
            )}
        </Layout>
      </Theme>
    </CurrentUserContext.Provider>
  )
}

export default App
