import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import ApprovalCard from '../../../components/ApprovalCard';
import TabToggle from '../../../components/TabToggle';
import { useAppContext } from '../../../context/AppContext';

export default function ApprovalsScreen() {
  const router = useRouter();
  const { approvals, properties, users } = useAppContext();
  const [tab, setTab] = useState<'in_progress' | 'completed'>('in_progress');

  const filtered = useMemo(() => {
    return tab === 'in_progress'
      ? approvals.filter((a) => a.status === 'in_progress')
      : approvals.filter((a) => a.status !== 'in_progress');
  }, [approvals, tab]);

  const inProgressCount = approvals.filter((a) => a.status === 'in_progress').length;
  const completedCount = approvals.filter((a) => a.status !== 'in_progress').length;

  const totalPending = approvals.filter((a) => a.status === 'in_progress').reduce((s, a) => s + a.amount, 0);

  return (
    <View style={styles.container}>
      <AppHeader title="Approvals" showBack />
      <View style={{ padding: 12 }}>
        {inProgressCount > 0 && (
          <View style={styles.summaryBanner}>
            <Ionicons name="hourglass-outline" size={16} color={Colors.warning} />
            <Text style={styles.summaryText}>
              {inProgressCount} pending · £{totalPending.toFixed(2)} total
            </Text>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => router.push('/(main)/approvals/add')}
            >
              <Ionicons name="add" size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        )}
        {inProgressCount === 0 && (
          <View style={styles.addRow}>
            <TouchableOpacity
              style={styles.addBtnFull}
              onPress={() => router.push('/(main)/approvals/add')}
            >
              <Ionicons name="add" size={18} color={Colors.white} />
              <Text style={styles.addBtnText}>Submit New Approval</Text>
            </TouchableOpacity>
          </View>
        )}
        <TabToggle
          tabs={[
            { key: 'in_progress', label: 'In Progress', count: inProgressCount },
            { key: 'completed', label: 'Completed', count: completedCount },
          ]}
          activeKey={tab}
          onSelect={(k) => setTab(k as any)}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 32, gap: 10 }}
        ListEmptyComponent={<Text style={styles.empty}>No {tab === 'in_progress' ? 'pending' : 'completed'} approvals.</Text>}
        renderItem={({ item }) => (
          <ApprovalCard
            approval={item}
            property={properties.find((p) => p.id === item.propertyId)}
            submitter={users.find((u) => u.id === item.submittedBy)}
            onPress={() => router.push({ pathname: '/(main)/approvals/[id]', params: { id: item.id } })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  summaryBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.warningLight, borderRadius: 10, padding: 12, marginBottom: 12,
  },
  summaryText: { flex: 1, fontSize: 14, color: Colors.warning, fontWeight: '500' },
  addBtn: { backgroundColor: Colors.primary, borderRadius: 8, padding: 6 },
  addRow: { marginBottom: 12 },
  addBtnFull: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.primary, borderRadius: 10, padding: 12, gap: 6,
  },
  addBtnText: { color: Colors.white, fontWeight: '600', fontSize: 14 },
  empty: { textAlign: 'center', color: Colors.textMuted, marginTop: 40, fontSize: 15 },
});
