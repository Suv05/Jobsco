# Contributing to Jobsco

Thank you for your interest in contributing to Jobsco! We welcome all contributions, whether it's bug fixes, new features, improvements, or documentation enhancements.

## How to Contribute

### 1. Fork the Repository

1. Visit the [Jobsco repository](https://github.com/<your-user-name>/Jobsco.git).
2. Click the "Fork" button in the top-right corner to create a copy of the repository in your GitHub account.

### 2. Clone Your Fork

Once you have forked the repository, clone your fork to your local machine:

```bash
git clone https://github.com/<your-user-name>/Jobsco.git
cd Jobsco
```

#### 4. Set Up Remotes 🔄

Add a reference to the original repository:
```bash
git remote add upstream https://github.com/Suv05/Jobsco.git
```

Add a reference to your forked repo:
```bash
git remote add origin https://github.com/<your_user_name>/Jobsco.git
```

#### 5. Keep Your Local Copy Updated 🔄

```bash
git pull upstream master
```

### 6. Create a Branch

Create a new branch for your contribution. Branch names should reflect the purpose of the branch, such as `fix-bug-issue-123` or `feature-add-ai-resume-check`

```bash
git checkout -b your-branch-name
```

### 7. Install Dependencies

Ensure all dependencies are installed by running:

```bash
npm install
```

### 8. Setup Environment Variables
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=Your_Key
CLERK_SECRET_KEY=Your_Key

MONGODB_URI=Your_Key
NEXT_PUBLIC_STRIPI_PUBLIC_KEY=Your_Key
STRIPE_SECREATE_KEY=Your_Key

NEXT_PUBLIC_STRIPE_BASIC_LINK=Your_Key
NEXT_PUBLIC_STRIPE_PRO_LINK=Your_Key
NEXT_PUBLIC_STRIPE_ENTERPRISE_LINK=Your_Key

GEMINI_API_KEY=Your_Key

```

### 9. Run it locally now
```bash
npm run dev
```
