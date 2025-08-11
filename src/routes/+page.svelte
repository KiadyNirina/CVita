<script>
    import { onMount } from 'svelte';

    let html2pdf;
    let content;
    let isMobile = false;
    let showPreview = false;

    onMount(async () => {
        if (typeof window !== 'undefined') {
            try {
                const module = await import('html2pdf.js');
                html2pdf = module.default;
                console.log('html2pdf loaded successfully, version:', module.default.version);
            } catch (error) {
                console.error('Failed to load html2pdf:', error);
            }
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return () => window.removeEventListener('resize', checkMobile);
        }
    });

    function checkMobile() {
        isMobile = window.innerWidth < 1024;
    }

    function togglePreview() {
        showPreview = !showPreview;
    }

    // Utility to replace oklch colors with hex equivalents
    function replaceOklchColors(element) {
        const elements = element.getElementsByTagName('*');
        for (let el of elements) {
            const style = window.getComputedStyle(el);
            const color = style.color;
            const backgroundColor = style.backgroundColor;

            // Replace oklch with fallback hex colors
            if (color.includes('oklch')) {
                el.style.color = '#000000'; // Fallback to black
                console.warn(`Replaced oklch color in element:`, el, `from:`, color);
            }
            if (backgroundColor.includes('oklch')) {
                el.style.backgroundColor = '#ffffff'; // Fallback to white
                console.warn(`Replaced oklch background in element:`, el, `from:`, backgroundColor);
            }
        }
    }

    function generatePDF() {
        if (!html2pdf) {
            console.error('html2pdf is not loaded. Please try again.');
            alert('Erreur : la bibliothèque de génération PDF n’est pas chargée.');
            return;
        }

        if (!content) {
            console.error('Content element is not defined.');
            alert('Erreur : l’élément de contenu à convertir en PDF est introuvable.');
            return;
        }

        // Preprocess colors to remove oklch
        console.log('Preprocessing colors to remove oklch...');
        replaceOklchColors(content);

        const options = {
            margin: [0.5, 0.5],
            filename: 'cv-professionnel.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true, 
                logging: true,
                allowTaint: true,
                colorSpace: 'srgb'
            },
            jsPDF: { 
                unit: 'in', 
                format: 'a4', 
                orientation: 'portrait' 
            }
        };

        console.log('Starting PDF generation...');
        html2pdf()
            .set(options)
            .from(content)
            .toPdf()
            .save()
            .catch((error) => {
                console.error('PDF generation failed:', error);
                alert('Une erreur est survenue lors de la génération du PDF : ' + error.message);
            });
    }

    let name = "Jean";
    let lastname = "Dupont";
    let title_CV = "Développeur Full-Stack";
    let image = "";
    let address = "Paris, France";
    let tel = "06 12 34 56 78";
    let email = "jean.dupont@email.com";
    let linkedin = "linkedin.com/in/jeandupont";
    let website = "jeandupont.dev";
    let summary = "Développeur passionné avec 5 ans d'expérience dans la création d'applications web robustes et scalables. Expert en JavaScript, React et Node.js, je suis à la recherche de nouveaux défis pour mettre à profit mes compétences techniques et mon esprit d'équipe.";
    
    let hardSkills = ["React", "Node.js", "TypeScript", "GraphQL", "Docker"];
    let currentHardSkill = "";
    let softSkills = ["Communication", "Travail d'équipe", "Résolution de problèmes"];
    let currentSoftSkill = "";

    function addHardSkill() {
        if (currentHardSkill.trim() !== "") {
            hardSkills = [...hardSkills, currentHardSkill.trim()];
            currentHardSkill = "";
        }
    }

    function addSoftSkill() {
        if (currentSoftSkill.trim() !== "") {
            softSkills = [...softSkills, currentSoftSkill.trim()];
            currentSoftSkill = "";
        }
    }

    let experiences = [
        { position: "Développeur Senior", company: "Tech Solutions", location: "Paris", startDate: "01/2021", endDate: "Aujourd'hui", description: "Développement et maintenance de la plateforme SaaS principale.", achievements: ["Migration de l'architecture vers des microservices.", "Amélioration des performances de 40%."], current: true }
    ];
    let newExperience = { position: "", company: "", location: "", startDate: "", endDate: "", description: "", achievements: [], current: false };
    let currentAchievement = "";

    function addExperience() {
        if (newExperience.position.trim() !== "" && newExperience.company.trim() !== "") {
            experiences = [...experiences, {...newExperience}];
            resetExperience();
        }
    }
    function addAchievement() {
        if (currentAchievement.trim() !== "") {
            newExperience.achievements = [...newExperience.achievements, currentAchievement.trim()];
            currentAchievement = "";
        }
    }
    function resetExperience() { newExperience = { position: "", company: "", location: "", startDate: "", endDate: "", description: "", achievements: [], current: false }; }

    let educations = [
        { degree: "Master en Informatique", institution: "Université de Paris", field: "Génie Logiciel", startYear: "2014", endYear: "2016" }
    ];
    let newEducation = { degree: "", institution: "", field: "", startYear: "", endYear: "" };

    function addEducation() {
        if (newEducation.degree.trim() !== "" && newEducation.institution.trim() !== "") { educations = [...educations, {...newEducation}]; newEducation = { degree: "", institution: "", field: "", startYear: "", endYear: "" }; }
    }

    let languages = [ { name: "Français", level: "Natif" }, { name: "Anglais", level: "Courant (C1)" } ];
    let newLanguage = { name: "", level: "" };

    function addLanguage() {
        if (newLanguage.name.trim() !== "" && newLanguage.level.trim() !== "") { languages = [...languages, {...newLanguage}]; newLanguage = { name: "", level: "" }; }
    }

    let certifications = ["AWS Certified Developer - Associate"];
    let currentCertification = "";

    function addCertification() {
        if (currentCertification.trim() !== "") { certifications = [...certifications, currentCertification.trim()]; currentCertification = ""; }
    }

    function previewImage(event) {
        const target = event.target;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                image = reader.result;
            };
            reader.readAsDataURL(file);
        }
    }
