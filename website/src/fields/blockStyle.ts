import type { Field } from 'payload'

/**
 * The only styling controls editors get on a block. No colour pickers:
 * every option maps to a brand token so pages stay on brand.
 */
export const blockStyle = (options: { align?: boolean } = {}): Field => ({
  name: 'style',
  type: 'group',
  label: 'Style',
  admin: { hideGutter: true },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'tone',
          type: 'select',
          label: 'Background tone',
          defaultValue: 'cream',
          admin: { width: '34%' },
          options: [
            { label: 'Cream', value: 'cream' },
            { label: 'Sand', value: 'sand' },
            { label: 'Linen', value: 'linen' },
            { label: 'Charcoal', value: 'charcoal' },
          ],
        },
        {
          name: 'spacing',
          type: 'select',
          label: 'Spacing',
          defaultValue: 'normal',
          admin: { width: '33%' },
          options: [
            { label: 'Compact', value: 'compact' },
            { label: 'Normal', value: 'normal' },
            { label: 'Generous', value: 'generous' },
          ],
        },
        ...(options.align === false
          ? []
          : [
              {
                name: 'align',
                type: 'select' as const,
                label: 'Alignment',
                defaultValue: 'left',
                admin: { width: '33%' },
                options: [
                  { label: 'Left', value: 'left' },
                  { label: 'Centre', value: 'center' },
                ],
              },
            ]),
      ],
    },
  ],
})
