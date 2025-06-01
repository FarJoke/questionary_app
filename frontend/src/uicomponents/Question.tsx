import { useState, useEffect } from 'react';
import { Layout } from '@consta/uikit/Layout';
import { Card } from '@consta/uikit/Card';
import { Tabs } from '@consta/uikit/Tabs';
import { Text } from '@consta/uikit/Text';
import { TextField } from '@consta/uikit/TextField';
import { Switch } from '@consta/uikit/Switch';
import { Button } from '@consta/uikit/Button';
import { Select } from '@consta/uikit/Select';
import { Slider } from '@consta/uikit/Slider';
import deleteIcon from '../assets/deleteIcon';

type QuestionType = {
  id: number;
  label: string;
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

type QuestionProps = {
  number: number;
  questionData: QuestionData;
  onChange: (data: QuestionData) => void;
  allQuestions?: { number: number }[]; // для логики зависимостей
};

const Question = ({
  number,
  questionData,
  onChange,
  allQuestions = [],
}: QuestionProps) => {
  const items = [
    { label: 'Варианты ответа', id: 1 },
    { label: 'Свой ответ', id: 2 },
    { label: 'Шкала значений', id: 3 },
  ];

  const [questType, setQuestType] = useState(questionData.type || items[0]);
  const [questText, setQuestText] = useState(questionData.text || '');
  const [variants, setVariants] = useState<Variant[]>(
    questionData.variants || [{ id: 1, checked: false, text: '' }]
  );
  const [sliderValue, setSliderValue] = useState(questionData.sliderValue || 20);
  const [numberForSliderValue, setNumberForSliderValue] = useState(questionData.max || 5);
  const [step, setStep] = useState(questionData.step || 1);
  const [isMultiple, setIsMultiple] = useState(questionData.isMultiple || false);
  const [isLogic, setIsLogic] = useState(questionData.isLogic || false);
  const [dependendByVariant, setIsDependendByVariant] = useState(questionData.dependendByVariant || -1);

  useEffect(() => {
    onChange({
      number,
      type: questType,
      text: questText,
      variants,
      sliderValue,
      max: numberForSliderValue,
      step,
      isMultiple,
      isLogic,
      dependendByVariant,
    });
  }, [
    questType,
    questText,
    variants,
    sliderValue,
    numberForSliderValue,
    step,
    isMultiple,
    isLogic,
    dependendByVariant,
  ]);

  const addVariant = () => {
    setVariants([
      ...variants,
      { id: Date.now(), checked: false, text: '', dependsOnQuestionNumber: undefined },
    ]);
  };

  const deleteVariant = (id: number) => {
    setVariants(variants.filter((v) => v.id !== id));
  };

  const handleTextChange = (id: number) => (e) => {
    setVariants(
      variants.map((v) => (v.id === id ? { ...v, text: e.value } : v))
    );
  };

  const handleCheckboxChange = (id: number) => (e) => {
    setVariants(
      variants.map((v) => (v.id === id ? { ...v, checked: e.checked } : v))
    );
  };

  const handleLogicSelect = (id: number) => (e) => {
    setVariants(
      variants.map((v) =>
        v.id === id ? { ...v, dependsOnQuestionNumber: e.value?.number } : v
      )
    );
  };

  // Список вопросов, на которые можно сослаться (исключая текущий)
  const dependentOptions = allQuestions
    .filter((q) => q.number > number)
    .map((q) => ({
      label: `Вопрос ${q.number}`,
      number: q.number,
    }));

  return (
    <Card style={{ width: '100%', background: 'white', padding: 20, gap: 40 }}>
      <Layout direction="row" style={{ gap: 20 }}>
        <Layout style={{ width: '20%' }}>
          <Tabs
            items={items}
            value={questType}
            onChange={(e) => setQuestType(e.value)}
            linePosition="right"
          />
        </Layout>

        <Layout direction="column" style={{ gap: 10, width: '800px' }}>
          <Text view="primary" size="2xl">
            Вопрос {number}
          </Text>
          <TextField
            label="Текст вопроса"
            type="textarea"
            rows={2}
            value={questText}
            onChange={(e) => setQuestText(e.value)}
            required
            style={{ width: '100%' }}
          />

          {questType.id === 1 && (
            <>
              <Layout style={{ gap: 20, marginBottom: 10 }}>
                <Switch
                  label="Множественный выбор"
                  size="l"
                  checked={isMultiple}
                  onChange={(e) => setIsMultiple(e.checked)}
                />
                <Switch
                  label="Вариативная логика"
                  size="l"
                  checked={isLogic}
                  onChange={(e) => setIsLogic(e.checked)}
                />
              </Layout>

              {variants.map((variant) => (
                <Layout key={variant.id} style={{ gap: 8, alignItems: 'center' }}>
                  <Button
                    iconLeft={deleteIcon}
                    view="clear"
                    style={{ marginTop: 28 }}
                    onClick={() => deleteVariant(variant.id)}
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
                  {isLogic && (
                    <Select
                      label="Зависимый вопрос"
                      placeholder="Не выбрано"
                      items={dependentOptions}
                      getItemKey={(item) => item.number}
                      getItemLabel={(item) => item.label}
                      value={dependentOptions.find(
                        (o) => o.number === variant.dependsOnQuestionNumber
                      )}
                      onChange={handleLogicSelect(variant.id)}
                      style={{ width: 250 }}
                    />
                  )}
                </Layout>
              ))}

              <Button
                label="Добавить вариант ответа"
                style={{ width: '40%', marginLeft: '60%', marginTop: 20 }}
                onClick={addVariant}
              />
            </>
          )}

          {questType.id === 2 && (
            <TextField
              placeholder="Поле для развернутого ответа"
              type="textarea"
              disabled
              rows={2}
              style={{ width: '100%' }}
            />
          )}

          {questType.id === 3 && (
            <Layout direction="column" style={{ gap: 20 }}>
              <Layout direction="row" style={{ gap: 10 }}>
                <TextField
                  label="Максимальное значение"
                  style={{ width: '40%' }}
                  value={numberForSliderValue.toString()}
                  onChange={(e) =>
                    setNumberForSliderValue(e.value ? parseFloat(e.value) : 0)
                  }
                />
                <TextField
                  type="number"
                  label="Шаг"
                  style={{ width: '30%' }}
                  value={step.toString()}
                  onChange={(e) =>
                    setStep(e.value ? parseFloat(e.value) : 0)
                  }
                />
              </Layout>

              <Slider
                label={`Значение ${sliderValue}`}
                onChange={(e) => setSliderValue(e.value)}
                value={sliderValue}
                max={numberForSliderValue}
                step={step}
              />
            </Layout>
          )}
        </Layout>
      </Layout>
    </Card>
  );
};

export default Question;