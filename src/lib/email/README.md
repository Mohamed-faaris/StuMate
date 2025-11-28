# Email Configuration

This document explains how to set up and use the email functionality in StuMate.

## Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@stumate.com
FROM_NAME=StuMate
```

### Gmail Setup

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: https://support.google.com/accounts/answer/185833
3. Use the App Password as `SMTP_PASS`

## Email Templates

The following email templates are available:

### 1. Welcome Email

- **Template**: `welcome.hbs`
- **Usage**: Sent when a user creates an account

```typescript
import { sendWelcomeEmail } from "~/lib/email";

await sendWelcomeEmail({
  name: "John Doe",
  email: "john@example.com",
  dashboardUrl: "https://stumate.com/dashboard",
});
```

### 2. Password Reset Email

- **Template**: `password-reset.hbs`
- **Usage**: Sent when a user requests password reset

```typescript
import { sendPasswordResetEmail } from "~/lib/email";

await sendPasswordResetEmail({
  name: "John Doe",
  email: "john@example.com",
  resetUrl: "https://stumate.com/reset-password?token=abc123",
  expiryHours: 24,
});
```

### 3. Email Verification

- **Template**: `email-verification.hbs`
- **Usage**: Sent to verify user's email address

```typescript
import { sendEmailVerification } from "~/lib/email";

await sendEmailVerification({
  name: "John Doe",
  email: "john@example.com",
  verificationUrl: "https://stumate.com/verify?token=xyz789",
  expiryHours: 48,
});

// Or with verification code:
await sendEmailVerification({
  name: "John Doe",
  email: "john@example.com",
  verificationCode: "123456",
  expiryHours: 48,
});
```

## API Usage

You can also send emails via the API endpoint:

```bash
POST /api/email
Content-Type: application/json

{
  "type": "welcome",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "dashboardUrl": "https://stumate.com/dashboard"
  }
}
```

## Creating Custom Templates

1. Create a new `.hbs` file in `src/lib/email/templates/`
2. Use Handlebars syntax for dynamic content
3. Add the template function to `src/lib/email/index.ts`

Example template variables:

- `{{name}}` - User's name
- `{{email}}` - User's email
- `{{url}}` - Any URL (dashboard, reset, verification)
- `{{code}}` - Verification codes
- `{{expiryHours}}` - Link/code expiry time

## Testing

To test email functionality without sending real emails, you can use services like:

- Mailtrap (https://mailtrap.io)
- Ethereal Email (https://ethereal.email)

Just update your SMTP settings to point to these services.
