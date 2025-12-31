import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET - Récupérer les statistiques
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const stats = await db.collection('stats').findOne({ id: 'main' });
    
    if (!stats) {
      // Créer des stats par défaut si elles n'existent pas
      const defaultStats = {
        id: 'main',
        projectsCompleted: 200,
        clients: 50,
        experience: 15,
        satisfaction: 100
      };
      
      await db.collection('stats').insertOne(defaultStats);
      return NextResponse.json(defaultStats);
    }
    
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erreur GET stats:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la récupération des statistiques' 
    }, { status: 500 });
  }
}

// PUT - Mettre à jour les statistiques
export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const body = await request.json();
    
    const updateData = {
      projectsCompleted: parseInt(body.projectsCompleted) || 0,
      clients: parseInt(body.clients) || 0,
      experience: parseInt(body.experience) || 0,
      satisfaction: parseInt(body.satisfaction) || 0,
      updatedAt: new Date()
    };
    
    await db.collection('stats').updateOne(
      { id: 'main' },
      { $set: updateData },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur PUT stats:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de la mise à jour des statistiques' 
    }, { status: 500 });
  }
}