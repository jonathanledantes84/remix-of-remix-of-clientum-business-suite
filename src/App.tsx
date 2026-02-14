import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Soluciones from "./pages/Soluciones";
import Servicios from "./pages/Servicios";
import Planes from "./pages/Planes";
import Blog from "./pages/Blog";
import Testimonios from "./pages/Testimonios";
import Contacto from "./pages/Contacto";
import Academia from "./pages/Academia";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/soluciones" element={<Soluciones />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/planes" element={<Planes />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/testimonios" element={<Testimonios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/academia" element={<Academia />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
