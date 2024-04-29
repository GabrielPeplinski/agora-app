import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Foundation } from '@expo/vector-icons';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="auth"
          options={{
            title: 'Usuário',
            tabBarIcon: ({ color }) => <FontAwesome name="user-circle-o" size={28} color="black" />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Mapa',
            tabBarIcon: ({ color }) => <FontAwesome name="map" size={28} color="black" />,
          }}
        />
        <Tabs.Screen
          name="dashboard"
          options={{
            title: 'Gráficos',
            tabBarIcon: ({ color }) => <Foundation name="graph-pie" size={28} color="black" />,
          }}
        />
      </Tabs>
  );
}
