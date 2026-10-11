import React from 'react';

export const OFFICIAL_SOCIAL_LINKS = {
  tiktok: 'https://www.tiktok.com/@_alora.scents?_r=1&_t=ZS-99CgGuy88Qe',
  instagram: 'https://www.instagram.com/alora.scentsss_?igsi=ZG1wZnAydGJjM212&utm_source=qr',
  whatsapp: 'https://wa.me/message/5BK5FD4YQXOOB1',
};

// Official TikTok SVG
export const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.32a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.28 8.28 0 0 0 4.77 1.48V6.78c-.34 0-.68-.03-1-.09z" />
  </svg>
);

// Official Instagram SVG
export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// Official WhatsApp SVG
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.276-.1-.476-.15-.677.15-.201.3-.777.98-.953 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.786-1.675-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.175.201-.301.302-.502.1-.201.05-.376-.025-.526-.075-.15-.677-1.631-.928-2.233-.244-.587-.492-.507-.677-.517-.175-.01-.376-.01-.577-.01-.201 0-.527.075-.802.376s-1.053 1.029-1.053 2.509 1.079 2.91 1.229 3.111c.15.201 2.122 3.24 5.141 4.544.718.31 1.278.496 1.716.635.722.23 1.38.197 1.9.12.58-.087 1.782-.728 2.033-1.431.251-.703.251-1.305.176-1.431-.076-.126-.276-.201-.577-.351zM12.042 0C5.399 0 0 5.398 0 12.041c0 2.12.553 4.188 1.604 6.012L0 24l6.126-1.607a12.003 12.003 0 0 0 5.916 1.554h.005c6.643 0 12.042-5.399 12.042-12.042 0-3.218-1.253-6.243-3.529-8.519A11.965 11.965 0 0 0 12.042 0zm0 22.016h-.004a9.98 9.98 0 0 1-5.088-1.393l-.365-.217-3.781.992 1.009-3.687-.238-.379a9.96 9.96 0 0 1-1.534-5.291c0-5.518 4.49-10.008 10.012-10.008 2.673 0 5.187 1.042 7.077 2.932 1.891 1.891 2.932 4.405 2.932 7.079 0 5.519-4.49 10.01-10.009 10.01z" />
  </svg>
);

interface SocialLinksProps {
  className?: string;
  iconClassName?: string;
  variant?: 'light' | 'dark';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = 'flex items-center gap-3',
  iconClassName = 'w-4 h-4',
  variant = 'dark',
}) => {
  const linkClasses =
    variant === 'light'
      ? 'p-2 text-[#F5F2EE]/80 hover:text-white hover:bg-white/10 transition-colors'
      : 'p-2 text-[#211D24]/80 hover:text-[#241C2B] hover:bg-black/5 transition-colors';

  return (
    <div className={className}>
      <a
        href={OFFICIAL_SOCIAL_LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        title="WhatsApp: House of ALORA"
        aria-label="Connect on WhatsApp"
      >
        <WhatsAppIcon className={iconClassName} />
      </a>
      <a
        href={OFFICIAL_SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        title="Instagram: @_alora.scentsss_"
        aria-label="Follow on Instagram"
      >
        <InstagramIcon className={iconClassName} />
      </a>
      <a
        href={OFFICIAL_SOCIAL_LINKS.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
        title="TikTok: @_alora.scents"
        aria-label="Follow on TikTok"
      >
        <TikTokIcon className={iconClassName} />
      </a>
    </div>
  );
};
