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
import deleteIcon from '../assets/deleteIcon';
import { Tabs } from '@consta/uikit/Tabs';
import { Slider } from '@consta/uikit/Slider';




const Question = ({number}) => {

     type Item = {
          label: string;
          id: number;
        };
        
        const items: Item[] = [
          {
            label: 'Варианты ответа',
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

        const items2: Item[] = [
          {
            label: 'Нет',
            id: 1,
          },
          {
            label: 'Вопрос 2',
            id: 1,
          },
        ];
    
        const [questType, setQuestType] = useState<Item | null>(items[0]);
        const [questLogic, setQuestLogic] = useState<Item | null>(items2[0]);
        const [questLogicSpec, setQuestLogicSpec] = useState<Item | null>(items2[1]);
        const [variants, setVariants] = useState([{ id: 1, checked: false, text: '' }]);
        const [questText, setQuestText]= useState<string | null>("")
        
        const [sliderValue, setSliderValue] = useState<number>(20);
        const [numberForSliderValue, setNumberForSliderValue] = useState<number>(5);
        const [step, setStep] = useState<number>(1);

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
            <Card style={{width: "100%", background: "white", padding: 20, gap: 40, flex: 2}}>
              <Layout direction='row' style={{width: "100%", gap: 20}}>
                <Layout style={{width: "20%"}}>
                  <Tabs items={items} value={questType} onChange={(e)=>setQuestType(e.value)} linePosition='right'></Tabs>
                </Layout>
              
                <Layout direction='column' style={{gap: 10, paddingBottom: 10, marginBottom: "10px", width: "800px"}}>
                  <Text view='primary' size="2xl">Вопрос {number}</Text>
                  <TextField label='Текст вопроса' type='textarea' rows={2} value={questText} onChange={(e)=>setQuestText(e.value)} required style={{width: "100%"}}></TextField>
                  <Layout>  
                      {questType.id === 1 &&  
                      <Layout style={{gap:20, marginBottom: "10px"}}>
                        <Switch label="Множественный выбор" size="l" checked={false} style={{ marginTop: 10 }}/>
                        <Switch label="Вариативная логика" size="l" checked={true} style={{ marginTop: 10 }}/>
                      </Layout>                        
                          
                      }
                      
                  </Layout>
                    {questType.id === 1 ?
                        <>          
                        {variants.map((variant) => (
                            <div key={variant.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 0, gap: 8 }}>
                                <Button iconLeft={deleteIcon} view='clear' style={{marginTop: 28}}>
                                </Button>
                                <TextField
                                    label="Вариант ответа"
                                    type="textarea"
                                    rows={1}
                                    required
                                    value={variant.text}
                                    onChange={handleTextChange(variant.id)}
                                    style={{ width: '100%' }}
                                />
                                <Select label='Вызовет вопрос' placeholder='нет' items={items2} value={variant.id === 1 ? questLogicSpec : questLogic} onChange={(e)=>setQuestLogic(e.value)} style={{width: 200}}/>
                            </div>
                            ))}

                            <Button 
                                label="Добавить вариант ответа" 
                                style={{width: "40%", marginLeft: "60%", marginTop: 20}}
                                onClick={()=>addVariant()}
                                >

                            </Button>

                        </>
                    : ""}
                  {questType.id === 2 ?
                    <Layout style={{width: "100%"}}>
                        <TextField placeholder='Поле для развернутого ответа' type='textarea' disabled={true} rows={2} style={{width: "100%"}}>

                        </TextField>
                    </Layout>
                  : ""}
                    {questType.id === 3 ?
                      <Layout direction="column" style={{width: "100%", gap: 20}}>
                          <Layout direction="row" style={{width: "100%", gap: 10}}>
                            <TextField label="Максимальное значение" style={{width: "30%"}} value={numberForSliderValue.toString()} onChange={(e)=>setNumberForSliderValue(e.value ? parseFloat(e.value) : 0)}/>
                            <TextField type='number' label="Шаг" style={{width: "30%"}} value={step.toString()} onChange={(e)=>setStep(e.value ? parseFloat(e.value) : 0)}/>
                          </Layout>
                          
                          <Slider label={`Значение ${sliderValue}`} onChange={(e)=>setSliderValue(e.value)} value={sliderValue} max={numberForSliderValue} step={step}/>
                      </Layout>
                    : ""}
                    
                
                </Layout>
                </Layout>
            </Card>
    )
}

export default Question