</script>

<div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
        <div class="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 class="text-xl font-bold text-gray-800">Create CV</h1>
            <div class="flex items-center gap-2">
                {#if isMobile}
                    <button 
                        on:click={togglePreview}
                        class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center transition"
                    >
                        {#if !showPreview}
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C3.732 4.943 7.523 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-7.03 7-9.542 7S3.274 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg>
                            Aperçu
                        {:else}
                             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                            Formulaire
                        {/if}
                    </button>
                {/if}

                <button 
                    on:click={generatePDF}
                    class="bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold px-4 py-2 rounded-md flex items-center transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                    Exporter PDF
                </button>
            </div>
        </div>
    </header>

    <main class="container mx-auto px-4 py-6">
        <div class="flex flex-col lg:flex-row gap-6">
            <!-- Formulaire -->
            {#if !isMobile || (isMobile && !showPreview)}
                <div class="lg:w-1/3 bg-white rounded-lg shadow-md p-6 h-fit lg:sticky lg:top-24">
                    <h2 class="text-xl font-semibold text-gray-800 mb-6">Informations Personnelles</h2>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                            <input type="text" bind:value={name} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input type="text" bind:value={lastname} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Titre Professionnel</label>
                            <input type="text" bind:value={title_CV} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                            <div class="flex items-center">
                                <label class="flex flex-col items-center px-4 py-2 bg-white rounded-md border border-gray-300 cursor-pointer hover:bg-gray-50">
                                    <span class="text-sm font-medium text-gray-700">Choisir une image</span>
                                    <input type="file" accept="image/*" on:change={previewImage} class="hidden">
                                </label>
                                {#if image}
                                    <span class="ml-2 text-sm text-gray-500">Image sélectionnée</span>
                                {/if}
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" bind:value={email} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                            <input type="tel" bind:value={tel} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
                            <input type="text" bind:value={address} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                            <input type="url" bind:value={linkedin} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Site Web</label>
                            <input type="url" bind:value={website} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Profil Professionnel</label>
                            <textarea bind:value={summary} rows={4} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]"></textarea>
                            <p class="text-xs text-gray-500 mt-1">Résumez votre expérience en 3-4 phrases (optimisé ATS)</p>
                        </div>
                    </div>

                    <!-- Compétences techniques -->
                    <h2 class="text-xl font-semibold text-gray-800 mt-8 mb-4">Compétences Techniques</h2>
                    <div class="space-y-2">
                        <div class="flex">
                            <input 
                                type="text" 
                                bind:value={currentHardSkill}
                                class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                                placeholder="Ex: JavaScript, React, Node.js"
                            >
                            <button 
                                on:click={addHardSkill}
                                class="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-3 py-2 rounded-r-md transition"
                            >
                                +
                            </button>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            {#each hardSkills as skill, i}
                                <div class="bg-[#dbeafe] text-[#1e40af] px-3 py-1 rounded-full text-sm flex items-center">
                                    {skill}
                                    <button 
                                        on:click={() => hardSkills = hardSkills.filter((_, index) => index !== i)}
                                        class="ml-1 text-[#1e40af] hover:text-[#1e3a8a]"
                                    >
                                        ×
                                    </button>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Compétences douces -->
                    <h2 class="text-xl font-semibold text-gray-800 mt-6 mb-4">Soft Skills</h2>
                    <div class="space-y-2">
                        <div class="flex">
                            <input 
                                type="text" 
                                bind:value={currentSoftSkill}
                                class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                                placeholder="Ex: Leadership, Communication"
                            >
                            <button 
                                on:click={addSoftSkill}
                                class="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-3 py-2 rounded-r-md transition"
                            >
                                +
                            </button>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            {#each softSkills as skill, i}
                                <div class="bg-[#dcfce7] text-[#166534] px-3 py-1 rounded-full text-sm flex items-center">
                                    {skill}
                                    <button 
                                        on:click={() => softSkills = softSkills.filter((_, index) => index !== i)}
                                        class="ml-1 text-[#166534] hover:text-[#14532d]"
                                    >
                                        ×
                                    </button>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Expériences professionnelles -->
                    <h2 class="text-xl font-semibold text-gray-800 mt-8 mb-4">Expériences Professionnelles</h2>
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Poste</label>
                                <input bind:value={newExperience.position} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                                <input bind:value={newExperience.company} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                                <input type="text" bind:value={newExperience.startDate} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="MM/AAAA">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                                <input type="text" bind:value={newExperience.endDate} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="MM/AAAA ou Aujourd'hui">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                            <input bind:value={newExperience.location} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea bind:value={newExperience.description} rows={3} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]"></textarea>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Réalisations</label>
                            <div class="flex mb-2">
                                <input 
                                    type="text" 
                                    bind:value={currentAchievement}
                                    class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                                    placeholder="Ex: Augmentation de 30% des performances"
                                >
                                <button 
                                    on:click={addAchievement}
                                    class="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-3 py-2 rounded-r-md transition"
                                >
                                    +
                                </button>
                            </div>
                            <ul class="space-y-1">
                                {#each newExperience.achievements as achievement, i}
                                    <li class="flex items-center text-sm bg-gray-50 px-3 py-1 rounded">
                                        <span class="flex-1">• {achievement}</span>
                                        <button 
                                            on:click={() => newExperience.achievements = newExperience.achievements.filter((_, index) => index !== i)}
                                            class="text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    </li>
                                {/each}
                            </ul>
                        </div>
                        
                        <div class="flex items-center">
                            <input type="checkbox" bind:checked={newExperience.current} id="currentJob" class="h-4 w-4 text-[#2563eb] focus:ring-[#2563eb] border-gray-300 rounded">
                            <label for="currentJob" class="ml-2 text-sm text-gray-700">Poste actuel</label>
                        </div>
                        
                        <button 
                            on:click={addExperience}
                            class="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-2 rounded-md transition"
                        >
                            Ajouter Expérience
                        </button>
                        
                        <div class="border-t border-gray-200 pt-4">
                            {#each experiences as exp, i}
                                <div class="mb-4 p-3 bg-gray-50 rounded-md">
                                    <div class="flex justify-between items-start">
                                        <h3 class="font-medium">{exp.position} @ {exp.company}</h3>
                                        <button 
                                            on:click={() => experiences = experiences.filter((_, index) => index !== i)}
                                            class="text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <p class="text-sm text-gray-600">{exp.startDate} - {exp.current ? "Aujourd'hui" : exp.endDate}</p>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Formations -->
                    <h2 class="text-xl font-semibold text-gray-800 mt-8 mb-4">Formations</h2>
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Diplôme</label>
                                <input bind:value={newEducation.degree} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Établissement</label>
                                <input bind:value={newEducation.institution} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Domaine d'étude</label>
                            <input bind:value={newEducation.field} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                        </div>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Année de début</label>
                                <input type="text" bind:value={newEducation.startYear} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="AAAA">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Année de fin</label>
                                <input type="text" bind:value={newEducation.endYear} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="AAAA">
                            </div>
                        </div>
                        
                        <button 
                            on:click={addEducation}
                            class="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-2 rounded-md transition"
                        >
                            Ajouter Formation
                        </button>
                        
                        <div class="border-t border-gray-200 pt-4">
                            {#each educations as edu, i}
                                <div class="mb-4 p-3 bg-gray-50 rounded-md">
                                    <div class="flex justify-between items-start">
                                        <h3 class="font-medium">{edu.degree} @ {edu.institution}</h3>
                                        <button 
                                            on:click={() => educations = educations.filter((_, index) => index !== i)}
                                            class="text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <p class="text-sm text-gray-600">{edu.startYear} - {edu.endYear}</p>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Langues -->
                    <h2 class="text-xl font-semibold text-gray-800 mt-8 mb-4">Langues</h2>
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Langue</label>
                                <input bind:value={newLanguage.name} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                                <input bind:value={newLanguage.level} class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]" placeholder="Ex: Courant, B2...">
                            </div>
                        </div>
                        
                        <button 
                            on:click={addLanguage}
                            class="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-2 rounded-md transition"
                        >
                            Ajouter Langue
                        </button>
                        
                        <div class="border-t border-gray-200 pt-4">
                            {#each languages as lang, i}
                                <div class="mb-4 p-3 bg-gray-50 rounded-md">
                                    <div class="flex justify-between items-start">
                                        <h3 class="font-medium">{lang.name} - {lang.level}</h3>
                                        <button 
                                            on:click={() => languages = languages.filter((_, index) => index !== i)}
                                            class="text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>

                    <!-- Certifications -->
                    <h2 class="text-xl font-semibold text-gray-800 mt-8 mb-4">Certifications</h2>
                    <div class="space-y-2">
                        <div class="flex">
                            <input 
                                type="text" 
                                bind:value={currentCertification}
                                class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
                                placeholder="Ex: AWS Certified Developer"
                            >
                            <button 
                                on:click={addCertification}
                                class="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-3 py-2 rounded-r-md transition"
                            >
                                +
                            </button>
                        </div>
                        
                        <div class="border-t border-gray-200 pt-4">
                            {#each certifications as cert, i}
                                <div class="mb-4 p-3 bg-gray-50 rounded-md flex justify-between items-center">
                                    <span>{cert}</span>
                                    <button 
                                        on:click={() => certifications = certifications.filter((_, index) => index !== i)}
                                        class="text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}

            <!-- Aperçu du CV (optimisé ATS) -->
            {#if !isMobile || (isMobile && showPreview)}
                <div class="lg:w-2/3">
                    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div bind:this={content} class="text-gray-700 leading-relaxed">
                            <div class="bg-[#1e293b] text-white flex items-center p-8">
                                {#if image}
                                    <img src={image} alt="Photo profil" class="w-28 h-28 rounded-full object-cover border-4 border-[#334155] mr-8">
                                {/if}
                                <div>
                                    <h1 class="text-4xl font-bold tracking-tight">{name} {lastname}</h1>
                                    <h2 class="text-xl text-[#93c5fd] font-medium mt-1">{title_CV}</h2>
                                </div>
                            </div>

                            <div class="p-8 grid grid-cols-1 md:grid-cols-3 gap-x-8">
                                <div class="md:col-span-2">
                                    {#if summary}
                                    <section class="mb-8">
                                        <h3 class="text-sm font-bold text-[#1e40af] uppercase tracking-wider border-b-2 border-[#bfdbfe] pb-2 mb-4">Profil</h3>
                                        <p class="text-sm">{summary}</p>
                                    </section>
                                    {/if}
                                    
                                    {#if experiences.length > 0}
                                    <section class="mb-8">
                                        <h3 class="text-sm font-bold text-[#1e40af] uppercase tracking-wider border-b-2 border-[#bfdbfe] pb-2 mb-4">Expériences Professionnelles</h3>
                                        <div class="relative border-l-2 border-[#e2e8f0] pl-6 space-y-6">
                                            {#each experiences as exp}
                                                <div class="relative">
                                                    <div class="absolute -left-[33px] top-1 h-3 w-3 rounded-full bg-[#2563eb] border-2 border-white"></div>
                                                    <p class="text-xs text-gray-500">{exp.startDate} - {exp.current ? "Aujourd'hui" : exp.endDate}</p>
                                                    <h4 class="font-bold text-md text-[#1e293b]">{exp.position}</h4>
                                                    <p class="font-semibold text-sm text-[#475569]">{exp.company} - {exp.location}</p>
                                                    <p class="text-sm mt-1">{exp.description}</p>
                                                    {#if exp.achievements.length > 0}
                                                        <ul class="list-disc list-inside mt-2 text-sm space-y-1">
                                                            {#each exp.achievements as achievement}
                                                                <li>{achievement}</li>
                                                            {/each}
                                                        </ul>
                                                    {/if}
                                                </div>
                                            {/each}
                                        </div>
                                    </section>
                                    {/if}
                                    
                                    {#if educations.length > 0}
                                    <section>
                                        <h3 class="text-sm font-bold text-[#1e40af] uppercase tracking-wider border-b-2 border-[#bfdbfe] pb-2 mb-4">Formation</h3>
                                        <div class="space-y-4">
                                            {#each educations as edu}
                                                <div>
                                                    <p class="text-xs text-gray-500">{edu.startYear} - {edu.endYear}</p>
                                                    <h4 class="font-bold text-md text-[#1e293b]">{edu.degree}</h4>
                                                    <p class="font-semibold text-sm text-[#475569]">{edu.institution}</p>
                                                    <p class="text-sm">{edu.field}</p>
                                                </div>
                                            {/each}
                                        </div>
                                    </section>
                                    {/if}
                                </div>

                                <div class="mt-8 md:mt-0 space-y-8">
                                    <section>
                                        <h3 class="text-sm font-bold text-[#1e40af] uppercase tracking-wider border-b-2 border-[#bfdbfe] pb-2 mb-4">Contact</h3>
                                        <div class="space-y-2 text-sm">
                                            {#if email}<p class="flex items-center"><svg class="w-4 h-4 mr-2 text-[#475569]" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>{email}</p>{/if}
                                            {#if tel}<p class="flex items-center"><svg class="w-4 h-4 mr-2 text-[#475569]" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>{tel}</p>{/if}
                                            {#if address}<p class="flex items-center"><svg class="w-4 h-4 mr-2 text-[#475569]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg>{address}</p>{/if}
                                            {#if linkedin}<p class="flex items-center"><svg class="w-4 h-4 mr-2 text-[#475569]" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>{linkedin}</p>{/if}
                                            {#if website}<p class="flex items-center"><svg class="w-4 h-4 mr-2 text-[#475569]" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>{website}</p>{/if}
                                        </div>
                                    </section>
                                    
                                    {#if hardSkills.length > 0}
                                    <section>
                                        <h3 class="text-sm font-bold text-[#1e40af] uppercase tracking-wider border-b-2 border-[#bfdbfe] pb-2 mb-4">Compétences Techniques</h3>
                                        <div class="flex flex-wrap gap-2">
                                            {#each hardSkills as skill}
                                                <span class="bg-[#e2e8f0] text-[#1e293b] px-3 py-1 rounded-full text-xs font-medium">{skill}</span>
                                            {/each}
                                        </div>
                                    </section>
                                    {/if}
                                    
                                    {#if softSkills.length > 0}
                                    <section>
                                        <h3 class="text-sm font-bold text-[#1e40af] uppercase tracking-wider border-b-2 border-[#bfdbfe] pb-2 mb-4">Soft Skills</h3>
                                        <div class="flex flex-wrap gap-2">
                                            {#each softSkills as skill}
                                                 <span class="bg-[#dcfce7] text-[#166534] px-3 py-1 rounded-full text-xs font-medium">{skill}</span>
                                            {/each}
                                        </div>
                                    </section>
                                    {/if}
                                    
                                    {#if languages.length > 0}
                                    <section>
                                        <h3 class="text-sm font-bold text-[#1e40af] uppercase tracking-wider border-b-2 border-[#bfdbfe] pb-2 mb-4">Langues</h3>
                                        <div class="space-y-1 text-sm">
                                            {#each languages as lang}
                                                <p><span class="font-semibold">{lang.name}:</span> {lang.level}</p>
                                            {/each}
                                        </div>
                                    </section>
                                    {/if}

                                     {#if certifications.length > 0}
                                    <section>
                                        <h3 class="text-sm font-bold text-[#1e40af] uppercase tracking-wider border-b-2 border-[#bfdbfe] pb-2 mb-4">Certifications</h3>
                                        <div class="space-y-1 text-sm">
                                            {#each certifications as cert}
                                                <p>{cert}</p>
                                            {/each}
                                        </div>
                                    </section>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </main>
</div>

<style>
    /* Fallback for print to avoid oklch */
    @media print {
        body * {
            visibility: hidden;
        }
        .void, .void * {
            visibility: visible;
        }
        .void {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
        [style*="oklch"] {
            color: #000000 !important;
            background-color: #ffffff !important;
        }
    }

    /* Override any oklch colors in the DOM */
    :where([style*="oklch"]) {
        color: #000000 !important;
        background-color: #ffffff !important;
    }
</style>