![CRM Light](preview.gif)

# CRM Light

A lightweight Customer Relationship Management system built with Next.js 15, demonstrating modern web development practices and clean architecture.

## 🚀 Live Demo

https://crm-light.vercel.app/

## ✨ Features

- **Contact Management**: Store and manage customer inquiries with detailed information
- **Status Tracking**: Track contact status (new, todo, in progress, completed)
- **Notes System**: Add and manage notes for each contact with real-time updates
- **Service Categories**: Organize contacts by service type (sauna, micro-house, tiny-house, custom-project)
- **Referral Tracking**: Track referral codes via URL parameters
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Optimistic updates with React Query
- **Database**: SQLite with Drizzle ORM for type-safe database operations

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: SQLite with Drizzle ORM
- **UI Components**: Shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📦 Installation

1. Clone the repository:
```bash
git clone git@github.com:prudolfs/crm-light.git
cd crm-light
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Generate and run database migrations:
```bash
pnpm db:migrations
```

5. Seed the database (optional):
```bash
pnpm db:seed
```

6. Start the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗄️ Database Schema

The application uses two main tables:

- **contact_us**: Stores customer contact information and inquiries
- **notes**: Stores notes associated with each contact

## 📝 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:migrations` - Generate database migrations
- `pnpm db:seed` - Seed database with sample data
- `pnpm db:reset` - Reset database
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## 🎯 Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable UI components
├── actions/               # Server actions
├── db/                    # Database schema and utilities
├── lib/                   # Utility functions
└── utils/                 # Helper functions
```

## 🌟 Key Features Demonstrated

- **Server Components**: Leveraging Next.js 15 server components for optimal performance
- **Server Actions**: Type-safe server-side mutations
- **Optimistic Updates**: Immediate UI feedback with React Query
- **Form Handling**: Modern form patterns with validation
- **Database Operations**: Type-safe queries with Drizzle ORM
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Architecture**: Reusable, composable UI components

## 🚀 Deployment

The application can be deployed on any platform that supports Next.js:

## 🤝 Contributing

This is a portfolio project, but contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Rudolfs Pukitis**

- LinkedIn: [Rudolfs Pukitis](https://www.linkedin.com/in/rudolfs-pukitis-33027a154/)
- GitHub: [@prudolfs](https://github.com/prudolfs)

---

*This project was created as a demonstration of modern web development practices and serves as an example of clean architecture.*
