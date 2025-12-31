import './globals.css';

export const metadata = {
  title: 'BASSIROUDEV - Développeur Full-Stack & Agriculture Numérique',
  description: 'Expert en développement web/mobile et informatique appliquée à l\'agriculture. Spécialisé en SIG, télédétection et IA pour l\'agriculture.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
