import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import CountdownBadge from './CountdownBadge';
import { ActionItem, Property } from '../types';

interface ActionItemCardProps {
  item: ActionItem;
  property?: Property;
  onPress: () => void;
}

const CATEGORY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  compliance: 'shield-checkmark-outline',
  maintenance: 'construct-outline',
  safety: 'warning-outline',
  admin: 'document-text-outline',
  cleaning: 'sparkles-outline',
};

const PRIORITY_COLOR: Record<string, string> = {
  critical: Colors.badgeRed,
  high: Colors.warning,
  medium: Colors.info,
  low: Colors.badgeGreen,
};

export default function ActionItemCard({ item, property, onPress }: ActionItemCardProps) {
  const icon = CATEGORY_ICONS[item.category] ?? 'alert-circle-outline';
  const priorityColor = PRIORITY_COLOR[item.priority] ?? Colors.textMuted;
  const isCompleted = item.status === 'completed';

  return (
    <TouchableOpacity
      style={[styles.card, isCompleted && styles.cardCompleted]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconCol}>
        <View style={[styles.iconWrap, { backgroundColor: priorityColor + '18' }]}>
          <Ionicons name={icon} size={22} color={priorityColor} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, isCompleted && styles.titleCompleted]} numberOfLines={2}>
          {item.title}
        </Text>
        {property && (
          <View style={styles.row}>
            <Ionicons name="business-outline" size={12} color={Colors.textSecondary} />
            <Text style={styles.meta}> {property.name}</Text>
          </View>
        )}
        {!property && item.propertyId === null && (
          <View style={styles.row}>
            <Ionicons name="globe-outline" size={12} color={Colors.textSecondary} />
            <Text style={styles.meta}> All Properties</Text>
          </View>
        )}
        <View style={styles.row}>
          <Text style={[styles.category, { color: priorityColor }]}>
            {item.priority.toUpperCase()} · {item.category}
          </Text>
        </View>
      </View>
      <View style={styles.badgeCol}>
        {!isCompleted ? (
          <CountdownBadge dueDate={item.dueDate} size="sm" />
        ) : (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={22} color={Colors.success} />
          </View>
        )}
        {item.approvalRequired && (
          <View style={styles.approvalDot}>
            <Ionicons
              name={item.approvalStatus === 'approved' ? 'checkmark-circle-outline' : 'hourglass-outline'}
              size={14}
              color={item.approvalStatus === 'approved' ? Colors.success : Colors.warning}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 10,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
    alignItems: 'flex-start',
  },
  cardCompleted: {
    opacity: 0.7,
  },
  iconCol: {
    marginRight: 12,
    paddingTop: 2,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textMuted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  meta: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginTop: 2,
  },
  badgeCol: {
    alignItems: 'flex-end',
    gap: 6,
  },
  completedBadge: {
    marginTop: 2,
  },
  approvalDot: {
    marginTop: 4,
  },
});
