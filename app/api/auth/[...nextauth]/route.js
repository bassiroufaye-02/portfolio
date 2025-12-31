import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.password) {
          return null;
        }

        // Récupérer le mot de passe depuis les variables d'environnement
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        
        // Comparer le mot de passe
        const isValid = credentials.password === adminPassword;
        
        if (isValid) {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@example.com',
          };
        }
        
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
});

export { handler as GET, handler as POST };

