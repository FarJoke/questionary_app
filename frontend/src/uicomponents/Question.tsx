import { useState } from 'react';

import { Layout } from '@consta/uikit/Layout';
import { Sidebar } from '@consta/uikit/Sidebar';
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { Avatar } from '@consta/uikit/Avatar';
import { User } from '@consta/uikit/User';
import { Card } from '@consta/uikit/Card';
import { Link } from 'react-router-dom';
import { TextField } from '@consta/uikit/TextField';
import { Select } from '@consta/uikit/Select';
import { Switch } from '@consta/uikit/Switch';
import { Checkbox } from '@consta/uikit/Checkbox';




const Question = ({number}) => {

     type Item = {
          label: string;
          id: number;
        };
        
        const items: Item[] = [
          {
            label: 'Выбор вариантов ответа',
            id: 1,
          },
          {
            label: 'Свой ответ',
            id: 2,
          },
          {
            label: 'Шкала значений',
            id: 3,
          },
        ];
    
        const [questType, setQuestType] = useState<Item | null>(items[0]);
        const [variants, setVariants] = useState([{ id: 1, checked: false, text: '' }]);

        const addVariant = () => {
            setVariants((prevVariants) => [
                ...prevVariants,
                { id: Date.now(), checked: false, text: '' }, // Генерация уникального ID
            ]);
        };

          // Обновление состояния чекбокса
        const handleCheckboxChange = (id) => (e) => {
            setVariants((prevVariants) =>
            prevVariants.map((variant) =>
                variant.id === id ? { ...variant, checked: e.checked } : variant
            )
            );
        };

          // Обновление текстового поля
        const handleTextChange = (id) => (e) => {
            setVariants((prevVariants) =>
            prevVariants.map((variant) =>
                variant.id === id ? { ...variant, text: e.value } : variant
            )
            );
        };

    return(
            <Card style={{width: 800, background: "white", padding: 20, gap: 40}}>
                <Layout direction='column' style={{gap: 20, paddingBottom: 10}}>
                <Text view='primary' size="2xl">Вопрос {number}</Text>
                <TextField label='Текст вопроса' type='textarea' rows={2} required style={{width: "100%"}}></TextField>
                <Layout>
                    <Select label='Тип вопроса' items={items} value={questType} onChange={(e)=>setQuestType(e.value)} style={{width: "40%"}}></Select>
                    {questType.id === 1 &&
                        <Switch label="Множественный выбор" size="l" checked style={{marginLeft: 20, marginTop: 30}}/>
                    }
                    <Switch label="Вариативная логика" size="l" checked={false} style={{marginLeft: 20, marginTop: 30}}/>
                </Layout>
                {questType.id === 1 ?
                        <>          
                        {variants.map((variant) => (
                            <div key={variant.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 0 }}>
                                <Checkbox
                                view="primary"
                                size="l"
                                checked={variant.checked}
                                onChange={handleCheckboxChange(variant.id)}
                                style={{ marginRight: 20, marginTop: 30 }}
                                />
                                <TextField
                                    label="Вариант ответа"
                                    type="textarea"
                                    rows={1}
                                    required
                                    value={variant.text}
                                    onChange={handleTextChange(variant.id)}
                                    style={{ width: '100%' }}
                                />
                            </div>
                            ))}

                            <Button 
                                label="Добавить вариант ответа" 
                                style={{width: 250, marginLeft: 510, marginTop: 20}}
                                onClick={()=>addVariant()}
                                >

                            </Button>

                        </>
                    : ""}
                {questType.id === 2 ?
                <>
                    <TextField >

                    </TextField>
                </>
                : ""}
                    
                
                </Layout>
                
            </Card>

    )
}

export default Question