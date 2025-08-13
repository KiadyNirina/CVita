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
    
    <div class="space-y-4">
        <div>
            <label for="cvTitle" class="block">Titre du CV*</label>
            <input
                id="cvTitle"
                type="text"
                bind:value={$cvStore.personalInfo.cvTitle}
                placeholder="Ex: Développeur Full Stack"
                class="border rounded px-3 py-2 mt-1 w-full"
            />
        </div>

        <div>
            <label for="name" class="block">Nom Complet*</label>
            <input
                id="name"
                type="text"
                bind:value={$cvStore.personalInfo.name}
                placeholder="Prénom Nom"
                class="border rounded px-3 py-2 mt-1 w-full"
            />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="email" class="block">Email*</label>
                <input
                    id="email"
                    type="email"
                    bind:value={$cvStore.personalInfo.email}
                    placeholder="email@exemple.com"
                    class="border rounded px-3 py-2 mt-1 w-full"
                />
            </div>
            <div>
                <label for="phone" class="block">Téléphone</label>
                <input
                    id="phone"
                    type="tel"
                    bind:value={$cvStore.personalInfo.phone}
                    placeholder="+33 6 12 34 56 78"
                    class="border rounded px-3 py-2 mt-1 w-full"
                />
            </div>
        </div>
        
        <div>
            <label for="address" class="block">Adresse</label>
            <input
                id="address"
                type="text"
                bind:value={$cvStore.personalInfo.address}
                placeholder="Ville, Pays"
                class="border rounded px-3 py-2 mt-1 w-full"
            />
        </div>
        
        <div>
            <label for="image" class="block">Photo de profil</label>
            <input
                id="image"
                type="file"
                accept="image/*"
                on:change={handleImageChange}
                class="border rounded px-3 py-2 mt-1 w-full"
            />
            {#if imagePreview}
                <img src={imagePreview} alt="Profile preview" class="mt-2 w-32 h-32 object-cover rounded"/>
            {/if}
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label for="linkedin" class="block">LinkedIn</label>
                <input
                    id="linkedin"
                    type="url"
                    bind:value={$cvStore.personalInfo.linkedin}
                    placeholder="https://linkedin.com/in/votreprofil"
                    class="border rounded px-3 py-2 mt-1 w-full"
                />
            </div>
            <div>
                <label for="github" class="block">GitHub</label>
                <input
                    id="github"
                    type="url"
                    bind:value={$cvStore.personalInfo.github}
                    placeholder="https://github.com/votreprofil"
                    class="border rounded px-3 py-2 mt-1 w-full"
                />
            </div>
        </div>
    </div>
</div>