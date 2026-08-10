// Path: backend/src/validation/enquiry.schema.ts

import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15)
    .regex(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number'),
  pincode: z.string().min(4, 'Pincode is required').max(10),
  state: z.string().min(2, 'Please select a state'),
  enquiryType: z.enum(['product', 'service', 'general']),
  productId: z.string().uuid().optional(),
  serviceId: z.string().uuid().optional(),
  message: z.string().max(1000).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
