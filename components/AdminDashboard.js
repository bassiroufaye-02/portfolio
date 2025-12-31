'use client';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { FaPlus, FaTrash, FaSave, FaSignOutAlt, FaHome } from 'react-icons/fa';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    projectsCompleted: 200,
    clients: 50,
    experience: 15,
    satisfaction: 100
  });
  const [newProject, setNewProject] = useState({
    title: '',
    category: '',
    description: '',
    tags: '',
    image: ''
  });

  useEffect(() => {
    fetchProjects();
    fetchStats();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          console.error('Format de données inattendu:', data);
          setProjects([]);
        }
      } else {
        console.error('Échec de la récupération des projets:', res.status);
        setProjects([]);
      }
    } catch (error) {
      console.error('Erreur:', error);
      setProjects([]);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const addProject = async () => {
    if (!newProject.title || !newProject.category || !newProject.description) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const projectData = {
      ...newProject,
      tags: newProject.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });

      if (res.ok) {
        alert('Projet ajouté avec succès !');
        setNewProject({ title: '', category: '', description: '', tags: '', image: '' });
        fetchProjects();
      }
    } catch (error) {
      alert('Erreur lors de l\'ajout du projet');
    }
  };

  const deleteProject = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return;

    try {
      await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      alert('Projet supprimé !');
      fetchProjects();
    } catch (error) {
      alert('Erreur lors de la suppression');
    }
  };

  const updateStats = async () => {
    try {
      const res = await fetch('/api/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stats)
      });

      if (res.ok) {
        alert('Statistiques mises à jour avec succès !');
      }
    } catch (error) {
      alert('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-amber-700">Tableau de Bord Admin</h1>
            <div className="flex gap-4">
              <a
                href="/"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FaHome />
                <span>Retour au site</span>
              </a>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FaSignOutAlt />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* STATISTIQUES */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">📊 Statistiques du Site</h2>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Projets réalisés
              </label>
              <input
                type="number"
                value={stats.projectsCompleted}
                onChange={(e) => setStats({ ...stats, projectsCompleted: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Clients satisfaits
              </label>
              <input
                type="number"
                value={stats.clients}
                onChange={(e) => setStats({ ...stats, clients: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Années d'expérience
              </label>
              <input
                type="number"
                value={stats.experience}
                onChange={(e) => setStats({ ...stats, experience: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Satisfaction (%)
              </label>
              <input
                type="number"
                value={stats.satisfaction}
                onChange={(e) => setStats({ ...stats, satisfaction: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 outline-none"
              />
            </div>
          </div>
          <button
            onClick={updateStats}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <FaSave />
            <span>Enregistrer les statistiques</span>
          </button>
        </div>

        {/* AJOUTER UN PROJET */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">➕ Ajouter un Projet</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Titre du projet *"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 outline-none"
            />
            <input
              type="text"
              placeholder="Catégorie (ex: Site Web, Mobile) *"
              value={newProject.category}
              onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 outline-none"
            />
            <input
              type="text"
              placeholder="URL de l'image (imgur, unsplash...)"
              value={newProject.image}
              onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 outline-none col-span-2"
            />
            <textarea
              placeholder="Description du projet *"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 outline-none col-span-2"
              rows="3"
            />
            <input
              type="text"
              placeholder="Tags (séparés par virgule: React, Next.js, MongoDB)"
              value={newProject.tags}
              onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-700 outline-none col-span-2"
            />
          </div>
          <button
            onClick={addProject}
            className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors flex items-center space-x-2"
          >
            <FaPlus />
            <span>Ajouter le projet</span>
          </button>
        </div>

        {/* LISTE DES PROJETS */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            📁 Projets existants ({projects.length})
          </h2>
          {projects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucun projet pour le moment</p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div 
                  key={project._id} 
                  className="border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">{project.title}</h3>
                      <p className="text-sm text-amber-700 font-semibold">{project.category}</p>
                      <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.map((tag, i) => (
                            <span 
                              key={i}
                              className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => deleteProject(project._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors ml-4"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}