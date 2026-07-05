export type Language = 'en' | 'np';

// All translatable UI keys — flat structure for simplicity
export type TranslationKey =
    // Nav
    | 'nav.about' | 'nav.skills' | 'nav.projects' | 'nav.certs'
    | 'nav.experience' | 'nav.location' | 'nav.contact' | 'nav.resume'
    // Hero
    | 'hero.greeting' | 'hero.available' | 'hero.tagline'
    | 'hero.viewProjects' | 'hero.yearsExp' | 'hero.projects'
    // About
    | 'about.title' | 'about.subtitle' | 'about.whoIs'
    | 'about.education' | 'about.experience' | 'about.philosophy'
    | 'about.p1' | 'about.p2' | 'about.p3' | 'about.p1Desc' | 'about.p2Desc' | 'about.p3Desc'
    // Skills
    | 'skills.title' | 'skills.subtitle'
    // Projects
    | 'projects.title' | 'projects.subtitle'
    | 'projects.liveDemo' | 'projects.viewGithub' | 'projects.viewMore'
    // Certifications
    | 'certs.title' | 'certs.subtitle'
    | 'certs.totalCerts' | 'certs.trainingHours' | 'certs.workshops' | 'certs.technologies'
    | 'certs.search' | 'certs.grid' | 'certs.timeline'
    | 'certs.view' | 'certs.download' | 'certs.verify' | 'certs.details'
    | 'certs.noResults' | 'certs.tryDifferent' | 'certs.clearFilters'
    | 'certs.found' | 'certs.matching' | 'certs.issueDate' | 'certs.credentialId'
    | 'certs.grade' | 'certs.duration' | 'certs.instructor' | 'certs.mode' | 'certs.hours'
    | 'certs.skillsGained' | 'certs.certNumber' | 'certs.expiry'
    | 'certs.filterAll'
    // Experience
    | 'exp.title' | 'exp.subtitle' | 'exp.workLabel' | 'exp.eduLabel'
    // Contact
    | 'contact.title' | 'contact.subtitle'
    | 'contact.infoTitle' | 'contact.infoDesc'
    | 'contact.labelName' | 'contact.labelEmail' | 'contact.labelSubject' | 'contact.labelMessage'
    | 'contact.placeholderName' | 'contact.placeholderEmail'
    | 'contact.placeholderSubject' | 'contact.placeholderMessage'
    | 'contact.send' | 'contact.sending' | 'contact.success' | 'contact.successMsg'
    | 'contact.socialConnect' | 'contact.fillRequired'
    | 'contact.emailLabel' | 'contact.phoneLabel' | 'contact.locationLabel'
    // Footer
    | 'footer.navigation' | 'footer.quickContact' | 'footer.madeWith' | 'footer.rights'
    | 'footer.tagline';

type TranslationMap = Record<TranslationKey, string>;

