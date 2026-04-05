import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import { useAppContext } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';

export default function ApprovalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { approvals, properties, users, updateApproval } = useAppContext();
  const { user } = useAuth();

  const approval = approvals.find((a) => a.id === id);
  const [reviewNotes, setReviewNotes] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  if (!approval) {
    return (
      <View style={styles.container}>
        <AppHeader title="Approval" showBack />
        <Text style={styles.empty}>Not found.</Text>
      </View>
    );
  }

  const property = properties.find((p) => p.id === approval.propertyId);
  const submitter = users.find((u) => u.id === approval.submittedBy);
  const reviewer = users.find((u) => u.id === approval.reviewedBy);

  function handleDecision(decision: 'approved' | 'rejected') {
    if (!reviewNotes.trim() && decision === 'rejected') {
      Alert.alert('Notes Required', 'Please add a reason for rejection.'); return;
    }
    const now = new Date().toISOString();
    updateApproval({
      ...approval,
      status: decision,
      reviewedBy: user?.id,
      reviewedAt: now,
      reviewNotes: reviewNotes.trim(),
      history: [
        ...approval.history,
        { id: `ah_${Date.now()}`, action: decision, by: user?.id ?? '', at: now, notes: reviewNotes.trim() },
      ],
    });
    Alert.alert(decision === 'approved' ? 'Approved' : 'Rejected', `Approval has been ${decision}.`, [
      { text: 'OK', onPress: () => router.back() },
    ]);
  }

  const STATUS_CONFIG = {
    in_progress: { color: Colors.warning, label: 'Pending Review' },
    approved: { color: Colors.success, label: 'Approved' },
    rejected: { color: Colors.error, label: 'Rejected' },
  };
  const statusCfg = STATUS_CONFIG[approval.status];

  const dateStr = new Date(approval.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <View style={styles.container}>
      <AppHeader title="Approval Request" showBack />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: insets.bottom + 100 }}>
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{approval.title}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusCfg.color + '18' }]}>
              <Text style={[styles.statusText, { color: statusCfg.color }]}>{statusCfg.label}</Text>
            </View>
          </View>
          <Text style={styles.description}>{approval.description}</Text>
        </View>

        <View style={styles.card}>
          {[
            { label: 'Amount', value: `£${approval.amount.toFixed(2)}`, bold: true },
            { label: 'Category', value: approval.category },
            { label: 'Property', value: property?.name ?? 'N/A' },
            { label: 'Submitted by', value: submitter?.name ?? approval.submittedBy },
            { label: 'Date submitted', value: dateStr },
          ].map(({ label, value, bold }) => (
            <View key={label} style={styles.metaRow}>
              <Text style={styles.metaLabel}>{label}</Text>
              <Text style={[styles.metaValue, bold && { fontWeight: '700', color: Colors.primary, fontSize: 16 }]}>
                {value}
              </Text>
            </View>
          ))}
          {reviewer && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Reviewed by</Text>
              <Text style={styles.metaValue}>{reviewer.name}</Text>
            </View>
          )}
          {approval.reviewNotes && (
            <View style={[styles.metaRow, { flexDirection: 'column' }]}>
              <Text style={styles.metaLabel}>Review notes</Text>
              <Text style={[styles.metaValue, { marginTop: 4, fontStyle: 'italic' }]}>{approval.reviewNotes}</Text>
            </View>
          )}
        </View>

        {approval.status === 'in_progress' && user?.role === 'admin' || user?.role === 'manager' ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Review Decision</Text>
            <TextInput
              style={styles.input}
              value={reviewNotes}
              onChangeText={setReviewNotes}
              placeholder="Add review notes (required for rejection)..."
              placeholderTextColor={Colors.textMuted}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
            <View style={styles.decisionRow}>
              <TouchableOpacity
                style={[styles.decisionBtn, styles.rejectBtn]}
                onPress={() => handleDecision('rejected')}
              >
                <Ionicons name="close-circle-outline" size={18} color={Colors.error} />
                <Text style={[styles.decisionBtnText, { color: Colors.error }]}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.decisionBtn, styles.approveBtn]}
                onPress={() => handleDecision('approved')}
              >
                <Ionicons name="checkmark-circle-outline" size={18} color={Colors.white} />
                <Text style={[styles.decisionBtnText, { color: Colors.white }]}>Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <TouchableOpacity style={styles.historyBtn} onPress={() => setShowHistory(true)}>
          <Ionicons name="time-outline" size={18} color={Colors.primary} />
          <Text style={styles.historyBtnText}>View Approval History ({approval.history.length})</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showHistory} transparent animationType="slide" onRequestClose={() => setShowHistory(false)}>
        <Pressable style={styles.overlay} onPress={() => setShowHistory(false)}>
          <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Approval History</Text>
            <ScrollView>
              {approval.history.map((h, idx) => {
                const byUser = users.find((u) => u.id === h.by);
                return (
                  <View key={h.id} style={styles.historyItem}>
                    <View style={[styles.historyDot, {
                      backgroundColor: h.action === 'approved' ? Colors.success
                        : h.action === 'rejected' ? Colors.error : Colors.primary,
                    }]} />
                    <View style={styles.historyContent}>
                      <Text style={styles.historyAction}>
                        {h.action.charAt(0).toUpperCase() + h.action.slice(1)}
                        {byUser ? ` by ${byUser.name}` : ''}
                      </Text>
                      <Text style={styles.historyDate}>{new Date(h.at).toLocaleDateString('en-GB')}</Text>
                      {h.notes && <Text style={styles.historyNote}>{h.notes}</Text>}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowHistory(false)}>
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
  empty: { textAlign: 'center', color: Colors.textMuted, marginTop: 40 },
  card: {
    backgroundColor: Colors.white, borderRadius: 12, padding: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 12 },
  title: { flex: 1, fontSize: 18, fontWeight: '700', color: Colors.text },
  statusBadge: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  statusText: { fontSize: 12, fontWeight: '600' },
  description: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  metaLabel: { fontSize: 13, color: Colors.textSecondary, textTransform: 'capitalize' },
  metaValue: { fontSize: 14, color: Colors.text, textTransform: 'capitalize', textAlign: 'right', flex: 1, marginLeft: 8 },
  sectionTitle: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 },
  input: {
    backgroundColor: Colors.inputBg, borderWidth: 1, borderColor: Colors.inputBorder,
    borderRadius: 8, padding: 12, fontSize: 14, color: Colors.text, minHeight: 80, marginBottom: 12,
  },
  decisionRow: { flexDirection: 'row', gap: 10 },
  decisionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 12, gap: 6 },
  rejectBtn: { borderWidth: 1.5, borderColor: Colors.error },
  approveBtn: { backgroundColor: Colors.success },
  decisionBtnText: { fontSize: 15, fontWeight: '600' },
  historyBtn: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white,
    borderRadius: 12, padding: 16, gap: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2,
  },
  historyBtnText: { flex: 1, fontSize: 14, color: Colors.primary, fontWeight: '500' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: Colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 20, maxHeight: '65%',
  },
  sheetHandle: { width: 40, height: 4, backgroundColor: Colors.border, borderRadius: 2, alignSelf: 'center', marginBottom: 16 },
  sheetTitle: { fontSize: 18, fontWeight: '700', color: Colors.text, marginBottom: 16 },
  historyItem: { flexDirection: 'row', gap: 12, paddingBottom: 16 },
  historyDot: { width: 10, height: 10, borderRadius: 5, marginTop: 4 },
  historyContent: { flex: 1 },
  historyAction: { fontSize: 14, fontWeight: '600', color: Colors.text, textTransform: 'capitalize' },
  historyDate: { fontSize: 12, color: Colors.textSecondary, marginTop: 2 },
  historyNote: { fontSize: 13, color: Colors.textSecondary, marginTop: 4, fontStyle: 'italic' },
  closeBtn: { backgroundColor: Colors.primary, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 16 },
  closeBtnText: { color: Colors.white, fontWeight: '600', fontSize: 15 },
});
