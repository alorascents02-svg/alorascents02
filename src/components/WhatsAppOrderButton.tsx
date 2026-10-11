import React from 'react';
import { WhatsAppIcon } from './SocialLinks';
import { Product } from '../types';

interface WhatsAppOrderButtonProps {
  product?: Product;
  productName?: string;
  productPrice?: number;
  customMessage?: string;
  className?: string;
  label?: string;
}

export const WhatsAppOrderButton: React.FC<WhatsAppOrderButtonProps> = ({
  product,
  productName,
  productPrice,
  customMessage,
  className = '',
  label = 'Order via WhatsApp',
}) => {
  let message = customMessage;
  if (!message && productName) {
    message = `Hello Alora Fragrance House! I would like to order/inquire about:
• Fragrance: ${productName}
• Price: GH₵ ${productPrice ?? (product?.price || '')}

Please let me know availability and delivery options to my location in Ghana.`;
  } else if (!message && product) {
    message = `Hello Alora Fragrance House! I would like to order:
• Fragrance: ${product.name} (${product.size})
• Price: GH₵ ${product.price}
• Fragrance Family: ${product.fragranceFamily}

Please let me know availability and delivery options to my location in Ghana.`;
  } else if (!message) {
    message = 'Hello Alora Fragrance House! I would like assistance with finding the right perfume or decant.';
  }

  // Official WhatsApp link
  const targetUrl = `https://wa.me/message/5BK5FD4YQXOOB1?text=${encodeURIComponent(message || '')}`;

  return (
    <a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors ${className}`}
    >
      <WhatsAppIcon className="w-4 h-4 text-emerald-800" />
      <span>{label}</span>
    </a>
  );
};
