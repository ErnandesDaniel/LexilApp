'use client';

import axios from 'axios';
// import { getBackendToken } from '@/lib/getBackendToken';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        config.responseType = config.responseType ?? 'json';

        // Получаем временный JWT для бэкенда
        //const token = await getBackendToken();

        const token = 'fgsadgasdf';


        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            // Если токен не получен — пользователь не авторизован
            // Можно выбросить ошибку или перенаправить, но в интерцепторе это сложно
            // Лучше обрабатывать 401 на уровне компонента
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;