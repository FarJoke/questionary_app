import React, { useState, useEffect } from 'react';
import { Layout } from '@consta/uikit/Layout';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import QuestionInAction from '../uicomponents/QuestionInAction';
import { useParams, useSearchParams } from 'react-router-dom';
import { questionsApi } from '../utils/Questions';

type Item = {
  label: string;
  id: number;
};

type Variant = {
  id: number;
  text: string;
  checked?: boolean;
  dependsOnQuestionNumber?: number;
};

type QuestionData = {
  number: number;
  text: string;
  type: Item;
  isMultiple?: boolean;
  isLogic?: boolean;
  variants?: Variant[];
  sliderValue?: number;
  max?: number;
  step?: number;
  dependendByVariant?: number | null;
};

const QuestionaryPage = () => {
  //const [answers, setAnswers] = useState<{ [questionNumber: number]: { label: string; id: number }[] }>({});
  const [answers, setAnswers] = useState<{
  [questionNumber: number]: {
    selectedVariants: number[];
    typedText?: string;
    sliderValue?: number;
  };
}>({});

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // 🧪 Моковые данные анкеты
  const [questions, setQuestions] = useState<QuestionData[]>([])

  //questionsApi.fetchQuestionaryById(id).then((resp)=>{setQuestions(resp.questions)})
  useEffect(()=>{
    questionsApi.fetchQuestionaryById(id).then((resp)=>{setQuestions(resp.questions)})
  }, [])

  const handleSaveQuestions = () => {
    try {
        const payload = {
        answers: Object.entries(answers).map(([questionNumber, data]) => ({
            questionNumber: Number(questionNumber),
            selectedVariants: data.selectedVariants || [],
            typedText: data.typedText || '',
            sliderValue: data.sliderValue || 0,
        })),
        };

        const response = questionsApi.postAnswers(id, payload)

        if (response) {
            //alert("Ответы успешно сохранены!");
            setFinishFlag(true)
        } else {
            console.error("Ошибка при отправке ответов");
        }
    } catch (err) {
        console.error(err);
    }
  }
  // 🔁 Проверка, показывать ли вопрос
  const shouldShowQuestion = (
  question: QuestionData,
  answers: {
    [questionNumber: number]: {
      selectedVariants: number[];
      typedText?: string;
      sliderValue?: number;
    };
  },
  questions: QuestionData[]
): boolean => {
  const dependentVariantId = question.dependendByVariant;

  // Если у вопроса нет зависимости, показываем его
  if (dependentVariantId == null || dependentVariantId < 0) return true;

  // Найти вопрос, содержащий вариант с нужным ID
  const dependencyQuestion = questions.find(q =>
    q.variants?.some(v => v.id === dependentVariantId)
  );

  if (!dependencyQuestion) return true;

  const dependencyAnswer = answers[dependencyQuestion.number];

  if (!dependencyAnswer) return false;
  
  let flag = false
  //@ts-ignore
  if (dependencyAnswer.selectedVariants[0]?.id === dependentVariantId) flag= true
  //@ts-ignore
  if (dependencyAnswer.selectedVariants[1]?.id === dependentVariantId) flag= true
  //@ts-ignore
  if (dependencyAnswer.selectedVariants[2]?.id === dependentVariantId) flag= true
  //@ts-ignore
  if (dependencyAnswer.selectedVariants[3]?.id === dependentVariantId) flag= true
  //@ts-ignore
  if (dependencyAnswer.selectedVariants[4]?.id === dependentVariantId) flag= true
  return flag;
};

  const [finishFlag, setFinishFlag] = useState(false)

  return (
    <Layout direction="column" style={{ padding: '40px 20%', gap: 24, overflowX: "auto", height: "100%"}}>
      <Text view="primary" size="2xl" weight="bold">Анкета</Text>

      <Card style={{ padding: 24, backgroundColor: '#e0e3e2' }}>
        {!finishFlag ?
        <Layout direction="column" style={{ gap: 16}}>
          {questions.filter((q) => shouldShowQuestion(q, answers, questions)).map((q) => (
            <QuestionInAction
              key={q.number}
              number={q.number}
              questionData={q}
              allAnswers={answers}
              onAnswerChange={(data) => {
                setAnswers((prev) => ({
                    ...prev,
                    [q.number]: {
                    selectedVariants: data.selectedVariants || [],
                    typedText: data.typedText,
                    sliderValue: data.sliderValue,
                    },
                }));
                }}
            />
          ))}

          <Layout style={{ marginTop: 20, justifySelf:"flex-end" }}>
            <Button label="Отправить" onClick={handleSaveQuestions} />
          </Layout>
        </Layout>
        :
          <Layout direction= "column" style={{gap: 20, height: "100%"}}>

              <Text view='primary' size="2xl" style={{fontWeight: 600}}>
                  Ваши ответы сохранены!
              </Text>
              <Text view='secondary' size="xl" style={{fontWeight: 600}}>
                  Спасибо, что приняли участие в опросе!
              </Text>    

          </Layout>
        }
      </Card>
    </Layout>
  );
};

export default QuestionaryPage;