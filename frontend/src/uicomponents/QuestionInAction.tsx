import React, { useEffect, useState } from 'react';
import { Card } from '@consta/uikit/Card';
import { Layout } from '@consta/uikit/Layout';
import { Text } from '@consta/uikit/Text';
import { Checkbox } from '@consta/uikit/Checkbox';
import { TextField } from '@consta/uikit/TextField';
import { Slider } from '@consta/uikit/Slider';
import { RadioGroup } from '@consta/uikit/RadioGroup';

type Item = {
  label: string;
  id: number;
};

type Variant = {
  id: number;
  text: string;
  checked?: boolean;
};

type QuestionData = {
  number: number;
  text: string;
  type: Item;
  variants?: Variant[];
  isMultiple?: boolean;
  sliderValue?: number;
  max?: number;
  step?: number;
};

type Props = {
  number: number;
  questionData: QuestionData;
};

const QuestionInAction = ({ number, questionData, allAnswers, onAnswerChange }) => {
  const {
    text="",
    type={},
    variants = [],
    isMultiple = false,
    sliderValue = 0,
    max = 10,
    step = 1,
  } = questionData;

  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [singleValue, setSingleValue] = useState<number | null>(null);
  const [customAnswer, setCustomAnswer] = useState('');
  const [sliderVal, setSliderVal] = useState(sliderValue);

  const handleMultiSelect = (variantId: number, checked: boolean) => {
    setSelectedValues((prev) =>
      checked ? [...prev, variantId] : prev.filter((id) => id !== variantId)
    );
  };

  const radioItems = variants.map((v) => ({ label: v.text, id: v.id }));

  useEffect(() => {
    if (type.id === 1) {
      if (isMultiple) {
        onAnswerChange({
          selectedVariants: selectedValues
        });
      } else if (singleValue !== null) {
        onAnswerChange({
          selectedVariants: [singleValue]
        });
      }
    } else if (type.id === 2) {
      onAnswerChange({
        selectedVariants: [],
        typedText: customAnswer
      });
    } else if (type.id === 3) {
      onAnswerChange({
        selectedVariants: [],
        sliderValue: sliderVal
      });
    }
  }, [selectedValues, singleValue, customAnswer, sliderVal]);

  return (
    <Card style={{ width: '100%', padding: 24, background: 'white' }}>
      <Layout direction="column" style={{gap: 10}}>
        <Text view="primary" size="xl" weight="bold">
          Вопрос {number}
        </Text>

        <Text view="primary" size="l" style={{paddingBottom: 10}}>
          {text}
        </Text>


        {type.id === 1 && (
          <>
            {isMultiple ? (
              variants.map((variant) => (
                <Checkbox
                  key={variant.id}
                  label={variant.text}
                  checked={selectedValues.includes(variant.id)}
                  onChange={({ checked }) => handleMultiSelect(variant.id, checked)}
                />
              ))
            ) : (
              <RadioGroup
                value={singleValue}
                items={radioItems}
                //getItemKey={(item) => item.id}
                getItemLabel={(item) => item.label}
                onChange={({ value }) => setSingleValue(value ?? null)}
              />
              )}
          </>
        )}

        {type.id === 2 && (
          <TextField
            label="Ваш ответ"
            type="textarea"
            value={customAnswer}
            onChange={(e) => setCustomAnswer(e.value)}
            rows={3}
            style={{ width: '100%' }}
          />
        )}

        {type.id === 3 && (
          <>
            <Text>{sliderVal}</Text>
            <Slider
              value={sliderVal}
              onChange={(e) => setSliderVal(e.value)}
              min={0}
              max={max}
              step={step}
              view='division'
            />
          </>
        )}
      </Layout>
    </Card>
  );
};

export default QuestionInAction;