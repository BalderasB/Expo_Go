import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [items, setItems] = useState([]); // Estado para almacenar los datos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // 🔹 Aquí agregas el useEffect con la petición fetch
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users'); // URL de ejemplo
        const data = await response.json();
        setItems(data); // Guardar los datos obtenidos en el estado
        setLoading(false); // Desactivar el estado de carga
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchItems(); // Llamar a la función cuando el componente se monte
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });

  return (
    <View style={styles.container}>
      {loading ? <Text>Cargando datos...</Text> : (
        <FlatList
          data={items}
          renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});