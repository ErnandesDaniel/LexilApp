
'use client';
import React from 'react';
import Link from 'next/link';
import { Button, Space, Typography } from 'antd';
import '@/app/layout.scss';

const { Title } = Typography;

export default function Home() {
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
        LexilApp - Изучение слов
      </Title>
      <Space direction="vertical" size="large" style={{ width: '300px' }}>
        <Link href="/levels" passHref>
          <Button type="primary" block size="large">
            Редактирование уровней повторения
          </Button>
        </Link>
        <Link href="/study" passHref>
          <Button type="default" block size="large">
            Изучение новых слов
          </Button>
        </Link>
        <Link href="/review" passHref>
          <Button type="default" block size="large">
            Повторение слов
          </Button>
        </Link>
      </Space>
    </div>
  );
}
