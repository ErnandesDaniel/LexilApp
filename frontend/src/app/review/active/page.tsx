'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Typography, Card, Space, Row, Col, Alert } from 'antd';
import { mockWords, MockWord } from '@/data/mockWords';

const { Title, Text } = Typography;

export default function ActiveReviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [wrongAnswer, setWrongAnswer] = useState('');

  const currentWord = mockWords[currentIndex];
  const isLastWord = currentIndex >= mockWords.length - 1;

  const handleSubmit = () => {
    if (input.toLowerCase().trim() === currentWord.english.toLowerCase()) {
      // Correct answer
      if (isLastWord) {
        // Finish
      } else {
        setCurrentIndex(prev => prev + 1);
        setInput('');
        setShowResult(false);
      }
    } else {
      // Wrong answer
      setWrongAnswer(input);
      setShowResult(true);
    }
  };

  const handleCorrectAnyway = () => {
    // Treat as correct (for typos)
    if (isLastWord) {
      // Finish
    } else {
      setCurrentIndex(prev => prev + 1);
      setInput('');
      setShowResult(false);
    }
  };

  const handleTryAgain = () => {
    setInput('');
    setWrongAnswer('');
    setShowResult(false);
  };

  if (!currentWord) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Title level={2}>Повторение завершено!</Title>
        <p>Вы прошли все слова в активном словаре.</p>
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
              <Title level={4}>{currentWord.russian}</Title>
              <Text>{currentWord.exampleRussian}</Text>
            </div>
          </Col>
          <Col xs={24} md={12}>
            {showResult ? (
              <div>
                <Alert
                  message={`Ваш ответ: "${wrongAnswer}". Правильный ответ: "${currentWord.english}"`}
                  type="error"
                  style={{ marginBottom: '10px' }}
                />
                <Space>
                  <Button onClick={handleCorrectAnyway} type="primary">
                    Правильно
                  </Button>
                  <Button onClick={handleTryAgain}>
                    Еще раз
                  </Button>
                </Space>
              </div>
            ) : (
              <div>
                <Text>Введите английское слово:</Text>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Введите ответ..."
                  onPressEnter={handleSubmit}
                  style={{ marginTop: '10px' }}
                />
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  disabled={!input.trim()}
                  style={{ marginTop: '10px' }}
                >
                  Проверить
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
}
