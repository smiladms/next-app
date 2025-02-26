import BootstrapClient from "@/components/libraries/Bootstrap";
import "./globals.css";
import Header from "@/components/layout/Header";
import Toastify from "@/components/libraries/Toastify"
import Footer from "@/components/layout/Footer";
import NextNprogress from "@/components/libraries/NextNprogress";
import { AuthProvider } from "@/context/AuthContext";
import Providers from "@/redux/Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AuthProvider>
          <Providers>
            <NextNprogress>
              <Header />
              {children}

              <Footer />
              <BootstrapClient />
              <Toastify />
            </NextNprogress>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
