import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Foundation } from '@expo/vector-icons';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#004aad',
        tabBarInactiveTintColor: 'black',
        headerShown: true
      }}
    >
      <Tabs.Screen
        name="auth"
        options={{
          title: 'Usuário',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user-circle-o" size={28} color={focused ? '#004aad' : 'black'} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="map" size={28} color={focused ? '#004aad' : 'black'} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Gráficos',
          tabBarIcon: ({ color, focused }) => (
            <Foundation name="graph-pie" size={28} color={focused ? '#004aad' : 'black'} />
          ),
        }}
      />
    </Tabs>
  );
}