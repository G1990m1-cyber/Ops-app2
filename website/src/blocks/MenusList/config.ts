import type { Block } from 'payload'

import { MENU_TYPES } from '@/collections/Menus'
import { blockStyle } from '@/fields/blockStyle'

export const MenusList: Block = {
  slug: 'menusList',
  interfaceName: 'MenusListBlock',
  labels: { singular: 'Menus', plural: 'Menus lists' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Menus' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'hotel',
      type: 'relationship',
      relationTo: 'hotels',
      admin: { description: 'Only needed on a group page. Hotel pages show their own menus.' },
    },
    {
      name: 'types',
      type: 'select',
      hasMany: true,
      options: MENU_TYPES,
      admin: { description: 'Leave blank to show every current menu.' },
    },
    blockStyle(),
  ],
}
