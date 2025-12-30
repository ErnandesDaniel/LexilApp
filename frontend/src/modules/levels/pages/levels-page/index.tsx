'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import '@/modules/levels/pages/levels-page/index.scss';
import LevelsList from '@/modules/levels/components/levels-list';

const LevelsPage = () => {
  return (
    <div className="levels_page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Уровни повторения</h1>
        <Link href="/" passHref>
          <Button>Назад на главную</Button>
        </Link>
      </div>
      <LevelsList />
    </div>
  );
};

export default LevelsPage;
