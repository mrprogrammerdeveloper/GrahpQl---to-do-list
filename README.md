# TodoList Microservices Architecture
# TodoList GraphQL Microservices Architecture

یک سیستم مدیریت وظایف (TodoList) مبتنی بر معماری میکروسرویس‌ها با GraphQL API Gateway. این معماری از سرویس‌های مستقل و scalable تشکیل شده که از GraphQL به عنوان لایه API استفاده می‌کنند.

![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Microservices](https://img.shields.io/badge/Microservices-Architecture-FF6B6B?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Argon2](https://img.shields.io/badge/Argon2-4B0082?style=for-the-badge)

## 🏗️ معماری سیستم

┌─────────────────┐ ┌─────────────────────┐ ┌────────────────────────┐
│ Client │ → │ GraphQL Gateway │ → │ Authentication │
│ (Frontend) │ │ (Apollo/GraphQL) │ │ Microservice │
└─────────────────┘ └─────────────────────┘ └────────────────────────┘
│ → │ Todo Service │
│ │ Microservice │
│ └────────────────────────┘
→ │ User Service │
│ Microservice │
└────────────────────────┘
## 📦 میکروسرویس‌ها


### 1. **GraphQL API Gateway** (این پروژه)
- **وظیفه**: نقطه ورود واحد برای تمام درخواست‌های GraphQL
- **قابلیت‌ها**: Schema stitching, query federation, authentication
- **تکنولوژی**: Apollo Server, GraphQL, Node.js

### 2. **Authentication Service**
- **وظیفه**: مدیریت احراز هویت و authorization
- **قابلیت‌ها**: ثبت‌نام، ورود، مدیریت JWT tokens
- **تکنولوژی**: Node.js, JWT, Argon2, GraphQL

### 3. **Todo Service**
- **وظیفه**: مدیریت عملیات مربوط به وظایف (Todos)
- **قابلیت‌ها**: ایجاد، خواندن، به‌روزرسانی، حذف وظایف
- **تکنولوژی**: Node.js, PostgreSQL, Prisma, GraphQL

### 4. **User Service**
- **وظیفه**: مدیریت اطلاعات کاربران
- **قابلیت‌ها**: مدیریت پروفایل، تنظیمات کاربر
- **تکنولوژی**: Node.js, PostgreSQL, Prisma, GraphQL

## ✨ ویژگی‌های کلیدی

- **🎯 GraphQL API**: Queryهای دقیق و efficient داده‌ها
- **🧩 معماری Microservices**: سرویس‌های مستقل و قابل توسعه
- **🔐 امنیت پیشرفته**: JWT + Argon2 برای احراز هویت امن
- **🚪 GraphQL Gateway**: مدیریت متمرکز درخواست‌ها
- **🗄️ پایگاه داده**: PostgreSQL با Prisma ORM
- **⚡ Performance**: کاهش over-fetching با GraphQL
- **🔒 Validation**: اعتبارسنجی کامل داده‌های ورودی

## 🛠️ تکنولوژی‌های استفاده شده

### GraphQL Gateway
- **Apollo Server** - سرور GraphQL
- **GraphQL** - زبان query
- **Node.js** - محیط runtime
- **JWT** - احراز هویت توکن‌ها
- **@apollo/gateway** - federation میکروسرویس‌ها

### میکروسرویس‌ها
- **Apollo Server** - پیاده سازی GraphQL در هر سرویس
- **Node.js** - محیط runtime
- **PostgreSQL** - پایگاه داده رابطه‌ای
- **Prisma** - ORM مدرن
- **Argon2** - هش کردن رمزهای عبور
- **GraphQL Tools** - tools توسعه GraphQL
