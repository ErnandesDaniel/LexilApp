'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button, Typography, Card, Space, Row, Col } from 'antd';
import { mockWords, MockWord } from '@/data/mockWords';
import { getStudyWordCount } from '@/api/levels';

const { Title, Text } = Typography;

export default function PassiveStudyPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [wrongWords, setWrongWords] = useState<MockWord[]>([]);
  const [isReviewingWrongWords, setIsReviewingWrongWords] = useState(false);
  const [phase, setPhase] = useState<'familiarization' | 'testing'>('familiarization'); // familiarization or testing

  const studyWordCount = getStudyWordCount();
  const wordsToStudy = mockWords.slice(0, studyWordCount);
  const currentWords = isReviewingWrongWords ? wrongWords : wordsToStudy;
  const currentWord = currentWords[currentIndex];

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (phase === 'familiarization') {
      if (e.key === 'ArrowRight') {
        handleNextWord();
      } else if (e.key === 'ArrowLeft') {
        handlePrevWord();
      }
    }
  }, [phase, currentIndex, isReviewingWrongWords, wrongWords, studyWordCount]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleNextWord = () => {
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowTranslation(false);
      setShowResult(false);
    } else if (phase === 'familiarization' && !isReviewingWrongWords) {
      // Move to testing phase
      setPhase('testing');
      setCurrentIndex(0);
      setShowTranslation(false);
      setShowResult(false);
    } else if (isReviewingWrongWords && currentIndex >= wrongWords.length - 1) {
      // Finished reviewing wrong words
      setWrongWords([]);
      setIsReviewingWrongWords(false);
      setCurrentIndex(0);
      setShowTranslation(false);
      setShowResult(false);
    }
  };

  const handlePrevWord = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowTranslation(false);
      setShowResult(false);
    }
  };

  const handleShowTranslation = () => {
    setShowTranslation(true);
    setShowResult(true);
  };

  const handleResponse = (remembered: boolean) => {
    if (!remembered) {
      // Add to wrong words if not already there
      if (!wrongWords.some(w => w.id === currentWord.id)) {
        setWrongWords(prev => [...prev, currentWord]);
      }
    }

    // Move to next word
    if (currentIndex < currentWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowTranslation(false);
      setShowResult(false);
    } else {
      // Last word - check if need to review wrong words
      if (wrongWords.length > 0 && !isReviewingWrongWords) {
        setIsReviewingWrongWords(true);
        setCurrentIndex(0);
        setShowTranslation(false);
        setShowResult(false);
      } else {
        // Actually finish
        setWrongWords([]);
        setIsReviewingWrongWords(false);
        setCurrentIndex(currentWords.length); // End
        setShowTranslation(false);
        setShowResult(false);
      }
    }
  };

  const resetStudy = () => {
    setCurrentIndex(0);
    setShowTranslation(false);
    setShowResult(false);
    setWrongWords([]);
    setIsReviewingWrongWords(false);
    setPhase('familiarization');
  };

  if (!currentWord) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Title level={2}>Изучение завершено!</Title>
        <p>Вы прошли все слова в пассивном словаре.</p>
        <Space>
          <Button onClick={resetStudy}>Начать заново</Button>
          <Link href="/study">
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
        <Link href="/study">
          <Button>Назад к выбору режима</Button>
        </Link>
      </div>

      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              {phase === 'familiarization' ? 'Ознакомление' : 'Тестирование'} - Слово {currentIndex + 1} из {currentWords.length}
            </span>
            {phase === 'familiarization' && (
              <span style={{ fontSize: '14px', color: '#666' }}>
                Используйте ← → для навигации
              </span>
            )}
          </div>
        }
        style={{ marginBottom: '20px' }}
      >
        {phase === 'familiarization' ? (
          // Familiarization phase - show both languages
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <div>
                <Title level={4}>{currentWord.english}</Title>
                <Text type="secondary">{currentWord.transcription}</Text>
                <div style={{ marginTop: '10px' }}>
                  <Text>{currentWord.exampleEnglish}</Text>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div>
                <Title level={4}>{currentWord.russian}</Title>
                <div style={{ marginTop: '10px' }}>
                  <Text>{currentWord.exampleRussian}</Text>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          // Testing phase - flashcards
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
        )}
      </Card>

      {/* Navigation buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <Button onClick={handlePrevWord} disabled={currentIndex === 0}>
          Назад
        </Button>
        <Button 
          onClick={handleNextWord} 
          disabled={currentIndex >= currentWords.length - 1 && phase === 'testing'}
        >
          Далее
        </Button>
      </div>
    </div>
  );
}
