"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Check,
  AlertTriangle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Lightbulb,
  Download,
  ExternalLink,
  Star,
  Minus,
  Type,
  ListOrdered,
  ListChecks,
  Quote,
  Code2,
  ImageIcon,
  FileText,
  Eye,
} from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */

interface BlockData {
  text?: string;
  level?: number;
  style?: string;
  items?: Array<
    string | { content?: string; text?: string; checked?: boolean }
  >;
  file?: { url?: string; name?: string };
  caption?: string;
  code?: string;
  html?: string;
  message?: string;
  title?: string;
  type?: string;
  align?: string;
  status?: string;
  itemsContent?: string;
  link?: string;
  meta?: {
    title?: string;
    description?: string;
    image?: { url?: string };
  };
}

interface ContentBlock {
  id: string;
  type: string;
  data: BlockData;
}

interface SalesCarPreviewProps {
  content: unknown;
}

/* ─────────────────────────────────────────────
   UTILITY: Parse content safely
   ───────────────────────────────────────────── */

function parseContent(content: unknown): ContentBlock[] {
  if (!content) return [];
  if (typeof content === "string") {
    try {
      const parsed = JSON.parse(content);
      return parsed.blocks || [];
    } catch {
      return [{ id: "text-1", type: "paragraph", data: { text: content } }];
    }
  }
  if (typeof content === "object" && content !== null) {
    const obj = content as Record<string, unknown>;
    if (Array.isArray(obj.blocks)) return obj.blocks as ContentBlock[];
    // Fallback: wrap object as raw JSON display
    return [
      {
        id: "raw-1",
        type: "paragraph",
        data: { text: JSON.stringify(content, null, 2) },
      },
    ];
  }
  return [];
}

function renderHTML(html: string): { __html: string } | null {
  if (!html || html.trim() === "") return null;
  return { __html: html };
}

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────── */

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" },
};

/* ─────────────────────────────────────────────
   BLOCK COMPONENTS
   ───────────────────────────────────────────── */

function ParagraphBlock({ text }: { text: string }) {
  const html = renderHTML(text);
  if (!html) return null;
  return (
    <motion.p
      {...fadeInUp}
      className="text-[15px] leading-[1.8] text-foreground/85 mb-5 text-justify"
      dangerouslySetInnerHTML={html}
    />
  );
}

function HeaderBlock({ text, level }: { text: string; level?: number }) {
  const sizes: Record<number, string> = {
    1: "text-3xl sm:text-4xl font-bold mt-10 mb-6",
    2: "text-2xl sm:text-3xl font-semibold mt-8 mb-4",
    3: "text-xl sm:text-2xl font-semibold mt-6 mb-3",
    4: "text-lg sm:text-xl font-semibold mt-5 mb-2",
  };
  const className = sizes[level || 2] || sizes[2];

  const Tag = `h${Math.min(level || 2, 6)}` as keyof JSX.IntrinsicElements;

  return (
    <motion.div {...fadeInUp}>
      <Tag className={`${className} text-foreground tracking-tight`}>
        {text}
      </Tag>
      <div className="h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-4" />
    </motion.div>
  );
}

