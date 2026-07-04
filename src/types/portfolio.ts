
export interface Project {
    title: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl: string;
}

export interface Testimonial {
    quote: string;
    author: string;
    role: string;
    avatarUrl?: string;
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string[];
    type: 'Work' | 'Internship' | 'Workshop' | 'Training';
}

export interface Education {
    institution: string;
    degree: string;
    period: string;
    semester: string;
    details: string;
}

export interface SkillGroup {
    category: string;
    skills: string[];
}

export interface CoreSkill {
    name: string;
    level: number;
    icon?: string;
}

export interface ProfileData {
    name: string;
    role: string;
    careerFocus: string;
    aboutMe: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
    cvUrl: string;
    profileImage?: string;
    coreSkills: CoreSkill[];
    skills: SkillGroup[];
    projects: Project[];
    testimonials: Testimonial[];
    experience: Experience[];
    education: Education[];
    certifications: string[];
}
