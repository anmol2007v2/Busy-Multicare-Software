import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  // Placeholder number - user will update this later
  const phoneNumber = "9779851125905"; 
  const message = encodeURIComponent("Hello, I'm interested in BUSY Accounting Software. Could you please provide more information?");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
      title="Contact us on WhatsApp"
    >
      {/* Pulse effect */}
      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 bg-[#25D366] rounded-full -z-10"
      />
      
      <MessageCircle size={32} />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-on-background text-white px-4 py-2 rounded-xl text-label-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/10">
        Chat with us
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
