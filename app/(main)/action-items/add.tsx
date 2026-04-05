import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import PropertySelector from '../../../components/PropertySelector';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';
import { ActionItem } from '../../../types';

const CATEGORIES = ['compliance', 'maintenance', 'safety', 'admin', 'cleaning'] as const;
const PRIORITIES = ['low', 'medium', 'high', 'critical'] as const;

export default function AddActionItemScreen() {
  const router = useRouter();
  const { addActionItem } = useAppContext();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState<typeof CATEGORIES[number]>('maintenance');
  const [priority, setPriority] = useState<typeof PRIORITIES[number]>('medium');
  const [saving, setSaving] = useState(false);

  function submit() {
    if (!title.trim()) { Alert.alert('Required', 'Please enter a title.'); return; }
    if (!dueDate.trim()) { Alert.alert('Required', 'Please enter a due date (YYYY-MM-DD).'); return; }
    setSaving(true);
    const now = new Date().toISOString();
    const item: ActionItem = {
      id: `ai_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      propertyId,
      dueDate,
      category,
      priority,
      status: 'pending',
      approvalRequired: false,
      createdAt: now,
      updatedAt: now,
      history: [],
    };
    addActionItem(item);
    setSaving(false);
    Alert.alert('Added', 'Action item created.', [{ text: 'OK', onPress: () => router.back() }]);
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Add Action Item" showBack />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
        <Text style={styles.label}>Title *</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Boiler Service" placeholderTextColor={Colors.textMuted} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, { minHeight: 80 }]} value={description} onChangeText={setDescription} multiline placeholder="Details..." placeholderTextColor={Colors.textMuted} textAlignVertical="top" />

        <Text style={styles.label}>Property</Text>
        <PropertySelector selectedId={propertyId} onSelect={setPropertyId} allowAll={false} />

        <Text style={styles.label}>Due Date (YYYY-MM-DD) *</Text>
        <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} placeholder="2026-06-01" placeholderTextColor={Colors.textMuted} keyboardType="numbers-and-punctuation" />

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
          {PRIORITIES.map((p) => (
            <TouchableOpacity key={p} style={[styles.chip, priority === p && styles.chipActive]} onPress={() => setPriority(p)}>
              <Text style={[styles.chipText, priority === p && styles.chipTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={submit} disabled={saving}>
          <Text style={styles.saveBtnText}>{saving ? 'Saving...' : 'Add Action Item'}</Text>
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
