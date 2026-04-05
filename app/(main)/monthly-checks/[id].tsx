import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';
import { ChecklistItem } from '../../../types';

export default function MonthlyCheckDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { monthlyChecks, properties, updateMonthlyCheck } = useAppContext();
  const { user } = useAuth();

  const record = monthlyChecks.find((m) => m.id === id);
  const property = record ? properties.find((p) => p.id === record.propertyId) : null;

  const [checklist, setChecklist] = useState<ChecklistItem[]>(record?.checklist ?? []);
  const [notes, setNotes] = useState(record?.notes ?? '');
  const [meterElectric, setMeterElectric] = useState(String(record?.meterReadings?.electric ?? ''));
  const [meterGas, setMeterGas] = useState(String(record?.meterReadings?.gas ?? ''));
  const [meterWater, setMeterWater] = useState(String(record?.meterReadings?.water ?? ''));

  if (!record) {
    return (
      <View style={styles.container}>
        <AppHeader title="Monthly Check" showBack />
        <Text style={styles.empty}>Record not found.</Text>
      </View>
    );
  }

  const completedItems = checklist.filter((c) => c.checked).length;
  const totalItems = checklist.length;

  function toggleItem(idx: number) {
    setChecklist((prev) => prev.map((item, i) => (i === idx ? { ...item, checked: !item.checked } : item)));
  }

  function submit() {
    const now = new Date().toISOString();
    updateMonthlyCheck({
      ...record,
      checklist,
      notes,
      meterReadings: {
        electric: meterElectric ? parseInt(meterElectric, 10) : undefined,
        gas: meterGas ? parseInt(meterGas, 10) : undefined,
        water: meterWater ? parseInt(meterWater, 10) : undefined,
      },
      status: 'completed',
      completedAt: now,
      completedBy: user?.id,
    });
    Alert.alert('Completed', 'Monthly check completed.', [{ text: 'OK', onPress: () => router.back() }]);
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Monthly Check" showBack />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 100 }}>
        <View style={styles.card}>
          <Text style={styles.title}>{property?.name ?? 'Unknown'}</Text>
          <Text style={styles.sub}>{record.month} {record.year}</Text>
          <View style={styles.progressRow}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(completedItems / totalItems) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>{completedItems}/{totalItems}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Meter Readings</Text>
          {[
            { label: 'Electric (kWh)', value: meterElectric, setter: setMeterElectric, icon: 'flash-outline' as const },
            { label: 'Gas (m³)', value: meterGas, setter: setMeterGas, icon: 'flame-outline' as const },
            { label: 'Water (m³)', value: meterWater, setter: setMeterWater, icon: 'water-outline' as const },
          ].map(({ label, value, setter, icon }) => (
            <View key={label} style={styles.meterRow}>
              <Ionicons name={icon} size={18} color={Colors.primary} />
              <Text style={styles.meterLabel}>{label}</Text>
              <TextInput
                style={styles.meterInput}
                value={value}
                onChangeText={setter}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor={Colors.textMuted}
              />
            </View>
          ))}
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
          <Text style={styles.sectionTitle}>Notes</Text>
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
            placeholder="Monthly check notes..."
            placeholderTextColor={Colors.textMuted}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {record.status !== 'completed' && (
          <TouchableOpacity style={styles.submitBtn} onPress={submit}>
            <Text style={styles.submitBtnText}>Complete Monthly Check</Text>
          </TouchableOpacity>
        )}
        {record.status === 'completed' && (
          <View style={styles.completedBanner}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.completedText}>Completed {record.completedAt ? new Date(record.completedAt).toLocaleDateString('en-GB') : ''}</Text>
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
  sectionTitle: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  checkAllText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  meterRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  meterLabel: { flex: 1, fontSize: 14, color: Colors.text },
  meterInput: {
    width: 100, backgroundColor: Colors.inputBg, borderWidth: 1, borderColor: Colors.inputBorder,
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8, textAlign: 'right', fontSize: 14, color: Colors.text,
  },
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
