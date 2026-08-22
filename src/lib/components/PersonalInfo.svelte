<script>
    import { cvStore } from '$lib/stores/cvStore';
    
    let imageUrl = '';
    let imageError = false;
    let validationMessage = '';

    // Handle image file selection and create preview
    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target.result;
                $cvStore.personalInfo.image = dataUrl;
                imageError = false;
                validationMessage = '';
                imageUrl = '';
            };
            reader.readAsDataURL(file);
        }
    }

    function validateAndApplyUrl() {
        const trimmed = imageUrl.trim();
        if (!trimmed) {
            imageError = false;
            validationMessage = '';
            return;
        }
        if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
            imageError = true;
            validationMessage = 'Veuillez saisir une URL valide (commençant par http:// ou https://)';
            $cvStore.personalInfo.image = '';
            return;
        }
        // Tester si l'image se charge
        const img = new Image();
        img.onload = () => {
            // L'image est valide
            $cvStore.personalInfo.image = trimmed;
            imageError = false;
            validationMessage = 'Image chargée avec succès ✅';
        };
        img.onerror = () => {
            imageError = true;
            validationMessage = 'Image introuvable ou invalide. Vérifiez l\'URL.';
            $cvStore.personalInfo.image = '';
        };
        img.src = trimmed;
    }

    function handleKeydown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            validateAndApplyUrl();
        }
    }

    function clearImage() {
        $cvStore.personalInfo.image = '';
        imageUrl = '';
        imageError = false;
        validationMessage = '';
    }
</script>

<div class="bg-white p-6 rounded-lg shadow">
    <h2 class="text-xl font-semibold mb-4">Informations Personnelles</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        <!-- Photo Upload Section -->
        <div class="col-span-1 md:col-span-2 flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
            <div class="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100 border-2 border-neutral-300 shadow-sm">
                {#if $cvStore.personalInfo.image && !imageError}
                    <img 
                        src={$cvStore.personalInfo.image} 
                        alt="Aperçu du profil" 
                        class="h-full w-full object-cover"
                        on:error={() => { imageError = true; validationMessage = 'Image introuvable ou invalide.'; }}
                    />
                {:else}
                    <svg class="h-10 w-10 text-neutral-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                {/if}
                {#if imageError}
                    <div class="absolute bottom-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">!</div>
                {/if}
            </div>
            
            <div class="flex flex-col gap-3 flex-1">
                <div class="flex flex-wrap gap-3 items-center">
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
                    <span class="text-xs font-semibold text-neutral-500 self-center">ou</span>
                    <input
                        type="url"
                        bind:value={imageUrl}
                        on:keydown={handleKeydown}
                        placeholder="https://exemple.com/photo.jpg"
                        class="flex-1 min-w-[200px] rounded-xl border-2 border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-950 placeholder-neutral-400 hover:border-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                    />
                    {#if imageUrl.trim() !== ''}
                        <button
                            type="button"
                            on:click={validateAndApplyUrl}
                            class="inline-flex items-center justify-center rounded-xl bg-black px-4 py-2.5 text-sm font-bold text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all"
                        >
                            Valider
                        </button>
                    {/if}
                    {#if $cvStore.personalInfo.image}
                        <button
                            type="button"
                            on:click={clearImage}
                            class="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-all"
                        >
                            Supprimer
                        </button>
                    {/if}
                </div>
                <!-- Messages de validation -->
                {#if validationMessage}
                    <p class={`text-xs font-semibold ${imageError ? 'text-red-600' : 'text-emerald-600'}`}>
                        {validationMessage}
                    </p>
                {:else}
                    <p class="text-xs font-semibold text-neutral-500">
                        Format recommandé : carré (JPG, PNG).
                    </p>
                {/if}
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