import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import PropertySelector from '../../../components/PropertySelector';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';
import { WorkTicket } from '../../../types';

const PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;
const CATEGORIES = ['maintenance', 'cleaning', 'repair', 'inspection', 'other'] as const;
const STATUSES = ['open', 'in_progress', 'completed', 'cancelled'] as const;

export default function WorkTicketDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { workTickets, addWorkTicket, updateWorkTicket, users, properties } = useAppContext();
  const { user } = useAuth();

  const isNew = id === 'new';
  const existing = isNew ? null : workTickets.find((t) => t.id === id);

  const [title, setTitle] = useState(existing?.title ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [propertyId, setPropertyId] = useState<string | null>(existing?.propertyId ?? null);
  const [priority, setPriority] = useState<typeof PRIORITIES[number]>(existing?.priority ?? 'medium');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>(existing?.category ?? 'maintenance');
  const [status, setStatus] = useState<typeof STATUSES[number]>(existing?.status ?? 'open');
  const [assignedTo, setAssignedTo] = useState(existing?.assignedTo ?? '');
  const [dueDate, setDueDate] = useState(existing?.dueDate ?? '');
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [estimatedHours, setEstimatedHours] = useState(existing?.estimatedHours?.toString() ?? '');

  function save() {
    if (!title.trim()) { Alert.alert('Required', 'Title is required.'); return; }
    if (!propertyId) { Alert.alert('Required', 'Select a property.'); return; }
    const now = new Date().toISOString();
    if (isNew) {
      addWorkTicket({
        id: `wt_${Date.now()}`, title: title.trim(), description: description.trim(),
        propertyId, priority, category, status: 'open',
        assignedTo: assignedTo || undefined,
        dueDate: dueDate || undefined,
        notes: notes.trim() || undefined,
        estimatedHours: parseFloat(estimatedHours) || undefined,
        createdAt: now, updatedAt: now,
      });
    } else if (existing) {
      updateWorkTicket({ ...existing, title: title.trim(), description: description.trim(), propertyId, priority, category, status, assignedTo: assignedTo || undefined, dueDate: dueDate || undefined, notes: notes.trim() || undefined, estimatedHours: parseFloat(estimatedHours) || undefined, updatedAt: now });
    }
    Alert.alert('Saved', isNew ? 'Work ticket created.' : 'Work ticket updated.', [{ text: 'OK', onPress: () => router.back() }]);
  }

  const title_str = isNew ? 'New Work Ticket' : 'Work Ticket';
  const caretakers = users.filter((u) => u.role === 'caretaker' || u.role === 'cleaner');

  return (
    <View style={styles.container}>
      <AppHeader title={title_str} showBack />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
        <Text style={styles.label}>Title *</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Fix leaking tap" placeholderTextColor={Colors.textMuted} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, { minHeight: 80 }]} value={description} onChangeText={setDescription} multiline placeholder="Details..." placeholderTextColor={Colors.textMuted} textAlignVertical="top" />

        <Text style={styles.label}>Property *</Text>
        <PropertySelector selectedId={propertyId} onSelect={setPropertyId} allowAll={false} />

        <Text style={styles.label}>Priority</Text>
        <View style={styles.chipRow}>
          {PRIORITIES.map((p) => (
            <TouchableOpacity key={p} style={[styles.chip, priority === p && styles.chipActive]} onPress={() => setPriority(p)}>
              <Text style={[styles.chipText, priority === p && styles.chipTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Category</Text>
        <View style={styles.chipRow}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity key={c} style={[styles.chip, category === c && styles.chipActive]} onPress={() => setCategory(c)}>
              <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {!isNew && (
          <>
            <Text style={styles.label}>Status</Text>
            <View style={styles.chipRow}>
              {STATUSES.map((s) => (
                <TouchableOpacity key={s} style={[styles.chip, status === s && styles.chipActive]} onPress={() => setStatus(s)}>
                  <Text style={[styles.chipText, status === s && styles.chipTextActive]}>{s.replace('_', ' ')}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <Text style={styles.label}>Assign To</Text>
        <View style={styles.chipRow}>
          <TouchableOpacity style={[styles.chip, !assignedTo && styles.chipActive]} onPress={() => setAssignedTo('')}>
            <Text style={[styles.chipText, !assignedTo && styles.chipTextActive]}>Unassigned</Text>
          </TouchableOpacity>
          {caretakers.map((u) => (
            <TouchableOpacity key={u.id} style={[styles.chip, assignedTo === u.id && styles.chipActive]} onPress={() => setAssignedTo(u.id)}>
              <Text style={[styles.chipText, assignedTo === u.id && styles.chipTextActive]}>{u.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Due Date (YYYY-MM-DD)</Text>
        <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} placeholder="2026-04-10" placeholderTextColor={Colors.textMuted} />

        <Text style={styles.label}>Estimated Hours</Text>
        <TextInput style={styles.input} value={estimatedHours} onChangeText={setEstimatedHours} placeholder="2" keyboardType="decimal-pad" placeholderTextColor={Colors.textMuted} />

        <Text style={styles.label}>Notes</Text>
        <TextInput style={[styles.input, { minHeight: 60 }]} value={notes} onChangeText={setNotes} multiline placeholder="Any notes..." placeholderTextColor={Colors.textMuted} textAlignVertical="top" />

        <TouchableOpacity style={styles.saveBtn} onPress={save}>
          <Text style={styles.saveBtnText}>{isNew ? 'Create Ticket' : 'Save Changes'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  label: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  input: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: 10, padding: 12, fontSize: 14, color: Colors.text },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: Colors.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 12, color: Colors.text, textTransform: 'capitalize' },
  chipTextActive: { color: Colors.white, fontWeight: '600' },
  saveBtn: { backgroundColor: Colors.primary, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  saveBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  cancelBtn: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, padding: 14, alignItems: 'center' },
  cancelBtnText: { color: Colors.text, fontWeight: '600', fontSize: 15 },
});