function ImageBlock({
  file,
  caption,
}: {
  file?: { url?: string };
  caption?: string;
}) {
  if (!file?.url) return null;

  return (
    <motion.div
      {...fadeInUp}
      className="my-8 rounded-2xl overflow-hidden bg-muted/30 border border-border/20"
    >
      <div className="relative w-full aspect-video">
        <Image
          src={file.url}
          alt={caption || "Car image"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      {caption && (
        <p className="text-center text-sm text-muted-foreground py-3 px-4 bg-muted/50">
          {caption}
        </p>
      )}
    </motion.div>
  );
}

function CodeBlock({ code }: { code?: string }) {
  if (!code) return null;

  return (
    <motion.div
      {...fadeInUp}
      className="my-6 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-b border-zinc-800">
        <Code2 className="h-4 w-4 text-zinc-400" />
        <span className="text-xs text-zinc-400 font-mono">Code</span>
      </div>
      <pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed text-zinc-300">
        <code>{code}</code>
      </pre>
    </motion.div>
  );
}

function ListBlock({
  items,
  style,
}: {
  items?: Array<string | { content?: string; text?: string }>;
  style?: string;
}) {
  if (!items?.length) return null;

  const isOrdered = style === "ordered";
  const Tag = isOrdered ? "ol" : "ul";
  const listClass = isOrdered
    ? "list-decimal list-inside space-y-2.5"
    : "list-disc list-inside space-y-2.5";

  return (
    <motion.div {...fadeInUp} className="my-5 ml-1">
      <Tag
        className={`${listClass} text-[15px] leading-relaxed text-foreground/85`}
      >
        {items.map((item, i) => {
          const text =
            typeof item === "string" ? item : item.content || item.text || "";
          const html = renderHTML(text);
          return html ? (
            <li key={i} className="pl-1 marker:text-primary/70">
              <span dangerouslySetInnerHTML={html} />
            </li>
          ) : null;
        })}
      </Tag>
    </motion.div>
  );
}

function ChecklistBlock({
  items,
}: {
  items?: Array<{ text?: string; checked?: boolean }>;
}) {
  if (!items?.length) return null;

  return (
    <motion.div {...fadeInUp} className="my-5 space-y-2.5">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/20 hover:bg-muted/60 transition-colors"
        >
          <div
            className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
              item.checked
                ? "bg-primary text-primary-foreground"
                : "bg-muted border border-border"
            }`}
          >
            {item.checked && <Check className="h-3 w-3" />}
          </div>
          <span
            className={`text-[15px] leading-relaxed ${
              item.checked
                ? "text-foreground/70 line-through"
                : "text-foreground/85"
            }`}
          >
            {item.text || ""}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

function QuoteBlock({ text, caption }: { text?: string; caption?: string }) {
  if (!text) return null;

  return (
    <motion.blockquote
      {...fadeInUp}
      className="my-6 pl-6 border-l-4 border-primary/40 italic text-foreground/80 text-lg leading-relaxed"
    >
      <Quote className="h-6 w-6 text-primary/30 mb-2" />
      <p>{text}</p>
      {caption && (
        <footer className="mt-3 text-sm text-muted-foreground not-italic font-medium">
          — {caption}
        </footer>
      )}
    </motion.blockquote>
  );
}

function AlertBlock({
  title,
  message,
  type,
  align,
}: {
  title?: string;
  message?: string;
  type?: string;
  align?: string;
}) {
  if (!message) return null;

  const configs: Record<string, { icon: React.ReactNode; classes: string }> = {
    primary: {
      icon: <Info className="h-5 w-5" />,
      classes:
        "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800/50 text-blue-900 dark:text-blue-200",
    },
    secondary: {
      icon: <Info className="h-5 w-5" />,
      classes:
        "bg-slate-50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800/50 text-slate-900 dark:text-slate-200",
    },
    info: {
      icon: <Info className="h-5 w-5" />,
      classes:
        "bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800/50 text-sky-900 dark:text-sky-200",
    },
    success: {
      icon: <CheckCircle className="h-5 w-5" />,
      classes:
        "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/50 text-emerald-900 dark:text-emerald-200",
    },
    warning: {
      icon: <AlertTriangle className="h-5 w-5" />,
      classes:
        "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200",
    },
    danger: {
      icon: <XCircle className="h-5 w-5" />,
      classes:
        "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/50 text-red-900 dark:text-red-200",
    },
    light: {
      icon: <Lightbulb className="h-5 w-5" />,
      classes:
        "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-gray-100",
    },
    dark: {
      icon: <AlertCircle className="h-5 w-5" />,
      classes:
        "bg-gray-900 dark:bg-black border-gray-700 dark:border-zinc-800 text-gray-100 dark:text-zinc-200",
    },
  };

  const config = configs[type || "info"] || configs.info;
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  const html = renderHTML(message);

  return (
    <motion.div
      {...fadeInUp}
      className={`my-6 p-5 rounded-xl border ${config.classes} ${alignClass}`}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5 opacity-70">{config.icon}</div>
        <div className="flex-1">
          {title && <p className="font-semibold mb-1">{title}</p>}
          {html && (
            <div
              className="text-[15px] leading-relaxed opacity-90"
              dangerouslySetInnerHTML={html}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ToggleBlock({
  id,
  text,
  itemsContent,
  status,
  openToggles,
  onToggle,
}: {
  id: string;
  text?: string;
  itemsContent?: string;
  status?: string;
  openToggles: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  if (!text && !itemsContent) return null;

  const isOpen = openToggles[id] ?? status === "open";
  const html = itemsContent ? renderHTML(itemsContent) : null;

  return (
    <motion.div
      {...fadeInUp}
      className="my-5 rounded-xl border border-border/30 overflow-hidden"
    >
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-muted/40 hover:bg-muted/60 transition-colors text-left"
      >
        <span className="font-semibold text-foreground">
          {text || "Details"}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && html && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div
              className="px-5 py-4 text-[15px] leading-relaxed text-foreground/80 border-t border-border/20"
              dangerouslySetInnerHTML={html}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function LinkToolBlock({
  link,
  meta,
}: {
  link?: string;
  meta?: {
    title?: string;
    description?: string;
    image?: { url?: string };
  };
}) {
  if (!link) return null;

  return (
    <motion.a
      {...fadeInUp}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="my-6 block rounded-xl border border-border/30 bg-muted/20 hover:bg-muted/40 hover:border-primary/20 transition-all duration-300 overflow-hidden group"
    >
      <div className="flex flex-col sm:flex-row">
        {meta?.image?.url && (
          <div className="relative w-full sm:w-48 h-32 sm:h-auto shrink-0">
            <Image
              src={meta.image.url}
              alt={meta.title || "Link preview"}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 192px"
            />
          </div>
        )}
        <div className="p-4 flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <ExternalLink className="h-3.5 w-3.5 text-primary/70" />
            <span className="text-xs text-primary/70 font-medium truncate">
              {link}
            </span>
          </div>
          <p className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {meta?.title || link}
          </p>
          {meta?.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {meta.description}
            </p>
          )}
        </div>
      </div>
    </motion.a>
  );
}

function AttachmentBlock({
  file,
  title,
}: {
  file?: { url?: string; name?: string };
  title?: string;
}) {
  if (!file?.url) return null;

  const displayName = title || file.name || "Download";

  return (
    <motion.div {...fadeInUp} className="my-5">
      <a
        href={file.url}
        download={displayName}
        className="inline-flex items-center gap-3 px-5 py-3.5 rounded-xl bg-muted/50 border border-border/30 hover:bg-muted hover:border-primary/20 transition-all duration-300 group"
      >
        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Download className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="font-medium text-foreground text-sm truncate">
            {displayName}
          </p>
          <p className="text-xs text-muted-foreground">Click to download</p>
        </div>
      </a>
    </motion.div>
  );
}

function DelimiterBlock({ style }: { style?: string }) {
  const styles: Record<string, React.ReactNode> = {
    star: (
      <div className="flex items-center justify-center gap-2 my-8">
        {[...Array(3)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-primary/40 fill-primary/40" />
        ))}
      </div>
    ),
    dash: (
      <div className="flex items-center justify-center gap-1 my-8">
        {[...Array(5)].map((_, i) => (
          <Minus key={i} className="h-4 w-4 text-muted-foreground/30" />
        ))}
      </div>
    ),
    line: (
      <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    ),
  };

  return <>{styles[style || "line"] || styles.line}</>;
}

function RawHTMLBlock({ html }: { html?: string }) {
  if (!html) return null;
  const rendered = renderHTML(html);
  if (!rendered) return null;

  return (
    <motion.div
      {...fadeInUp}
      className="my-6"
      dangerouslySetInnerHTML={rendered}
    />
  );
}

function WarningBlock({
  title,
  message,
}: {
  title?: string;
  message?: string;
}) {
  if (!message) return null;

  return (
    <motion.div
      {...fadeInUp}
      className="my-6 p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          {title && (
            <p className="font-semibold text-amber-900 dark:text-amber-200 mb-1">
              {title}
            </p>
          )}
          <p className="text-[15px] leading-relaxed text-amber-800 dark:text-amber-300/90">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function MermaidBlock() {
  return (
    <motion.div
      {...fadeInUp}
      className="my-6 p-6 rounded-xl bg-muted/30 border border-border/20 text-center"
    >
      <Eye className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
      <p className="text-sm text-muted-foreground">
        Diagram preview not available
      </p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */

export function SalesCarPreview({ content }: SalesCarPreviewProps) {
  const [openToggles, setOpenToggles] = useState<Record<string, boolean>>({});

  const blocks = parseContent(content);

  if (blocks.length === 0) {
    return (
      <div className="py-8 text-center">
        <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">
          No description available for this vehicle.
        </p>
      </div>
    );
  }

  const handleToggle = (id: string) => {
    setOpenToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="sales-car-preview">
      {blocks.map((block) => {
        const type = block.type.toLowerCase();

        switch (type) {
          case "paragraph":
          case "aitext":
            return (
              <ParagraphBlock key={block.id} text={block.data.text || ""} />
            );

          case "header":
            return (
              <HeaderBlock
                key={block.id}
                text={block.data.text || ""}
                level={block.data.level}
              />
            );

          case "image":
            return (
              <ImageBlock
                key={block.id}
                file={block.data.file}
                caption={block.data.caption}
              />
            );

          case "code":
            return <CodeBlock key={block.id} code={block.data.code} />;

          case "list":
            return (
              <ListBlock
                key={block.id}
                items={block.data.items}
                style={block.data.style}
              />
            );

          case "checklist":
            return <ChecklistBlock key={block.id} items={block.data.items} />;

          case "quote":
            return (
              <QuoteBlock
                key={block.id}
                text={block.data.text}
                caption={block.data.caption}
              />
            );

          case "alert":
            return (
              <AlertBlock
                key={block.id}
                title={block.data.title}
                message={block.data.message}
                type={block.data.type}
                align={block.data.align}
              />
            );

          case "warning":
            return (
              <WarningBlock
                key={block.id}
                title={block.data.title}
                message={block.data.message}
              />
            );

          case "toggle":
            return (
              <ToggleBlock
                key={block.id}
                id={block.id}
                text={block.data.text}
                itemsContent={block.data.itemsContent}
                status={block.data.status}
                openToggles={openToggles}
                onToggle={handleToggle}
              />
            );

          case "linktool":
            return (
              <LinkToolBlock
                key={block.id}
                link={block.data.link}
                meta={block.data.meta}
              />
            );

          case "attaches":
            return (
              <AttachmentBlock
                key={block.id}
                file={block.data.file}
                title={block.data.title}
              />
            );

          case "delimiter":
            return <DelimiterBlock key={block.id} style={block.data.style} />;

          case "raw":
            return <RawHTMLBlock key={block.id} html={block.data.html} />;

          case "mermaid":
            return <MermaidBlock key={block.id} />;

          default:
            return null;
        }
      })}

      {/* Global styles for rendered HTML content */}
      <style jsx global>{`
        .sales-car-preview a {
          color: hsl(var(--primary));
          text-decoration: none;
          font-weight: 500;
          border-bottom: 1px solid hsl(var(--primary) / 0.3);
          transition: border-color 0.2s;
        }
        .sales-car-preview a:hover {
          border-bottom-color: hsl(var(--primary));
        }
        .sales-car-preview strong,
        .sales-car-preview b {
          font-weight: 600;
          color: hsl(var(--foreground));
        }
        .sales-car-preview em,
        .sales-car-preview i {
          font-style: italic;
        }
        .sales-car-preview u {
          text-decoration: underline;
          text-decoration-color: hsl(var(--primary) / 0.4);
          text-underline-offset: 3px;
        }
        .sales-car-preview mark {
          background: hsl(var(--primary) / 0.15);
          color: hsl(var(--primary));
          padding: 1px 4px;
          border-radius: 3px;
        }
        .sales-car-preview s,
        .sales-car-preview strike {
          text-decoration: line-through;
          opacity: 0.6;
        }
        .sales-car-preview code {
          font-family:
            ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.875em;
          background: hsl(var(--muted));
          padding: 2px 6px;
          border-radius: 4px;
          color: hsl(var(--primary));
        }
        .sales-car-preview pre code {
          background: transparent;
          padding: 0;
          color: inherit;
        }
      `}</style>
    </div>
  );
}
