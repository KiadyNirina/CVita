# Professional CV Creator

> A modern web application for creating, managing, analyzing, and exporting professional CVs.

**Professional CV Creator** is a web-based CV builder built with **SvelteKit** and **Tailwind CSS**. It provides a complete editor, real-time preview, ATS analysis, JSON import/export, and PDF generation.

## 📋 Features

* ✏️ **Complete CV editor** — Manage personal information, professional summary, work experience, education, skills, languages, certifications, and projects.
* 👁️ **Real-time preview** — See your CV update instantly while editing.
* 📊 **ATS analysis** — Get an ATS score and recommendations to improve your CV.
* 📥 **JSON import/export** — Save your CV as a JSON file and restore it later.
* 📄 **PDF export** — Generate a PDF based directly on the CV preview.
* 🔗 **Social links** — Add professional and social profiles such as LinkedIn and GitHub.
* 🎨 **Responsive interface** — Clean and modern UI built with Tailwind CSS.
* 💾 **Centralized state management** — CV data is managed through a Svelte store.

## 🛠️ Tech Stack

| Technology        | Role                               |
| ----------------- | ---------------------------------- |
| **SvelteKit**     | Application framework              |
| **Tailwind CSS**  | Styling and responsive layout      |
| **Svelte Stores** | CV state management                |
| **dom-to-image**  | DOM capture for PDF generation     |
| **jsPDF**         | PDF generation                     |
| **date-fns**      | Date formatting and date utilities |

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/KiadyNirina/Create_CV.git
cd Create_CV
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open the application

Visit:

```text
http://localhost:5173
```

## 📁 Project Structure

```text
src/
├── lib/
│   ├── components/
│   │   ├── PersonalInfo.svelte
│   │   ├── ProfessionalSummary.svelte
│   │   ├── SkillsSection.svelte
│   │   ├── ExperienceSection.svelte
│   │   ├── EducationSection.svelte
│   │   ├── LanguagesSection.svelte
│   │   ├── Preview.svelte
│   │   ├── ATSScore.svelte
│   │   └── ExportButtons.svelte
│   │
│   ├── stores/
│   │   └── cvStore.js
│   │
│   └── utils/
│       ├── dateUtils.js
│       └── pdfGenerator.js
│
├── routes/
│   └── +page.svelte
│
└── app.html
```

## 🔧 Usage

### Editor

Use the editor to enter and manage your CV information, including:

* Personal information
* Professional summary
* Work experience
* Education
* Skills
* Languages
* Certifications
* Projects
* Social links

### Preview

The **Preview** section displays a live version of your CV. Changes made in the editor are reflected automatically.

### ATS Analysis

The **ATS Analysis** section evaluates your CV and provides:

* An overall ATS score
* Areas that can be improved
* Suggestions for making your CV more ATS-friendly

### Export to PDF

Click **Export to PDF** to generate a PDF version of your CV.

The generated file follows the visual structure of the preview and is downloaded using a filename based on the candidate's name.

### Save and Import JSON

You can save your entire CV as a `.json` file and import it later.

**Export:**

* Exports the complete CV data stored in `cvStore`.
* Saves the data as a JSON file.

**Import:**

* Select a previously exported JSON file.
* The application validates the basic structure.
* The CV data is restored to the store.

## 📦 Example JSON Export

```json
{
  "personalInfo": {
    "cvTitle": "Full Stack Developer",
    "name": "John Doe",
    "email": "john.doe@email.com",
    "phone": "+1 234 567 890",
    "address": "New York, USA",
    "image": "data:image/jpeg;base64,...",
    "socials": [
      {
        "platform": "linkedin",
        "url": "https://linkedin.com/in/johndoe"
      },
      {
        "platform": "github",
        "url": "https://github.com/johndoe"
      }
    ]
  },
  "professionalSummary": "Full Stack Developer with 5 years of experience building modern web applications.",
  "workExperience": [],
  "education": [],
  "skills": [
    {
      "id": 1642345678901,
      "name": "React",
      "level": "expert"
    }
  ],
  "languages": [],
  "certifications": [],
  "projects": []
}
```

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes:

```bash
git commit -m "Add some amazing feature"
```

4. Push the branch:

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request.

## 📄 License

This project is distributed under the **MIT License**.

See the [`LICENSE`](LICENSE) file for more information.
