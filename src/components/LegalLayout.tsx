import path from "path";
import fs from "fs";
import Markdown from "markdown-to-jsx";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import { notFound } from "next/navigation";
type LegalFileName = "legal-notice.md" | "privacy-policy.md";

interface LegalLayoutProps {
  fileName: LegalFileName;
  showCardLayout?: boolean;
}

export function LegalLayout({
  fileName,
  showCardLayout = true,
}: LegalLayoutProps) {
  const filePath = path.join(process.cwd(), "src", "content", fileName);
  if (!fs.existsSync(filePath)) {
    notFound();
  }
  const fileContent = fs.readFileSync(filePath, "utf8");

  const markdownContent = (
    <article className="prose max-w-none">
      <Markdown
        options={{
          overrides: {
            h1: {
              component: ({ children }) => (
                <h1 className="text-brand-red mb-8 text-center text-[36px] font-black max-sm:text-[28px]">
                  {children}
                </h1>
              ),
            },
            h2: {
              component: ({ children }) => (
                <h2 className="text-brand-red mt-7 mb-2 text-xl font-black">
                  {children}
                </h2>
              ),
            },
            p: {
              component: ({ children }) => (
                <p className="text-text-dark mb-4 text-base leading-relaxed font-semibold whitespace-pre-line">
                  {children}
                </p>
              ),
            },
            ul: {
              component: ({ children }) => (
                <ul className="mb-2.5 ml-3.75 list-disc space-y-1">
                  {children}
                </ul>
              ),
            },
            li: {
              component: ({ children }) => (
                <li className="text-text-dark text-base leading-relaxed font-semibold">
                  {children}
                </li>
              ),
            },
            a: {
              component: ({ href = "", children }) =>
                href.startsWith("/") && !href.startsWith("//") ? (
                  <Link
                    href={href}
                    className="text-brand-red hover:text-brand-pink font-bold underline"
                  >
                    {children}
                  </Link>
                ) : (
                  <a
                    href={href}
                    className="text-brand-red hover:text-brand-pink font-bold underline"
                  >
                    {children}
                  </a>
                ),
            },
          },
        }}
      >
        {fileContent}
      </Markdown>
    </article>
  );

  if (!showCardLayout) {
    return <div className="p-4">{markdownContent}</div>;
  }

  return (
    <>
      <main className="flex min-h-screen items-center justify-center px-5 py-15 max-sm:py-10">
        <Card
          maxWidth="800px"
          className="px-10 py-15 text-left max-sm:px-5 max-sm:py-10"
          rotated={false}
        >
          {markdownContent}
        </Card>
      </main>
    </>
  );
}
