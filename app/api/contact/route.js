import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { service, name, email, message } = body;
    
    // Créer le message WhatsApp formaté
    const whatsappMessage = `🔔 NOUVELLE COMMANDE - POUR Bassirou faye Business

📋 Service demandé: ${service}
    
👤 Informations client:
Nom: ${name}
Email: ${email}

💬 Message:
${message}

---
Envoyé depuis le formulaire de contact du portfolio`;

    // Encoder le message pour l'URL WhatsApp
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // ⚠️ IMPORTANT: Remplacez ce numéro par le vôtre
    // Format international sans le + (exemple: 221772928777 pour le Sénégal)
    const phoneNumber = '221763900159'; // 🔴 CHANGEZ CE NUMÉRO !
    
    // Créer l'URL WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    return NextResponse.json({ 
      success: true, 
      whatsappUrl: whatsappUrl 
    });
  } catch (error) {
    console.error('Erreur contact:', error);
    return NextResponse.json({ 
      error: 'Erreur lors de l\'envoi du message' 
    }, { status: 500 });
  }
}