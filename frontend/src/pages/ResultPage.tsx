import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@consta/uikit/Layout';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { ProgressStepBar } from '@consta/uikit/ProgressStepBar';
import { ProgressSpin } from '@consta/uikit/ProgressSpin';

import { questionsApi } from '../utils/Questions';

const ResultPage = () => {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const questId = searchParams.get('id');

  useEffect(() => {
    if (questId) {
      setLoading(true);
      questionsApi.getResults(questId).then((resp) => {
        setResults(resp);
        setLoading(false);
      });
    }
  }, [questId]);

  return (
    <Layout
      direction="column"
      style={{
        height: '100%',
        width: '100%',
        padding: '35px 160px 25px 160px',
        gap: 20,
      }}
    >
      <Text size="2xl" weight="bold">
        Результаты опроса
      </Text>

      <Card style={{ width: '100%', backgroundColor: '#e0e3e2', padding: 24 }}>
        {loading && <ProgressSpin size="m" />}
        {!loading && results && results.questions.length === 0 && (
          <Text>Нет данных по результатам.</Text>
        )}

        {!loading &&
          results &&
          results.questions.map((q) => (
            <Card
              key={q.number}
              style={{
                backgroundColor: 'white',
                marginBottom: 24,
                padding: 16,
              }}
            >
              <Layout direction="column" style={{gap:4}}>
                <Text view="primary" size="l" weight="semibold">
                  Вопрос {q.number}: {q.text}
                </Text>

                {/* Варианты с подсчётом */}
                {q.variants?.length > 0 && (
                  <Layout direction="column" style={{ marginTop: 8, gap: 4 }}>
                    {q.variants.map((v) => (
                      <Text key={v.id}>
                        {v.text} — <strong>{v.count}</strong> ответ(ов)
                      </Text>
                    ))}
                  </Layout>
                )}

                {/* Слайдер значения */}
                {q.sliderValues?.length > 0 && (
                  <Layout direction="column" style={{ marginTop: 12, gap: 4 }}>
                    <Text weight="semibold">Значения слайдера:</Text>
                    {q.sliderValues.map((sv, idx) => (
                      <Text key={idx}>
                        {sv.value} — <strong>{sv.count}</strong> раз(а)
                      </Text>
                    ))}
                  </Layout>
                )}

                {/* Тексты свободного ввода */}
                {q.texts?.length > 0 && (
                  <Layout direction="column" style={{ marginTop: 12, gap: 4 }}>
                    <Text weight="semibold">Свободные ответы:</Text>
                    {q.texts.map((t, idx) => (
                      <Text key={idx} view="secondary">
                        «{t}»
                      </Text>
                    ))}
                  </Layout>
                )}
              </Layout>
            </Card>
          ))}
      </Card>
    </Layout>
  );
};

export default ResultPage;