import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import { useAppContext } from '../../../context/AppContext';

export default function ActionItemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { actionItems, updateActionItem, users } = useAppContext();
  const item = actionItems.find((a) => a.id === id);

  const [notes, setNotes] = useState(item?.notes ?? '');
  const [status, setStatus] = useState(item?.status ?? 'pending');

  if (!item) return (
    <View style={styles.container}>
      <AppHeader title="Action Item" showBack />
      <Text style={styles.empty}>Item not found.</Text>
    </View>
  );

  function save() {
    const now = new Date().toISOString();
    updateActionItem({
      ...item!,
      notes,
      status: status as any,
      updatedAt: now,
      ...(status === 'completed' ? { completedAt: now } : {}),
    });
    Alert.alert('Saved', 'Action item updated.', [{ text: 'OK', onPress: () => router.back() }]);
  }

  const statusOptions: Array<'pending' | 'in_progress' | 'completed'> = ['pending', 'in_progress', 'completed'];

  return (
    <View style={styles.container}>
      <AppHeader title={item.title} showBack />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
        <View style={styles.card}>
          <Row label="Category" value={item.category} />
          <Row label="Priority" value={item.priority} />
          <Row label="Due Date" value={new Date(item.dueDate).toLocaleDateString('en-GB')} />
          {item.assignedTo && <Row label="Assigned To" value={item.assignedTo} />}
        </View>

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusRow}>
          {statusOptions.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.statusBtn, status === s && styles.statusBtnActive]}
              onPress={() => setStatus(s)}
            >
              <Text style={[styles.statusBtnText, status === s && styles.statusBtnTextActive]}>
                {s.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.input}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={4}
          placeholder="Add notes..."
          placeholderTextColor={Colors.textMuted}
          textAlignVertical="top"
        />

        {item.description ? (
          <>
            <Text style={styles.label}>Description</Text>
            <View style={styles.card}>
              <Text style={{ color: Colors.text }}>{item.description}</Text>
            </View>
          </>
        ) : null}

        <TouchableOpacity style={styles.saveBtn} onPress={save}>
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 }}>
      <Text style={{ color: Colors.textSecondary, fontSize: 13 }}>{label}</Text>
      <Text style={{ color: Colors.text, fontSize: 13, fontWeight: '600', textTransform: 'capitalize' }}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  empty: { textAlign: 'center', color: Colors.textMuted, marginTop: 40 },
  card: {
    backgroundColor: Colors.white, borderRadius: 12, padding: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
  },
  label: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, marginBottom: 6 },
  statusRow: { flexDirection: 'row', gap: 8 },
  statusBtn: {
    flex: 1, borderWidth: 1, borderColor: Colors.border, borderRadius: 8,
    paddingVertical: 8, alignItems: 'center',
  },
  statusBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  statusBtnText: { fontSize: 12, color: Colors.text },
  statusBtnTextActive: { color: Colors.white, fontWeight: '600' },
  input: {
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border,
    borderRadius: 10, padding: 12, fontSize: 14, color: Colors.text, minHeight: 100,
  },
  saveBtn: { backgroundColor: Colors.primary, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  saveBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
});
