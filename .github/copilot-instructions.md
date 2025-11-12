# AlgorithmPlatform - Frontend Development Guide

## 🎯 Current Phase: Frontend UI Development (No Backend Integration)

**AlgorithmPlatform** is a programming contest platform. You are currently focused on **React frontend development** without API calls.

- **Tech Stack**: React 19, TypeScript, Vite, React Router v7, Styled Components, Bootstrap 5
- **Dev Server**: Port 5173 (independent, no backend needed)
- **Phase 2**: API integration and backend connection will come later

---

## ⚡ Quick Start

```bash
cd NimdaConFrontEnd
npm install              # One-time
npm run dev              # Start on http://localhost:5173
npm run lint             # Check code quality
npm run format           # Format with Prettier
```

---

## 📁 Frontend Project Structure

```
NimdaConFrontEnd/src/
├── pages/               # Page components (implement UI here)
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── SignUpPage.tsx
│   ├── MyPage.tsx
│   ├── ProblemSolvePage.tsx
│   ├── ProblemResultPage.tsx
│   ├── ProblemCreatePage.tsx
│   ├── StudyGroupCreatePage.tsx
│   ├── StudyGroupDetailPage.tsx
│   └── modal/StudyGroupJoin.tsx
│
├── components/          # Reusable UI components
│   ├── Layout/
│   │   ├── Layout.tsx          # Main wrapper
│   │   ├── LayoutWrapper.tsx   # Page container
│   │   ├── NavBar.tsx          # Top navigation
│   │   ├── SidePanel.tsx       # Left sidebar
│   │   ├── Logo.tsx
│   │   ├── MainContent.tsx
│   │   └── types.ts            # Layout types
│   ├── common/
│   │   ├── FormField.tsx       # Input wrapper
│   │   ├── input.tsx           # Text input
│   │   ├── Dropdown.tsx        # Select input
│   │   ├── banner.tsx          # Alert/notification
│   │   └── Button/
│   │       ├── BlueButton.tsx  # Primary
│   │       └── GrayButton.tsx  # Secondary
│
├── routes/              # React Router setup
│   └── Router.tsx       # Route definitions
│
├── types/               # TypeScript interfaces (local only)
│   ├── auth.ts
│   ├── judge.ts
│   ├── problem.ts
│   ├── user.ts
│   └── studyGroup.ts
│
├── apis/                # API layer (use later in Phase 2)
│   ├── auth.ts
│   ├── judge.ts
│   ├── problem.ts
│   └── user.ts
│
├── assets/              # Static files
│   ├── fonts/
│   ├── icons/
│   └── images/
│
├── App.tsx              # Root component
├── main.tsx             # Entry point
├── index.css            # Global styles (minimal)
└── vite-env.d.ts        # Vite types
```

---

## 🏗️ Development Patterns

### Creating a New Page

1. Create file in `src/pages/YourPage.tsx`
2. Use local `useState` for form data (no API calls yet)
3. Add route in `src/routes/Router.tsx`
4. Wrap with `LayoutWrapper` component

### Template:

```typescript
// src/pages/YourPage.tsx
import styled from "styled-components";
import { useState } from "react";
import BlueButton from "@/components/common/Button/BlueButton";
import FormField from "@/components/common/FormField";

export default function YourPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call in Phase 2
    console.log("Form submitted:", formData);
  };

  return (
    <PageContainer>
      <PageTitle>Your Page Title</PageTitle>
      <Form onSubmit={handleSubmit}>
        <FormField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <BlueButton type="submit">Submit</BlueButton>
      </Form>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
```

### Reusing Components

```typescript
import BlueButton from "@/components/common/Button/BlueButton";
import GrayButton from "@/components/common/Button/GrayButton";
import FormField from "@/components/common/FormField";
import Dropdown from "@/components/common/Dropdown";

// Use in your page
<BlueButton onClick={handleClick}>Submit</BlueButton>
<GrayButton onClick={handleCancel}>Cancel</GrayButton>
<FormField label="Username" type="text" value={value} onChange={handler} />
```

### Adding Routes

Edit `src/routes/Router.tsx`:

```typescript
import YourNewPage from "@/pages/YourNewPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/your-new-page" element={<LayoutWrapper><YourNewPage /></LayoutWrapper>} />
      </Routes>
    </BrowserRouter>
  );
};
```

### Creating Type Definitions

No backend yet - define types locally for your UI:

```typescript
// src/types/problem.ts
export interface Problem {
  id: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface CodeSubmission {
  code: string;
  language: "python" | "javascript" | "java" | "cpp";
}
```

---

## 🎨 Styling Guidelines

- Use **Styled Components** for component-specific CSS
- Keep styles in component files
- Bootstrap can be used for layout utilities
- No global CSS variables - define locally in styled components

---

## ✅ Development Workflow

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Check linting | `npm run lint` |
| Format code | `npm run format` |
| Build for testing | `npm run build` |

---

## 📝 Implementation Checklist

As you create each page:

- Create file in `src/pages/YourPage.tsx`
- Use `useState` for local form state
- Import components from `@/components/`
- Use styled-components for layout
- Add `console.log()` in form handlers (no API yet)
- Add route in `Router.tsx`
- Run `npm run lint` and `npm run format`

---

## 🚀 Priority Pages to Implement

1. HomePage - Landing/dashboard
2. LoginPage - Username + password form
3. SignUpPage - Registration form
4. MyPage - User profile
5. ProblemSolvePage - Problem + code editor
6. ProblemCreatePage - Create problem form
7. StudyGroupCreatePage - Create group form
8. StudyGroupDetailPage - Group info
9. ProblemResultPage - Results display

---

## ⚠️ Key Rules

1. **No Backend Calls** - Use console.log() only
2. **TypeScript Strict** - All files must be typed
3. **Absolute Imports** - Always use `@/` alias
4. **Reuse Components** - Check existing components first
5. **React 19 + Vite** - Hot reload enabled

---

## Phase 2: API Integration (Coming Later)

- Update `src/apis/` with real endpoint calls
- Add error handling and loading states
- Store tokens in localStorage
- Connect to backend services

**Focus**: Beautiful, functional pages first. Backend later!
