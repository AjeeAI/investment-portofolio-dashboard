Financial Intelligence Dashboard(Interview Assessment)
This is a clean, responsive investment portfolio dashboard. This project was built with a focus on component-driven architecture, a robust service-based data layer, and high-fidelity UX that handles edge cases gracefully.

🚀 Tech Stack
Framework: Next.js 15 (App Router)

Language: TypeScript

Styling: Tailwind CSS

Data Visualization: Recharts (Implemented for the Net Worth trend analysis and responsive allocation bar charting).

Icons: Lucide React (UI elements) & React Icons (Asset brand logos).

🚀 Getting Started
Clone the repository:

Bash
git clone [https://github.com/AjeeAI/investment-portofolio-dashboard.git]
cd investment-portfolio-dashboard
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open http://localhost:3000 in your browser.

🏗 Architectural Decisions
Service-Oriented Data Layer: To mimic a production environment, I created an abstraction layer (/services/api.ts) that wraps the JSON data. This allowed me to handle loading states and potential async errors consistently, rather than importing raw JSON directly into UI components.

Component-Driven Architecture: The UI is broken into small, reusable atoms (e.g., HoldingsList, TransactionHistory, ComingSoon). This allows for consistent styling and easy scaling.

Navigation & Scope Management: As the design specifications primarily detailed the Login and Dashboard views, I implemented the remaining sidebar navigation items (Settings, Markets, etc.) using a reusable ComingSoon component. This ensures the application remains fully interactive and intuitive without shipping "dead" links, allowing me to focus engineering effort on the core requirements (Dashboard) while maintaining a complete, professional application shell.

Global Actions: Instead of hiding logout functionality in a Settings page, I implemented it as a global action via a Sidebar profile dropdown, following modern SaaS UX patterns.

🛠 Handling Data Quirks
The dataset contained several edge cases, which I handled intentionally to ensure the UI remained robust:

NVDA (Price = 0): Instead of calculating a broken portfolio value, the UI detects the zero-value state and renders "Price Unavailable" in the list view, preventing mathematical errors in the UI.

DIS (0 Shares): The service layer filters out holdings with zero shares before passing them to the dashboard. This prevents "ghost" assets from skewing the Total Net Worth and Allocation charts.

Transaction Statuses (Pending/Failed):

Pending: Rendered with a high-visibility, neutral yellow pill to indicate "In Progress."

Failed: Rendered with a prominent error-red pill to alert the user.

Negative Returns: I implemented an absolute value calculation (Math.abs) for display logic, ensuring that Buy/Sell transactions are never rendered with double-negative signs (e.g., --$500), while maintaining correct visual indicators (signage) for the user.

🎨 UI/UX Implementation
Design System: Built using custom Tailwind configuration mapped to the provided Trove v3 color palette.

Performance-Optimized Loaders: Implemented custom Tailwind-based skeleton loaders for all asynchronous states. By building these natively rather than using generic, asset-heavy SVG spinners, I reduced bundle size and improved perceived performance during data fetching.

Responsiveness: Utilized a "Mobile-First" approach with a custom sidebar drawer and a responsive grid layout.

Custom Branding: Replaced default Next.js assets with custom SVG branding for the address bar, ensuring a professional, cohesive identity from the moment the user lands on the application.

Feedback Loops: Buttons feature active:scale-[0.98] micro-interactions to provide immediate physical feedback to the user.


🚀 What I Would Improve or Add With More Time

Data Caching & Performance: I would integrate TanStack Query (React Query) to handle smart caching, background refetching, and stale-time management. For the transaction history, if the data scale increased, I would add list virtualization (e.g., react-window) to ensure the DOM remains lightweight regardless of list size.

Feature Expansion:

Dark Mode: A high-contrast dark theme is standard for financial dashboards; I would extend the Tailwind theme config to support a fully dark-mode compliant palette.

Real Authentication & Backend Integration: Swap the mock login for a production-grade Backend-as-a-Service (BaaS) like Firebase or Supabase. This would allow me to move beyond client-side simulation to a robust implementation handling user authentication, secure database storage, and real-time data synchronization.


✍️ Author
[Adesoji Ajijolaoluwa David]

