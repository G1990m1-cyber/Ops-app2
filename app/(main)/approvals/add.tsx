import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import PropertySelector from '../../../components/PropertySelector';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';
import { Approval } from '../../../types';

const CATEGORIES: Approval['category'][] = ['maintenance', 'supplies', 'emergency', 'upgrade', 'other'];

export default function AddApprovalScreen() {
  const router = useRouter();
  const { addApproval } = useAppContext();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Approval['category']>('maintenance');

  function submit() {
    if (!title.trim()) { Alert.alert('Required', 'Please enter a title.'); return; }
    if (!amount.trim() || isNaN(parseFloat(amount))) { Alert.alert('Required', 'Please enter a valid amount.'); return; }
    if (!propertyId) { Alert.alert('Required', 'Please select a property.'); return; }
    const now = new Date().toISOString();
    const approval: Approval = {
      id: `ap_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      propertyId: propertyId!,
      submittedBy: user?.id ?? '',
      submittedAt: now,
      amount: parseFloat(amount),
      category,
      status: 'in_progress',
      history: [{ id: `ah_${Date.now()}`, action: 'submitted', by: user?.id ?? '', at: now }],
    };
    addApproval(approval);
    Alert.alert('Submitted', 'Approval request submitted.', [{ text: 'OK', onPress: () => router.back() }]);
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Submit Approval" showBack />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
        <Text style={styles.label}>Title *</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Emergency Boiler Repair" placeholderTextColor={Colors.textMuted} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, { minHeight: 80 }]} value={description} onChangeText={setDescription} multiline placeholder="Describe the expenditure..." placeholderTextColor={Colors.textMuted} textAlignVertical="top" />

        <Text style={styles.label}>Property *</Text>
        <PropertySelector selectedId={propertyId} onSelect={setPropertyId} allowAll={false} />

        <Text style={styles.label}>Amount (£) *</Text>
        <TextInput style={styles.input} value={amount} onChangeText={setAmount} placeholder="0.00" placeholderTextColor={Colors.textMuted} keyboardType="decimal-pad" />

        <Text style={styles.label}>Category</Text>
        <View style={styles.chipRow}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity key={c} style={[styles.chip, category === c && styles.chipActive]} onPress={() => setCategory(c)}>
              <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={submit}>
          <Text style={styles.saveBtnText}>Submit for Approval</Text>
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
