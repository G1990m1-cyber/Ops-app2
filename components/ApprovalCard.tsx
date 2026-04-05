import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { Approval, Property, User } from '../types';

interface ApprovalCardProps {
  approval: Approval;
  property?: Property;
  submitter?: User;
  onPress: () => void;
}

const STATUS_CONFIG = {
  in_progress: { label: 'In Progress', color: Colors.warning, icon: 'hourglass-outline' as const },
  approved: { label: 'Approved', color: Colors.success, icon: 'checkmark-circle-outline' as const },
  rejected: { label: 'Rejected', color: Colors.error, icon: 'close-circle-outline' as const },
};

const CATEGORY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  maintenance: 'construct-outline',
  supplies: 'cart-outline',
  emergency: 'flash-outline',
  upgrade: 'trending-up-outline',
  other: 'document-outline',
};

export default function ApprovalCard({ approval, property, submitter, onPress }: ApprovalCardProps) {
  const statusCfg = STATUS_CONFIG[approval.status];
  const icon = CATEGORY_ICONS[approval.category] ?? 'document-outline';

  const dateStr = new Date(approval.submittedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.topRow}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={20} color={Colors.primary} />
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.title} numberOfLines={2}>{approval.title}</Text>
          {property && <Text style={styles.property}>{property.name}</Text>}
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusCfg.color + '18' }]}>
          <Ionicons name={statusCfg.icon} size={14} color={statusCfg.color} />
          <Text style={[styles.statusText, { color: statusCfg.color }]}>{statusCfg.label}</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.amount}>£{approval.amount.toFixed(2)}</Text>
        <Text style={styles.meta}>{dateStr}</Text>
        {submitter && <Text style={styles.meta}>· {submitter.name}</Text>}
        <Text style={[styles.category, styles.categoryPill]}>{approval.category}</Text>
      </View>
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
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary + '18',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  titleBlock: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  property: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    marginRight: 4,
  },
  meta: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  category: {
    fontSize: 11,
    color: Colors.textSecondary,
  },
  categoryPill: {
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    textTransform: 'capitalize',
    overflow: 'hidden',
  },
});
