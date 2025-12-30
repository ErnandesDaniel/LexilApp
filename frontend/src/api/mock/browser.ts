'use client';

import {setupWorker} from 'msw/browser';
import {getAIGraphChatAPIMock} from '@/api';
export const worker = setupWorker(...getAIGraphChatAPIMock());