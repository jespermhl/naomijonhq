export default function JoinDiscordButton({
    href,
    className = "",
}: {
    href: string;
    className?: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-brand-red border-white/80 shadow-[0_8px_0_rgba(255,79,168,0.28)] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:shadow-[0_12px_0_rgba(255,79,168,0.34)] block w-full rounded-full border px-6 py-4 text-center text-md font-black text-white no-underline transition-all duration-200 hover:-translate-y-1 hover:rotate-0 hover:scale-105 active:scale-95 will-change-transform ${className}`}
        >
            JOIN THE DISCORD
        </a>
    );
}