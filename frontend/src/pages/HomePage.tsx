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
import { questionsApi } from '../utils/Questions';


const HomePage = () => {

    const [list, setList]= useState([])

    useEffect(()=>{
        questionsApi.getMyQuestionaries().then((resp)=>{setList(resp)})
    }, [])
    
    console.log(list)
    
    
    return(
        <Layout direction="column" style={{height: "100%", width: "100%"}}>
            
            <Layout style={{
                padding: 25,
                gap: 25,
                flexWrap: 'wrap',
                display: 'flex', // важно для переноса
                justifyContent: 'flex-start', // чтобы не центрировались
            }}>
                {list.map((quest)=>{return(
                    <QuestionaryCard label={quest.name} subLabel={quest.description} questData={quest}></QuestionaryCard>
                )})}
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