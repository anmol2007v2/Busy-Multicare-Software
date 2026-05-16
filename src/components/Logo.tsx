type LogoProps = {
  className?: string;
  variant?: 'nav' | 'footer';
};

const variantClasses = {
  nav: 'h-10 w-auto object-contain',
  footer: 'h-16 w-auto object-contain',
};

const Logo = ({ className = '', variant = 'nav' }: LogoProps) => (
  <img
    src="/logo.png"
    alt="Busy Multi Care"
    className={`${variantClasses[variant]} ${className}`.trim()}
  />
);

export default Logo;
