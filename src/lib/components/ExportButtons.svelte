<script>
    import { cvStore } from '$lib/stores/cvStore';
    import { generatePDF } from '$lib/utils/pdfGenerator';

    async function exportPDF() {
        try {
            const pdfBlob = await generatePDF($cvStore);

            const url = URL.createObjectURL(pdfBlob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `CV_${$cvStore.personalInfo.name.replace(/\s+/g, '_')}.pdf`;
            a.click();
            
            setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error("Échec de génération:", error);
        }
    }
    
    function exportJSON() {
        const dataStr = JSON.stringify($cvStore, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `CV_${$cvStore.personalInfo.name.replace(/\s+/g, '_')}.json`;
        a.click();
        
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }
</script>

<div class="flex space-x-4 mt-6">
    <button on:click={exportPDF} class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Exporter en PDF
    </button>
    <button on:click={exportJSON} class="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
        Sauvegarder en JSON
    </button>
</div>