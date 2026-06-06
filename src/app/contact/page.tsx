"use client";

import { useState } from "react";
import { sendEmailAction } from "@/lib/actions/resend";
import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="relative flex w-full flex-col">
            <main className="relative z-20 flex w-full flex-col">
                <ContactForm />
            </main>
        </div>
    );
}

function ContactForm() {
    const [isPending, setIsPending] = useState(false);
    const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

    const contactPoints = [
        { label: "Email", value: "info@naomijonhq.com", href: "mailto:info@naomijonhq.com" }
    ];

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsPending(true);
        setStatus(null);

        const formElement = event.currentTarget;
        const formData = new FormData(formElement);

        const result = await sendEmailAction(formData);

        setIsPending(false);
        if (result.success) {
            setStatus({ success: true, message: "Message sent successfully!" });
            formElement.reset();
        } else {
            setStatus({ success: false, message: result.error || "Something went wrong." });
        }
    }

    return (
        <section className="flex min-h-[calc(100vh-140px)] w-full items-center px-6 pb-20 pt-12 max-sm:px-4 max-sm:pb-12 max-sm:pt-6">
            <div className="mx-auto w-full max-w-275">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

                    <div className="flex flex-col items-start space-y-8 lg:max-w-130 lg:sticky lg:top-8">
                        <div className="space-y-6">
                            <p className="text-brand-red text-xs font-black uppercase tracking-[0.38em]">
                                Get In Touch
                            </p>
                            <h2 className="text-[clamp(2.2rem,5vw,3.8rem)] font-black uppercase leading-[1.05] tracking-[-0.06em] text-[#1f171d]">
                                Say Hello
                            </h2>
                            <p className="text-[#5f4e58] text-[clamp(1rem,1.2vw,1.15rem)] font-semibold leading-relaxed">
                                Questions, collaborations, or inquiries? <br />We&apos;d love to hear from you.
                            </p>
                        </div>

                        <div className="w-full space-y-4 pt-4 border-t border-[#1f171d]/10">
                            {contactPoints.map((point, index) => (
                                <div key={index} className="flex flex-col space-y-1">
                                    <span className="text-xs font-black uppercase tracking-wider text-brand-red flex items-center gap-1.5">
                                        <span>✦</span> {point.label}
                                    </span>
                                    <a
                                        href={point.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#1f171d] font-bold text-lg hover:text-[#ff4fa8] transition-colors w-fit"
                                    >
                                        {point.value}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full rounded-4xl border border-white/60 bg-white/25 p-10 backdrop-blur-md shadow-[0px_0px_48px_-10px_rgba(255,63,159,0.15)] max-sm:p-6">
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">

                            {status && (
                                <div className={`p-4 rounded-xl text-sm font-bold ${status.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {status.message}
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="name" className="text-[#1f171d] text-sm font-black uppercase tracking-wider">
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full rounded-2xl border border-white/80 bg-white/40 px-5 py-3.5 text-[#1f171d] font-semibold shadow-sm backdrop-blur-sm placeholder-[#5f4e58]/40 outline-none transition-all focus:border-[#ff4fa8] focus:bg-white/60"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="email" className="text-[#1f171d] text-sm font-black uppercase tracking-wider">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full rounded-2xl border border-white/80 bg-white/40 px-5 py-3.5 text-[#1f171d] font-semibold shadow-sm backdrop-blur-sm placeholder-[#5f4e58]/40 outline-none transition-all focus:border-[#ff4fa8] focus:bg-white/60"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label htmlFor="subject" className="text-[#1f171d] text-sm font-black uppercase tracking-wider">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    className="w-full rounded-2xl border border-white/80 bg-white/40 px-5 py-3.5 text-[#1f171d] font-semibold shadow-sm backdrop-blur-sm placeholder-[#5f4e58]/40 outline-none transition-all focus:border-[#ff4fa8] focus:bg-white/60"
                                    placeholder="What's this about?"
                                />
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label htmlFor="message" className="text-[#1f171d] text-sm font-black uppercase tracking-wider">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full resize-none rounded-2xl border border-white/80 bg-white/40 px-5 py-4 text-[#1f171d] font-semibold shadow-sm backdrop-blur-sm placeholder-[#5f4e58]/40 outline-none transition-all focus:border-[#ff4fa8] focus:bg-white/60"
                                    placeholder="Type your message here..."
                                />
                            </div>

                            <div className="text-sm text-[#1f171d] font-light tracking-wider text-center">
                                By sending this contact form you agree to our <Link href="/privacy-policy" className="text-[#ff4fa8] hover:underline">privacy policy</Link>.
                            </div>

                            <button
                                type="submit"
                                disabled={isPending}
                                className="group relative w-full inline-flex items-center justify-center rounded-2xl bg-[#1f171d] px-8 py-4 text-center text-sm font-black uppercase tracking-widest text-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-1 hover:bg-[#ff4fa8] hover:shadow-[0px_8px_24px_-4px_rgba(255,63,159,0.4)] active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none"
                            >
                                {isPending ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}