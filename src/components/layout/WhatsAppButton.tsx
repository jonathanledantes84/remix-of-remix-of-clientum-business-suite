import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5492984510883?text=Hola%2C%20quiero%20información%20sobre%20Clientum"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-success shadow-ambient transition-transform duration-250 hover:scale-110 animate-pulse-glow"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-success-foreground" />
    </a>
  );
}
