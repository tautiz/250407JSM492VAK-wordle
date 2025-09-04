---
trigger: model_decision
description: Apply these rules whenever you start or extend a React + Vite frontend project to guarantee consistent structure, scalable state management,
---

# Frontend Coding Guidelines (React + Vite)

## File & Folder Structure
```
  src/
    app/         # routing, layout, providers
    features/    # feature-sliced design (FSD)
      auth/
        api/
        model/
        ui/
        hooks/
    shared/      # cross-feature (ui, lib, config)
    pages/       # route entries
  public/
  vite.config.ts
  index.html
```

## Naming Conventions
- Files: kebab-case (`login-form.tsx`).
- Folders: kebab-case.
- Components: PascalCase (`LoginForm.tsx`).
- Hooks: `useSomething`.

## State Management
- **Server state:** TanStack Query.
- **Forms:** React Hook Form + Zod.  
- **Routing:** React Router v6+. Lazy load routes.

## Example Auth Form
```tsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginSchema = z.object({ email: z.string().email(), password: z.string().min(8) });
type LoginInput = z.infer<typeof LoginSchema>;

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginInput>({ resolver: zodResolver(LoginSchema) });
  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register('email')} placeholder="Email" />
      <input {...register('password')} type="password" />
      <button>Sign in</button>
    </form>
  );
}
```

## Tooling Setup
### ESLint
```js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  rules: { 'react/react-in-jsx-scope': 'off' }
};
```

### Prettier
```json
{ "singleQuote": true, "semi": true, "printWidth": 120 }
```

### Vite Config
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
});
```

### Vitest Setup
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: './src/test/setup.ts' }
});
```