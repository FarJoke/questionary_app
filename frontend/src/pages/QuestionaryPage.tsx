import React, { useState, useEffect } from 'react';
import { Layout } from '@consta/uikit/Layout';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';

import QuestionInAction from '../uicomponents/QuestionInAction';

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
  const [answers, setAnswers] = useState<{ [questionNumber: number]: { label: string; id: number }[] }>({});

  // 🧪 Моковые данные анкеты
  const questions: QuestionData[] = [
    {
      number: 1,
      text: 'Какие цвета вам нравятся?',
      type: { id: 1, label: 'Варианты ответа' },
      isMultiple: true,
      variants: [
        { id: 101, text: 'Красный' },
        { id: 102, text: 'Синий' },
        { id: 103, text: 'Зелёный' },
      ],
    },
    {
      number: 2,
      text: 'Почему вы выбрали синий?',
      type: { id: 2, label: 'Текстовый ответ' },
      dependendByVariant: 102, // показываем, если выбран синий (id = 102)
    },
    {
      number: 3,
      text: 'Насколько вы довольны цветами?',
      type: { id: 3, label: 'Слайдер' },
      sliderValue: 5,
      max: 10,
      step: 1,
    },
  ];

  // 🔁 Проверка, показывать ли вопрос
  const shouldShowQuestion = (
    question: QuestionData,
    answers: { [questionNumber: number]: { label: string; id: number }[] }
  ): boolean => {
    const dependentVariantId = question.dependendByVariant;

    if (dependentVariantId == null || dependentVariantId < 0) return true;

    const dependencyQuestion = questions.find((q) =>
      q.variants?.some((v) => v.id === dependentVariantId)
    );

    if (!dependencyQuestion) return true;

    const dependencyAnswers = answers[dependencyQuestion.number];

    if (!dependencyAnswers || !Array.isArray(dependencyAnswers)) return false;

    return dependencyAnswers.some((answer) => answer.id === dependentVariantId);
  };

  const handleSubmit = () => {
    console.log('Ответы пользователя:', answers);
    alert('Анкета отправлена! Проверьте консоль.');
  };

  return (
    <Layout direction="column" style={{ padding: '40px 20%', gap: 24, overflowX: "auto", height: "100%"}}>
      <Text view="primary" size="2xl" weight="bold">Анкета</Text>

      <Card style={{ padding: 24, backgroundColor: '#e0e3e2' }}>
        <Layout direction="column" style={{ gap: 16}}>
          {questions.filter((q) => shouldShowQuestion(q, answers)).map((q) => (
            <QuestionInAction
              key={q.number}
              number={q.number}
              questionData={q}
              allAnswers={answers}
              onAnswerChange={(selected) => {
                setAnswers((prev) => ({
                  ...prev,
                  [q.number]: selected.map((val: any) =>
                    typeof val === 'object'
                      ? val
                      : typeof val === 'string'
                      ? { label: val, id: -1 }
                      : { label: '', id: val }
                  ),
                }));
              }}
            />
          ))}

          <Layout style={{ marginTop: 20, justifySelf:"flex-end" }}>
            <Button label="Отправить" onClick={handleSubmit} />
          </Layout>
        </Layout>
      </Card>
    </Layout>
  );
};

export default QuestionaryPage;