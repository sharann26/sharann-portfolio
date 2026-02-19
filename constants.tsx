import { Coffee, FolderGit2, SmilePlus, UserStar } from "lucide-react";
import {
  Certification,
  Experience,
  Project,
  SkillCategory,
  Stat,
} from "./types";

// Define your career start date (Year, Month Index (0-11), Day)
const START_DATE = new Date(2018, 4, 17); // May 17, 2018

const calculateExperience = (startDateStr): string => {
  const start = new Date(startDateStr);
  const today = new Date();

  let years = today.getFullYear() - start.getFullYear();
  let months = today.getMonth() - start.getMonth();
  let days = today.getDate() - start.getDate();

  // If the current day is before the start day, the current month isn't "full" yet
  if (days < 0) {
    months--;
  }

  // If months are negative, it means the current month is before the start month
  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years}${days === 0 && months === 0 ? "" : "+"}`;
};

// Replace with actual contact info or keep as placeholders
export const CONTACT_INFO = {
  phone: "+918248947601",
  whatsapp: "+918248947601",
  email: "sharann172@gmail.com",
  linkedin: "https://linkedin.com/in/sharann-n",
}; 

export const EXPERIENCES: Experience[] = [
  {
    id: "1",
    title: "Technology Lead",
    company: "Infosys Limited",
    date: "Dec 2023 - Present",
    iconBg: "#383E56",
    icon: "images/infosys.jpeg",
    points: [
      "Leading technical initiatives for major capital group projects.",
      "Developing high-performance dashboards for stock analysis.",
      "Ensuring scalability and lag-free user interactions.",
      "Collaborating with stakeholders to translate business needs into technical reality.",
    ],
  },
  {
    id: "2",
    title: "Senior Data Analyst",
    company: "Chainsys India Private Limited",
    date: "May 2021 - July 2023",
    iconBg: "#E6DEDD",
    icon: "images/chainsys.jpeg",
    points: [
      "Analyzed large datasets to drive strategic decision making.",
      "Built 'SmartApp Builder' to automate layout generation through drag-and-drop.",
      "Integrated complex database systems with user-facing interfaces.",
      "Optimized data retrieval workflows for enterprise clients.",
    ],
  },
  {
    id: "3",
    title: "Software Engineer",
    company: "GoDB Tech Private Limited",
    date: "May 2018 - May 2021",
    iconBg: "#383E56",
    icon: "images/godb.png",
    points: [
      "Developed 'Hatsun Service Ticket' system in 6 Indian languages.",
      "Implemented advanced image-loading techniques for mobile web portals.",
      "Managed full-stack development cycles from database to UI.",
      "Published and maintained critical applications on the Play Store.",
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      {
        name: "JavaScript",
        icon: "https://cdn.simpleicons.org/javascript/F7DF1E",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.simpleicons.org/typescript/3178C6",
      },
      { name: "Html", icon: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS", icon: "https://cdn.simpleicons.org/css/663399" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "Angular", icon: "https://cdn.simpleicons.org/angular/DD0031" },
      { name: "Ionic", icon: "https://cdn.simpleicons.org/ionic/3880FF" },
      { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      {
        name: "Bootstrap",
        icon: "https://cdn.simpleicons.org/bootstrap/7952B3",
      },
      {
        name: "Tailwind",
        icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
      {
        name: "Postgres",
        icon: "https://cdn.simpleicons.org/postgresql/4169E1",
      },
      {
        name: "CouchDB",
        icon: "https://cdn.simpleicons.org/apachecouchdb/E31937",
      },
    ],
  },
  {
    title: "Tools",
    skills: [
      {
        name: "VS Code",
        icon: "https://static.cdnlogo.com/logos/v/82/visual-studio-code.svg",
      },
      { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
      { name: "Jira", icon: "https://cdn.simpleicons.org/jira/0052CC" },
      {
        name: "Power BI",
        icon: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
      },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Microsoft Power BI",
    issuer: "Skill Nation",
    date: "2025",
    description:
      "Expertise in analyzing large datasets and creating interactive reports, high-impact dashboards.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Front-End Developer - React",
    issuer: "Meta",
    date: "2026",
    description:
      "Deep dive into hooks, patterns, and high-performance frontend architecture.",
    color: "from-blue-400 to-cyan-500",
  },
];

export const STATS: Stat[] = [
  {
    label: "Years Experience",
    value: calculateExperience(START_DATE),
    icon: UserStar,
    color: "text-blue-500",
  },
  {
    label: "Projects Completed",
    value: "12+",
    icon: FolderGit2,
    color: "text-violet-500",
  },
  {
    label: "Happy Clients",
    value: "5+",
    icon: SmilePlus,
    color: "text-fuchsia-500",
  },
  {
    label: "Coffee Consumed",
    value: "\u221E",
    icon: Coffee,
    color: "text-emerald-500",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Immersive 3D Portfolio",
    description:
      "A high-performance personal portfolio built with React Three Fiber, featuring interactive 3D avatars, glassmorphism UI, and smooth Framer Motion animations.",
    tags: [
      { name: "React", color: "text-blue-500" },
      { name: "Three.js", color: "text-white dark:text-slate-200" },
      { name: "Tailwind", color: "text-cyan-400" },
    ],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    source_code_link: "https://github.com",
    live_link: "https://google.com",
  },
  {
    title: "Navigator - United Airlines",
    description:
      "This application provides a sophisticated internal tool designed for United call center agents to streamline the management of complex passenger bookings and service requests. By aggregating data into a contextualized dashboard, it replaces legacy systems, reducing call times and empowering agents to resolve travel disruptions more quickly and precisely.",
    tags: [
      { name: "React", color: "text-blue-500" },
      { name: "Three.js", color: "text-white dark:text-slate-200" },
      { name: "Tailwind", color: "text-cyan-400" },
    ],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    source_code_link: "https://github.com",
    live_link: "https://google.com",
  },
  {
    title: "TOPS - Capital Groups",
    description:
      "This application provides a comprehensive report of share stocks for all companies. It enables users to access real-time and historical stock data, track market trends, and analyze company performances efficiently. The platform presents stock details in an intuitive format. Designed for ease of use, this application is ideal for traders, analysts, and financial enthusiasts seeking a clear overview of the stock market.",
    tags: [
      { name: "React", color: "text-blue-500" },
      { name: "Three.js", color: "text-white dark:text-slate-200" },
      { name: "Tailwind", color: "text-cyan-400" },
    ],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    source_code_link: "https://github.com",
    live_link: "https://google.com",
  },
  {
    title: "SmartApp Builder",
    description:
      "This product is for creating dynamic applications and pages through click-and-drag actions. Initially, we create one object with required fields, and by using the object, we create the layouts for entry, view, and list pages. The final outcome for the application is suitable for both web and mobile.",
    tags: [
      { name: "TypeScript", color: "text-blue-600" },
      { name: "React DnD", color: "text-violet-500" },
      { name: "Redux", color: "text-purple-500" },
    ],
    image:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop",
    source_code_link: "https://github.com",
    live_link: "https://google.com",
  },
  {
    title: "Hatsun Service Ticket",
    description:
      "This application creates tickets with complaints by customers and that complaint is resolved by the respective MSP (maintenance service provider) admin about farmers in 6 Indian languages. The ticketing application has a well-designed UI and advanced image-loading techniques. Both two mobile applications have their own web portals to upload data and view report pages. This application is available in the playstore.",
    tags: [
      { name: "React", color: "text-blue-500" },
      { name: "Three.js", color: "text-white dark:text-slate-200" },
      { name: "Tailwind", color: "text-cyan-400" },
    ],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    source_code_link: "https://github.com",
    live_link: "https://google.com",
  },
  {
    title: "Alliance insurance",
    description:
      "In this project, I contributed to the development of a Vehicle Loan Policy Details entry page. I worked closely with the team to design an intuitive and user-friendly interface. My key role involved capturing user input accurately and securely. I implemented encryption mechanisms to protect sensitive data during transmission. The encrypted data was then sent to the server for further processing and validation.",
    tags: [
      { name: "React", color: "text-blue-500" },
      { name: "Three.js", color: "text-white dark:text-slate-200" },
      { name: "Tailwind", color: "text-cyan-400" },
    ],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    source_code_link: "https://github.com",
    live_link: "https://google.com",
  },
  {
    title: "Tata AIG general",
    description:
      "In this application, I collaborated with the team to design and implement the Home Loan Policy Details entry page. My primary responsibility was to ensure secure data handling by encrypting user inputs before transmission. Together, we integrated the frontend with the backend services to enable seamless and secure data submission to the server.",
    tags: [
      { name: "React", color: "text-blue-500" },
      { name: "Three.js", color: "text-white dark:text-slate-200" },
      { name: "Tailwind", color: "text-cyan-400" },
    ],
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    source_code_link: "https://github.com",
    live_link: "https://google.com",
  },
];
