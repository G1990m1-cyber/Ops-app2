import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { Booking, Property, PreCheckIn, PostCheckOut } from '../types';

interface CheckInCardProps {
  booking: Booking;
  property?: Property;
  record: PreCheckIn | PostCheckOut;
  type: 'checkin' | 'checkout';
  onPress: () => void;
}

export default function CheckInCard({
  booking,
  property,
  record,
  type,
  onPress,
}: CheckInCardProps) {
  const isCompleted = record.status === 'completed';
  const totalItems = record.checklist.length;
  const completedItems = record.checklist.filter((c) => c.checked).length;
  const progress = totalItems > 0 ? completedItems / totalItems : 0;

  const dateStr = new Date(record.scheduledDate).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const hasDamage = record.damageReported;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={styles.guestInfo}>
          <Text style={styles.guestName}>{booking.guestName}</Text>
          <Text style={styles.ref}>{booking.bookingRef}</Text>
        </View>
        <View style={[styles.statusBadge, isCompleted ? styles.statusDone : styles.statusPending]}>
          <Text style={[styles.statusText, isCompleted ? styles.statusTextDone : styles.statusTextPending]}>
            {isCompleted ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        {property && (
          <View style={styles.detailRow}>
            <Ionicons name="business-outline" size={13} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{property.name}</Text>
          </View>
        )}
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={13} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{dateStr}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="people-outline" size={13} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{booking.guests} guests</Text>
        </View>
        {booking.source !== 'direct' && (
          <View style={styles.detailRow}>
            <Ionicons name="link-outline" size={13} color={Colors.textSecondary} />
            <Text style={styles.detailText}>{booking.source}</Text>
          </View>
        )}
      </View>

      {!isCompleted && totalItems > 0 && (
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {completedItems}/{totalItems} items
          </Text>
        </View>
      )}

      {hasDamage && (
        <View style={styles.damageAlert}>
          <Ionicons name="warning-outline" size={14} color={Colors.error} />
          <Text style={styles.damageText}>Damage reported</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 10,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  guestInfo: {
    flex: 1,
    marginRight: 8,
  },
  guestName: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
  },
  ref: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusDone: {
    backgroundColor: Colors.successLight,
  },
  statusPending: {
    backgroundColor: Colors.warningLight,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextDone: {
    color: Colors.success,
  },
  statusTextPending: {
    color: Colors.warning,
  },
  details: {
    gap: 4,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: Colors.textSecondary,
    minWidth: 50,
  },
  damageAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    backgroundColor: Colors.errorLight,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  damageText: {
    fontSize: 12,
    color: Colors.error,
    fontWeight: '600',
  },
});
