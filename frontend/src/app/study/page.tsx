'use client';
import React from 'react';
import { Typography } from 'antd';
import Link from 'next/link';
import { Button } from 'antd';

const { Title } = Typography;

export default function StudyPage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      padding: '20px'
    }}>
      <Title level={2} style={{ marginBottom: '40px' }}>
        Изучение новых слов
      </Title>
      <p>Функционал для изучения новых слов будет добавлен позже.</p>
      <Link href="/" passHref>
        <Button type="primary" style={{ marginTop: '20px' }}>
          Назад на главную
        </Button>
      </Link>
    </div>
  );
}
