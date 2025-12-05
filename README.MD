# ⚙️ Config: Smart & Type-Safe Backend and Frontend Configuration

**Config** is a smart, enhanced, and **framework-agnostic** configuration setup designed for TypeScript backend and frontend projects. It eliminates configuration boilerplate, providing **auto type-safety** for your environment variables with minimal setup.

Just copy, paste, and run—it's that simple!

---

## ✨ Features

**Config** is designed to save developers time and effort by consolidating configuration steps:

1.  ### 🛡️ Auto Type-Safety (The Primary Feature)

    Forget maintaining separate Interfaces, Enums, validation classes, and `.env.example` files. Config achieves type-safety by relying solely on a Zod schema definition.
    - **Before:** Multiple files were required to ensure a variable (like `PORT`) was correctly typed, validated, and documented.
    - **Now:** Define your variables once in [`env.schema.ts`](./src/config/schema/env.schema.ts) using **Zod**, and you gain guaranteed type-safety whenever you retrieve a variable using `ConfigService`.

    <!-- end list -->

    ```ts
    // env.schema.ts (Minimal setup)
    export function envSchema() {
      return z.object({
        PORT: z.preprocess((val) => Number(val), z.number().int().positive()), // Automatically ensures PORT is a number
        DB_URL: z.string().nonempty(),
      });
    }

    // Usage: index.ts
    const config = new ConfigService();
    // 'databaseUrl' is automatically inferred as a string by TypeScript
    const databaseUrl = config.get((env) => env.DATABASE_URL);
    ```

2.  ### 🌐 Framework Agnostic

    Config isn't tied to any specific framework. Use it in **NestJS**, **plain Node/Express**, or even in a **Frontend application** with little to no modification.

3.  ### 🔄 Easily Switch Between Environments

The **Config** service supports managing multiple environments, simplifying testing and deployment across different stages.

**How it works:**

You can maintain separate configuration files (e.g., `.env.development`, `.env.test`, etc.) in the root of your project. The system determines which file to load based on the value of the standard `NODE_ENV` variable.

To switch environments, you simply adjust the `NODE_ENV` value in your primary `.env` file:

```
# .env (Note: Environment files should typically be excluded from version control.)

# ➡️ To use configurations from .env.development

NODE_ENV=development

# ➡️ To switch to configurations from .env.test

# NODE_ENV=test
```

This mechanism allows you to effortlessly toggle between development, testing, and production configurations.

However, if you prefer to have all your env variables in one file, you can too, and it will work just fine.

4.  ### 🧱 Direct Usage (Outside of DI)

    The `ConfigService` can be instantiated directly, making it ideal for use in places where Dependency Injection (like in NestJS) isn't available, such as database configuration files or utility scripts.

---

## 🚀 Getting Started

This project is designed for quick adoption by simply copying the configuration files into your existing project.

### 📋 Prerequisites

- **Node.js**
- **TypeScript**

### 💻 Installation

1.  **Copy Files:** Copy the entire [`src/config`](./src/config) folder into your project's `src` directory.

    > **Tip:** Ensure you have the necessary dependencies for the underlying schema validation (e.g., Zod) installed in your project:

    > ```bash
    > # Install necessary dependencies (adjust based on your actual schema implementation)
    > npm install zod
    > # or
    > pnpm install zod
    > ```

2.  **Define Schema:** Customize your environment variables and their types in the schema file:
    [`env.schema.ts`](./src/config/schema/env.schema.ts)

3.  **Setup `.env`:** Create your environment file (e.g., `.env`) in the project root to define the variables specified in your schema.

---

## 💡 Usage Example

Once the `config` folder is copied and the schema is defined, you can import and use the `ConfigService` anywhere in your application:

```ts
import { ConfigService } from './config/config.service';

// 1. Instantiate the service
const config = new ConfigService();

// 2. Retrieve variables with guaranteed type-safety
// TypeScript knows 'databaseUrl' is a string.
const databaseUrl = config.get((env) => env.DATABASE_URL);

console.log('Database URL:', databaseUrl);
// Example Output -> Database URL: postgres://dev_user:dev_pass@localhost:5432/my_app_dev
```

---

## 👤 Author

- **Justice Nkweke** - [Justice's GitHub Profile](https://github.com/justice-sh)

---

## 📄 License

MIT
