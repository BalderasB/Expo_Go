// screens/LoginScreen.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERNAME_KEY = '@username';
const PASSWORD_KEY = '@password';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedUsername = await AsyncStorage.getItem(USERNAME_KEY);
        const savedPassword = await AsyncStorage.getItem(PASSWORD_KEY);
        if (savedUsername !== null) setUsername(savedUsername);
        if (savedPassword !== null) setPassword(savedPassword);
      } catch (e) {
        console.log('Error cargando AsyncStorage:', e);
      }
    };
    loadData();
  }, []);

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert('Error', 'Ingresa un usuario válido.');
      return;
    }
    try {
      await AsyncStorage.setItem(USERNAME_KEY, username);
      await AsyncStorage.setItem(PASSWORD_KEY, password);      
      navigation.navigate('Home');
    } catch (e) {
      console.log('Error guardando AsyncStorage:', e);
      Alert.alert('Error', 'No se pudieron guardar los datos.');
    }
  };

  const handleClear = async () => {
    try {
      await AsyncStorage.removeItem(USERNAME_KEY);
      await AsyncStorage.removeItem(PASSWORD_KEY);
      setUsername('');
      setPassword('');
      Alert.alert('Borrado', 'Datos eliminados del almacenamiento.');
    } catch (e) {
      console.log('Error borrando AsyncStorage:', e);
      Alert.alert('Error', 'No se pudieron borrar los datos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.inner}>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <View style={styles.inputGroup}>
          <Text>Usuario</Text>
          <TextInput style={styles.input} placeholder="Ingresa tu usuario" value={username} onChangeText={setUsername} autoCapitalize="none" autoCorrect={false} />
        </View>

        <View style={styles.inputGroup}>
          <Text>Contraseña</Text>
          <TextInput style={styles.input} placeholder="Ingresa tu contraseña" value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" autoCorrect={false} />
        </View>

        <View style={styles.buttonRow}>
          <View style={styles.button}><Button title="Iniciar Sesión" onPress={handleLogin} /></View>
          <View style={styles.button}><Button title="Borrar datos" color="#c00" onPress={handleClear} /></View>
        </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  inner: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  inputGroup: { marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 10, borderRadius: 8, marginTop: 6 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  button: { flex: 1, marginHorizontal: 6 },
  hint: { marginTop: 20, fontSize: 12, color: '#666', textAlign: 'center' },
});
