import { FlatList, View, Text, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Task } from '@/context/types';


type Props = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  emptyTitle: string;
  emptySubtitle: string;
};

export function TaskList({
  tasks,
  onToggle,
  onDelete,
  emptyTitle,
  emptySubtitle,
}: Props) {
  if (!tasks.length) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <MaterialIcons name="playlist-add" size={72} color="#d1d5db" />
        <Text className="mt-4 text-lg font-medium text-gray-600">
          {emptyTitle}
        </Text>
        <Text className="mt-1 text-center text-gray-400">
          {emptySubtitle}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onToggle(item.id)}
          onLongPress={() => onDelete(item.id)}
          className="flex-row items-center justify-between px-4 py-4 mb-3 bg-white rounded-xl border border-gray-100"
        >
          <Text
            className={`flex-1 text-base ${
              item.completed
                ? 'line-through text-gray-400'
                : 'text-gray-900'
            }`}
          >
            {item.title}
          </Text>

          <MaterialIcons
            name={
              item.completed
                ? 'check-circle'
                : 'radio-button-unchecked'
            }
            size={22}
            color={item.completed ? '#22c55e' : '#9ca3af'}
          />
        </Pressable>
      )}
    />
  );
};