'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Typography, Card, Space, Row, Col } from 'antd';
import { mockWords, MockWord } from '@/data/mockWords';

const { Title, Text } = Typography;

export default function PassiveReviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentWord = mockWords[currentIndex];
  const isLastWord = currentIndex >= mockWords.length - 1;

  const handleShowTranslation = () => {
    setShowTranslation(true);
    setShowResult(true);
  };

  const handleResponse = (remembered: boolean) => {
    // For simplicity, just go to next, regardless of answer
    if (isLastWord) {
      // Finish
      setCurrentIndex(mockWords.length); // End
    } else {
      setCurrentIndex(prev => prev + 1);
      setShowTranslation(false);
      setShowResult(false);
    }
  };

  if (!currentWord) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Title level={2}>Повторение завершено!</Title>
        <p>Вы прошли все слова в пассивном словаре.</p>
        <Space>
          <Link href="/review">
            <Button>Вернуться к выбору</Button>
          </Link>
          <Link href="/">
            <Button type="primary">На главную</Button>
          </Link>
        </Space>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/review">
          <Button>Назад к выбору словарей</Button>
        </Link>
      </div>

      <Card
        title={`Слово ${currentIndex + 1} из ${mockWords.length}`}
        style={{ marginBottom: '20px' }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <div>
              <Title level={4}>{currentWord.english}</Title>
              <Text>{currentWord.exampleEnglish}</Text>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div
              style={{
                filter: showTranslation ? 'none' : 'blur(8px)',
                pointerEvents: showTranslation ? 'auto' : 'none'
              }}
            >
              <Title level={4}>{currentWord.russian}</Title>
              <Text>{currentWord.exampleRussian}</Text>
            </div>
            {showResult ? (
              <Space style={{ marginTop: '20px' }}>
                <Button onClick={() => handleResponse(true)} type="primary">
                  Помню
                </Button>
                <Button onClick={() => handleResponse(false)}>
                  Не помню
                </Button>
              </Space>
            ) : (
              <Button
                onClick={handleShowTranslation}
                type="primary"
                style={{ marginTop: '20px' }}
              >
                Показать
              </Button>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
}
