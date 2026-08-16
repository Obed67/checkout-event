import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mon expérience à TCC | Checkout",
  description:
    "Présentation personnelle — retour sur le mandat à la tête de TCC UAC.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-hidden">{children}</body>
    </html>
  );
}
