import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import PropertySelector from '../../../components/PropertySelector';
import { useAppContext } from '../../../context/AppContext';
import { ActionItem } from '../../../types';

function daysUntil(dateStr: string): number {
  const due = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);
  return Math.round((due.getTime() - now.getTime()) / 86400000);
}

function CountBadge({ days }: { days: number }) {
  let bg = Colors.badgeAmberBg;
  let color = Colors.badgeAmber;
  if (days < 0) { bg = Colors.errorLight; color = Colors.error; }
  else if (days > 14) { bg = Colors.successLight; color = Colors.success; }
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.badgeText, { color }]}>{days}</Text>
    </View>
  );
}

export default function ActionItemsScreen() {
  const router = useRouter();
  const { actionItems, properties } = useAppContext();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [historyItem, setHistoryItem] = useState<ActionItem | null>(null);

  const filtered = useMemo(() => {
    let items = actionItems.filter((a) => a.status !== 'completed');
    if (selectedPropertyId) items = items.filter((a) => a.propertyId === selectedPropertyId);
    return items.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [actionItems, selectedPropertyId]);

  function propertyName(id: string | null) {
    return properties.find((p) => p.id === id)?.name ?? '';
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Action Items" />
      <View style={styles.toolbar}>
        <PropertySelector
          selectedId={selectedPropertyId}
          onSelect={setSelectedPropertyId}
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push('/(main)/action-items/add')}
        >
          <Text style={styles.addBtnText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12, gap: 10, paddingBottom: 32 }}
        ListEmptyComponent={
          <Text style={styles.empty}>No action items{selectedPropertyId ? ' for this property' : ''}.</Text>
        }
        renderItem={({ item }) => {
          const days = daysUntil(item.dueDate);
          return (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <CountBadge days={days} />
              </View>
              <View style={styles.cardRow}>
                <Ionicons name="build-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.cardSub}>{item.assignedTo ?? 'Unassigned'}</Text>
              </View>
              <View style={styles.cardRow}>
                <Ionicons name="hourglass-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.cardSub}>{new Date(item.dueDate).toLocaleDateString('en-GB')}</Text>
              </View>
              {item.propertyId && (
                <View style={styles.cardRow}>
                  <Ionicons name="home-outline" size={14} color={Colors.textSecondary} />
                  <Text style={styles.cardSub}>{propertyName(item.propertyId)}</Text>
                </View>
              )}
              <View style={styles.cardActions}>
                <TouchableOpacity
                  style={styles.historyBtn}
                  onPress={() => setHistoryItem(item)}
                >
                  <Text style={styles.historyBtnText}>Approval History</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => router.push({ pathname: '/(main)/action-items/[id]', params: { id: item.id } })}
                >
                  <Ionicons name="create-outline" size={20} color={Colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* History Modal */}
      <Modal visible={!!historyItem} transparent animationType="slide">
        <Pressable style={styles.overlay} onPress={() => setHistoryItem(null)}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>{historyItem?.title} – History</Text>
            {historyItem?.history && historyItem.history.length > 0 ? (
              historyItem.history.map((h, i) => (
                <View key={i} style={styles.historyRow}>
                  <Text style={styles.historyDate}>{new Date(h.at).toLocaleDateString('en-GB')}</Text>
                  <Text style={styles.historyAction}>{h.action} by {h.by}</Text>
                  {h.notes ? <Text style={styles.historyNotes}>{h.notes}</Text> : null}
                </View>
              ))
            ) : (
              <Text style={styles.empty}>No history yet.</Text>
            )}
            <TouchableOpacity style={styles.closeBtn} onPress={() => setHistoryItem(null)}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  toolbar: { flexDirection: 'row', padding: 12, gap: 10, alignItems: 'center' },
  addBtn: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  addBtnText: { color: Colors.primary, fontWeight: '600', fontSize: 14 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  cardTitle: { fontSize: 15, fontWeight: '600', color: Colors.primary, flex: 1, paddingRight: 8 },
  badge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, minWidth: 36, alignItems: 'center' },
  badgeText: { fontWeight: '700', fontSize: 14 },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  cardSub: { fontSize: 13, color: Colors.textSecondary },
  cardActions: { flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 10 },
  historyBtn: {
    borderWidth: 1, borderColor: Colors.border, borderRadius: 6,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  historyBtnText: { fontSize: 12, color: Colors.text },
  editBtn: { padding: 4 },
  empty: { textAlign: 'center', color: Colors.textMuted, marginTop: 40, fontSize: 15 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modal: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    maxHeight: '70%',
  },
  modalTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, marginBottom: 16 },
  historyRow: { marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: Colors.border },
  historyDate: { fontSize: 12, color: Colors.textMuted },
  historyAction: { fontSize: 14, fontWeight: '600', color: Colors.text },
  historyNotes: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
  closeBtn: {
    backgroundColor: Colors.primary, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 16,
  },
  closeBtnText: { color: Colors.white, fontWeight: '600', fontSize: 15 },
});
