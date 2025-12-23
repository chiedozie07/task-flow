import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';


export default function TabLayout() {
  const { dark, colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        // tab bar container
        tabBarStyle: {
          backgroundColor: dark ? '#111827' : '#ffffff',
          borderTopColor: dark ? '#1f2933' : '#e5e7eb',
          height: 64,
        },

        // active/inactive colors
        tabBarActiveTintColor: '#f97316',
        tabBarInactiveTintColor: dark ? '#9ca3af' : '#6b7280',

        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 6,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="checklist" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="completed"
        options={{
          title: 'Completed',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="done-all" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};