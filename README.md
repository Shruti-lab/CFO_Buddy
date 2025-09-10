# CFO Buddy - AI Financial Forecasting Tool

A powerful financial analysis and forecasting tool for CFOs and financial teams that visualizes cash flow trends, invoice aging, and business health metrics.

## 🚀 Features

- **AI-Powered Forecasting** - Visualize forecasted transaction trends
- **Cash Flow Analysis** - Track cash flow and runway projections
- **Invoice Management** - Manage and track invoice status
- **Business Health Metrics** - Monitor key financial health indicators
- **Supabase Integration** - PostgreSQL database with direct frontend connection
- **Modern Tech Stack** - React 18, Vite, Redux Toolkit, TailwindCSS
- **Data Visualization** - Interactive charts with Recharts
- **Responsive Design** - Optimized for all device sizes
- **GitHub Pages Deployment** - Easy sharing and deployment workflow

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cfo_buddy.git
   cd cfo_buddy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   
3. Set up environment variables:
   - Copy `.env.example` to `.env.development` and `.env.production`
   - Add your Supabase URL and anon key to both files:
     ```
     VITE_SUPABASE_URL=your-supabase-url
     VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```
   
4. Start the development server:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 📦 Deployment to GitHub Pages

### Manual Deployment

1. Build and deploy the application:
   ```bash
   npm run deploy
   ```

2. This will:
   - Build the application for production
   - Push the built files to the `gh-pages` branch
   - Make the site available at `https://yourusername.github.io/cfo_buddy/`

### Automated Deployment with GitHub Actions

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

1. Add your Supabase credentials as GitHub repository secrets:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. Push to the main branch, and the workflow will deploy your app automatically.

## ☁️ Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)

2. Run the SQL script in `/supabase/schema.sql` in the Supabase SQL editor to:
   - Create the required tables
   - Set up Row Level Security policies
   - Insert sample data

3. Copy your Supabase URL and anon key from the API settings to your `.env` files

4. Row Level Security is configured to allow public read access but require authentication for writes.

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by React and Vite
- Styled with Tailwind CSS

Built with ❤️ on Rocket.new
