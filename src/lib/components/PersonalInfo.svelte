<script>
    import { cvStore } from '$lib/stores/cvStore';
    
    let showHelp = false;
    let imagePreview = '';

    // Handle image file selection and create preview
    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview = e.target.result;
                $cvStore.personalInfo.image = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
</script>

<div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">Informations Personnelles</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        <!-- Photo Upload Section -->
        <div class="col-span-1 md:col-span-2 flex items-center gap-6 mb-4">
            <div class="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100 border-2 border-neutral-300 shadow-sm">
                {#if $cvStore.personalInfo.image}
                    <img src={$cvStore.personalInfo.image} alt="Aperçu du profil" class="h-full w-full object-cover" />
                {:else}
                    <svg class="h-10 w-10 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                {/if}
            </div>
            
            <div class="flex flex-col gap-3">
                <label class="cursor-pointer inline-flex w-fit items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-neutral-800 hover:shadow-lg focus:ring-4 focus:ring-neutral-900/20">
                    <span>{$cvStore.personalInfo.image ? 'Changer la photo' : 'Ajouter une photo'}</span>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        on:change={handleImageChange}
                        class="sr-only"
                    />
                </label>
                <p class="text-xs font-semibold text-neutral-500">Format recommandé : carré (JPG, PNG).</p>
            </div>
        </div>

        <!-- STREAMING_CHUNK:Rendering high-contrast input fields -->
        <!-- Inputs -->
        <div class="col-span-1 md:col-span-2 space-y-2">
            <label for="cvTitle" class="block text-xs font-bold uppercase tracking-wider text-neutral-900">Titre du CV *</label>
            <input
                id="cvTitle"
                type="text"
                bind:value={$cvStore.personalInfo.cvTitle}
                placeholder="Ex: Développeur Full Stack"
                class="block w-full rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 text-base font-medium text-neutral-950 shadow-sm transition-all placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
            />
        </div>

        <div class="space-y-2">
            <label for="name" class="block text-xs font-bold uppercase tracking-wider text-neutral-900">Nom Complet *</label>
            <input
                id="name"
                type="text"
                bind:value={$cvStore.personalInfo.name}
                placeholder="Prénom Nom"
                class="block w-full rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 text-base font-medium text-neutral-950 shadow-sm transition-all placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
            />
        </div>
        
        <div class="space-y-2">
            <label for="email" class="block text-xs font-bold uppercase tracking-wider text-neutral-900">Email *</label>
            <input
                id="email"
                type="email"
                bind:value={$cvStore.personalInfo.email}
                placeholder="email@exemple.com"
                class="block w-full rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 text-base font-medium text-neutral-950 shadow-sm transition-all placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
            />
        </div>

        <!-- STREAMING_CHUNK:Rendering contact and links fields -->
        <div class="space-y-2">
            <label for="phone" class="block text-xs font-bold uppercase tracking-wider text-neutral-900">Téléphone</label>
            <input
                id="phone"
                type="tel"
                bind:value={$cvStore.personalInfo.phone}
                placeholder="+33 6 12 34 56 78"
                class="block w-full rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 text-base font-medium text-neutral-950 shadow-sm transition-all placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
            />
        </div>
        
        <div class="space-y-2">
            <label for="address" class="block text-xs font-bold uppercase tracking-wider text-neutral-900">Adresse</label>
            <input
                id="address"
                type="text"
                bind:value={$cvStore.personalInfo.address}
                placeholder="Ville, Pays"
                class="block w-full rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 text-base font-medium text-neutral-950 shadow-sm transition-all placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
            />
        </div>
        
        <div class="space-y-2">
            <label for="linkedin" class="block text-xs font-bold uppercase tracking-wider text-neutral-900">LinkedIn</label>
            <input
                id="linkedin"
                type="url"
                bind:value={$cvStore.personalInfo.linkedin}
                placeholder="https://linkedin.com/in/votreprofil"
                class="block w-full rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 text-base font-medium text-neutral-950 shadow-sm transition-all placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
            />
        </div>

        <div class="space-y-2">
            <label for="github" class="block text-xs font-bold uppercase tracking-wider text-neutral-900">GitHub</label>
            <input
                id="github"
                type="url"
                bind:value={$cvStore.personalInfo.github}
                placeholder="https://github.com/votreprofil"
                class="block w-full rounded-xl border-2 border-neutral-300 bg-white px-4 py-3 text-base font-medium text-neutral-950 shadow-sm transition-all placeholder:text-neutral-400 hover:border-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10"
            />
        </div>
    </div>
</div>