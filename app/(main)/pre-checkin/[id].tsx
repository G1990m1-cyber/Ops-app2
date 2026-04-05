import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';

export default function PreCheckInDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { preCheckIns, bookings, updatePreCheckIn } = useAppContext();
  const { user } = useAuth();

  const record = preCheckIns.find((c) => c.id === id);
  const booking = record ? bookings.find((b) => b.id === record.bookingId) : null;

  const [checklist, setChecklist] = useState(record?.checklist ?? []);
  const [notes, setNotes] = useState(record?.notes ?? '');

  if (!record) return (
    <View style={styles.container}><AppHeader title="Pre Check In" showBack /><Text style={styles.empty}>Not found.</Text></View>
  );

  function toggle(itemId: string) {
    setChecklist((prev) => prev.map((c) => c.id === itemId ? { ...c, checked: !c.checked } : c));
  }

  function complete() {
    const allChecked = checklist.every((c) => c.checked);
    if (!allChecked) {
      Alert.alert('Incomplete', 'Please complete all checklist items before marking as complete.');
      return;
    }
    updatePreCheckIn({
      ...record,
      checklist,
      notes,
      status: 'completed',
      completedAt: new Date().toISOString(),
      completedBy: user?.id,
    });
    Alert.alert('Completed', 'Pre check-in marked as complete.', [{ text: 'OK', onPress: () => router.back() }]);
  }

  function save() {
    updatePreCheckIn({ ...record, checklist, notes });
    Alert.alert('Saved', 'Progress saved.', [{ text: 'OK', onPress: () => router.back() }]);
  }

  const progress = checklist.filter((c) => c.checked).length;

  return (
    <View style={styles.container}>
      <AppHeader title="Pre Check In" showBack />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 40 }}>
        {/* Booking info */}
        <View style={styles.card}>
          <Text style={styles.bookingRef}>{booking?.bookingRef} - {booking?.guestName}</Text>
          <Text style={styles.bookingDates}>
            {booking ? `${new Date(booking.checkIn).toLocaleDateString('en-GB')} → ${new Date(booking.checkOut).toLocaleDateString('en-GB')}` : ''}
          </Text>
          {booking?.guests ? <Text style={styles.guestCount}>{booking.guests} guests</Text> : null}
        </View>

        {/* Progress */}
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>{progress}/{checklist.length} items completed</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${(progress / checklist.length) * 100}%` }]} />
          </View>
        </View>

        {/* Checklist */}
        {checklist.map((item) => (
          <TouchableOpacity key={item.id} style={styles.checkRow} onPress={() => toggle(item.id)}>
            <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
              {item.checked && <Ionicons name="checkmark" size={14} color={Colors.white} />}
            </View>
            <Text style={[styles.checkLabel, item.checked && styles.checkLabelDone]}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Notes */}
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={styles.input}
          value={notes}
          onChangeText={setNotes}
          multiline
          numberOfLines={3}
          placeholder="Any notes..."
          placeholderTextColor={Colors.textMuted}
          textAlignVertical="top"
        />

        {record.status !== 'completed' && (
          <>
            <TouchableOpacity style={styles.completeBtn} onPress={complete}>
              <Text style={styles.completeBtnText}>Mark as Complete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={save}>
              <Text style={styles.saveBtnText}>Save Progress</Text>
            </TouchableOpacity>
          </>
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
  bookingRef: { fontSize: 16, fontWeight: '700', color: Colors.primary },
  bookingDates: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  guestCount: { fontSize: 13, color: Colors.textMuted, marginTop: 2 },
  progressRow: { gap: 6 },
  progressText: { fontSize: 13, color: Colors.textSecondary, fontWeight: '600' },
  progressBar: { height: 8, backgroundColor: Colors.border, borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  checkbox: {
    width: 22, height: 22, borderRadius: 5, borderWidth: 2,
    borderColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: Colors.primary },
  checkLabel: { flex: 1, fontSize: 14, color: Colors.text },
  checkLabelDone: { textDecorationLine: 'line-through', color: Colors.textMuted },
  label: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  input: {
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border,
    borderRadius: 10, padding: 12, fontSize: 14, color: Colors.text, minHeight: 80,
  },
  completeBtn: { backgroundColor: Colors.success, borderRadius: 12, padding: 16, alignItems: 'center' },
  completeBtnText: { color: Colors.white, fontWeight: '700', fontSize: 16 },
  saveBtn: { backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.primary, borderRadius: 12, padding: 14, alignItems: 'center' },
  saveBtnText: { color: Colors.primary, fontWeight: '600', fontSize: 15 },
  completedBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.successLight, borderRadius: 10, padding: 14,
  },
  completedText: { color: Colors.success, fontWeight: '600', fontSize: 14 },
});
