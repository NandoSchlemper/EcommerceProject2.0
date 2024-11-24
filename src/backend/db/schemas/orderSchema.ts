import {numeric, pgTable, uuid} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './userSchema'
import { products } from './productSchema'

export const orderItems = pgTable('order_items', {
    id: uuid('id').defaultRandom(),
    order_id: uuid('order_id').notNull(),
    user_id: uuid('user_id').notNull(),
    product_id: uuid('product_id').notNull(),
    total_price: numeric('total_price').notNull()
})

export const orders = pgTable('orders', {
    id: uuid('id').defaultRandom(),
    user_id: uuid('user_id').notNull()
})

export const orderRelations = relations(orders, ({ one, many }) => ({
    user: one(users, {
        fields: [orders.user_id],
        references: [users.id]
    }),

    orderItems: many(orderItems)
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    user: one(users, {
        fields: [orderItems.user_id],
        references: [users.id]
    }),

    product: one(products, {
        fields: [orderItems.product_id],
        references: [products.id]
    }),

    order: one(orders, {
        fields: [orderItems.order_id],
        references: [orders.id]
    })
}));