import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { StocktakeItem } from '../types';

interface StocktakeRowProps {
  item: StocktakeItem;
  quantity: string;
  onChangeQuantity: (val: string) => void;
}

export default function StocktakeRow({ item, quantity, onChangeQuantity }: StocktakeRowProps) {
  const qty = parseInt(quantity, 10);
  const isLow = !isNaN(qty) && qty < item.minStock;

  return (
    <View style={[styles.row, isLow && styles.rowLow]}>
      <View style={styles.labelCol}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.unit}>
          Min: {item.minStock} {item.unit}
        </Text>
      </View>
      <View style={styles.inputCol}>
        <TextInput
          style={[styles.input, isLow && styles.inputLow]}
          value={quantity}
          onChangeText={onChangeQuantity}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={Colors.textMuted}
          selectTextOnFocus
        />
        <Text style={styles.unitLabel}>{item.unit}</Text>
      </View>
      {isLow && (
        <View style={styles.lowBadge}>
          <Text style={styles.lowText}>LOW</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  rowLow: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.error,
  },
  labelCol: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  unit: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  inputCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  input: {
    width: 60,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    backgroundColor: Colors.inputBg,
  },
  inputLow: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },
  unitLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    minWidth: 30,
  },
  lowBadge: {
    marginLeft: 8,
    backgroundColor: Colors.errorLight,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  lowText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.error,
  },
});
