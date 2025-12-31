'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Projects() {
  const projects = [
    {
      image: '/images/aplication.png',
      title: 'Application Mobile',
      description: 'Développement d\'une application mobile innovante pour améliorer l\'expérience utilisateur.',
      category: 'Développement Mobile',
      tags: ['React Native', 'Mobile', 'UI/UX']
    },
    {
      image: '/images/dataanalysagri.png',
      title: 'Analyse de Données Agricole',
      description: 'Solution d\'analyse de données pour optimiser les rendements agricoles.',
      category: 'Data Science',
      tags: ['Python', 'Machine Learning', 'Agriculture']
    },
    {
      image: '/images/platforme.png',
      title: 'Plateforme Web',
      description: 'Création d\'une plateforme web complète pour la gestion d\'entreprise.',
      category: 'Développement Web',
      tags: ['Next.js', 'Node.js', 'MongoDB']
    },
    {
      image: '/images/projet.png',
      title: 'Projet Innovant',
      description: 'Un projet technologique innovant pour résoudre des problèmes complexes.',
      category: 'Innovation',
      tags: ['Technologie', 'Innovation', 'Solution']
    }
  ];

  return (
    <section id="galerie" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Galerie de Projets
          </h2>
          <p className="text-xl text-gray-600">
            Découvrez quelques-unes de nos réalisations récentes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-64 bg-gradient-to-br from-amber-100 to-orange-200">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title || 'Projet'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-amber-700 text-6xl font-bold">
                      {project.title?.charAt(0) || '?'}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-sm text-amber-700 font-semibold mb-2">
                    {project.category || 'Non catégorisé'}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title || 'Sans titre'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description || 'Aucune description'}
                  </p>
                  {project.tags && Array.isArray(project.tags) && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
      </div>
    </section>
  );
}