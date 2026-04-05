import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import { useAppContext } from '../../../context/AppContext';

export default function AdminIndexScreen() {
  const router = useRouter();
  const { users } = useAppContext();
  const admins = users.filter((u) => u.role === 'admin').length;
  const totalUsers = users.filter((u) => u.active).length;

  return (
    <View style={styles.container}>
      <AppHeader title="Administration" showBack />
      <View style={{ padding: 16, gap: 12 }}>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/(main)/admin/users')}>
          <View style={styles.iconWrap}>
            <Ionicons name="people-outline" size={28} color={Colors.primary} />
          </View>
          <View style={styles.info}>
            <Text style={styles.cardTitle}>Manage Users</Text>
            <Text style={styles.cardSub}>{totalUsers} active users</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => router.push('/(main)/admin/admins')}>
          <View style={[styles.iconWrap, { backgroundColor: Colors.primaryDark + '18' }]}>
            <Ionicons name="shield-outline" size={28} color={Colors.primaryDark} />
          </View>
          <View style={styles.info}>
            <Text style={styles.cardTitle}>Manage Admins</Text>
            <Text style={styles.cardSub}>{admins} admin account{admins !== 1 ? 's' : ''}</Text>
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
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: Colors.white, borderRadius: 12, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
  },
  iconWrap: {
    width: 52, height: 52, borderRadius: 26, backgroundColor: Colors.primary + '18',
    alignItems: 'center', justifyContent: 'center',
  },
  info: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.text },
  cardSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
});
