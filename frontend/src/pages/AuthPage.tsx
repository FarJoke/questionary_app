import { Layout } from '@consta/uikit/Layout';
import { Sidebar } from '@consta/uikit/Sidebar';
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Avatar } from '@consta/uikit/Avatar';
import { User } from '@consta/uikit/User';
import { TextField } from '@consta/uikit/TextField';
import { Card } from '@consta/uikit/Card';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { auth } from '../utils/Auth';


const AuthPage = ({setLogin}) => {
    const [email, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleChangeEmail = (value) => {
        setUserEmail(value);
    }

    const handleChangePassword = (value) => {
        setPassword(value);
    }

    const handleSubmit = () => {        
        auth
            .authorize(email, password)
            .then((data) => {        
                localStorage.setItem("token", data.token);
                setUserEmail(email);
                setLogin();
                navigate("/");    
            })
            .catch((err) => {
                console.log(err);
                console.log("false")
            });
    }

    useEffect(() => {
        setUserEmail("");
        setPassword("");
    }, []);

    return(
    <Layout direction= "column" style={{alignItems: "center", width: "100%", height: "100%", paddingTop: "14%"}}>
        <Card style={{width: 500, background: "#e0e3e2", alignSelf: "center", padding: 30, gap: 30, justifyContent: ""}}>
            <Layout direction= "column" style={{gap: 20, height: "100%"}}>

            <Text view='primary' size="2xl" style={{fontWeight: 600}}>
                Авторизация
            </Text>

            
            <TextField size="l" label='Логин' style={{width: "100%"}} onChange={(e)=>handleChangeEmail(e.value)} value={email}>
            </TextField>

            <TextField size="l" label='Пароль' style={{width: "100%"}} placeholder='' onChange={(e)=>handleChangePassword(e.value)} value={password}>
            </TextField>

            <Layout style={{ alignSelf: "flex-end", gap: 10, marginTop: 40}}>
                <Layout style={{ alignSelf: "flex-end", gap: 10}}>
                    <Link to={`/login`}>
                        <Button label="Создать учётную запись" view='clear' onClick={()=>{}}></Button>
                    </Link>
 
                    <Button label="Войти" onClick={handleSubmit}></Button>

                    
                </Layout>
            </Layout>
            
            </Layout>
        </Card>
    </Layout>)
} 
export default AuthPage