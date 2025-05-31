import { useEffect, useState } from 'react';

import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { TextField } from '@consta/uikit/TextField';
import { Card } from '@consta/uikit/Card';
import { ProgressStepBar } from '@consta/uikit/ProgressStepBar';
import { Switch } from '@consta/uikit/Switch';
import { DatePicker } from '@consta/uikit/DatePicker';

import Question from '../uicomponents/Question';
import QuestionInAction from '../uicomponents/QuestionInAction';
import { questionsApi } from '../utils/Questions';

type QuestionarySettings = {
  name: string;
  description: string;
  isAnonymous: boolean;
  hasTimeLimit: boolean;
  timeLimit: Date | null;
  multipleAccess: boolean;
  hasEndDate: boolean;
  endDate: Date | null;
};

type Variant = {
  id: number;
  text: string;
  checked: boolean;
  dependsOnQuestionNumber?: number;
};

type QuestionData = {
  number: number;
  text: string;
  type: { id: number; label: string };
  isMultiple: boolean;
  isLogic: boolean;
  variants: Variant[];
  sliderValue: number;
  max: number;
  step: number;
  dependendByVariant?: number|null;
};

const CreateQuestionaryPage = () => {
  const [status, setStatus] = useState<string>('normal');
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: 'Настройка опроса', point: 1, status, lineStatus: 'normal' },
    { label: 'Создание вопросов', point: 2, status, lineStatus: 'normal' },
    { label: 'Предпросмотр анкеты', point: 3, status, lineStatus: 'normal' },
  ];

  const [questionarySettings, setQuestionarySettings] = useState<QuestionarySettings>({
    name: '',
    description: '',
    isAnonymous: false,
    hasTimeLimit: false,
    timeLimit: null,
    multipleAccess: false,
    hasEndDate: false,
    endDate: null,
  });

  const [answers, setAnswers] = useState({});


  useEffect(()=>{
    console.log(answers)
  }, [])
  const [questions, setQuestions] = useState<QuestionData[]>([
    {
      number: 1,
      type: { label: 'Варианты ответа', id: 1 },
      text: '',
      isMultiple: true,
      isLogic: false,
      variants: [
        { id: 1, text: '', checked: false, dependsOnQuestionNumber: -1 },
        { id: 2, text: '', checked: true, dependsOnQuestionNumber: -1 },
      ],
      sliderValue: 0,
      max: 0,
      step: 1,
      dependendByVariant: -1,
    },
  ]);

  useEffect(()=>{
    console.log(answers)
  }, [answers])

  const shouldShowQuestion = (
    question: QuestionData,
    answers: { [questionNumber: number]: { label: string; id: number }[] }
  ): boolean => {
      const dependentVariantId = question.dependendByVariant;

      // Если у вопроса нет зависимости, показываем его
      if (dependentVariantId == null || dependentVariantId < 0) return true;

      // Найти вопрос, от которого зависит этот вопрос
      const dependencyQuestion = questions.find(q =>
        q.variants?.some(v => v.id === dependentVariantId)
      );

      if (!dependencyQuestion) return true;

      const dependencyAnswers = answers[dependencyQuestion.number];

      if (!dependencyAnswers || !Array.isArray(dependencyAnswers)) return false;

      // Проверка: выбран ли зависимый вариант
      return dependencyAnswers.some(answer => answer.id === dependentVariantId);
  };

  return (
    <Layout direction="column" style={{ height: '100%', width: '100%', padding: '35px 20% 25px 20%', gap: 20 }}>
      <Layout flex={1} direction="column" style={{ width: '100%', alignContent: 'center', alignItems: 'center' }}>
        <ProgressStepBar steps={steps} activeStepIndex={activeStep} style={{ alignSelf: 'center' }} />
      </Layout>

      <Card style={{ width: '100%', height: '90%', backgroundColor: '#e0e3e2' }}>
        <Layout style={{ height: '100%', width: '100%', padding: 25 }}>
          {activeStep === 0 ? (
            <Layout direction="column" style={{ height: '100%', width: '100%' }}>
              <Text view="primary" size="2xl" style={{ fontWeight: 600 }}>
                Новый опрос
              </Text>
              <Layout direction="row" style={{ width: '100%', paddingTop: '20px', gap: 20 }}>
                <Layout direction="column" style={{ width: '100%', gap: 30 }}>
                  <TextField
                    size="l"
                    value={questionarySettings.name}
                    onChange={(e) =>
                      setQuestionarySettings((prev) => ({ ...prev, name: e.value }))
                    }
                    label="Название"
                    required
                  />
                  <TextField
                    label="Описание"
                    value={questionarySettings.description}
                    onChange={(e) =>
                      setQuestionarySettings((prev) => ({ ...prev, description: e.value }))
                    }
                    type="textarea"
                    rows={3}
                  />
                  <Switch
                    label="Анонимный опрос"
                    size="l"
                    checked={questionarySettings.isAnonymous}
                    onChange={(e) =>
                      setQuestionarySettings((prev) => ({ ...prev, isAnonymous: e.checked }))
                    }
                  />
                  <Switch
                    label="Ограничение по времени"
                    size="l"
                    checked={questionarySettings.hasTimeLimit}
                    onChange={(e) =>
                      setQuestionarySettings((prev) => ({ ...prev, hasTimeLimit: e.checked }))
                    }
                  />
                  {questionarySettings.hasTimeLimit && (
                    <DatePicker
                      type="time"
                      value={questionarySettings.timeLimit}
                      onChange={(e) =>
                        setQuestionarySettings((prev) => ({ ...prev, timeLimit: e.value }))
                      }
                    />
                  )}
                  <Switch
                    label="Многократное прохождение"
                    size="l"
                    checked={questionarySettings.multipleAccess}
                    onChange={(e) =>
                      setQuestionarySettings((prev) => ({ ...prev, multipleAccess: e.checked }))
                    }
                  />
                  <Switch
                    label="Дата окончания опроса"
                    size="l"
                    checked={questionarySettings.hasEndDate}
                    onChange={(e) =>
                      setQuestionarySettings((prev) => ({ ...prev, hasEndDate: e.checked }))
                    }
                  />
                  {questionarySettings.hasEndDate && (
                    <DatePicker
                      value={questionarySettings.endDate}
                      onChange={(e) =>
                        setQuestionarySettings((prev) => ({ ...prev, endDate: e.value }))
                      }
                      label=""
                      minDate={new Date()}
                    />
                  )}
                </Layout>
              </Layout>

              <Layout style={{ alignSelf: 'flex-end', gap: 10 }}>
                <Button label="Далее" onClick={() => setActiveStep(1)} />
              </Layout>
            </Layout>
          ) : activeStep === 1 ? (
            <Layout direction="column" style={{ height: '100%', width: '100%', overflowX: 'auto', maxHeight: '100%' }}>
              <Text view="primary" size="2xl" style={{ fontWeight: 600, paddingBottom: 20 }}>
                Создание вопросов
              </Text>
              <Layout direction="column" style={{ width: '100%', gap: 30, padding: '0 15%' }}>
                {questions.map((question, index) => (
                  <Question
                    key={question.number}
                    number={question.number}
                    questionData={question}
                    onChange={(updatedQuestion:QuestionData) => {
                      const updated = [...questions];
                      updated[index] = updatedQuestion;

                      // Очистим все предыдущие зависимости
                      updated.forEach((q) => {
                        if (q.dependendByVariant !== null && q.dependendByVariant !== undefined) {
                          q.dependendByVariant = null;
                        }
                      });

                      // Переприсвоим зависимости
                      updated.forEach((q) => {
                        q.variants?.forEach((variant) => {
                          if (variant.dependsOnQuestionNumber !== undefined) {
                            const dependentQuestion = updated.find(
                              (q2) => q2.number === variant.dependsOnQuestionNumber
                            );
                            if (dependentQuestion) {
                              dependentQuestion.dependendByVariant = variant.id;
                            }
                          }
                        });
                      });

                      setQuestions(updated);
                    }}
                    allQuestions={questions}
                  />
                ))}

                <Button
                  style={{ width: '100%', height: 60, fontSize: 50, fontWeight: 200 }}
                  view="ghost"
                  label="+"
                  onClick={() => {
                    const nextNumber = questions.length ? questions[questions.length - 1].number + 1 : 1;
                    setQuestions([
                      ...questions,
                      {
                        number: nextNumber,
                        text: '',
                        type: { id: 1, label: 'Варианты ответа' },
                        variants: [{ id: Date.now(), text: '', checked: false,  }],
                        isMultiple: false,
                        isLogic: false,
                        dependendByVariant: -1,
                        sliderValue: 0,
                        max: 5,
                        step: 1,
                      },
                    ]);
                  }}
                />
                <Layout style={{ alignSelf: 'flex-end', gap: 10 }}>
                  <Button label="Далее" onClick={() => setActiveStep(2)} />
                </Layout>
              </Layout>
            </Layout>
          ) : activeStep === 2 ? (
            <Layout direction="column" style={{ height: '100%', width: '100%', overflowY: 'auto', maxHeight: '80vh', gap: 20 }}>
              <Text view="primary" size="2xl" style={{ fontWeight: 600 }}>Предпросмотр анкеты</Text>
              <Layout direction="column" style={{ padding: '0 20%', gap: 20 }}>
                <Card style={{ width: '100%', padding: 24, background: 'white' }}>
                  <Layout direction="column" style={{ gap: 10 }}>
                    <Text view="primary" size="l">Название: {questionarySettings.name}</Text>
                    <Text view="primary" size="l">Описание: {questionarySettings.description}</Text>
                  </Layout>
                </Card>
                {questions.filter(q => shouldShowQuestion(q, answers)).map((q) => (
                  <QuestionInAction
                    key={q.number}
                    number={q.number}
                    questionData={q}
                    allAnswers={answers}
                    onAnswerChange={(selected) => {
                      setAnswers((prev) => ({
                        ...prev,
                        [q.number]: selected,
                      }));
                    }}
                  />
                ))}
                <Layout style={{ alignSelf: 'flex-end', gap: 10 }}>
                  <Button label="Назад" onClick={() => setActiveStep(1)} />
                  <Button label="Подтвердить" onClick={() => questionsApi.postNewQuestionary(questionarySettings, questions)} />
                </Layout>
              </Layout>
                
            </Layout>
          ) : null}
        </Layout>
      </Card>
    </Layout>
  );
};

export default CreateQuestionaryPage;