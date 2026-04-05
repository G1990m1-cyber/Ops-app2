import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import { WorkTicket, Property, User } from '../types';

interface WorkTicketCardProps {
  ticket: WorkTicket;
  property?: Property;
  assignee?: User;
  onPress: () => void;
}

const PRIORITY_CONFIG = {
  low: { color: Colors.badgeGreen, label: 'Low' },
  medium: { color: Colors.info, label: 'Medium' },
  high: { color: Colors.warning, label: 'High' },
  urgent: { color: Colors.error, label: 'Urgent' },
};

const STATUS_CONFIG = {
  open: { color: Colors.info, label: 'Open', icon: 'radio-button-on-outline' as const },
  in_progress: { color: Colors.warning, label: 'In Progress', icon: 'reload-outline' as const },
  completed: { color: Colors.success, label: 'Completed', icon: 'checkmark-circle-outline' as const },
  cancelled: { color: Colors.textMuted, label: 'Cancelled', icon: 'close-circle-outline' as const },
};

const CATEGORY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  maintenance: 'hammer-outline',
  cleaning: 'sparkles-outline',
  repair: 'construct-outline',
  inspection: 'search-outline',
  other: 'ellipsis-horizontal-circle-outline',
};

export default function WorkTicketCard({ ticket, property, assignee, onPress }: WorkTicketCardProps) {
  const priorityCfg = PRIORITY_CONFIG[ticket.priority];
  const statusCfg = STATUS_CONFIG[ticket.status];
  const icon = CATEGORY_ICONS[ticket.category] ?? 'document-outline';

  const dueStr = ticket.dueDate
    ? new Date(ticket.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    : null;

  const isOverdue =
    ticket.dueDate &&
    ticket.status !== 'completed' &&
    ticket.status !== 'cancelled' &&
    new Date(ticket.dueDate) < new Date();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.topRow}>
        <View style={[styles.iconWrap, { backgroundColor: priorityCfg.color + '18' }]}>
          <Ionicons name={icon} size={18} color={priorityCfg.color} />
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.title} numberOfLines={2}>{ticket.title}</Text>
          {property && <Text style={styles.property}>{property.name}</Text>}
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusCfg.color + '18' }]}>
          <Ionicons name={statusCfg.icon} size={13} color={statusCfg.color} />
          <Text style={[styles.statusText, { color: statusCfg.color }]}>{statusCfg.label}</Text>
        </View>
      </View>
      <View style={styles.bottomRow}>
        <View style={[styles.priorityDot, { backgroundColor: priorityCfg.color }]} />
        <Text style={[styles.priorityText, { color: priorityCfg.color }]}>{priorityCfg.label}</Text>
        {assignee && (
          <>
            <Text style={styles.sep}>·</Text>
            <Ionicons name="person-outline" size={12} color={Colors.textSecondary} />
            <Text style={styles.meta}>{assignee.name.split(' ')[0]}</Text>
          </>
        )}
        {dueStr && (
          <>
            <Text style={styles.sep}>·</Text>
            <Ionicons
              name="calendar-outline"
              size={12}
              color={isOverdue ? Colors.error : Colors.textSecondary}
            />
            <Text style={[styles.meta, isOverdue && styles.metaOverdue]}>
              {isOverdue ? 'Overdue ' : ''}{dueStr}
            </Text>
          </>
        )}
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
    width: 34,
    height: 34,
    borderRadius: 17,
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
    paddingHorizontal: 7,
    paddingVertical: 3,
    gap: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sep: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  meta: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  metaOverdue: {
    color: Colors.error,
    fontWeight: '600',
  },
});
