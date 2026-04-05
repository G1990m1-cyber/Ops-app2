import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

interface CountdownBadgeProps {
  dueDate: string;
  size?: 'sm' | 'md';
}

function getDaysUntil(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();
  due.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diff = due.getTime() - now.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export default function CountdownBadge({ dueDate, size = 'md' }: CountdownBadgeProps) {
  const days = getDaysUntil(dueDate);

  let bg: string;
  let textColor: string;
  let label: string;

  if (days < 0) {
    bg = Colors.badgeRedBg;
    textColor = Colors.badgeRed;
    label = `${Math.abs(days)}d overdue`;
  } else if (days === 0) {
    bg = Colors.badgeAmberBg;
    textColor = Colors.badgeAmber;
    label = 'Due today';
  } else if (days <= 7) {
    bg = Colors.badgeAmberBg;
    textColor = Colors.badgeAmber;
    label = `${days}d left`;
  } else if (days <= 30) {
    bg = Colors.badgeGreyBg;
    textColor = Colors.badgeGrey;
    label = `${days}d left`;
  } else {
    bg = Colors.badgeGreenBg;
    textColor = Colors.badgeGreen;
    label = `${days}d left`;
  }

  const isSmall = size === 'sm';

  return (
    <View style={[styles.badge, { backgroundColor: bg }, isSmall && styles.badgeSm]}>
      <Text style={[styles.text, { color: textColor }, isSmall && styles.textSm]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  badgeSm: {
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  textSm: {
    fontSize: 10,
  },
});
