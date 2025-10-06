import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERNAME_KEY = '@username';
const PASSWORD_KEY = '@password';

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loadUsername = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem(USERNAME_KEY);
        if (savedUsername !== null) setUsername(savedUsername);
      } catch (e) {
        console.log('Error cargando AsyncStorage en Home:', e);
      }
    };
    loadUsername();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(USERNAME_KEY);
      await AsyncStorage.removeItem(PASSWORD_KEY);
      navigation.replace('Login'); // evita volver con botón atrás
    } catch (e) {
      console.log('Error cerrando sesión:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>¡Bienvenido{username ? `, ${username}` : '!'}</Text>
        
        <View style={{ marginTop: 30 }}><Button title="Cerrar sesión" onPress={handleLogout} /></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
});
