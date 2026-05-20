import { WHATSAPP_NUMBER } from '../config/site';

export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message: string): void {
  window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
}

export function inquiryMessage(productName = ''): string {
  const product = productName ? ` ${productName}` : ' your software';
  return `Hello Busy Multicare! I'm interested in${product}. Please provide more details.`;
}

export function handleInquiry(productName = ''): void {
  openWhatsApp(inquiryMessage(productName));
}
