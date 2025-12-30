import { useMutation, useQuery } from '@tanstack/react-query';

// Mock data for levels
const mockLevels = [
  {
    id: '1',
    name: 'Уровень 1',
    interval_minutes: 5,
    interval_hours: 0,
    interval_days: 0,
    order: 1,
    user_id: 'user1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Уровень 2',
    interval_minutes: 0,
    interval_hours: 1,
    interval_days: 0,
    order: 2,
    user_id: 'user1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Уровень 3',
    interval_minutes: 0,
    interval_hours: 0,
    interval_days: 1,
    order: 3,
    user_id: 'user1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

type Level = typeof mockLevels[0];
type CreateLevelRequest = Omit<Level, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
type UpdateLevelRequest = Partial<CreateLevelRequest>;

// Mock API functions
const getLevels = async (): Promise<Level[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
  return mockLevels.sort((a, b) => a.order - b.order);
};

const createLevel = async (data: CreateLevelRequest): Promise<Level> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newLevel: Level = {
    ...data,
    id: Math.random().toString(),
    user_id: 'user1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockLevels.push(newLevel);
  return newLevel;
};

const updateLevel = async (id: string, data: UpdateLevelRequest): Promise<Level> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = mockLevels.findIndex(l => l.id === id);
  if (index !== -1) {
    mockLevels[index] = { ...mockLevels[index], ...data, updated_at: new Date().toISOString() };
    return mockLevels[index];
  }
  throw new Error('Level not found');
};

const deleteLevel = async (id: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const index = mockLevels.findIndex(l => l.id === id);
  if (index !== -1) {
    mockLevels.splice(index, 1);
  } else {
    throw new Error('Level not found');
  }
};

// Query Keys
export const getLevelsQueryKey = () => ['levels'];

export const useGetLevels = () => {
  return useQuery({
    queryKey: getLevelsQueryKey(),
    queryFn: getLevels,
  });
};

export const useCreateLevel = () => {
  return useMutation({
    mutationFn: createLevel,
  });
};

export const useUpdateLevel = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateLevelRequest }) => updateLevel(id, data),
  });
};

export const useDeleteLevel = () => {
  return useMutation({
    mutationFn: deleteLevel,
  });
};
