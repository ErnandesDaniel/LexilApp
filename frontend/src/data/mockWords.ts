export interface MockWord {
  id: number;
  russian: string;
  english: string;
  transcription: string;
  exampleRussian: string;
  exampleEnglish: string;
}

export const mockWords: MockWord[] = [
  {
    id: 1,
    russian: 'дом',
    english: 'house',
    transcription: '[haʊs]',
    exampleRussian: 'Это большой дом.',
    exampleEnglish: 'This is a big house.',
  },
  {
    id: 2,
    russian: 'кот',
    english: 'cat',
    transcription: '[kæt]',
    exampleRussian: 'Черный кот сидит на крыше.',
    exampleEnglish: 'The black cat is sitting on the roof.',
  },
  {
    id: 3,
    russian: 'работа',
    english: 'work',
    transcription: '[wɜːk]',
    exampleRussian: 'Я иду на работу.',
    exampleEnglish: 'I go to work.',
  },
  {
    id: 4,
    russian: 'друг',
    english: 'friend',
    transcription: '[frend]',
    exampleRussian: 'Мой лучший друг.',
    exampleEnglish: 'My best friend.',
  },
  {
    id: 5,
    russian: 'вода',
    english: 'water',
    transcription: '[ˈwɔːtə]',
    exampleRussian: 'Пей много воды.',
    exampleEnglish: 'Drink a lot of water.',
  },
  {
    id: 6,
    russian: 'книга',
    english: 'book',
    transcription: '[bʊk]',
    exampleRussian: 'Я читаю интересную книгу.',
    exampleEnglish: 'I am reading an interesting book.',
  },
  {
    id: 7,
    russian: 'школа',
    english: 'school',
    transcription: '[skuːl]',
    exampleRussian: 'Школа находится рядом.',
    exampleEnglish: 'The school is nearby.',
  },
  {
    id: 8,
    russian: 'машина',
    english: 'car',
    transcription: '[kɑː]',
    exampleRussian: 'Красная машина parked там.',
    exampleEnglish: 'The red car is parked there.',
  },
  {
    id: 9,
    russian: 'еда',
    english: 'food',
    transcription: '[fuːd]',
    exampleRussian: 'Готовая еда.',
    exampleEnglish: 'Ready food.',
  },
  {
    id: 10,
    russian: 'время',
    english: 'time',
    transcription: '[taɪm]',
    exampleRussian: 'У меня мало времени.',
    exampleEnglish: 'I have little time.',
  },
];
