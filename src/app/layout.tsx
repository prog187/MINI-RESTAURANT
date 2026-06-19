import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Saveurs d'Ailleurs | Restaurant Gastronomique",
  description:
    "Découvrez une cuisine authentique qui célèbre les saveurs d'Afrique de l'Ouest avec une touche contemporaine. Réservez votre table dès maintenant.",
  openGraph: {
    title: "Saveurs d'Ailleurs",
    description: 'Restaurant gastronomique à Ouagadougou',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${lato.variable}`}>
      <body className="bg-obsidian text-cream font-body antialiased">
        {children}
      </body>
    </html>
  );
}
