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
import { Steps } from '@consta/uikit/Steps';
import { ProgressStepBar } from '@consta/uikit/ProgressStepBar';
import { Switch } from '@consta/uikit/Switch';
import { DatePicker } from '@consta/uikit/DatePicker';
import { Select } from '@consta/uikit/Select';
import { Checkbox } from '@consta/uikit/Checkbox';
import Question from '../uicomponents/Question';


const CreateQuestionaryPage = () => {

      const [status, setStatus] = useState<string>('normal');

      const [activeStep, setActiveStep] = useState(0)

        const clickAction = () => {
            setStatus(status === 'normal' ? 'success' : 'normal');
        };
            
      const steps = [
        {
          label: 'Настройка опроса',
          point: 1,
          status,
          lineStatus: 'normal',
        },
        {
          label: 'Создание вопросов',
          point: 2,
          status,
          lineStatus: 'normal',
        },
        {
          label: 'Предпросмотр анкеты',
          point: 3,
          status,
          lineStatus: 'normal',
        }
      ];

    const [questionlist, setQuestionList] = useState([1])



    const [name, setName] = useState("")
    const [descryption, setDescryption] = useState("")

    const [infMode, setInfMode] = useState(false)
    const [timeSet, setTimeSet] = useState(false)
    const [timeForQuetionary, setTimeForQuetionary] = useState<Date | null>()

    const [manyAccess, setManyAccess] = useState(false)

    const [isEndingDate, setIsEndingDate] = useState(false)

    const [endingDate, setEndingDate] = useState<Date | null>()
    
    return(
        <Layout direction="column" style={{height: "100%", width: "100%", padding: "35px 160px 25px 160px", gap: 20}}>
            <Layout flex = {1} direction="column" style={{width: "100%", alignContent: "center", alignItems: "center"}}>
                <ProgressStepBar steps={steps} activeStepIndex={activeStep} style={{alignSelf: "center"}}/>
            </Layout>
            <Card style={{width: "100%", height: "100%", backgroundColor: "#e0e3e2"}}>
              
              <Layout style={{height: "100%", width: "100%", padding: 25}}>
                {activeStep===0 ?
                  <Layout direction='column' style={{height: "100%", width: "100%"}}>
                    <Text view="primary" size="2xl" style={{fontWeight: 600}}>Новый опрос</Text>
                    <Layout direction='row' style={{height: "100%", width: "100%", paddingTop: "20px", gap: 20}}>
                      <Layout direction='column' style={{height: "100%", width: "100%", gap: 30}}>
                        <TextField size="l" value={name} onChange={(e)=>{setName(e.value)}} label='Название' required>
                        </TextField>

                        <TextField label='Описание' value={descryption} onChange={(e)=>{setDescryption(e.value)}} type='textarea' rows={3}>

                        </TextField>

                        <Switch label="Анонимный опрос" size="l" checked={infMode} onChange={(e)=>setInfMode(e.checked)}/>
                        <Switch label="Ограничение по времени" size="l" checked={timeSet} onChange={(e)=>setTimeSet(e.checked)}/>
                        {timeSet && 
                          <DatePicker type="time" value={timeForQuetionary} onChange={(e)=>{setTimeForQuetionary(e.value)}}/>}

                        <Switch label="Многократное прохождение" size="l" checked={manyAccess} onChange={(e)=>setManyAccess(e.checked)}/>

                        <Switch label="Дата окончания опроса" size="l" checked={isEndingDate} onChange={(e)=>setIsEndingDate(e.checked)}/>
                        {isEndingDate && 
                          <DatePicker value={endingDate} onChange={(item)=>setEndingDate(item.value)} label='' minDate={new Date} />
                        }
                        
                      </Layout>
                      <Layout direction='column' style={{height: "100%", width: "100%", gap: 30}}>
                        
                      </Layout>

                    </Layout>
                    <Layout style={{ alignSelf: "flex-end", gap: 10}}>
                      <Layout style={{ alignSelf: "flex-end", gap: 10}}>
                        {/* <Button label="Назад" view= "secondary" onClick={()=>setActiveStep(1)}></Button> */}
                        <Button label="Далее" onClick={()=>setActiveStep(1)}></Button>
                      </Layout>
                    </Layout>
                    
                    
                  </Layout>
                  : activeStep===1 ?
                  <Layout direction='column' style={{height: "100%", width: "100%",  overflowY: "auto", maxHeight: "80vh"}}>
                    <Text view="primary" size="2xl" style={{fontWeight: 600}}></Text>
                    <Layout direction='row' style={{height: "100%", width: "100%", paddingTop: "20px", gap: 20}}>
                      <Layout direction='column' style={{height: "100%", width: "100%", gap: 30, padding: "0 120px 0 200px"}}>
                        {questionlist.map((item)=>{
                          return(<Question number={item}></Question>)
                        })}
                        
                        <Layout style={{height: 100, paddingBottom: 20}}>
                          <Button 
                            style={{width: 800, height: 60, fontSize: 50, fontWeight: 200}} 
                            view='ghost' 
                            label="+"
                            onClick={()=>{
                              const newQuest = questionlist[questionlist.length-1]+1
                              console.log(questionlist[questionlist.length-1])
                              setQuestionList([...questionlist, newQuest])
                            }}>
                          </Button>
                        </Layout>
                        
                        
                      </Layout>
                      <Layout direction='column' style={{height: "100%", width: "100%", gap: 30}}>
                        
                      </Layout>

                    </Layout>
                    <Layout style={{ alignSelf: "flex-end", gap: 10}}>
                      {/* <Layout style={{ alignSelf: "flex-end", gap: 10}}>
                        <Button label="Назад" view= "secondary" onClick={()=>setActiveStep(0)}></Button>
                        <Button label="Далее" onClick={()=>setActiveStep(2)}></Button>
                      </Layout> */}
                    </Layout>
                    
                    
                  </Layout>
                  : activeStep===2 ?
                  <Layout direction='column'>
                    <Text view="primary">Предпросмотр анкеты</Text>
                  </Layout> : ""
                }
              </Layout>

            </Card>
        </Layout>
    )
}

export default CreateQuestionaryPage