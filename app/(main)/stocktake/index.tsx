import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';

export default function StocktakeMenuScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <AppHeader title="Stocktake" />
      <View style={{ padding: 16, gap: 12 }}>
        <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/(main)/stocktake/[type]', params: { type: 'shelf' } })}>
          <Ionicons name="archive-outline" size={36} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Items on the Shelf</Text>
            <Text style={styles.cardSub}>Hamper items, food & drinks</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.push({ pathname: '/(main)/stocktake/[type]', params: { type: 'cleaning' } })}>
          <Ionicons name="sparkles-outline" size={36} color={Colors.primary} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Cleaning Products</Text>
            <Text style={styles.cardSub}>Toiletries, cleaning supplies</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  card: {
    backgroundColor: Colors.white, borderRadius: 12, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: '600', color: Colors.text },
  cardSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
});