const en: TranslationMap = {
    // Nav
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.certs': 'Certs',
    'nav.experience': 'Experience',
    'nav.location': 'Location',
    'nav.contact': 'Contact',
    'nav.resume': 'Resume',

    // Hero
    'hero.greeting': "Hi, I'm",
    'hero.available': 'Available for New Projects',
    'hero.tagline': 'Specializing in building digital experiences that blend technical excellence with stunning design.',
    'hero.viewProjects': 'View Projects',
    'hero.yearsExp': 'Years Exp.',
    'hero.projects': 'Projects',

    // About
    'about.title': 'About Me',
    'about.subtitle': 'A passionate developer driven by curiosity and the desire to build impactful solutions.',
    'about.whoIs': 'Who is',
    'about.education': 'Education',
    'about.experience': 'Experience',
    'about.philosophy': 'Core Philosophy',
    'about.p1': 'User-Centric Design',
    'about.p2': 'Clean & Efficient Code',
    'about.p3': 'Continuous Learning',
    'about.p1Desc': "Prioritizing the user's needs and experience in every line of code.",
    'about.p2Desc': 'Writing maintainable, scalable, and high-performance applications.',
    'about.p3Desc': 'Staying at the forefront of evolving technologies and industry trends.',

    // Skills
    'skills.title': 'Skills & Expertise',
    'skills.subtitle': 'My technical toolkit for building modern web applications.',

    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A selection of my recent work across web development and design.',
    'projects.liveDemo': 'Live Demo',
    'projects.viewGithub': 'View GitHub',
    'projects.viewMore': 'View More Projects on GitHub',

    // Certifications
    'certs.title': 'Certifications & Achievements',
    'certs.subtitle': 'A collection of certifications, training programs, workshops, and achievements that demonstrate my continuous learning and professional development.',
    'certs.totalCerts': 'Certificates',
    'certs.trainingHours': 'Training Hours',
    'certs.workshops': 'Workshops',
    'certs.technologies': 'Technologies',
    'certs.search': 'Search certificates or skills...',
    'certs.grid': 'Grid',
    'certs.timeline': 'Timeline',
    'certs.view': 'View',
    'certs.download': 'Download',
    'certs.verify': 'Verify',
    'certs.details': 'Details',
    'certs.noResults': 'No certificates found',
    'certs.tryDifferent': 'Try a different search or filter',
    'certs.clearFilters': 'Clear Filters',
    'certs.found': 'Found',
    'certs.matching': 'certificates matching',
    'certs.issueDate': 'Issue Date',
    'certs.credentialId': 'Credential ID',
    'certs.certNumber': 'Cert Number',
    'certs.grade': 'Grade / Score',
    'certs.duration': 'Duration',
    'certs.instructor': 'Instructor',
    'certs.mode': 'Mode',
    'certs.hours': 'Training Hours',
    'certs.skillsGained': 'Skills Gained',
    'certs.expiry': 'Expiry Date',
    'certs.filterAll': 'All',

    // Experience
    'exp.title': 'Career Journey',
    'exp.subtitle': 'A timeline of my professional growth and educational background.',
    'exp.workLabel': 'Experience',
    'exp.eduLabel': 'Education',

    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': "Let's discuss your next project or just say hello!",
    'contact.infoTitle': 'Contact Information',
    'contact.infoDesc': "Feel free to reach out through any of these channels. I'm always open to discussing new opportunities.",
    'contact.labelName': 'Full Name *',
    'contact.labelEmail': 'Email Address *',
    'contact.labelSubject': 'Subject',
    'contact.labelMessage': 'Message *',
    'contact.placeholderName': 'your name',
    'contact.placeholderEmail': 'your gmail @example.com',
    'contact.placeholderSubject': 'Inquiry about a project',
    'contact.placeholderMessage': "Hi Hariom, I'd like to talk about...",
    'contact.send': 'Send Message',
    'contact.sending': 'Sending…',
    'contact.success': 'Message Sent! 🎉',
    'contact.successMsg': "Your message has been sent! I'll get back to you very soon.",
    'contact.socialConnect': 'Social Connect',
    'contact.fillRequired': 'Please fill in all required fields.',
    'contact.emailLabel': 'Email',
    'contact.phoneLabel': 'Phone',
    'contact.locationLabel': 'Location',

    // Footer
    'footer.navigation': 'Navigation',
    'footer.quickContact': 'Quick Contact',
    'footer.madeWith': 'Made with',
    'footer.rights': 'All rights reserved.',
    'footer.tagline': 'Crafting premium digital experiences through innovative code and modern architectural patterns.',
};

