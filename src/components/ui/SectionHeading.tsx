interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  className = "",
  titleClassName = "",
}: SectionHeadingProps) {
  return (
    <>
      <span
        className={`text-brand-red mb-3 inline-block text-xs font-black tracking-[0.16em] uppercase ${className}`}
      >
        {eyebrow}
      </span>
      <h2
        className={`text-text-dark mb-12 text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.05] font-black tracking-tighter uppercase ${titleClassName}`}
      >
        {title}
      </h2>
    </>
  );
}
