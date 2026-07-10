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

Responsiveness: Utilized a "Mobile-First" approach with a custom sidebar drawer and a responsive grid layout.

Custom Branding: Replaced default Next.js assets with custom SVG branding for the address bar, ensuring a professional, cohesive identity from the moment the user lands on the application.

Feedback Loops: Buttons feature active:scale-[0.98] micro-interactions to provide immediate physical feedback to the user.


✍️ Author
[Adesoji Ajijolaoluwa David]

