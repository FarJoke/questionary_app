import { useState } from 'react';

import { Layout } from '@consta/uikit/Layout';
import { Sidebar } from '@consta/uikit/Sidebar';
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Avatar } from '@consta/uikit/Avatar';
import { User } from '@consta/uikit/User';
import { Link } from 'react-router-dom';


const MainMenu= () => {

    const [isOpen, setIsOpen] = useState(false); // Состояние для управления видимостью меню

    return(
        <Layout direction="column" style={{
                height: "100vh", 
                width: "15%", 
                background: "#e0e3e2",
                padding: "20px 0px 20px 5px",
                gap: 22,
                boxShadow: "var(--shadow-group)"
            }}>
                <User  name="Oleg Dubovoy" size="l" info="olegdubovoyy@gmail.com" style={{padding: "0px 0px 0px 5px"}} />
                <Layout style={{height: 25}}></Layout>
                <Layout direction='column' style={{gap:5}}>
                    <Link to={`/`}>
                        <Button label={"Мои опросы"} size = "l" view='clear' style={{width: "100%", textAlign: "start"}}></Button>
                    </Link>
                    <Link to={`/create`}>
                        <Button label={"Создать опрос"} size = "l" view='clear' style={{width: "100%", textAlign: "start"}}></Button>
                    </Link>
                    
                    <Button label={"О сервисе"} size = "l" view='clear' style={{width: "100%", textAlign: "start"}}></Button>
                    <Link to={`/auth`}>
                        <Button label={"Выйти"} size = "l" view='clear' style={{width: "100%", textAlign: "start", marginTop: "230%"}}></Button>
                    </Link>
                </Layout>
        </Layout>
    )
}

export default MainMenu