import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';
import { User } from '../../../types';

export default function ManageAdminsScreen() {
  const { users, updateUser } = useAppContext();
  const { user: currentUser } = useAuth();
  const admins = users.filter((u) => u.role === 'admin');

  function demoteAdmin(u: User) {
    if (u.id === currentUser?.id) {
      Alert.alert('Cannot Demote', "You cannot remove your own admin access."); return;
    }
    Alert.alert('Demote Admin', `Remove admin access from ${u.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Demote', style: 'destructive', onPress: () => updateUser({ ...u, role: 'manager' }) },
    ]);
  }

  function promoteToAdmin(u: User) {
    Alert.alert('Grant Admin Access', `Grant admin access to ${u.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Grant', onPress: () => updateUser({ ...u, role: 'admin' }) },
    ]);
  }

  const nonAdmins = users.filter((u) => u.role !== 'admin' && u.active);

  return (
    <View style={styles.container}>
      <AppHeader title="Manage Admins" showBack />
      <View style={{ padding: 16 }}>
        <Text style={styles.sectionTitle}>Current Admins ({admins.length})</Text>
      </View>
      <FlatList
        data={[...admins, { type: 'divider', id: 'divider' } as any, ...nonAdmins]}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 8, paddingBottom: 32 }}
        renderItem={({ item }) => {
          if (item.type === 'divider') {
            return <Text style={styles.sectionLabel}>Other Users – Promote to Admin</Text>;
          }
          const isAdmin = item.role === 'admin';
          return (
            <View style={styles.card}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={[styles.role, { color: isAdmin ? Colors.error : Colors.textSecondary }]}>
                  {item.role}
                </Text>
              </View>
              {isAdmin ? (
                <TouchableOpacity
                  style={[styles.actionBtn, { borderColor: Colors.error }]}
                  onPress={() => demoteAdmin(item)}
                >
                  <Text style={styles.demoteText}>Demote</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.actionBtn, { borderColor: Colors.success, backgroundColor: Colors.successLight }]}
                  onPress={() => promoteToAdmin(item)}
                >
                  <Text style={[styles.demoteText, { color: Colors.success }]}>Promote</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.text },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, paddingVertical: 8 },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.white, borderRadius: 12, padding: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary + '20',
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600', color: Colors.text },
  email: { fontSize: 12, color: Colors.textSecondary },
  role: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize', marginTop: 2 },
  actionBtn: {
    borderWidth: 1.5, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  demoteText: { fontSize: 12, fontWeight: '600', color: Colors.error },
});
