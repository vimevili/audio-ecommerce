import z from 'zod';

const passwordRules = z
  .string()
  .min(8, 'The password must be at least 8 characters long.')
  .regex(/[A-Z]/, 'Needs an uppercase letter.')
  .regex(/[a-z]/, 'Needs a lowercase letter.')
  .regex(/[0-9]/, 'Needs a number.')
  .regex(/[^A-Za-z0-9]/, 'Needs a special character (!@#$%).');

export { passwordRules };
