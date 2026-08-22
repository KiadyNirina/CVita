<script>
    import { cvStore } from '$lib/stores/cvStore';
    import { generatePDF } from '$lib/utils/pdfGenerator';

    let fileInput;

    async function exportPDF() {
        try {
            const preview = document.querySelector('#cv-preview');

            if (!preview) {
                throw new Error('Preview introuvable.');
            }

            const pdfBlob = await generatePDF(preview);

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

            alert(
                `Impossible de générer le PDF.\n\n${
                    error?.message || error
                }`
            );
        }
    }

    function exportJSON() {
        try {
            const dataStr = JSON.stringify($cvStore, null, 2);

            const blob = new Blob(
                [dataStr],
                {
                    type: 'application/json;charset=utf-8'
                }
            );

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
            console.error(
                "Erreur lors de l'export JSON :",
                error
            );
        }
    }

    function openImportDialog() {
        fileInput?.click();
    }

    function handleImport(event) {
        const file = event.currentTarget.files?.[0];

        if (!file) {
            return;
        }

        if (!file.name.toLowerCase().endsWith('.json')) {
            alert('Veuillez sélectionner un fichier JSON.');
            event.currentTarget.value = '';
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = e.target?.result;

                if (typeof content !== 'string') {
                    throw new Error(
                        'Impossible de lire le contenu du fichier.'
                    );
                }

                const importedData = JSON.parse(content);

                validateCVData(importedData);

                /*
                 * Remplace complètement les données actuelles
                 * par celles du fichier JSON.
                 */
                cvStore.set({
                    ...createEmptyCV(),
                    ...importedData,

                    personalInfo: {
                        ...createEmptyCV().personalInfo,
                        ...(importedData.personalInfo || {})
                    },

                    workExperience: Array.isArray(
                        importedData.workExperience
                    )
                        ? importedData.workExperience
                        : [],

                    education: Array.isArray(importedData.education)
                        ? importedData.education
                        : [],

                    skills: Array.isArray(importedData.skills)
                        ? importedData.skills
                        : [],

                    languages: Array.isArray(importedData.languages)
                        ? importedData.languages
                        : [],

                    certifications: Array.isArray(
                        importedData.certifications
                    )
                        ? importedData.certifications
                        : [],

                    projects: Array.isArray(importedData.projects)
                        ? importedData.projects
                        : []
                });

                console.log(
                    'CV importé avec succès :',
                    importedData
                );

                alert('CV importé avec succès !');

            } catch (error) {
                console.error(
                    "Erreur lors de l'importation :",
                    error
                );

                alert(
                    `Erreur lors de l'importation : ${
                        error?.message || error
                    }`
                );
            } finally {
                /*
                 * Permet de sélectionner à nouveau le même fichier.
                 */
                event.currentTarget.value = '';
            }
        };

        reader.onerror = () => {
            console.error(
                'FileReader error:',
                reader.error
            );

            alert(
                'Impossible de lire le fichier JSON.'
            );

            event.currentTarget.value = '';
        };

        reader.readAsText(file, 'UTF-8');
    }

    function validateCVData(data) {
        if (
            !data ||
            typeof data !== 'object' ||
            Array.isArray(data)
        ) {
            throw new Error(
                'Le fichier ne contient pas un objet JSON valide.'
            );
        }

        if (
            data.personalInfo !== undefined &&
            (
                typeof data.personalInfo !== 'object' ||
                Array.isArray(data.personalInfo)
            )
        ) {
            throw new Error(
                'La propriété "personalInfo" est invalide.'
            );
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
            if (
                data[field] !== undefined &&
                !Array.isArray(data[field])
            ) {
                throw new Error(
                    `La propriété "${field}" doit être un tableau.`
                );
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

<div class="flex flex-wrap gap-4 mt-6">

    <!-- Export PDF -->
    <button
        on:click={exportPDF}
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
        Exporter en PDF
    </button>

    <!-- Export JSON -->
    <button
        on:click={exportJSON}
        class="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
    >
        Sauvegarder en JSON
    </button>

    <!-- Import JSON -->
    <button
        on:click={openImportDialog}
        class="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
    >
        Importer un JSON
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