const np: TranslationMap = {
    // Nav
    'nav.about': 'मेरो बारेमा',
    'nav.skills': 'सीपहरू',
    'nav.projects': 'परियोजनाहरू',
    'nav.certs': 'प्रमाणपत्र',
    'nav.experience': 'अनुभव',
    'nav.location': 'स्थान',
    'nav.contact': 'सम्पर्क',
    'nav.resume': 'रिज्युमे',

    // Hero
    'hero.greeting': 'नमस्ते, म हुँ',
    'hero.available': 'नयाँ परियोजनाका लागि उपलब्ध',
    'hero.tagline': 'प्राविधिक उत्कृष्टता र आकर्षक डिजाइनको संयोजनमा डिजिटल अनुभव निर्माण गर्नमा विशेषज्ञता।',
    'hero.viewProjects': 'परियोजनाहरू हेर्नुहोस्',
    'hero.yearsExp': 'वर्षको अनुभव',
    'hero.projects': 'परियोजनाहरू',

    // About
    'about.title': 'मेरो बारेमा',
    'about.subtitle': 'जिज्ञासा र प्रभावशाली समाधान निर्माण गर्ने इच्छाद्वारा प्रेरित एक उत्साही डेभलपर।',
    'about.whoIs': 'को हुन्',
    'about.education': 'शिक्षा',
    'about.experience': 'अनुभव',
    'about.philosophy': 'मूल दर्शन',
    'about.p1': 'प्रयोगकर्ता-केन्द्रित डिजाइन',
    'about.p2': 'स्वच्छ र दक्ष कोड',
    'about.p3': 'निरन्तर सिकाइ',
    'about.p1Desc': 'हरेक कोडको लाइनमा प्रयोगकर्ताको आवश्यकता र अनुभवलाई प्राथमिकता दिने।',
    'about.p2Desc': 'मर्मतयोग्य, स्केलेबल र उच्च प्रदर्शन गर्ने एप्लिकेशनहरू लेख्ने।',
    'about.p3Desc': 'विकसित प्रविधिहरू र उद्योग प्रवृत्तिहरूको अग्रभागमा रहने।',

    // Skills
    'skills.title': 'सीप र विशेषज्ञता',
    'skills.subtitle': 'आधुनिक वेब एप्लिकेशन निर्माण गर्न मेरो प्राविधिक उपकरणहरू।',

    // Projects
    'projects.title': 'विशेष परियोजनाहरू',
    'projects.subtitle': 'वेब डेभलपमेन्ट र डिजाइनमा मेरो हालैको कामको छनोट।',
    'projects.liveDemo': 'लाइभ डेमो',
    'projects.viewGithub': 'GitHub हेर्नुहोस्',
    'projects.viewMore': 'GitHub मा थप परियोजनाहरू हेर्नुहोस्',

    // Certifications
    'certs.title': 'प्रमाणपत्र र उपलब्धिहरू',
    'certs.subtitle': 'मेरो निरन्तर सिकाइ र व्यावसायिक विकास प्रदर्शन गर्ने प्रमाणपत्रहरू, प्रशिक्षण कार्यक्रमहरू र कार्यशालाहरूको संग्रह।',
    'certs.totalCerts': 'प्रमाणपत्रहरू',
    'certs.trainingHours': 'प्रशिक्षण घण्टाहरू',
    'certs.workshops': 'कार्यशालाहरू',
    'certs.technologies': 'प्रविधिहरू',
    'certs.search': 'प्रमाणपत्र वा सीपहरू खोज्नुहोस्...',
    'certs.grid': 'ग्रिड',
    'certs.timeline': 'टाइमलाइन',
    'certs.view': 'हेर्नुहोस्',
    'certs.download': 'डाउनलोड',
    'certs.verify': 'प्रमाणित गर्नुहोस्',
    'certs.details': 'विवरण',
    'certs.noResults': 'कुनै प्रमाणपत्र फेला परेन',
    'certs.tryDifferent': 'फरक खोज वा फिल्टर प्रयास गर्नुहोस्',
    'certs.clearFilters': 'फिल्टर हटाउनुहोस्',
    'certs.found': 'फेला पर्यो',
    'certs.matching': 'प्रमाणपत्र मिल्दो',
    'certs.issueDate': 'जारी मिति',
    'certs.credentialId': 'प्रमाणपत्र ID',
    'certs.certNumber': 'प्रमाणपत्र नम्बर',
    'certs.grade': 'ग्रेड / अंक',
    'certs.duration': 'अवधि',
    'certs.instructor': 'प्रशिक्षक',
    'certs.mode': 'मोड',
    'certs.hours': 'प्रशिक्षण घण्टाहरू',
    'certs.skillsGained': 'प्राप्त सीपहरू',
    'certs.expiry': 'समाप्ति मिति',
    'certs.filterAll': 'सबै',

    // Experience
    'exp.title': 'करियर यात्रा',
    'exp.subtitle': 'मेरो व्यावसायिक विकास र शैक्षिक पृष्ठभूमिको समयरेखा।',
    'exp.workLabel': 'अनुभव',
    'exp.eduLabel': 'शिक्षा',

    // Contact
    'contact.title': 'सम्पर्क गर्नुहोस्',
    'contact.subtitle': 'आफ्नो अर्को परियोजनाको बारेमा छलफल गरौं वा केवल नमस्ते भन्नुहोस्!',
    'contact.infoTitle': 'सम्पर्क जानकारी',
    'contact.infoDesc': 'यी मध्ये कुनै पनि च्यानलबाट सम्पर्क गर्न नहिचकिचाउनुहोस्। म सधैं नयाँ अवसरहरूको बारेमा छलफल गर्न खुला छु।',
    'contact.labelName': 'पूरा नाम *',
    'contact.labelEmail': 'इमेल ठेगाना *',
    'contact.labelSubject': 'विषय',
    'contact.labelMessage': 'सन्देश *',
    'contact.placeholderName': 'राम बहादुर',
    'contact.placeholderEmail': 'ram@example.com',
    'contact.placeholderSubject': 'परियोजनाको बारेमा सोधपुछ',
    'contact.placeholderMessage': 'नमस्ते हरिओम, म... को बारेमा कुरा गर्न चाहन्छु',
    'contact.send': 'सन्देश पठाउनुहोस्',
    'contact.sending': 'पठाउँदै…',
    'contact.success': 'सन्देश पठाइयो! 🎉',
    'contact.successMsg': 'तपाईंको सन्देश पठाइएको छ! म चाँडै जवाफ दिनेछु।',
    'contact.socialConnect': 'सोशल कनेक्ट',
    'contact.fillRequired': 'कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्।',
    'contact.emailLabel': 'इमेल',
    'contact.phoneLabel': 'फोन',
    'contact.locationLabel': 'स्थान',

    // Footer
    'footer.navigation': 'नेभिगेशन',
    'footer.quickContact': 'द्रुत सम्पर्क',
    'footer.madeWith': 'बनाइएको',
    'footer.rights': 'सर्वाधिकार सुरक्षित।',
    'footer.tagline': 'नवीन कोड र आधुनिक वास्तुकला ढाँचाहरू मार्फत प्रीमियम डिजिटल अनुभवहरू निर्माण गर्दै।',
};

export const translations: Record<Language, TranslationMap> = { en, np };
