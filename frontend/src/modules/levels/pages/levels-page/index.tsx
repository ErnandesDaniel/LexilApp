'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Button, InputNumber, Card, Typography } from 'antd';
import '@/modules/levels/pages/levels-page/index.scss';
import LevelsList from '@/modules/levels/components/levels-list';
import { getStudyWordCount, setStudyWordCount } from '@/api/levels';

const { Title, Text } = Typography;

const LevelsPage = () => {
  const [studyWordCount, setLocalStudyWordCount] = useState(getStudyWordCount());

  const handleStudyWordCountChange = (value: number | null) => {
    if (value !== null) {
      setStudyWordCount(value);
      setLocalStudyWordCount(value);
    }
  };

  return (
    <div className="levels_page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Уровни повторения</h1>
        <Link href="/" passHref>
          <Button>Назад на главную</Button>
        </Link>
      </div>
      
      <Card title="Настройки изучения" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Text>Количество слов для ознакомления:</Text>
          <InputNumber 
            min={1}
            max={50}
            value={studyWordCount}
            onChange={handleStudyWordCountChange}
            style={{ width: '80px' }}
          />
          <Text>слов</Text>
        </div>
      </Card>
      
      <LevelsList />
    </div>
  );
};

export default LevelsPage;
