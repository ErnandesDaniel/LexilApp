'use client';
import React from 'react';
import '@/modules/levels/pages/levels-page/index.scss';
import LevelsList from '@/modules/levels/components/levels-list';

const LevelsPage = () => {
  return (
    <div className="levels_page">
      <h1>Уровни повторения</h1>
      <LevelsList />
    </div>
  );
};

export default LevelsPage;
