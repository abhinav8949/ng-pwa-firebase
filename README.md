# Expense Tracker

The **Expense Tracker** is a user-friendly application designed to help individuals
track their **expenses, budget, and savings** effectively. The app features an 
interactive **dashboard** with graphical representations of financial data, 
enabling users to visualize their financial habits and make informed decisions.

- **PROD URL:** https://expense-tracker-1ff01.web.app
- **DEV URL:** https://expense-tracker-1ff01-dev.web.app

## Features
- ✅ **Expense Tracking** - Log daily, weekly, or monthly expenses with category-wise classification.
- ✅ **Budget Management** - Set and monitor budgets for different spending categories.
- ✅ **Savings Calculation** - Track savings based on income and expenses.
- ✅ **Graphical Representation** - View insights using charts and graphs for better understanding.
- ✅ **Dashboard Overview** - Get a real-time summary of financial status.
- ✅ **User Authentication** - Secure login and registration system.
- ✅ **Export Data** - Export reports in CSV or PDF format for offline tracking.

### Usage
- ✅ **Sign Up/Login** - Access your dashboard via Firebase Authentication.
- ✅ **Add Expenses** - Categorize them (e.g., Food, Travel, Bills).
- ✅ **Set Budget Limits** - Prevent overspending with alerts.
- ✅ **View Graphical Reports** - Analyze spending via ApexCharts.
- ✅ **Monitor Savings** - Adjust expenses based on savings goals.

## Tech Stack
- **Frontend:** Angular19
- **Backend:** Firebase (Authentication, Functions)
- **Database:** Firestore
- **Charts & Graphs:** ApexCharts
- **Package Manager:** npm

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v22.x or later recommended) - [Download](https://nodejs.org/)
- **Angular CLI** - Install globally: ```npm install -g @angular/cli```
- **Firebase CLI** - Install globally:```npm install -g firebase-tools```
- **Git** - For version control - [Download](https://git-scm.com/)

### Installation
Follow these steps to set up the project locally:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/abhinav8949/ng-pwa-firebase.git
   cd expense-tracker
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Run Locally Start the development server**
   ```bash
   ng serve
   ```
***Open your browser and navigate to http://localhost:4200.***

### Project Structure
* *src/environments/* - Contains environment.ts (dev) and environment.prod.ts (prod) for configuration.
* *src/app/* - Main Angular application code (components, services, etc.).
* *dist/* - Build output folder (generated after ng build).

### Working with Environments
The project supports two environments: Development (`dev`) and Production (`prod`).

**Environment Files**
* `environment.ts` - Used for dev with non-optimized builds and dev Firebase config.
* `environment.prod.ts` - Used for prod with optimized builds and prod Firebase config.

**Building for Environments**
1. **Dev Build**
  ```bash 
        ng build --configuration=development
  ```
2. **Prod Build**
  ```bash
       ng build --configuration=production
  ```
*Output is generated in dist/expense-tracker/. Note: You don’t need to deploy manually—GitHub Workflows handle deployment.*
![Screenshot 2025-03-27 112052](https://github.com/user-attachments/assets/a08c8184-e38f-45e6-a806-ebff02dadf52)

### Deployment
Deployment to dev and prod environments is automated via GitHub Workflows. Simply raise a pull request from working branch.
1. **Dev:** Merged PRs to the `master` branch trigger automated deployment to https://expense-tracker-1ff01-dev.web.app.
2. **Prod:** After Dev Deployment success admin can run prod workflow dispatch for deployment to https://expense-tracker-1ff01.web.app.

### Screenshots
![Screenshot 2025-03-26 121011](https://github.com/user-attachments/assets/3c106eb7-38aa-4199-87b1-b1d1cd9f1db4)

![Screenshot 2025-03-26 120626](https://github.com/user-attachments/assets/a953f42c-5bdc-47dd-a4e0-dd579bf1698b)

![Screenshot 2025-03-26 120731](https://github.com/user-attachments/assets/3c8d5c94-eb22-4beb-9669-dff5fc0e0c05)

![Screenshot 2025-03-26 120924](https://github.com/user-attachments/assets/66611e26-342b-445c-b11e-37d2337d6b49)

### Contributing
We welcome contributions! Follow these steps:
1. **Fork the Repository.**
2. **Create a Branch:**
  ```git checkout -b NGPWA-<your_feature_name>```
3. **Make Changes, Stage and Commit:**
 ```git add .```
 ```git commit -m "Added your feature"```
4. **Push to Your Fork:**
  ```git push origin NGPWA-<your_feature_name>```
5. **Open a Pull Request:**
* Open Pull Request against `master` branch.

### Coding Guidelines
* Follow the Angular Style Guide.
* Write clean, commented code.
* Test locally before pushing.

### Future Enhancements
* AI-based spending recommendations.
* Bank integration for automatic expense tracking.
* Multi-currency support.

### Troubleshooting
* Build Fails: Ensure Node.js and Angular CLI versions match prerequisites.
* Environment Issues: Check environment.ts and environment.prod.ts for correct Firebase configs.

#### Questions?
Reach out to the project maintainer or open an issue on GitHub.
