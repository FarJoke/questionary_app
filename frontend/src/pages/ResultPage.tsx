import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@consta/uikit/Layout';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { ProgressSpin } from '@consta/uikit/ProgressSpin';

import { questionsApi } from '../utils/Questions';
import { TextField } from '@consta/uikit/TextField';
import { Pie } from '@consta/charts/Pie';


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
        padding: '35px 20% 25px 20%',
        gap: 20,
        overflowX: "auto"
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

        {results && results.questions && results.questions[0] &&
          <Card
              style={{
                backgroundColor: 'white',
                marginBottom: 24,
                padding: 16,
              }}
            >
              <Layout direction="column" style={{gap:4}}>
                <Text view="primary" size="l" weight="semibold">
                  Опрос пройден {results.questions[0].sliderValues[0].count} раз(а)
                </Text>

              </Layout>
            
          </Card>
        }

        {!loading &&
          results &&
          results.questions.map((q) => {
            console.log(q)
            let data
            if (q.variants?.length > 0 && q.variants[0].count !== 0) {
              data = q.variants.map((v) => ({type: v.text, value: v.count}))
            }
            if (q.sliderValues?.length > 0 && (q.sliderValues[0].value !== 0 )) {
              data = q.sliderValues.map((sv) => ({type: sv.value, value: sv.count}))
            }
            return(
              <Card
                key={q.number}
                style={{
                  backgroundColor: 'white',
                  marginBottom: 24,
                  padding: 16,
                }}
              >
                <Layout direction="column" style={{gap:4, padding: 10}}>
                  <Text view="primary" size="l" weight="semibold">
                    Вопрос {q.number}: {q.text}
                  </Text>

                  {/* Варианты с подсчётом */}
                  {q.variants?.length > 0 && q.variants[0].count !== 0 && (
                    <Layout direction="column" style={{ marginTop: 8, gap: 4, padding: 5 }}>

                      {data && 
                        <Pie style={{
                                width: "40%",
                                height: '300px',
                            }}
                            data={data}
                            angleField="value"
                            colorField="type"
                        />
                      }
                    </Layout>
                  )}

                  {/* Слайдер значения */}
                  {q.sliderValues?.length > 0 && (q.sliderValues[0].value !== 0 ) && (
                    <Layout direction="column" style={{ marginTop: 12, gap: 4 }}>
                      <Text weight="semibold">Значения шкалы оценок:</Text>
                        <Layout direction="column" style={{ marginTop: 8, gap: 4, padding: 5 }}>

                        {data && 
                          <Pie style={{
                                  width: "40%",
                                  height: '290px',
                              }}
                              data={data}
                              angleField="value"
                              colorField="type"
                          />
                        }
                      </Layout>
                    </Layout>
                  )}

                  {/* Тексты свободного ввода */}
                  {q.texts?.length > 0 && (
                    <Layout direction="column" style={{ marginTop: 12, gap: 4 }}>
                      <Text weight="semibold">Свободные ответы:</Text>
                      <Layout direction='column' style={{width: "100%", maxHeight: 200, overflowX: "auto", gap: 4}}>
                        {q.texts.map((t, idx) => (
                        <TextField key={idx} value={t}>

                        </TextField>
                      ))}
                      </Layout>
                      
                    </Layout>
                  )}
                </Layout>
              </Card>
            )}
          )}
      </Card>
    </Layout>
  );
};

export default ResultPage;