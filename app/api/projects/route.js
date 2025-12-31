import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';


// GET - Récupérer tous les projets
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const projects = await db.collection('projects').find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Erreur GET projects:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des projets' }, { status: 500 });
  }
}

// POST - Ajouter un nouveau projet
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const body = await request.json();
    
    const newProject = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('projects').insertOne(newProject);
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Erreur POST project:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'ajout du projet' }, { status: 500 });
  }
}

// PUT - Mettre à jour un projet
export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const body = await request.json();
    const { _id, ...updateData } = body;
    const { ObjectId } = require('mongodb');
    
    updateData.updatedAt = new Date();
    
    await db.collection('projects').updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur PUT project:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du projet' }, { status: 500 });
  }
}

// DELETE - Supprimer un projet
export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const { ObjectId } = require('mongodb');
    
    await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE project:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression du projet' }, { status: 500 });
  }
}