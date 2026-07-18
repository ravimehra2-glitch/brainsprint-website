import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import StickyCTA from "./StickyCTA";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
