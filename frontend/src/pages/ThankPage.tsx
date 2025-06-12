import { Layout } from '@consta/uikit/Layout';
import { Sidebar } from '@consta/uikit/Sidebar';
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Avatar } from '@consta/uikit/Avatar';
import { User } from '@consta/uikit/User';
import { TextField } from '@consta/uikit/TextField';
import QuestionaryCard from '../uicomponents/QuestionaryCard';
import { Card } from '@consta/uikit/Card';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { auth } from '../utils/Auth';


const ThankPage = ({setLogin}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [userLogin, setUserLogin] = useState<string>("");
    const defaultRegistrationDate = new Date();
    const [registrationDate, setRegistrationDate] = useState<Date>(
        defaultRegistrationDate
    );

    const navigate = useNavigate();

    const handleSubmit = () => {     
        auth.register(
            userLogin,
            email,
            password,
            registrationDate
        ).then(() => {
            auth.authorize(email, password).then((data) => {
            localStorage.setItem("token", data.token);
            setLogin();
            navigate("/");
            console.log("success")
            });
        }).catch((err) => {
            console.log(err.status);
        });
    }

    useEffect(() => {
        setEmail("");
        setPassword("");
        setUserLogin("");
    }, [
        setEmail,
        setPassword,
        setUserLogin
    ]);

    return(
        <Layout direction= "column" style={{alignItems: "center", width: "100%", height: "100%", paddingTop: "10%"}}>
            <Card style={{width: 500, background: "#e0e3e2", alignSelf: "center", padding: 30, gap: 30, justifyContent: ""}}>
                <Layout direction= "column" style={{gap: 20, height: "100%"}}>

                    <Text view='primary' size="2xl" style={{fontWeight: 600}}>
                        Ваши ответы сохранены!
                    </Text>
                    <Text view='primary' size="2xl" style={{fontWeight: 600}}>
                        Спасибо, что приняли участие в опросе!
                    </Text>              
                </Layout>
            </Card>
        </Layout>
    )
} 
export default ThankPage