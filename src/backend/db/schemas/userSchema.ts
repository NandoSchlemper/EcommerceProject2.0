import { relations } from 'drizzle-orm'
import {pgTable, text, uuid} from 'drizzle-orm/pg-core'
import { products } from './productSchema'
import { orderItems, orders } from './orderSchema'

export const users = pgTable('users', {
    id: uuid('id').defaultRandom(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
})

export const usersRelations = relations(users, ({many}) => ({
    products: many(products),
    order: many(orders),
    orderItems: many(orderItems)
}))