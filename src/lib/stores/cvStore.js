import { writable } from 'svelte/store';

const initialCV = {
    personalInfo: {
        cvTitle: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        image: '',
        socials: []  
    },
    professionalSummary: '',
    workExperience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: [],
    projects: [],
    hobbies: [],
    selectedTemplate: 'classic'
};

export const cvStore = writable(initialCV);

/**
 * Réinitialise complètement le CV
 */
export const resetCV = () => {
    cvStore.set({
        ...initialCV,

        personalInfo: {
            ...initialCV.personalInfo,
            socials: []
        },

        workExperience: [],
        education: [],
        skills: [],
        languages: [],
        certifications: [],
        projects: [],
        hobbies: []
    });
};

export const addWorkExperience = () => {
    cvStore.update(current => {
        return {
            ...current,
            workExperience: [
                ...current.workExperience,
                {
                    id: Date.now(),
                    jobTitle: '',
                    employer: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    current: false
                }
            ]
        };
    });
};