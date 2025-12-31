'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Stats() {
  const [stats, setStats] = useState({
    projectsCompleted: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0
  });
  const [displayStats, setDisplayStats] = useState({
    projectsCompleted: 0,
    clients: 0,
    experience: 0,
    satisfaction: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  // Récupérer les stats depuis l'API
  useEffect(() => {
    fetchStats();
  }, []);

  // Observer pour déclencher l'animation au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateStats();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, stats]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };

  const animateStats = () => {
    const duration = 3000; // 2 secondes
    const steps = 60;
    const interval = duration / steps;

    // Générer des valeurs aléatoires pour les autres statistiques
    const randomClients = Math.floor(Math.random() * 100) + 50; // Entre 50 et 150
    const randomExperience = Math.floor(Math.random() * 5) + 3; // Entre 5 et 25
    const randomSatisfaction = Math.floor(Math.random() * 20) + 80; // Entre 80 et 100

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setDisplayStats({
        projectsCompleted: Math.floor(150 * progress), // Scroll de 0 à 150
        clients: Math.floor(randomClients * progress), // Animation vers valeur aléatoire
        experience: Math.floor(randomExperience * progress), // Animation vers valeur aléatoire
        satisfaction: Math.floor(randomSatisfaction * progress) // Animation vers valeur aléatoire
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setDisplayStats({
          projectsCompleted: 150,
          clients: randomClients,
          experience: randomExperience,
          satisfaction: randomSatisfaction
        });
      }
    }, interval);
  };

  const statsData = [
    { value: displayStats.projectsCompleted, label: 'Projets réalisés', suffix: '+' },
    { value: displayStats.clients, label: 'Clients satisfaits', suffix: '+' },
    { value: displayStats.experience, label: 'Années d\'expérience', suffix: '' },
    { value: displayStats.satisfaction, label: 'Satisfaction', suffix: '%' }
  ];

  return (
    <section 
      ref={sectionRef} 
      id="apropos" 
      className="py-20 bg-gradient-to-r from-amber-700 to-orange-600"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nos Réalisations
          </h2>
          <p className="text-xl text-amber-100">
            Découvrez quelques-unes de nos créations et témoignages de notre savoir-faire
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-center hover:bg-white/20 transition-all"
            >
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-amber-100 text-lg">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}