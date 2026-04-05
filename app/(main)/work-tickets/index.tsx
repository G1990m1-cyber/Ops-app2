import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import PropertySelector from '../../../components/PropertySelector';
import { useAppContext } from '../../../context/AppContext';

function priorityColor(p: string) {
  if (p === 'urgent') return Colors.error;
  if (p === 'high') return Colors.warning;
  if (p === 'medium') return Colors.info;
  return Colors.textMuted;
}

function statusBg(s: string) {
  if (s === 'completed') return { bg: Colors.successLight, color: Colors.success };
  if (s === 'in_progress') return { bg: Colors.infoLight, color: Colors.info };
  if (s === 'cancelled') return { bg: Colors.badgeGreyBg, color: Colors.badgeGrey };
  return { bg: Colors.warningLight, color: Colors.warning };
}

export default function WorkTicketsScreen() {
  const router = useRouter();
  const { workTickets, properties, users } = useAppContext();
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'open' | 'all'>('open');

  const filtered = useMemo(() => {
    let items = workTickets;
    if (propertyId) items = items.filter((t) => t.propertyId === propertyId);
    if (statusFilter === 'open') items = items.filter((t) => t.status !== 'completed' && t.status !== 'cancelled');
    return items.sort((a, b) => {
      const pOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      return (pOrder[a.priority as keyof typeof pOrder] ?? 3) - (pOrder[b.priority as keyof typeof pOrder] ?? 3);
    });
  }, [workTickets, propertyId, statusFilter]);

  function propName(id: string) { return properties.find((p) => p.id === id)?.name ?? id; }
  function userName(id?: string) { return id ? (users.find((u) => u.id === id)?.name ?? id) : 'Unassigned'; }

  return (
    <View style={styles.container}>
      <AppHeader title="Work Tickets" rightAction={{ icon: 'add-circle-outline', onPress: () => router.push({ pathname: '/(main)/work-tickets/[id]', params: { id: 'new' } }) }} />
      <View style={styles.toolbar}>
        <PropertySelector selectedId={propertyId} onSelect={setPropertyId} />
      </View>
      <View style={styles.tabRow}>
        {(['open', 'all'] as const).map((s) => (
          <TouchableOpacity key={s} style={[styles.tab, statusFilter === s && styles.tabActive]} onPress={() => setStatusFilter(s)}>
            <Text style={[styles.tabText, statusFilter === s && styles.tabTextActive]}>{s === 'open' ? 'Open' : 'All Tickets'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12, gap: 10, paddingBottom: 32 }}
        ListEmptyComponent={<Text style={styles.empty}>No tickets found.</Text>}
        renderItem={({ item }) => {
          const sc = statusBg(item.status);
          return (
            <TouchableOpacity
              style={[styles.card, { borderLeftColor: priorityColor(item.priority) }]}
              onPress={() => router.push({ pathname: '/(main)/work-tickets/[id]', params: { id: item.id } })}
            >
              <View style={styles.cardTop}>
                <Text style={styles.ticketTitle} numberOfLines={2}>{item.title}</Text>
                <View style={[styles.statusPill, { backgroundColor: sc.bg }]}>
                  <Text style={[styles.statusText, { color: sc.color }]}>{item.status.replace('_', ' ')}</Text>
                </View>
              </View>
              <Text style={styles.propName}>{propName(item.propertyId)}</Text>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="person-outline" size={12} color={Colors.textMuted} />
                  <Text style={styles.metaText}>{userName(item.assignedTo)}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="flag-outline" size={12} color={priorityColor(item.priority)} />
                  <Text style={[styles.metaText, { color: priorityColor(item.priority) }]}>{item.priority}</Text>
                </View>
                {item.dueDate && (
                  <View style={styles.metaItem}>
                    <Ionicons name="calendar-outline" size={12} color={Colors.textMuted} />
                    <Text style={styles.metaText}>{new Date(item.dueDate).toLocaleDateString('en-GB')}</Text>
                  </View>
                )}
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
  toolbar: { padding: 12 },
  tabRow: { flexDirection: 'row', paddingHorizontal: 12 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: 'transparent' },
  tabActive: { borderBottomColor: Colors.primary },
  tabText: { fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
  tabTextActive: { color: Colors.primary, fontWeight: '700' },
  card: {
    backgroundColor: Colors.white, borderRadius: 12, padding: 14,
    borderLeftWidth: 4,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 },
  ticketTitle: { flex: 1, fontSize: 14, fontWeight: '600', color: Colors.text },
  statusPill: { borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3, flexShrink: 0 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  propName: { fontSize: 12, color: Colors.textSecondary, marginBottom: 6 },
  metaRow: { flexDirection: 'row', gap: 14, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: Colors.textMuted, textTransform: 'capitalize' },
  empty: { textAlign: 'center', color: Colors.textMuted, marginTop: 40, fontSize: 15 },
});
