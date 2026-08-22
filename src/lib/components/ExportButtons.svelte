<script>
    import { cvStore } from '$lib/stores/cvStore';
    import { generatePDF } from '$lib/utils/pdfGenerator';

    let fileInput;

    const REQUIRED_ARRAY_FIELDS = ['workExperience', 'education', 'skills', 'languages'];
    const PERSONAL_INFO_FIELDS = ['cvTitle', 'name', 'email', 'phone', 'address', 'image', 'linkedin', 'github'];

    // ==============================
    // UTILITAIRES
    // ==============================

    function downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function getFileName() {
        const name = $cvStore.personalInfo?.name?.trim();
        return (name || 'Sans_nom')
            .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
            .replace(/\s+/g, '_');
    }

    function resetFileInput(input) {
        if (input) {
            input.value = '';
        }
    }

    // ==============================
    // EXPORT PDF
    // ==============================

    async function exportPDF() {
        try {
            const pdfBlob = await generatePDF($cvStore);
            downloadBlob(pdfBlob, `CV_${getFileName()}.pdf`);
        } catch (error) {
            console.error('Échec de génération du PDF:', error);
        }
    }

    // ==============================
    // EXPORT JSON
    // ==============================

    function exportJSON() {
        try {
            const dataStr = JSON.stringify($cvStore, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            downloadBlob(blob, `CV_${getFileName()}.json`);
        } catch (error) {
            console.error('Échec de sauvegarde JSON:', error);
        }
    }

    // ==============================
    // IMPORT JSON
    // ==============================

    function openFilePicker() {
        fileInput?.click();
    }

    function handleFileImport(event) {
        const input = event.currentTarget;
        const file = input?.files?.[0];

        if (!file) {
            return;
        }

        if (!file.name.toLowerCase().endsWith('.json')) {
            alert('Veuillez sélectionner un fichier JSON.');
            resetFileInput(input);
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            try {
                if (typeof reader.result !== 'string' || !reader.result.trim()) {
                    throw new Error('Le fichier JSON est vide.');
                }

                const importedData = JSON.parse(reader.result);

                if (!isValidCVData(importedData)) {
                    throw new Error('Le fichier ne correspond pas au format d’un CV valide.');
                }

                cvStore.set(normalizeCVData(importedData));
                alert('CV importé avec succès !');
            } catch (error) {
                console.error('Erreur lors de l’importation JSON:', error);
                alert(`Impossible d'importer le CV.\n\n${error.message}`);
            } finally {
                resetFileInput(input);
            }
        };

        reader.onerror = () => {
            console.error('Erreur FileReader:', reader.error);
            alert('Impossible de lire le fichier JSON.');
            resetFileInput(input);
        };

        reader.onabort = () => {
            console.error('Lecture du fichier interrompue.');
            alert('La lecture du fichier a été interrompue.');
            resetFileInput(input);
        };

        reader.readAsText(file, 'UTF-8');
    }

    // ==============================
    // VALIDATION
    // ==============================

    function isValidCVData(data) {
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            return false;
        }

        if (!data.personalInfo || typeof data.personalInfo !== 'object' || Array.isArray(data.personalInfo)) {
            return false;
        }

        if (typeof data.professionalSummary !== 'string') {
            return false;
        }

        return REQUIRED_ARRAY_FIELDS.every((field) => Array.isArray(data[field]));
    }

    // ==============================
    // NORMALISATION
    // ==============================

    function normalizeCVData(data) {
        const personalInfo = data.personalInfo ?? {};

        return {
            personalInfo: Object.fromEntries(
                PERSONAL_INFO_FIELDS.map((field) => [field, personalInfo[field] ?? ''])
            ),
            professionalSummary: data.professionalSummary ?? '',
            workExperience: Array.isArray(data.workExperience) ? data.workExperience : [],
            education: Array.isArray(data.education) ? data.education : [],
            skills: Array.isArray(data.skills) ? data.skills : [],
            languages: Array.isArray(data.languages) ? data.languages : [],
            certifications: Array.isArray(data.certifications) ? data.certifications : [],
            projects: Array.isArray(data.projects) ? data.projects : []
        };
    }
</script>

<div class="flex flex-wrap gap-4 mt-6">
    <!-- Export PDF -->
    <button
        type="button"
        on:click={exportPDF}
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
        Exporter en PDF
    </button>

    <!-- Export JSON -->
    <button
        type="button"
        on:click={exportJSON}
        class="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
    >
        Sauvegarder en JSON
    </button>

    <!-- Import JSON -->
    <button
        type="button"
        on:click={openFilePicker}
        class="border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50"
    >
        Importer un JSON
    </button>

    <!-- File input caché -->
    <input
        bind:this={fileInput}
        type="file"
        accept=".json,application/json"
        class="hidden"
        on:change={handleFileImport}
    />
</div>