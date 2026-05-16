import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

type CountUpProps = {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

const CountUp = ({ end, suffix = '+', duration = 2.5, className = '' }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString('en-US')}
      {suffix}
    </span>
  );
};

export default CountUp;
