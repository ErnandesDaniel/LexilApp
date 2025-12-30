let cachedToken: string | null = null;
let tokenExpiry: number = 0;

export async function getBackendToken(): Promise<string | null> {
    const now = Date.now();

    // Возвращаем кэш, если не истёк
    if (cachedToken && tokenExpiry > now) {
        return cachedToken;
    }

    try {
        const res = await fetch('/api/auth/token');
        if (!res.ok) {
            cachedToken = null;
            return null;
        }
        const data = await res.json();

        // Токен JWT содержит exp — можно извлечь, но проще жёстко задать 9 минут
        cachedToken = data.token;
        tokenExpiry = now + 9 * 60 * 1000; // 9 минут

        return cachedToken;
    } catch (error) {
        console.error('Failed to get backend token:', error);
        return null;
    }
}