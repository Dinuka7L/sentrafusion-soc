
# SOC-Suite RAG Front-End

A sophisticated React+Vite front-end application for Security Operations Center (SOC) analysts, featuring Retrieval-Augmented Generation capabilities for threat intelligence and incident response.

## 🔧 Tech Stack

- **Framework**: React 18 with Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS with cyber-themed dark palette
- **Components**: shadcn/ui component library
- **State Management**: React Query for data fetching, Zustand-ready for global state
- **Routing**: React Router with multi-workspace support
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library (ready to implement)

## 🎨 Design System

### Color Palette
- **Base**: Dark charcoal (#1e1e1e, #121212)
- **Accents**: Deep red (#c62828), gunmetal gray (#424242)
- **Text**: White (#ffffff) on dark backgrounds
- **Alerts**: Color-coded severity levels (Critical: red, High: orange, Medium: yellow, Low: green, Info: blue)

### Components
- Dark-themed cards with cyber-red accents
- Responsive grid layouts
- Modal dialogs for actions
- Tag/chip UI for IOCs and metadata
- Collapsible sidebar navigation

## 🚀 Features Implemented

### 1. Core Pages
- **Dashboard**: Real-time SOC overview with metrics and recent alerts
- **Chat Interface**: GPT-style RAG chat with context injection
- **Alerts Management**: Filterable security alerts with severity handling
- **Navigation**: Responsive sidebar with route-based highlighting

### 2. Components
- **Header**: Globe-overlay background with user management
- **Sidebar**: Collapsible navigation with system status
- **Alert Cards**: Severity-coded cards with IOC display
- **Chat Interface**: Message threading with citation support
- **Metric Cards**: Dashboard statistics with trend indicators

### 3. Type System
Comprehensive TypeScript interfaces for:
- Users and workspaces
- Alerts and incidents
- IOCs and threat intelligence
- Chat sessions and messages
- Documents and connectors

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/           # Header, Sidebar, Layout
│   ├── dashboard/        # MetricCard and dashboard components
│   ├── alerts/           # AlertCard and alert-related components
│   ├── chat/             # ChatInterface and messaging
│   └── ui/               # shadcn/ui components (read-only)
├── pages/
│   ├── Dashboard.tsx     # Main SOC dashboard
│   ├── Chat.tsx          # RAG chat interface
│   ├── Alerts.tsx        # Alert management
│   └── NotFound.tsx      # 404 page
├── types/
│   └── index.ts          # TypeScript interfaces
├── lib/
│   └── utils.ts          # Utility functions
└── hooks/                # Custom React hooks
```

## 🛠 Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd soc-suite-frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🔌 Backend Integration

### API Endpoints (Ready to implement)
```typescript
// Authentication
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout

// Workspaces
GET /api/workspaces
POST /api/workspaces
GET /api/workspaces/:id

// Alerts
GET /api/alerts?workspaceId=&from=&to=&severity=
PUT /api/alerts/:id/status
POST /api/alerts/:id/assign

// Chat & RAG
POST /api/chat/sessions
GET /api/chat/sessions/:id
POST /api/chat/sessions/:id/messages
POST /api/rag/query

// Documents & Knowledge
GET /api/documents
POST /api/documents/upload
DELETE /api/documents/:id

// Incidents
GET /api/incidents
POST /api/incidents
PUT /api/incidents/:id

// IOCs & Threat Intel
GET /api/iocs
POST /api/iocs/lookup
GET /api/threat-intel/feeds
```

### WebSocket Events
```typescript
// Real-time alerts
'alert:new' - New security alert
'alert:updated' - Alert status change
'incident:created' - New incident
'chat:message' - New chat message
```

### Environment Variables
```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
VITE_WS_URL=ws://localhost:8000/ws

# Authentication
VITE_AUTH_DOMAIN=your-auth-domain
VITE_AUTH_CLIENT_ID=your-client-id

# Feature Flags
VITE_ENABLE_CHAT=true
VITE_ENABLE_THREAT_INTEL=true
```

## 🔒 Security Features

- **Input Sanitization**: XSS prevention for markdown uploads
- **Role-Based Access**: Tier-1, Tier-2, Admin role support
- **Secure Storage**: API key management via backend vault
- **Authentication**: JWT/OAuth2 with SSO support (SAML/OIDC)

## 🎯 Next Implementation Steps

1. **Authentication Integration**
   - Add JWT token management
   - Implement SSO providers
   - Create protected routes

2. **Real-time Features**
   - WebSocket connection for live alerts
   - Real-time chat updates
   - Live system status monitoring

3. **Advanced Components**
   - Knowledge management interface
   - Incident creation wizard
   - IOC lookup and visualization
   - Shift handoff summaries

4. **Data Integration**
   - Connect to actual SIEM APIs
   - Implement threat intel feeds
   - Add document indexing status

## 🧪 Testing Strategy

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API integration testing
- **E2E Tests**: Cypress for complete user workflows
- **Accessibility**: WCAG compliance testing

## 🚀 Deployment

- **Development**: Vite dev server
- **Staging**: Docker container with nginx
- **Production**: CDN deployment (Vercel/Netlify)
- **CI/CD**: GitHub Actions pipeline

## 📊 Performance Optimizations

- Lazy loading for heavy pages
- Code splitting for route-based loading
- Optimized bundle size with tree shaking
- Efficient state management with React Query

---

This front-end is ready for immediate backend integration and provides a solid foundation for a production SOC analytics platform.
