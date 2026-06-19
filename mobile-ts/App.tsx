import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ApiService from './src/services/api';
import InicioScreen from './src/screens/Inicio';
import BalanceScreen from './src/screens/Balance';
import TransferScreen from './src/screens/Transfer';
import GamesScreen from './src/screens/Games';
import ProfileScreen from './src/screens/Profile';

const api = new ApiService();
const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    api.getBalance('user1')
      .then((b) => console.log('balance', b))
      .catch((e) => console.warn('api error', e));
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#E5E7EB' },
          tabBarActiveTintColor: '#3D5AFE',
          tabBarInactiveTintColor: '#6B7280',
          tabBarIcon: ({ color, size }) => {
            let iconName = 'home-outline';
            if (route.name === 'saldo') iconName = 'wallet-outline';
            if (route.name === 'transferência') iconName = 'swap-horizontal-bold';
            if (route.name === 'jogos') iconName = 'gamepad-variant-outline';
            if (route.name === 'perfil') iconName = 'account-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="início" component={InicioScreen} />
        <Tab.Screen name="saldo" component={BalanceScreen} />
        <Tab.Screen name="jogos" component={GamesScreen} />
        <Tab.Screen name="transferência" component={TransferScreenWrapper} />
        <Tab.Screen name="perfil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function TransferScreenWrapper({ navigation }: { navigation: any }) {
  return <TransferScreen onCancel={() => navigation.navigate('saldo')} onSuccess={() => navigation.navigate('saldo')} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F5FF' },
});
