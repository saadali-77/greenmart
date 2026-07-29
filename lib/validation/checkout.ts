import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name cannot exceed 50 characters."),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name cannot exceed 50 characters."),

  email: z
    .email("Please enter a valid email address.")
    .trim(),

  phone: z
    .string()
    .trim()
    .regex(
      /^(\+92|0)?3[0-9]{9}$/,
      "Please enter a valid Pakistani phone number."
    ),

  address: z
    .string()
    .trim()
    .min(10, "Address must be at least 10 characters.")
    .max(200, "Address cannot exceed 200 characters."),

  city: z
    .string()
    .trim()
    .min(2, "City is required.")
    .max(50, "City name is too long."),

  postalCode: z
    .string()
    .trim()
    .min(4, "Postal code is required.")
    .max(10, "Postal code is invalid."),

  country: z
    .string()
    .trim()
    .min(2, "Country is required.")
    .max(50, "Country name is too long."),

  notes: z
    .string()
    .trim()
    .max(300, "Order notes cannot exceed 300 characters.")
    .optional(),

  paymentMethod: z.enum(["COD", "STRIPE"], {
    error: "Please select a payment method.",
  }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;