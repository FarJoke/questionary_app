import { Layout } from '@consta/uikit/Layout';
import { Sidebar } from '@consta/uikit/Sidebar';
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Avatar } from '@consta/uikit/Avatar';
import { User } from '@consta/uikit/User';
import { TextField } from '@consta/uikit/TextField';
import QuestionaryCard from '../uicomponents/QuestionaryCard';
import { Card } from '@consta/uikit/Card';
import { Link } from 'react-router-dom';


const AuthPage = () => {
    return(
    <Layout direction= "column" style={{alignItems: "center", width: "100%", height: "100%", paddingTop: "14%"}}>
        <Card style={{width: 500, background: "#e0e3e2", alignSelf: "center", padding: 30, gap: 30, justifyContent: ""}}>
            <Layout direction= "column" style={{gap: 20, height: "100%"}}>

            <Text view='primary' size="2xl" style={{fontWeight: 600}}>
                Авторизация
            </Text>

            
            <TextField size="l" label='Логин' style={{width: "100%"}}>
            </TextField>

            <TextField size="l" label='Пароль' style={{width: "100%"}} placeholder=''>
            </TextField>

            <Layout style={{ alignSelf: "flex-end", gap: 10, marginTop: 40}}>
                <Layout style={{ alignSelf: "flex-end", gap: 10}}>
                    <Link to={`/login`}>
                        <Button label="Создать учётную запись" view='clear' onClick={()=>{}}></Button>
                    </Link>
                    <Link to={`/`}>
                        <Button label="Войти" onClick={()=>{}}></Button>
                    </Link>
                    
                </Layout>
            </Layout>
            
            </Layout>
        </Card>
    </Layout>)
} 
export default AuthPage