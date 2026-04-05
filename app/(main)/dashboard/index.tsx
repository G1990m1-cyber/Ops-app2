import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import StatCard from '../../../components/StatCard';
import { useAppContext } from '../../../context/AppContext';

export default function OfficeDashboardScreen() {
  const insets = useSafeAreaInsets();
  const { bookings, actionItems, approvals, workTickets, preCheckIns, postCheckOuts, properties } = useAppContext();

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const checkInsToday = bookings.filter((b) => b.checkIn === today).length;
  const checkInsTomorrow = bookings.filter((b) => b.checkIn === tomorrow).length;
  const checkOutsToday = bookings.filter((b) => b.checkOut === today).length;
  const propertiesOccupied = bookings.filter((b) => b.status === 'checked_in').length;

  const openActions = actionItems.filter((a) => a.status !== 'completed').length;
  const overdueActions = actionItems.filter((a) => a.status !== 'completed' && new Date(a.dueDate) < new Date()).length;
  const pendingApprovals = approvals.filter((a) => a.status === 'in_progress').length;
  const pendingApprovalAmount = approvals.filter((a) => a.status === 'in_progress').reduce((s, a) => s + a.amount, 0);

  const openTickets = workTickets.filter((t) => t.status === 'open' || t.status === 'in_progress').length;
  const urgentTickets = workTickets.filter((t) => t.priority === 'urgent' && t.status !== 'completed').length;

  const damageReports = [...preCheckIns, ...postCheckOuts].filter((r) => r.damageReported).length;

  const pendingCheckIns = preCheckIns.filter((p) => p.status === 'pending').length;
  const pendingCheckOuts = postCheckOuts.filter((p) => p.status === 'pending').length;

  return (
    <View style={styles.container}>
      <AppHeader title="Office Dashboard" showBack />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}>
        {/* Today summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          <View style={styles.row}>
            <StatCard
              label="Check Ins Today"
              value={checkInsToday}
              icon="log-in-outline"
              color={Colors.success}
            />
            <View style={styles.spacer} />
            <StatCard
              label="Check Outs Today"
              value={checkOutsToday}
              icon="log-out-outline"
              color={Colors.warning}
            />
          </View>
          <View style={[styles.row, { marginTop: 10 }]}>
            <StatCard
              label="Check Ins Tomorrow"
              value={checkInsTomorrow}
              icon="calendar-outline"
              color={Colors.info}
            />
            <View style={styles.spacer} />
            <StatCard
              label="Properties Occupied"
              value={`${propertiesOccupied}/${properties.filter(p => p.active).length}`}
              icon="business-outline"
              color={Colors.primary}
            />
          </View>
        </View>

        {/* Pending work */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Work</Text>
          <View style={styles.row}>
            <StatCard
              label="Pre Check Ins Pending"
              value={pendingCheckIns}
              icon="list-outline"
              color={Colors.info}
            />
            <View style={styles.spacer} />
            <StatCard
              label="Post Check Outs Pending"
              value={pendingCheckOuts}
              icon="clipboard-outline"
              color={Colors.warning}
            />
          </View>
        </View>

        {/* Action items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Action Items & Compliance</Text>
          <View style={styles.row}>
            <StatCard
              label="Open Action Items"
              value={openActions}
              icon="alert-circle-outline"
              color={Colors.warning}
            />
            <View style={styles.spacer} />
            <StatCard
              label="Overdue"
              value={overdueActions}
              icon="warning-outline"
              color={Colors.error}
            />
          </View>
        </View>

        {/* Approvals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Caretaker Approvals</Text>
          <View style={styles.row}>
            <StatCard
              label="Pending Approvals"
              value={pendingApprovals}
              icon="hourglass-outline"
              color={Colors.warning}
            />
            <View style={styles.spacer} />
            <StatCard
              label="Pending Amount"
              value={`£${pendingApprovalAmount.toFixed(0)}`}
              icon="cash-outline"
              color={Colors.primary}
            />
          </View>
        </View>

        {/* Work tickets */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Tickets</Text>
          <View style={styles.row}>
            <StatCard
              label="Open Tickets"
              value={openTickets}
              icon="hammer-outline"
              color={Colors.info}
            />
            <View style={styles.spacer} />
            <StatCard
              label="Urgent Tickets"
              value={urgentTickets}
              icon="flash-outline"
              color={Colors.error}
            />
          </View>
        </View>

        {/* Damage reports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Damage Reports</Text>
          <View style={styles.damageCard}>
            <View style={styles.damageIconWrap}>
              <Ionicons name="shield-outline" size={32} color={damageReports > 0 ? Colors.error : Colors.success} />
            </View>
            <View style={styles.damageInfo}>
              <Text style={styles.damageCount}>{damageReports}</Text>
              <Text style={styles.damageLabel}>
                {damageReports === 0 ? 'No damage reports on record' : `Damage report${damageReports > 1 ? 's' : ''} outstanding`}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  section: { marginBottom: 20 },
  sectionTitle: {
    fontSize: 13, fontWeight: '600', color: Colors.textSecondary,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10,
  },
  row: { flexDirection: 'row' },
  spacer: { width: 10 },
  damageCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: Colors.white, borderRadius: 12, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
  },
  damageIconWrap: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center',
  },
  damageInfo: { flex: 1 },
  damageCount: { fontSize: 28, fontWeight: '700', color: Colors.text },
  damageLabel: { fontSize: 13, color: Colors.textSecondary, marginTop: 2 },
});
