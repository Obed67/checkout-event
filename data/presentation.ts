/**
 * Contenu de la présentation — modifie ce fichier pour mettre à jour
 * dates, rôles, activités, stats et souvenirs.
 * Ne laisse que ce qui est vrai / vérifié.
 */

export type TimelineEvent = {
  date: string;
  title: string;
  detail?: string;
};

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
  note?: string;
};

export type Activity = {
  date: string;
  title: string;
  description?: string;
};

export type Stat = {
  label: string;
  value: number | null;
  suffix?: string;
};

export const presentation = {
  meta: {
    title: "Mon expérience à TCC",
    subtitle:
      "+10 mois en tant que Lead TCC UAC. Retour sur cette période.",
    logo: "/logo.png",
  },

  aboutTcc: {
    title: "Pour commencer : TCC, c'est quoi ?",
    name: "Tech Campus Clubs",
    points: [
      "Un club tech sur le campus de l'UAC.",
      "On y apprend et on s'entraide.",
      "On organise des activités et on construit des projets.",
    ],
  },

  beginning: {
    title: "Et moi, comment je suis arrivé là ?",
    intro: "Voici comment ça s'est passé, étape par étape.",
    // Remplis les dates exactes quand tu les as.
    timeline: [
      {
        date: "",
        title: "Découverte de TCC",
        detail: "",
      },
      {
        date: "",
        title: "Candidature",
        detail: "",
      },
      {
        date: "",
        title: "Sélection",
        detail: "",
      },
      {
        date: "",
        title: "Prise du rôle de Lead",
        detail: "",
      },
      {
        date: "",
        title: "Début du mandat",
        detail: "",
      },
    ] satisfies TimelineEvent[],
  },

  lead: {
    title: "Quand j'ai pris le lead",
    points: [
      "Il fallait avoir une vision.",
      "Il fallait prendre des décisions.",
      "Et surtout, il fallait réussir à faire avancer une équipe.",
    ],
  },

  coreTeamFormation: {
    title: "Ma première étape : former la Core Team",
    intro:
      "Je ne voulais pas construire cette équipe seul. Voici comment on a procédé.",
    steps: ["Candidatures", "Entretiens", "Sélection", "Formation de l'équipe"],
    // Mets les vrais chiffres s'ils sont connus, sinon laisse null.
    counts: {
      candidatures: null as number | null,
      entretiens: null as number | null,
      selectionnes: null as number | null,
    },
  },

  coreTeam: {
    title: "Voici la Core Team",
    intro: "Voici l'équipe de ces 10 mois.",
    members: [
      {
        name: "Obed",
        role: "Lead",
        photo: "/team/Lead.png",
        note: undefined,
      },
      {
        name: "Grâce",
        role: "Designer graphique",
        photo: "/team/Grâce.webp",
        note: undefined,
      },
      {
        name: "Amour",
        role: "Responsable communication et partenariats",
        photo: "/team/Amour.jpeg",
        note: undefined,
      },
      {
        name: "Davy",
        role: "Community Manager",
        photo: "/team/Davy.jpeg",
        note: undefined,
      },
      {
        name: "Ghost",
        role: "Organisateur",
        photo: "/team/Ghost.jpeg",
        note: undefined,
      },
    ] satisfies TeamMember[],
  },

  // Synthèse des thématiques — les événements restent dans `items` (archive).
  activities: {
    title: "Concrètement, qu'est-ce qu'on a fait ?",
    intro: "Pas la liste des sessions : les grandes familles de sujets.",
    groups: [
      {
        label: "Technique",
        themes: [
          "Python",
          "React & Three.js",
          "Architecture",
          "No-code / Low-code",
          "Automatisation",
          "Cybersécurité",
          "Blockchain & Web3",
          "GitHub Student Pack",
        ],
      },
      {
        label: "IA & création",
        themes: [
          "Vibe coding",
          "Prompt engineering",
          "IA & UI/UX",
          "Design Figma",
        ],
      },
      {
        label: "Carrière",
        themes: [
          "Personal branding",
          "LinkedIn",
          "Monétisation tech",
          "Discipline & focus",
          "Planification",
        ],
      },
      {
        label: "Communauté",
        themes: ["Tech Talks", "Réseau & non-profit"],
      },
    ],
    items: [
      {
        date: "Fév. 2025",
        title: "Session d'information sur la Tech community club de l'UAC",
      },
      {
        date: "Mars 2025",
        title: "Tech Talk: Pourquoi et comment se lancer dans la tech ?",
      },
      {
        date: "Avr. 2025",
        title: "Formation en développement web no-code/low-code",
      },
      {
        date: "Avr. 2025",
        title: "Formation sur le prompt engineering",
      },
      {
        date: "Mai 2025",
        title: "Apprendre à apprendre et à coder",
      },
      {
        date: "Mai 2025",
        title: "Introduction à la cybersécurité",
      },
      {
        date: "Juil. 2025",
        title: "Checkout de fin de mandat",
      },
      {
        date: "Juil. 2025",
        title: "Cohort 1 Graduation Day",
      },
      {
        date: "Oct. 2025",
        title: "Session d'information sur la TCC UAC",
      },
      {
        date: "Nov. 2025",
        title: "Vibe Coding : Anticiper le futur du développement",
      },
      {
        date: "Nov. 2025",
        title: "Créer ta première scène interactive 3D avec ReactJS et ThreeJS",
      },
      {
        date: "Nov. 2025",
        title: "Construis ton premier projet fonctionnel grâce à l'IA",
      },
      {
        date: "Nov. 2025",
        title: "Le Hacking Éthique",
      },
      {
        date: "Nov. 2025",
        title: "Introduction aux bases du Design avec Figma",
      },
      {
        date: "Nov. 2025",
        title: "Panel: L'art du Prompt Engineering",
      },
      {
        date: "Nov. 2025",
        title: "Tech Talk #1 : d'apprenant à pratiquant",
      },
      {
        date: "Déc. 2025",
        title: "Automatisation des workflows avec n8n",
      },
      {
        date: "Déc. 2025",
        title: "Vibe Coding : Développer sa solution numérique grâce à l'IA",
      },
      {
        date: "Déc. 2025",
        title: "Découverte du GitHub Student Pack",
      },
      {
        date: "Déc. 2025",
        title: "Personal Branding Tech sur LinkedIn",
      },
      {
        date: "Déc. 2025",
        title: "Bilan 2025 et plan 2026",
      },
      {
        date: "Janv. 2026",
        title: "Les outils pour planifier et gérer son année",
      },
      {
        date: "Janv. 2026",
        title: "Comment gagner de l'argent avec ses compétences Tech",
      },
      {
        date: "Mars 2026",
        title: "Discipline, Focus et Constance",
      },
      {
        date: "Avr. 2026",
        title: "Construire un réseau puissant grâce au non-profit",
      },
      {
        date: "Avr. 2026",
        title: "L'IA au service du UI/UX Design",
      },
      {
        date: "Mai 2026",
        title: "Débuter en Python : de zéro à Hello World",
      },
      {
        date: "Mai 2026",
        title: "Web3Bridge Cohort XV",
      },
      {
        date: "Mai 2026",
        title: "Architecture et Scalabilité : choisir sa stack technique",
      },
      {
        date: "Mai 2026",
        title: "Créer ne suffit plus, il faut construire une marque",
      },
      {
        date: "Juin 2026",
        title: "Blockchain 101 : comprendre la révolution Web3",
      },
    ] as Activity[],
  },

  // Ajoute uniquement des chiffres réels.
  stats: {
    title: "Quelques chiffres",
    items: [
      { label: "Sessions organisées", value: 23 },
      { label: "Participants", value: 847 },
      { label: "Membres dans la communauté", value: 416 },
      { label: "Mois de travail", value: 10 },
      { label: "Speakers", value: 27 },
    ] as Stat[],
  },

  teamStories: {
    title: "Je ne l'ai pas fait seul.",
    subtitle: "",
  },

  lessons: {
    title: "Et personnellement, qu'est-ce que j'en retiens ?",
    words: [
      "Leadership",
      "Responsabilité",
      "Équipe",
      "Organisation",
      "Confiance",
      "Persévérance",
    ],
  },

  closing: {
    title: "Merci.",
    subtitle: "Merci à toutes les personnes qui ont contribué à cette aventure.",
  },
} as const;

export type PresentationData = typeof presentation;
