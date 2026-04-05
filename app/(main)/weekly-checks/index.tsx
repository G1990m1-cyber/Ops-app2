import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import PropertySelector from '../../../components/PropertySelector';
import { useAppContext } from '../../../context/AppContext';

const STATUS_CONFIG = {
  pending: { color: Colors.warning, label: 'Pending', icon: 'time-outline' as const },
  in_progress: { color: Colors.info, label: 'In Progress', icon: 'reload-outline' as const },
  completed: { color: Colors.success, label: 'Completed', icon: 'checkmark-circle-outline' as const },
};

export default function WeeklyChecksScreen() {
  const router = useRouter();
  const { weeklyChecks, properties } = useAppContext();
  const [propertyFilter, setPropertyFilter] = useState<string | null>(null);

  const filtered = propertyFilter
    ? weeklyChecks.filter((w) => w.propertyId === propertyFilter)
    : weeklyChecks;

  const sorted = [...filtered].sort((a, b) => new Date(b.weekStart).getTime() - new Date(a.weekStart).getTime());

  return (
    <View style={styles.container}>
      <AppHeader title="Weekly Checks" showBack />
      <View style={{ padding: 12 }}>
        <PropertySelector selectedId={propertyFilter} onSelect={setPropertyFilter} />
      </View>
      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 32, gap: 10 }}
        ListEmptyComponent={<Text style={styles.empty}>No weekly checks found.</Text>}
        renderItem={({ item }) => {
          const prop = properties.find((p) => p.id === item.propertyId);
          const cfg = STATUS_CONFIG[item.status];
          const done = item.checklist.filter((c) => c.checked).length;
          const total = item.checklist.length;
          const weekStr = new Date(item.weekStart).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push({ pathname: '/(main)/weekly-checks/[id]', params: { id: item.id } })}
            >
              <View style={styles.cardTop}>
                <View style={styles.cardInfo}>
                  <Text style={styles.propertyName}>{prop?.name ?? 'Unknown'}</Text>
                  <Text style={styles.weekLabel}>Week of {weekStr}</Text>
                  {item.issuesFound && (
                    <View style={styles.issuesBadge}>
                      <Ionicons name="warning-outline" size={12} color={Colors.error} />
                      <Text style={styles.issuesText}>Issues found</Text>
                    </View>
                  )}
                </View>
                <View style={[styles.statusBadge, { backgroundColor: cfg.color + '18' }]}>
                  <Ionicons name={cfg.icon} size={13} color={cfg.color} />
                  <Text style={[styles.statusText, { color: cfg.color }]}>{cfg.label}</Text>
                </View>
              </View>
              <View style={styles.progressRow}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: total > 0 ? `${(done / total) * 100}%` : '0%' }]} />
                </View>
                <Text style={styles.progressText}>{done}/{total}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  card: {
    backgroundColor: Colors.white, borderRadius: 12, padding: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  cardInfo: { flex: 1 },
  propertyName: { fontSize: 15, fontWeight: '700', color: Colors.text },
  weekLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  issuesBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  issuesText: { fontSize: 12, color: Colors.error, fontWeight: '600' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, gap: 4 },
  statusText: { fontSize: 11, fontWeight: '600' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  progressBar: { flex: 1, height: 6, backgroundColor: Colors.border, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  progressText: { fontSize: 12, color: Colors.textSecondary, minWidth: 30 },
  empty: { textAlign: 'center', color: Colors.textMuted, marginTop: 40, fontSize: 15 },
});
