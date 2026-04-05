import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';
import { ChecklistItem } from '../../../types';

export default function WeeklyCheckDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { weeklyChecks, properties, updateWeeklyCheck } = useAppContext();
  const { user } = useAuth();

  const record = weeklyChecks.find((w) => w.id === id);
  const property = record ? properties.find((p) => p.id === record.propertyId) : null;

  const [checklist, setChecklist] = useState<ChecklistItem[]>(record?.checklist ?? []);
  const [notes, setNotes] = useState(record?.notes ?? '');
  const [issuesFound, setIssuesFound] = useState(record?.issuesFound ?? false);

  if (!record) {
    return (
      <View style={styles.container}>
        <AppHeader title="Weekly Check" showBack />
        <Text style={styles.empty}>Record not found.</Text>
      </View>
    );
  }

  const completedItems = checklist.filter((c) => c.checked).length;
  const totalItems = checklist.length;

  function toggleItem(idx: number) {
    const updated = [...checklist];
    updated[idx] = { ...updated[idx], checked: !updated[idx].checked };
    setChecklist(updated);
    const allDone = updated.every((i) => i.checked);
    if (record.status === 'pending' && updated.some((i) => i.checked)) {
      updateWeeklyCheck({ ...record, checklist: updated, status: 'in_progress', issuesFound });
    }
  }

  function submit() {
    const now = new Date().toISOString();
    updateWeeklyCheck({
      ...record,
      checklist,
      notes,
      issuesFound,
      status: 'completed',
      completedAt: now,
      completedBy: user?.id,
    });
    Alert.alert('Completed', 'Weekly check completed.', [{ text: 'OK', onPress: () => router.back() }]);
  }

  const weekStr = new Date(record.weekStart).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <View style={styles.container}>
      <AppHeader title="Weekly Check" showBack />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 100 }}>
        <View style={styles.card}>
          <Text style={styles.title}>{property?.name ?? 'Unknown Property'}</Text>
          <Text style={styles.sub}>Week of {weekStr}</Text>
          <View style={styles.progressRow}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(completedItems / totalItems) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>{completedItems}/{totalItems}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Checklist</Text>
            <TouchableOpacity onPress={() => setChecklist((prev) => prev.map((i) => ({ ...i, checked: true })))}>
              <Text style={styles.checkAllText}>Check All</Text>
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
          <Text style={styles.sectionTitle}>Issues Found</Text>
          <TouchableOpacity style={styles.checkItem} onPress={() => setIssuesFound(!issuesFound)}>
            <View style={[styles.checkbox, issuesFound && { backgroundColor: Colors.error, borderColor: Colors.error }]}>
              {issuesFound && <Ionicons name="checkmark" size={14} color={Colors.white} />}
            </View>
            <Text style={[styles.checkLabel, issuesFound && { color: Colors.error }]}>Issues identified during check</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Notes</Text>
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
            placeholder="Notes / observations..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {record.status !== 'completed' && (
          <TouchableOpacity style={styles.submitBtn} onPress={submit}>
            <Text style={styles.submitBtnText}>Complete Weekly Check</Text>
          </TouchableOpacity>
        )}
        {record.status === 'completed' && (
          <View style={styles.completedBanner}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.completedText}>
              Completed {record.completedAt ? new Date(record.completedAt).toLocaleDateString('en-GB') : ''}
            </Text>
          </View>
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
  title: { fontSize: 18, fontWeight: '700', color: Colors.text },
  sub: { fontSize: 13, color: Colors.textSecondary, marginTop: 4, marginBottom: 10 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  progressBar: { flex: 1, height: 8, backgroundColor: Colors.border, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  progressText: { fontSize: 12, color: Colors.textSecondary },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
  checkAllText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  checkItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border, gap: 12 },
  checkbox: { width: 22, height: 22, borderRadius: 5, borderWidth: 2, borderColor: Colors.border, alignItems: 'center', justifyContent: 'center' },
  checkboxChecked: { backgroundColor: Colors.success, borderColor: Colors.success },
  checkLabel: { fontSize: 14, color: Colors.text, flex: 1 },
  input: {
    backgroundColor: Colors.inputBg, borderWidth: 1, borderColor: Colors.inputBorder,
    borderRadius: 8, padding: 12, fontSize: 14, color: Colors.text, minHeight: 100,
  },
  submitBtn: { backgroundColor: Colors.primary, borderRadius: 12, padding: 16, alignItems: 'center' },
  submitBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  completedBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.successLight, borderRadius: 12, padding: 14, gap: 8,
  },
  completedText: { fontSize: 15, fontWeight: '600', color: Colors.success },
});
