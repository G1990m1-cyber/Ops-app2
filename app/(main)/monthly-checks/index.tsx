import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import PropertySelector from '../../../components/PropertySelector';
import { useAppContext } from '../../../context/AppContext';

const STATUS_CONFIG = {
  pending: { color: Colors.warning, label: 'Pending' },
  in_progress: { color: Colors.info, label: 'In Progress' },
  completed: { color: Colors.success, label: 'Completed' },
};

export default function MonthlyChecksScreen() {
  const router = useRouter();
  const { monthlyChecks, properties } = useAppContext();
  const [propertyFilter, setPropertyFilter] = useState<string | null>(null);

  const filtered = propertyFilter
    ? monthlyChecks.filter((m) => m.propertyId === propertyFilter)
    : monthlyChecks;

  return (
    <View style={styles.container}>
      <AppHeader title="Monthly Checks" showBack />
      <View style={{ padding: 12 }}>
        <PropertySelector selectedId={propertyFilter} onSelect={setPropertyFilter} />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 32, gap: 10 }}
        ListEmptyComponent={<Text style={styles.empty}>No monthly checks found.</Text>}
        renderItem={({ item }) => {
          const prop = properties.find((p) => p.id === item.propertyId);
          const cfg = STATUS_CONFIG[item.status];
          const done = item.checklist.filter((c) => c.checked).length;
          const total = item.checklist.length;
          const hasMeterReadings = Object.values(item.meterReadings).some((v) => v !== undefined);
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push({ pathname: '/(main)/monthly-checks/[id]', params: { id: item.id } })}
            >
              <View style={styles.cardTop}>
                <View style={styles.cardInfo}>
                  <Text style={styles.propertyName}>{prop?.name ?? 'Unknown'}</Text>
                  <Text style={styles.monthLabel}>{item.month} {item.year}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: cfg.color + '18' }]}>
                  <Text style={[styles.statusText, { color: cfg.color }]}>{cfg.label}</Text>
                </View>
              </View>
              <View style={styles.progressRow}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: total > 0 ? `${(done / total) * 100}%` : '0%' }]} />
                </View>
                <Text style={styles.progressText}>{done}/{total}</Text>
              </View>
              {hasMeterReadings && (
                <View style={styles.metersRow}>
                  <Ionicons name="flash-outline" size={12} color={Colors.textSecondary} />
                  <Text style={styles.metersText}>
                    {item.meterReadings.electric !== undefined ? `E: ${item.meterReadings.electric}` : ''}
                    {item.meterReadings.gas !== undefined ? ` · G: ${item.meterReadings.gas}` : ''}
                    {item.meterReadings.water !== undefined ? ` · W: ${item.meterReadings.water}` : ''}
                  </Text>
                </View>
              )}
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
  monthLabel: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  statusBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  statusText: { fontSize: 11, fontWeight: '600' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  progressBar: { flex: 1, height: 6, backgroundColor: Colors.border, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  progressText: { fontSize: 12, color: Colors.textSecondary, minWidth: 30 },
  metersRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  metersText: { fontSize: 12, color: Colors.textSecondary },
  empty: { textAlign: 'center', color: Colors.textMuted, marginTop: 40, fontSize: 15 },
});
