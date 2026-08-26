<script>
    import { cvStore } from '$lib/stores/cvStore';
    import { generatePDF } from '$lib/utils/pdfGenerator';
    import Icon from '@iconify/svelte';

    let fileInput;
    let isExportingPdf = false;
    let isImporting = false;
    let importMessage = '';
    let importMessageType = ''; // 'success' ou 'error'

    async function exportPDF() {
        if (isExportingPdf) return;
        isExportingPdf = true;

        try {
            const pagesContainer = document.getElementById('a4-pages');
            if (!pagesContainer) {
                throw new Error('Conteneur des pages A4 introuvable.');
            }
            const pdfBlob = await generatePDF(pagesContainer);
            const url = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');

            const name = $cvStore.personalInfo.name?.trim()
                ? $cvStore.personalInfo.name.trim().replace(/\s+/g, '_')
                : 'CV';

            a.href = url;
            a.download = `CV_${name}.pdf`;

            document.body.appendChild(a);
            a.click();
            a.remove();

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);

        } catch (error) {
            console.error('Impossible de générer le PDF :', error);
            importMessage = `Erreur PDF : ${error?.message || error}`;
            importMessageType = 'error';
            setTimeout(() => { importMessage = ''; }, 5000);
        } finally {
            isExportingPdf = false;
        }
    }

    function exportJSON() {
        try {
            const dataStr = JSON.stringify($cvStore, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');

            const name = $cvStore.personalInfo.name?.trim()
                ? $cvStore.personalInfo.name.trim().replace(/\s+/g, '_')
                : 'CV';

            a.href = url;
            a.download = `CV_${name}.json`;

            document.body.appendChild(a);
            a.click();
            a.remove();

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);

        } catch (error) {
            console.error("Erreur lors de l'export JSON :", error);
            importMessage = `Erreur export JSON : ${error?.message || error}`;
            importMessageType = 'error';
            setTimeout(() => { importMessage = ''; }, 5000);
        }
    }

    function openImportDialog() {
        fileInput?.click();
    }

    function handleImport(event) {
        const file = event.currentTarget.files?.[0];

        if (!file) return;

        if (!file.name.toLowerCase().endsWith('.json')) {
            importMessage = 'Veuillez sélectionner un fichier JSON.';
            importMessageType = 'error';
            event.currentTarget.value = '';
            setTimeout(() => { importMessage = ''; }, 5000);
            return;
        }

        isImporting = true;
        importMessage = '';
        importMessageType = '';

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = e.target?.result;

                if (typeof content !== 'string') {
                    throw new Error('Impossible de lire le contenu du fichier.');
                }

                const importedData = JSON.parse(content);
                validateCVData(importedData);

                const currentTemplate = $cvStore.selectedTemplate;

                cvStore.set({
                    ...createEmptyCV(),
                    ...importedData,
                    selectedTemplate: currentTemplate,
                    personalInfo: {
                        ...createEmptyCV().personalInfo,
                        ...(importedData.personalInfo || {})
                    },
                    workExperience: Array.isArray(importedData.workExperience) ? importedData.workExperience : [],
                    education: Array.isArray(importedData.education) ? importedData.education : [],
                    skills: Array.isArray(importedData.skills) ? importedData.skills : [],
                    languages: Array.isArray(importedData.languages) ? importedData.languages : [],
                    certifications: Array.isArray(importedData.certifications) ? importedData.certifications : [],
                    projects: Array.isArray(importedData.projects) ? importedData.projects : []
                });

                importMessage = 'CV importé avec succès !';
                importMessageType = 'success';
                setTimeout(() => { importMessage = ''; }, 5000);

            } catch (error) {
                console.error("Erreur lors de l'importation :", error);
                importMessage = `Erreur : ${error?.message || error}`;
                importMessageType = 'error';
                setTimeout(() => { importMessage = ''; }, 5000);
            } finally {
                isImporting = false;
                event.currentTarget.value = '';
            }
        };

        reader.onerror = () => {
            console.error('FileReader error:', reader.error);
            importMessage = 'Impossible de lire le fichier JSON.';
            importMessageType = 'error';
            isImporting = false;
            event.currentTarget.value = '';
            setTimeout(() => { importMessage = ''; }, 5000);
        };

        reader.readAsText(file, 'UTF-8');
    }

    function validateCVData(data) {
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
            throw new Error('Le fichier ne contient pas un objet JSON valide.');
        }

        if (
            data.personalInfo !== undefined &&
            (typeof data.personalInfo !== 'object' || Array.isArray(data.personalInfo))
        ) {
            throw new Error('La propriété "personalInfo" est invalide.');
        }

        const arrayFields = [
            'workExperience',
            'education',
            'skills',
            'languages',
            'certifications',
            'projects'
        ];

        for (const field of arrayFields) {
            if (data[field] !== undefined && !Array.isArray(data[field])) {
                throw new Error(`La propriété "${field}" doit être un tableau.`);
            }
        }
    }

    function createEmptyCV() {
        return {
            personalInfo: {
                cvTitle: '',
                name: '',
                email: '',
                phone: '',
                address: '',
                image: '',
                linkedin: '',
                github: ''
            },
            professionalSummary: '',
            workExperience: [],
            education: [],
            skills: [],
            languages: [],
            certifications: [],
            projects: []
        };
    }
</script>

<div class="flex flex-col gap-2">
    <div class="flex flex-row flex-wrap gap-2 sm:gap-3 pt-2">
        <!-- Export PDF -->
        <button
            type="button"
            on:click={exportPDF}
            disabled={isExportingPdf}
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-xs font-bold text-white hover:bg-neutral-800 disabled:bg-neutral-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all cursor-pointer shadow-sm"
        >
            {#if isExportingPdf}
                <Icon icon="mdi:loading" class="w-4 h-4 animate-spin" />
                Génération en cours...
            {:else}
                <Icon icon="mdi:download" class="w-4 h-4" />
                Exporter en PDF
            {/if}
        </button>

        <!-- Export JSON -->
        <button
            type="button"
            on:click={exportJSON}
            class="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-neutral-300 bg-white px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-xs font-bold text-neutral-900 hover:border-black hover:bg-neutral-50 focus:outline-none transition-all cursor-pointer shadow-sm"
        >
            <Icon icon="mdi:export" class="w-4 h-4 text-neutral-700" />
            Sauvegarder (JSON)
        </button>

        <!-- Import JSON -->
        <button
            type="button"
            on:click={openImportDialog}
            disabled={isImporting}
            class="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-neutral-300 bg-white px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-xs font-bold text-neutral-900 hover:border-black hover:bg-neutral-50 disabled:opacity-60 focus:outline-none transition-all cursor-pointer shadow-sm"
        >
            {#if isImporting}
                <Icon icon="mdi:loading" class="w-4 h-4 animate-spin" />
                Importation...
            {:else}
                <Icon icon="mdi:import" class="w-4 h-4 text-neutral-700" />
                Importer (JSON)
            {/if}
        </button>

        <!-- Input caché -->
        <input
            bind:this={fileInput}
            type="file"
            accept=".json,application/json"
            class="hidden"
            on:change={handleImport}
        />
    </div>

    <!-- Affichage des messages d'importation -->
    {#if importMessage}
        <div
            class="text-sm font-medium px-4 py-2 rounded-lg {importMessageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}"
        >
            {importMessage}
        </div>
    {/if}
</div>