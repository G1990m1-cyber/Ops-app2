import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import AppHeader from '../../../components/AppHeader';
import { useAppContext } from '../../../context/AppContext';

export default function PreCheckInScreen() {
  const router = useRouter();
  const { preCheckIns, bookings, properties } = useAppContext();
  const [tab, setTab] = useState<'today' | 'completed'>('today');
  const [search, setSearch] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const filtered = useMemo(() => {
    const base = preCheckIns.filter((c) =>
      tab === 'today' ? c.status === 'pending' : c.status === 'completed'
    );
    if (!search.trim()) return base;
    const q = search.toLowerCase();
    return base.filter((c) => {
      const b = bookings.find((bk) => bk.id === c.bookingId);
      return (
        c.bookingId.toLowerCase().includes(q) ||
        b?.guestName.toLowerCase().includes(q)
      );
    });
  }, [preCheckIns, tab, search, bookings]);

  function bookingLabel(bookingId: string) {
    const b = bookings.find((bk) => bk.id === bookingId);
    if (!b) return { ref: bookingId, name: '', dates: '' };
    return {
      ref: b.bookingRef,
      name: b.guestName,
      dates: `${new Date(b.checkIn).toLocaleDateString('en-GB')} - ${new Date(b.checkOut).toLocaleDateString('en-GB')}`,
    };
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Pre Check In" />
      <View style={{ padding: 12, gap: 10 }}>
        <TextInput
          style={styles.search}
          value={search}
          onChangeText={setSearch}
          placeholder="Search by Booking ID or Guest Name"
          placeholderTextColor={Colors.textMuted}
        />
        <View style={styles.tabRow}>
          <TouchableOpacity
            style={[styles.tab, tab === 'today' && styles.tabActive]}
            onPress={() => setTab('today')}
          >
            <Text style={[styles.tabText, tab === 'today' && styles.tabTextActive]}>Today's Check In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, tab === 'completed' && styles.tabActive]}
            onPress={() => setTab('completed')}
          >
            <Text style={[styles.tabText, tab === 'completed' && styles.tabTextActive]}>Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="filter-outline" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12, gap: 10, paddingBottom: 32 }}
        ListEmptyComponent={<Text style={styles.empty}>No check-ins found.</Text>}
        renderItem={({ item }) => {
          const { ref, name, dates } = bookingLabel(item.bookingId);
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push({ pathname: '/(main)/pre-checkin/[id]', params: { id: item.id } })}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.bookingRef}>{ref} - {name}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <Ionicons name="calendar-outline" size={13} color={Colors.textSecondary} />
                  <Text style={styles.dates}>{dates}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => router.push({ pathname: '/(main)/pre-checkin/[id]', params: { id: item.id } })}
              >
                <Ionicons name="create-outline" size={20} color={Colors.textSecondary} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  search: {
    backgroundColor: Colors.white, borderWidth: 1, borderColor: Colors.border,
    borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10, fontSize: 14, color: Colors.text,
  },
  tabRow: { flexDirection: 'row', gap: 0, alignItems: 'center' },
  tab: {
    flex: 1, paddingVertical: 10, alignItems: 'center',
    borderBottomWidth: 2, borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: Colors.primary },
  tabText: { fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
  tabTextActive: { color: Colors.primary, fontWeight: '700' },
  filterBtn: { padding: 8 },
  card: {
    backgroundColor: Colors.white, borderRadius: 12, padding: 14,
    flexDirection: 'row', alignItems: 'center',
    borderLeftWidth: 3, borderLeftColor: Colors.primary,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
  },
  bookingRef: { fontSize: 15, fontWeight: '600', color: Colors.primary },
  dates: { fontSize: 13, color: Colors.textSecondary },
  editBtn: { padding: 4 },
  empty: { textAlign: 'center', color: Colors.textMuted, marginTop: 40, fontSize: 15 },
});
