import { writable } from 'svelte/store';

export const cvStore = writable({
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
});

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