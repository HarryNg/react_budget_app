import * as z from 'zod';

export const incomeSchema = z.object({
    source: z.string().nonempty('Income source cannot be empty'),
    amount:z.number().positive('Amount must be positive'),
    date: z.string().nonempty('Date is required')
});

export const expenseSchema = z.object({
    source: z.string().nonempty('Expense source cannot be empty'),
    amount:z.number().positive('Amount must be positive'),
    date: z.string().nonempty('Date is required')
});

export const targetShema = z.object({
    target: z.number().positive('Target must be positive')
});

