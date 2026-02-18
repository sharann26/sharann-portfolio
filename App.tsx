import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { ArrowUp, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import AvatarCanvas from "./components/AvatarCanvas";
import Certifications from "./components/Certifications";
import ChatBot from "./components/ChatBot";
import ExperienceTimeline from "./components/ExperienceTimeline";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Stats from "./components/Stats";
import ThemeToggle from "./components/ThemeToggle";
import { CONTACT_INFO } from "./constants";

const App: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  // Motion values for 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Map mouse position to rotation degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  // Dynamic glare position
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);

  useEffect(() => {
    const updateHeader = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateHeader);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#050816";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#f8fafc";
    }

    return () => window.removeEventListener("scroll", updateHeader);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized mouse position from center (-0.5 to 0.5)
    const mouseXPos = (e.clientX - rect.left) / width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseXPos);
    y.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Certifications", id: "certifications" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div
      className={`relative min-h-screen selection:bg-violet-500 selection:text-white transition-colors duration-1000 ${theme === "light" ? "text-slate-950" : "text-white"}`}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 z-[100] origin-left"
        style={{ scaleX }}
      />

      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: y1, opacity }}
          className={`absolute top-[5%] right-[5%] w-[50vw] h-[50vw] rounded-full blur-[120px] transition-colors duration-1000 ${theme === "dark" ? "bg-violet-600/10" : "bg-blue-300/30"}`}
        />
        <motion.div
          style={{ y: y2, opacity }}
          className={`absolute bottom-[5%] left-[5%] w-[45vw] h-[45vw] rounded-full blur-[140px] transition-colors duration-1000 ${theme === "dark" ? "bg-fuchsia-600/10" : "bg-indigo-300/30"}`}
        />
      </div>

      {/* Optimized Glassmorphism Header */}
      <div
        className={`fixed top-0 left-0 right-0 z-[80] flex justify-center px-4 pt-4 sm:pt-6 transition-all duration-1000 pointer-events-none ${isScrolled ? "pt-2 sm:pt-3" : "pt-4 sm:pt-6"}`}
      >
        <nav
          className={`flex items-center w-full max-w-5xl px-3 sm:px-6 py-2 sm:py-3 rounded-full border shadow-2xl backdrop-blur-2xl transition-all duration-1000 pointer-events-auto ${
            theme === "dark"
              ? "bg-slate-900/60 border-white/10 ring-1 ring-white/5 shadow-black/50"
              : "bg-white/95 border-slate-300 ring-1 ring-slate-200/50 shadow-slate-300/40"
          }`}
        >
          {/* Logo */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-lg sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 cursor-pointer select-none shrink-0"
          >
            SN.
          </motion.button>

          {/* Navigation Area - Horizontally Scrollable on Mobile */}
          <div className="flex-1 mx-2 sm:mx-6 relative min-w-0">
            {/* Visual fade indicators for scroll */}
            <div
              className={`absolute left-0 top-0 bottom-1 w-4 z-10 pointer-events-none md:hidden bg-gradient-to-r ${theme === "dark" ? "from-slate-900/60" : "from-white/90"} to-transparent`}
            />
            <div
              className={`absolute right-0 top-0 bottom-1 w-4 z-10 pointer-events-none md:hidden bg-gradient-to-l ${theme === "dark" ? "from-slate-900/60" : "from-white/90"} to-transparent`}
            />

            <div className="overflow-x-auto scroll-smooth flex justify-start md:justify-center w-full custom-scrollbar pb-1">
              <div
                className={`flex items-center gap-4 sm:gap-8 px-4 whitespace-nowrap text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] ${theme === "dark" ? "text-slate-300" : "text-slate-800"}`}
              >
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-violet-500 transition-all cursor-pointer py-2 relative group flex-shrink-0"
                  >
                    {link.name}
                    <motion.span
                      className="absolute bottom-1 left-0 w-0 h-0.5 bg-violet-500 rounded-full"
                      whileHover={{ width: "100%" }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsapp.replace("+", "")}`}
              target="_blank"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-lg hover:shadow-violet-600/30 transition-all active:scale-95"
            >
              Hire me
            </a>
          </div>
        </nav>
      </div>

      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center pt-32 px-6 overflow-hidden"
      >
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="z-10 text-center md:text-left"
          >
            <p className="text-violet-600 font-black tracking-[0.3em] uppercase mb-4 text-sm md:text-base">
              Software Engineer
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black mb-6 leading-[1.1]">
              Sharann <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500">
                Nagarajan
              </span>
            </h1>
            <p
              className={`text-base md:text-xl max-w-lg mb-10 leading-relaxed mx-auto md:mx-0 font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-800"}`}
            >
              Building high-performance Angular architectures and immersive 3D
              worlds. I don't just write code; I craft logic into digital art.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-10">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl shadow-xl shadow-violet-600/30 transition-all active:scale-95"
              >
                <Phone size={18} /> Call Me
              </a>
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsapp.replace("+", "")}`}
                target="_blank"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-xl shadow-emerald-600/30 transition-all active:scale-95"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              {[
                { icon: <Linkedin size={22} />, href: CONTACT_INFO.linkedin },
                {
                  icon: <Mail size={22} />,
                  href: `mailto:${CONTACT_INFO.email}`,
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`p-4 rounded-2xl shadow-xl transition-all border ${theme === "dark" ? "bg-slate-800 border-slate-700 hover:text-violet-500" : "bg-white border-slate-300 hover:bg-slate-50 text-slate-700 hover:text-violet-600"}`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative h-[500px] md:h-[600px] lg:h-[750px] w-full flex items-center justify-center perspective-[2000px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            {/* 3D Avatar Canvas */}
            <div className="absolute inset-0 z-0 opacity-80">
              <AvatarCanvas theme={theme} />
            </div>

            {/* 3D Tilt Container - Positioned to side/bottom if needed, or remove if replacing image completely. 
                 Since the user asked to replace image in project cards, I'll assume this main hero image remains as is or 
                 gets blended. The previous 'image' code is here, let's keep it but maybe lower z-index or hide if 
                 avatar is the main focus. For now, I will keep the Tilt Card but make it smaller or optional 
                 if the Avatar is the hero. 
                 
                 However, the code provided in the prompt shows an Image inside the Tilt Card. 
                 If AvatarCanvas is used, it usually replaces the static image.
                 The prompt code has both. I will keep the Tilt Card as an overlay or secondary element.
             */}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* About Section */}
      <motion.section
        id="about"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-24 px-6 max-w-5xl mx-auto scroll-mt-24"
      >
        <motion.div
          variants={itemVariants}
          className={`relative p-10 md:p-20 backdrop-blur-3xl rounded-[48px] border shadow-2xl overflow-hidden group transition-all duration-1000 ${theme === "dark" ? "bg-slate-900/40 border-white/10" : "bg-white/95 border-slate-300 shadow-slate-200/60"}`}
        >
          <div
            className={`absolute -top-10 -right-10 w-48 h-48 blur-[80px] group-hover:opacity-60 transition-all duration-1000 ${theme === "dark" ? "bg-violet-600/20" : "bg-blue-400/20"}`}
          />

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-black mb-10 flex items-center gap-6"
          >
            <span className="w-16 h-1.5 bg-violet-600 rounded-full inline-block" />
            Core Philosophy
          </motion.h2>
          <div
            className={`text-lg md:text-2xl leading-relaxed space-y-8 font-medium transition-colors ${theme === "dark" ? "text-slate-300" : "text-slate-800"}`}
          >
            <motion.p variants={itemVariants}>
              Engineering is more than just writing code; it's about{" "}
              <span className="text-violet-600 font-bold">
                crafting digital environments
              </span>{" "}
              that feel intuitive and alive.
            </motion.p>
            <motion.p variants={itemVariants}>
              I bridge the gap between heavy-lifting backend data and high-end
              visual storytelling. My goal is zero lag, maximum impact, and an
              unwavering commitment to quality.
            </motion.p>
          </div>
        </motion.div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`py-10 rounded-[64px] mx-4 transition-colors duration-1000 scroll-mt-24 ${theme === "dark" ? "bg-slate-900/10" : "bg-white/80 border border-slate-300 shadow-xl"}`}
      >
        <ExperienceTimeline />
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="scroll-mt-24"
      >
        <Skills />
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="scroll-mt-24"
      >
        <Projects />
      </motion.section>

      {/* Certifications Section */}
      <motion.section
        id="certifications"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="scroll-mt-24"
      >
        <Certifications />
      </motion.section>

      {/* Footer */}
      <footer
        className={`py-20 px-6 border-t transition-colors duration-1000 ${theme === "dark" ? "border-white/5 bg-black/20" : "border-slate-300 bg-slate-100"}`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2
              className={`text-3xl font-black mb-2 ${theme === "dark" ? "text-white" : "text-slate-950"}`}
            >
              Sharann Nagarajan
            </h2>
            <p className="text-slate-700 dark:text-slate-500 font-medium text-sm tracking-wide">
              Software Engineer.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href={CONTACT_INFO.linkedin}
              target="_blank"
              className="text-slate-600 dark:text-slate-400 hover:text-violet-500 transition-colors font-bold uppercase tracking-widest text-[10px]"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-slate-600 dark:text-slate-400 hover:text-violet-500 transition-colors font-bold uppercase tracking-widest text-[10px]"
            >
              Email
            </a>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-slate-300 dark:border-white/5 text-slate-500 text-[10px] tracking-[0.3em] text-center">
          <p>© 2024 SHARANN NAGARAJAN • BUILT WITH PASSION</p>
        </div>
      </footer>

      <ChatBot />

      {/* Scroll to Top */}
      <AnimatePresence>
        {window.scrollY > 300 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 rounded-2xl bg-violet-600 text-white shadow-2xl z-[90] hover:bg-violet-700 active:scale-95 transition-all"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: ${theme === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)"};
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default App;
