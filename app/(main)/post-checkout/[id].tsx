import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';
import { ChecklistItem } from '../../../types';

export default function PostCheckOutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { postCheckOuts, bookings, properties, updatePostCheckOut } = useAppContext();
  const { user } = useAuth();

  const record = postCheckOuts.find((c) => c.id === id);
  const booking = record ? bookings.find((b) => b.id === record.bookingId) : null;
  const property = record ? properties.find((p) => p.id === record.propertyId) : null;

  const [checklist, setChecklist] = useState<ChecklistItem[]>(record?.checklist ?? []);
  const [notes, setNotes] = useState(record?.notes ?? '');
  const [damageReported, setDamageReported] = useState(record?.damageReported ?? false);
  const [damageNotes, setDamageNotes] = useState(record?.damageNotes ?? '');
  const [cleaningRequired, setCleaningRequired] = useState(record?.cleaningRequired ?? true);

  if (!record) {
    return (
      <View style={styles.container}>
        <AppHeader title="Post Check Out" showBack />
        <Text style={styles.empty}>Record not found.</Text>
      </View>
    );
  }

  const completedItems = checklist.filter((c) => c.checked).length;
  const totalItems = checklist.length;

  function toggleItem(idx: number) {
    setChecklist((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, checked: !item.checked } : item))
    );
  }

  function submit() {
    const now = new Date().toISOString();
    updatePostCheckOut({
      ...record,
      checklist,
      notes,
      damageReported,
      damageNotes: damageReported ? damageNotes : undefined,
      cleaningRequired,
      status: 'completed',
      completedAt: now,
      completedBy: user?.id,
    });
    Alert.alert('Completed', 'Post check-out completed.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Post Check Out" showBack />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 100 }}>
        <View style={styles.card}>
          <Text style={styles.guestName}>{booking?.guestName ?? 'Unknown'}</Text>
          <Text style={styles.ref}>{booking?.bookingRef}</Text>
          {property && (
            <View style={styles.row}>
              <Ionicons name="business-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.meta}>{property.name}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Ionicons name="calendar-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.meta}>{new Date(record.scheduledDate).toLocaleDateString('en-GB')}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.progressRow}>
            <Text style={styles.sectionTitle}>Checklist ({completedItems}/{totalItems})</Text>
            <TouchableOpacity onPress={() => setChecklist((prev) => prev.map((i) => ({ ...i, checked: true })))}>
              <Text style={styles.checkAll}>Check All</Text>
            </TouchableOpacity>
          </View>
          {checklist.map((item, idx) => (
            <TouchableOpacity key={item.id} style={styles.checkItem} onPress={() => toggleItem(idx)}>
              <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
                {item.checked && <Ionicons name="checkmark" size={14} color={Colors.white} />}
              </View>
              <Text style={[styles.checkLabel, item.checked && { textDecorationLine: 'line-through', color: Colors.textMuted }]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Cleaning Required</Text>
          <TouchableOpacity style={styles.checkItem} onPress={() => setCleaningRequired(!cleaningRequired)}>
            <View style={[styles.checkbox, cleaningRequired && styles.checkboxChecked]}>
              {cleaningRequired && <Ionicons name="checkmark" size={14} color={Colors.white} />}
            </View>
            <Text style={styles.checkLabel}>Full clean required</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Damage Report</Text>
          <TouchableOpacity style={styles.checkItem} onPress={() => setDamageReported(!damageReported)}>
            <View style={[styles.checkbox, damageReported && { backgroundColor: Colors.error, borderColor: Colors.error }]}>
              {damageReported && <Ionicons name="checkmark" size={14} color={Colors.white} />}
            </View>
            <Text style={[styles.checkLabel, damageReported && { color: Colors.error }]}>
              Damage found / reported
            </Text>
          </TouchableOpacity>
          {damageReported && (
            <TextInput
              style={styles.input}
              value={damageNotes}
              onChangeText={setDamageNotes}
              placeholder="Describe damage..."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
            placeholder="General notes..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {record.status !== 'completed' && (
          <TouchableOpacity style={styles.submitBtn} onPress={submit}>
            <Text style={styles.submitBtnText}>Complete Check Out</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
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
  guestName: { fontSize: 18, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  ref: { fontSize: 13, color: Colors.textSecondary, marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  meta: { fontSize: 13, color: Colors.textSecondary },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  checkAll: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  checkItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 12 },
  checkbox: { width: 22, height: 22, borderRadius: 5, borderWidth: 2, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: Colors.success, borderColor: Colors.success },
  checkLabel: { fontSize: 14, color: Colors.text, flex: 1 },
  input: {
    backgroundColor: Colors.inputBg, borderWidth: 1, borderColor: Colors.inputBorder,
    borderRadius: 8, padding: 12, fontSize: 14, color: Colors.text, minHeight: 80, marginTop: 8,
  },
  submitBtn: { backgroundColor: Colors.primary, borderRadius: 12, padding: 16, alignItems: 'center' },
  submitBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
});
