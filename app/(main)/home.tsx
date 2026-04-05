import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, StatusBar } from 'react-native';
import Colors from '../../constants/colors';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');
const TILE_SIZE = (width - 48) / 2;

interface Tile {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  badge?: number;
}

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { actionItems, approvals, preCheckIns, postCheckOuts, workTickets } = useAppContext();
  const today = new Date().toISOString().split('T')[0];

  const pendingActions = actionItems.filter((a) => a.status !== 'completed').length;
  const pendingApprovals = approvals.filter((a) => a.status === 'in_progress').length;
  const todayCheckIns = preCheckIns.filter((c) => {
    const b = c.scheduledDate === today;
    return b && c.status === 'pending';
  }).length;
  const todayCheckOuts = postCheckOuts.filter((c) => c.status === 'pending').length;
  const openTickets = workTickets.filter((t) => t.status !== 'completed' && t.status !== 'cancelled').length;

  const tiles: Tile[] = [
    { label: 'Action Items', icon: 'alert-circle-outline', route: '/(main)/action-items/', badge: pendingActions },
    { label: 'Stocktake', icon: 'cart-outline', route: '/(main)/stocktake/' },
    { label: 'Pre Check Ins', icon: 'business-outline', route: '/(main)/pre-checkin/', badge: todayCheckIns },
    { label: 'Post Check Outs', icon: 'log-out-outline', route: '/(main)/post-checkout/', badge: todayCheckOuts },
    { label: 'Weekly Checks', icon: 'newspaper-outline', route: '/(main)/weekly-checks/' },
    { label: 'Send for Approvals', icon: 'mail-outline', route: '/(main)/approvals/', badge: pendingApprovals },
    { label: 'Monthly Checks', icon: 'calendar-outline', route: '/(main)/monthly-checks/' },
    { label: 'Properties', icon: 'home-outline', route: '/(main)/properties/' },
    { label: 'Office Dashboard', icon: 'bar-chart-outline', route: '/(main)/dashboard/' },
    { label: 'Work Tickets', icon: 'construct-outline', route: '/(main)/work-tickets/', badge: openTickets },
    ...(user?.role === 'admin' ? [
      { label: 'Manage Admins', icon: 'person-outline' as keyof typeof Ionicons.glyphMap, route: '/(main)/admin/' },
      { label: 'Manage Users', icon: 'people-outline' as keyof typeof Ionicons.glyphMap, route: '/(main)/admin/users' },
    ] : []),
  ];

  const paddingTop = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 8 : insets.top + 8;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* Header */}
      <View style={[styles.header, { paddingTop }]}>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="home" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Group Retreats</Text>
        <TouchableOpacity style={styles.headerIcon} onPress={() => router.push('/(auth)/login')}>
          <Ionicons name="person-circle-outline" size={26} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {tiles.map((tile) => (
          <TouchableOpacity
            key={tile.label}
            style={styles.tile}
            onPress={() => router.push(tile.route as any)}
            activeOpacity={0.75}
          >
            {tile.badge ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{tile.badge}</Text>
              </View>
            ) : null}
            <Ionicons name={tile.icon} size={44} color={Colors.primary} />
            <Text style={styles.tileLabel}>{tile.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  headerIcon: { width: 36, alignItems: 'center' },
  headerTitle: {
    flex: 1,
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    gap: 12,
    paddingBottom: 32,
  },
  tile: {
    width: TILE_SIZE,
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  tileLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
});
