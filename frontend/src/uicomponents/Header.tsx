import { useState } from 'react';

import { Layout } from '@consta/uikit/Layout';
import { Sidebar } from '@consta/uikit/Sidebar';
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Avatar } from '@consta/uikit/Avatar';
import { User } from '@consta/uikit/User';
import { Link } from 'react-router-dom';
import { TextField } from '@consta/uikit/TextField';


const Header= ({userInfo}) => {

    const [value, setValue] = useState<string | null>(null);
    const handleChange = ({ value }: { value: string | null }) => setValue(value);
    
    return(
        <Layout direction="row" style={{
                height: "10%", 
                width: "100vw", 
                background: "#e0e3e2",
                padding: "20px 0px 20px 5px",
                gap: 22,
                boxShadow: "var(--shadow-group)"
            }}>
                <User  name="Oleg Dubovoy" size="l" info="olegdubovoyy@gmail.com" style={{padding: "0px 0px 0px 20px"}} />
            {/* <Text size='3xl' className="section-title">Мои опросы</Text> */}
                <Layout style={{width: "100%", marginLeft: 30, alignItems: "center", justifyContent: 'space-between'}}>
                    <Layout style={{gap:10}}>    
                        <TextField
                            onChange={handleChange}
                            value={value}
                            type="text"
                            placeholder="Поиск"
                            style={{width: 400}}
                        />
                        <Button label="Поиск">

                        </Button>
                    </Layout>                            
                </Layout>
        </Layout>
    )
}

export default Header