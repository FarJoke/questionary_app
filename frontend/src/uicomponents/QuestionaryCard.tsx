import { useState } from 'react';

import { Layout } from '@consta/uikit/Layout';
import { Sidebar } from '@consta/uikit/Sidebar';
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Avatar } from '@consta/uikit/Avatar';
import { User } from '@consta/uikit/User';
import { Card } from '@consta/uikit/Card';
import { Link } from 'react-router-dom';


const QuestionaryCard = ({label, subLabel}) => {

    return(
        <Link to={`/results`}>
            <Card style={{width: 280, height: 170}} className={"gradient-box"}>
                
                
                    <Layout style={{padding: 10, gap: 10, textDecorationColor: "none"}} direction='column'>
                        <Text className='card-text' weight='bold' size="m">{label}</Text> 
                        <Text className='card-text' weight='light' view='secondary' size="s">{subLabel}</Text> 
                    </Layout>
                
            </Card>
        </Link>
    )
}

export default QuestionaryCard