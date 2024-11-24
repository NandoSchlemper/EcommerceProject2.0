import {integer, pgTable, text, uuid} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import { users } from './userSchema'
import { orderItems } from './orderSchema';

export const products = pgTable('products', {
    id: uuid('id').defaultRandom(),
    user_id: uuid('user_id').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    price: text('price').notNull(),
    stock: integer('stock').notNull()
})

export const productsRelations = relations(products, ({ one, many }) => ({
    users: one(users, {
        fields: [products.user_id],
        references: [users.id]
    }),

    orderItems: many(orderItems)
}));
