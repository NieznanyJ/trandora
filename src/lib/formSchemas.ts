import { z } from "zod";

export const contactFormSchema = z.object({
    fullName: z
        .string()
        .min(2, { message: "Full name must be at least 2 characters long." })
        .max(50, { message: "Full name cannot exceed 50 characters." })
        .regex(/^[a-zA-Z\s'-]+$/, {
            message:
                "Full name can only contain letters, spaces, hyphens, and apostrophes.",
        }),

    email: z.string().email({
        message: "Invalid email address. Please enter a valid email.",
    }),

    message: z
        .string()
        .min(2, { message: "Message must be at least 2 characters long." })
        .max(300, { message: "Message cannot exceed 300 characters." }),
});

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .regex(
            /(?=.*[0-9])(?=.*[a-zA-Z])/,
            "Password must contain at least one letter and one number"
        ),
});
export const registerFormSchema = z
    .object({
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .regex(
                /(?=.*[0-9])(?=.*[a-zA-Z])/,
                "Password must contain at least one letter and one number"
            ),
        passwordRep: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .regex(
                /(?=.*[0-9])(?=.*[a-zA-Z])/,
                "Password must contain at least one letter and one number"
            ),
    })
    .refine((data) => data.password === data.passwordRep, {
        message: "Passwords must match",
        path: ["passwordRep"], // Indicating that the error message should appear for passwordRep
    });

export const checkoutFormSchema = z
    .object({
        firstName: z
            .string()
            .min(1, "First name is required")
            .max(50, "First name can't be longer than 50 characters"),
        lastName: z
            .string()
            .min(1, "Last name is required")
            .max(50, "Last name can't be longer than 50 characters"),
        email: z.string().email("Invalid email address"),
        phone: z
            .string()
            .regex(
                /^\+?[0-9]{7,14}$/,
                "Phone number must be valid with country code (e.g., +123456789)"
            )
            .optional(),
        address: z.object({
            street: z
                .string()
                .min(1, "Street address is required")
                .max(100, "Street address can't be longer than 100 characters"),
            city: z
                .string()
                .min(1, "City is required")
                .max(50, "City can't be longer than 50 characters"),
            state: z
                .string()
                .min(1, "State is required")
                .max(50, "State can't be longer than 50 characters"),
            postalCode: z
                .string()
                .regex(/^[0-9]{5}$/, "Postal code must be exactly 5 digits"),
            country: z
                .string()
                .min(1, "Country is required")
                .max(50, "Country can't be longer than 50 characters"),
        }),
        paymentMethod: z.enum(["creditCard", "paypal"]),
        creditCard: z
            .object({
                cardNumber: z
                    .string()
                    .regex(
                        /^[0-9]{16}$/,
                        "Credit card number must be exactly 16 digits"
                    ),
                expiryDate: z
                    .string()
                    .regex(
                        /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                        "Expiry date must be in MM/YY format"
                    ),
                cvv: z
                    .string()
                    .regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
                cardHolderName: z
                    .string()
                    .min(1, "Cardholder name is required")
                    .max(
                        50,
                        "Cardholder name can't be longer than 50 characters"
                    ),
            })
            .optional(),
        paypalEmail: z
            .string()
            .email("Invalid PayPal email address")
            .optional(),
    })
    .refine(
        (data) => {
            if (data.paymentMethod === "creditCard" && !data.creditCard) {
                return false;
            }
            if (data.paymentMethod === "paypal" && !data.paypalEmail) {
                return false;
            }
            return true;
        },
        {
            message:
                "Payment details are required based on the selected payment method",
            path: ["paymentMethod"],
        }
    );

export const memberInfoFormSchema = z.object({
    firstName: z
        .string()
        .min(1, "First name is required")
        .max(50, "First name can't be longer than 50 characters"),
    lastName: z
        .string()
        .min(1, "Last name is required")
        .max(50, "Last name can't be longer than 50 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
        .string()
        .regex(
            /^[0-9]{7,14}$/, 
            "Phone number must be valid (7 to 14 digits)"
        )
        .optional(),
    address: z.object({
        street: z
            .string()
            .min(1, "Street address is required")
            .max(100, "Street address can't be longer than 100 characters"),
        city: z
            .string()
            .min(1, "City is required")
            .max(50, "City can't be longer than 50 characters"),
        state: z
            .string()
            .min(1, "State is required")
            .max(50, "State can't be longer than 50 characters"),
        postalCode: z
            .string()
            .regex(/^[0-9]{5}$/, "Postal code must be exactly 5 digits"),
        country: z
            .string()
            .min(1, "Country is required")
            .max(50, "Country can't be longer than 50 characters"),
    }),
});
