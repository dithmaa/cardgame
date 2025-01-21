// src/types/telegram.d.ts
export {}; // Этот файл будет рассматриваться как модуль

declare global {
  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: any;
    version: string;
    platform: string;
    colorScheme: string;
    isExpanded: boolean;
    expand: () => void;
    close: () => void;
    onEvent: (eventType: string, callback: () => void) => void;
    offEvent: (eventType: string, callback: () => void) => void;
    sendData: (data: string) => void;
  }

  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}
