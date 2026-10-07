import type { CollectionConfig } from 'payload'

import { adminOnlyField, hiddenUnlessAdmin, isAdmin, isAdminUser } from '@/access'
import type { User } from '@/payload-types'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  auth: {
    tokenExpiration: 60 * 60 * 12, // 12 hours
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 minutes
    forgotPassword: {
      generateEmailSubject: () => 'Reset your GR Hotels website password',
      generateEmailHTML: (args) => {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL || ''}/admin/reset/${args?.token}`
        const name = (args?.user as User | undefined)?.name || 'there'
        return `
          <div style="font-family:Georgia,serif;font-size:18px;color:#262626;line-height:1.5">
            <p>Hello ${name},</p>
            <p>Someone asked to reset the password for your GR Hotels website login. If that was you, click the link below. It works for one hour.</p>
            <p><a href="${url}" style="color:#88764c">Choose a new password</a></p>
            <p>If you did not ask for this, you can ignore this email and nothing will change.</p>
            <p>GR Hotels</p>
          </div>`
      },
    },
  },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: isAdmin,
    delete: isAdmin,
    read: ({ req }) => (isAdminUser(req.user) ? true : req.user ? { id: { equals: req.user.id } } : false),
    update: ({ req }) => (isAdminUser(req.user) ? true : req.user ? { id: { equals: req.user.id } } : false),
  },
  admin: {
    defaultColumns: ['name', 'email', 'role', 'hotels'],
    useAsTitle: 'name',
    group: 'Settings',
    hidden: hiddenUnlessAdmin,
    description: 'Admins see everything. Hotel Managers only see the hotels you assign to them.',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'manager',
      options: [
        { label: 'Admin (everything)', value: 'admin' },
        { label: 'Hotel Manager (assigned hotels only)', value: 'manager' },
      ],
      access: { update: adminOnlyField, create: adminOnlyField },
      saveToJWT: true,
    },
    {
      name: 'hotels',
      type: 'relationship',
      relationTo: 'hotels',
      hasMany: true,
      label: 'Hotels this person manages',
      admin: { condition: (_, siblingData) => siblingData?.role === 'manager' },
      access: { update: adminOnlyField, create: adminOnlyField },
      saveToJWT: true,
    },
  ],
  timestamps: true,
}
