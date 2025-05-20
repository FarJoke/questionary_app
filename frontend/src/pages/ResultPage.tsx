import { useState } from 'react';

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


const ResultPage = () => {

    const [value, setValue] = useState<string | null>(null);
    const handleChange = ({ value }: { value: string | null }) => setValue(value);


    return(
        <Layout direction="column" style={{height: "100%", width: "100%", padding: "35px 160px 25px 160px", gap: 20}}>
                <Layout flex = {1} direction="column" style={{width: "100%", alignContent: "center", alignItems: "center"}}>
                    Результаты
                </Layout>
                <Card style={{width: "100%", height: "100%", backgroundColor: "#e0e3e2"}}>
                    
                    <Layout style={{height: "100%", width: "100%", padding: 25}}>
                    
                    </Layout>
    
                </Card>
            </Layout>
    )
}

export default ResultPage