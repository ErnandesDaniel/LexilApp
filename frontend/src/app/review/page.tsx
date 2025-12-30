'use client';
import React from 'react';
import Link from 'next/link';
import { Button, Space, Typography } from 'antd';

const { Title } = Typography;

export default function ReviewPage() {
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
        Повторение слов
      </Title>
      <p style={{ marginBottom: '30px', textAlign: 'center' }}>
        Выберите тип словаря для повторения:
      </p>
      <Space direction="vertical" size="large" style={{ width: '350px' }}>
        <Link href="/review/active" passHref>
          <Button type="default" block size="large">
            Активный словарь (с вводом)
          </Button>
        </Link>
        <Link href="/review/passive" passHref>
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
