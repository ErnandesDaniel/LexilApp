'use client';
import React from 'react';
import Link from 'next/link';
import { Button, Space, Typography } from 'antd';

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
      <p style={{ marginBottom: '30px', textAlign: 'center' }}>
        Выберите режим изучения:
      </p>
      <Space direction="vertical" size="large" style={{ width: '350px' }}>
        <Link href="/study/active" passHref>
          <Button type="default" block size="large">
            Активный словарь (с вводом)
          </Button>
        </Link>
        <Link href="/study/passive" passHref>
          <Button type="default" block size="large">
            Пассивный словарь (карточки)
          </Button>
        </Link>
        <Link href="/" passHref>
          <Button style={{ marginTop: '20px' }}>
            Назад на главную
          </Button>
        </Link>
      </Space>
    </div>
  );
}
