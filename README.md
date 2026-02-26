# AUTOMATION TAKE HOME TASK

This project uses **Cypress** as the automation framework and demonstrates:

- Implementation of the **Page Object Model (POM)** design pattern  
- Centralized page object exports for scalability  
- A clean, readable, and maintainable test architecture  

The project is built using **JavaScript**, with **Mochawesome** integrated for test reporting.

---

## ✅ Test Coverage

The automated tests focus on the following areas:

### 🔹 Page Navigation
Validation of navigation flows via the Mega Menu:
- **"Why Matomo? > List Of All Features"**
- **"Use Cases > Complete Analytics"**
- **"Cloud"**

### 🔹 Broken Resource Validation
Validation of:
- Broken links  
- Broken images  

---

## 📁 Project Structure
cypress/
├─ e2e/                 # Test files
├─ pages/               # Page Object Model classes
│ └─ index.js           # Centralized export module
├─ support/     
│ └─ e2e.js             # Reporter configuration
cypress.config.js       # Cypress configuration file
package.json            # Project dependencies & scripts

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd <local-repository-folder>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

---

## ▶️ Running the Tests

### Run in Interactive Mode (Cypress UI)

```bash
npx cypress open
```

### Run in Headless Mode (CLI)

```bash
npx cypress run
```

---

## 📊 Viewing Test Execution Reports

After test execution, the generated HTML report can be found at:

```bash
cypress/reports/html/
```

Open the `index.html` file in your browser to view the report.

The report includes:

- Total number of executed tests  
- Summary of passed and failed tests per test file  
- Detailed error logs for failed test cases  
- Screenshots captured for failed test cases

## Technical Implementation Details

### Handling bot-blocked links
While executing the test suite, I noticed that certain platforms frequently block automated requests, returning 400 or 403 errors even when the pages are accessible through the UI. To address this, I implemented conditional validation to recognize these "False Alarms" on known secure domains. This ensures the test suite remains stable by avoiding unnecessary failures, while still strictly failing the test if any domain returns a 404 (Not Found).

### Verify Image Rendering
This confirms that the image successfully rendered for the user, catching instances where a file might be technically "present" but actually corrupted or blank.
