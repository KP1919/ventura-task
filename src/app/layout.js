import Navbar from "@/components/Navbar/Navbar";
import "./font.css";
import "./globals.css";

// const geistSans = localFont({

export const metadata = {
  title: "Ventura: Online trading Platform, Share Market Investment",
  // description: "www.venturasecurities.com",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body>
      <Navbar />
        {children}
        </body>
    </html>
  );
}
