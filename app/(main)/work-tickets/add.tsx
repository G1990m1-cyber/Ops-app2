import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import PropertySelector from '../../../components/PropertySelector';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';
import { WorkTicket } from '../../../types';

const CATEGORIES: WorkTicket['category'][] = ['maintenance', 'cleaning', 'repair', 'inspection', 'other'];
const PRIORITIES: WorkTicket['priority'][] = ['low', 'medium', 'high', 'urgent'];

export default function AddWorkTicketScreen() {
  const router = useRouter();
  const { users, addWorkTicket } = useAppContext();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [category, setCategory] = useState<WorkTicket['category']>('maintenance');
  const [priority, setPriority] = useState<WorkTicket['priority']>('medium');
  const [assignedTo, setAssignedTo] = useState('');
  const [estimatedHours, setEstimatedHours] = useState('');
  const [dueDate, setDueDate] = useState('');

  function submit() {
    if (!title.trim()) { Alert.alert('Required', 'Please enter a title.'); return; }
    if (!propertyId) { Alert.alert('Required', 'Please select a property.'); return; }
    const now = new Date().toISOString();
    addWorkTicket({
      id: `wt_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      propertyId,
      assignedTo: assignedTo || undefined,
      priority,
      status: 'open',
      category,
      estimatedHours: estimatedHours ? parseFloat(estimatedHours) : undefined,
      dueDate: dueDate || undefined,
      createdAt: now,
      updatedAt: now,
    });
    Alert.alert('Created', 'Work ticket created.', [{ text: 'OK', onPress: () => router.back() }]);
  }

  const staffUsers = users.filter((u) => u.active && (u.role === 'caretaker' || u.role === 'cleaner'));

  return (
    <View style={styles.container}>
      <AppHeader title="New Work Ticket" showBack />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
        <Text style={styles.label}>Title *</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Fix leaking tap" placeholderTextColor={Colors.textMuted} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, { minHeight: 80 }]} value={description} onChangeText={setDescription} multiline placeholder="Details..." placeholderTextColor={Colors.textMuted} textAlignVertical="top" />

        <Text style={styles.label}>Property *</Text>
        <PropertySelector selectedId={propertyId} onSelect={setPropertyId} allowAll={false} />

        <Text style={styles.label}>Category</Text>
        <View style={styles.chipRow}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity key={c} style={[styles.chip, category === c && styles.chipActive]} onPress={() => setCategory(c)}>
              <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Priority</Text>
        <View style={styles.chipRow}>
          {PRIORITIES.map((p) => {
            const colors: Record<WorkTicket['priority'], string> = {
              low: Colors.badgeGreen, medium: Colors.info, high: Colors.warning, urgent: Colors.error,
            };
            return (
              <TouchableOpacity
                key={p}
                style={[styles.chip, priority === p && { backgroundColor: colors[p] + '18', borderColor: colors[p] }]}
                onPress={() => setPriority(p)}
              >
                <Text style={[styles.chipText, priority === p && { color: colors[p], fontWeight: '600' }]}>{p}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>Assign to</Text>
        <View style={styles.chipRow}>
          <TouchableOpacity
            style={[styles.chip, !assignedTo && styles.chipActive]}
            onPress={() => setAssignedTo('')}
          >
            <Text style={[styles.chipText, !assignedTo && styles.chipTextActive]}>Unassigned</Text>
          </TouchableOpacity>
          {staffUsers.map((u) => (
            <TouchableOpacity
              key={u.id}
              style={[styles.chip, assignedTo === u.id && styles.chipActive]}
              onPress={() => setAssignedTo(u.id)}
            >
              <Text style={[styles.chipText, assignedTo === u.id && styles.chipTextActive]}>
                {u.name.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Estimated Hours</Text>
        <TextInput
          style={styles.input}
          value={estimatedHours}
          onChangeText={setEstimatedHours}
          placeholder="e.g. 2"
          keyboardType="decimal-pad"
          placeholderTextColor={Colors.textMuted}
        />

        <Text style={styles.label}>Due Date (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="2026-06-01"
          keyboardType="numbers-and-punctuation"
          placeholderTextColor={Colors.textMuted}
        />

        <TouchableOpacity style={styles.saveBtn} onPress={submit}>
          <Text style={styles.saveBtnText}>Create Ticket</Text>
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
  input: {
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border,
    borderRadius: 10, padding: 12, fontSize: 14, color: Colors.text,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { borderWidth: 1, borderColor: Colors.border, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 13, color: Colors.text, textTransform: 'capitalize' },
  chipTextActive: { color: Colors.white, fontWeight: '600' },
  saveBtn: { backgroundColor: Colors.primary, borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 8 },
  saveBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  cancelBtn: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border, borderRadius: 12, padding: 14, alignItems: 'center' },
  cancelBtnText: { color: Colors.text, fontWeight: '600', fontSize: 15 },
});
