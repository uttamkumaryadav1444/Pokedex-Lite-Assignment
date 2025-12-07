import type { Metadata } from "next";
import "./globals.css";
import Providers from "./components/Providers"; // client wrapper

export const metadata: Metadata = {
  title: "Pokédex Lite - Catch them all!",
  description: "Browse Pokémon",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        ></script>
      </body>
    </html>
  );
}
