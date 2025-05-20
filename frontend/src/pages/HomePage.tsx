import { useEffect, useState } from 'react';

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


const HomePage = () => {

    return(
        <Layout direction="column" style={{height: "100%", width: "100%"}}>
            
            <Layout style={{padding: 25, gap: 25}}>
                <QuestionaryCard label={"Оценка корпоративной культуры"} subLabel={"Как вы оцениваете атмосферу, ценности и командный дух в компании?"}></QuestionaryCard>
                <QuestionaryCard label={"Опрос 2"} subLabel={"Описание"}></QuestionaryCard>
                <QuestionaryCard label={"Опрос 3"} subLabel={"Описание"}></QuestionaryCard>
                <Card>
                    <Link to={`/create`}>
                        <Button size='l' style={{width: 280, height: 170, fontSize: 70, fontWeight: 200}} view='ghost' label={"+"}></Button>
                    </Link>
                    
                </Card>
                
            </Layout>
        
        </Layout>
    )
}

export default HomePage