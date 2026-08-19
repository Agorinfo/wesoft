import { createElement, Fragment, type CSSProperties, type ReactNode } from "react";
import { mediaUrl } from "@/lib/strapi";

type TiptapMark = { type?: string; attrs?: Record<string, unknown> };
type TiptapNode = { type?: string; text?: string; attrs?: Record<string, unknown>; marks?: TiptapMark[]; content?: TiptapNode[] };

function parseContent(value: unknown): TiptapNode | null {
  if (typeof value !== "string") return value && typeof value === "object" ? value as TiptapNode : null;
  try {
    const firstPass = JSON.parse(value) as TiptapNode | string;
    const parsed = typeof firstPass === "string" ? JSON.parse(firstPass) as TiptapNode : firstPass;
    return parsed.type === "doc" ? parsed : null;
  } catch {
    return null;
  }
}

function safeHref(value: unknown) {
  if (typeof value !== "string") return "#";
  return /^(https?:|mailto:|tel:|\/|#)/i.test(value) ? value : "#";
}

function renderChildren(nodes: TiptapNode[] | undefined, key: string): ReactNode[] {
  return (nodes || []).map((node, index) => renderNode(node, `${key}-${index}`));
}

function renderText(node: TiptapNode, key: string) {
  let content: ReactNode = node.text || "";
  for (const mark of node.marks || []) {
    if (mark.type === "bold") content = <strong key={`${key}-bold`}>{content}</strong>;
    if (mark.type === "italic") content = <em key={`${key}-italic`}>{content}</em>;
    if (mark.type === "underline") content = <u key={`${key}-underline`}>{content}</u>;
    if (mark.type === "strike") content = <s key={`${key}-strike`}>{content}</s>;
    if (mark.type === "code") content = <code key={`${key}-code`}>{content}</code>;
    if (mark.type === "link") content = <a key={`${key}-link`} href={safeHref(mark.attrs?.href)} target={mark.attrs?.target === "_blank" ? "_blank" : undefined} rel={mark.attrs?.target === "_blank" ? "noreferrer" : undefined}>{content}</a>;
  }
  return <Fragment key={key}>{content}</Fragment>;
}

function renderNode(node: TiptapNode, key: string): ReactNode {
  if (node.type === "text") return renderText(node, key);
  const children = renderChildren(node.content, key);
  if (node.type === "doc") return <Fragment key={key}>{children}</Fragment>;
  const textAlign = typeof node.attrs?.textAlign === "string" ? node.attrs.textAlign : undefined;
  const alignmentStyle = textAlign ? { textAlign } as CSSProperties : undefined;
  if (node.type === "paragraph") return <p key={key} style={alignmentStyle}>{children}</p>;
  if (node.type === "heading") return createElement(`h${Math.min(6, Math.max(1, Number(node.attrs?.level) || 2))}`, { key, style: alignmentStyle }, children);
  if (node.type === "blockquote") return <blockquote key={key}>{children}</blockquote>;
  if (node.type === "bulletList") return <ul key={key}>{children}</ul>;
  if (node.type === "orderedList") return <ol key={key} start={typeof node.attrs?.start === "number" ? node.attrs.start : undefined}>{children}</ol>;
  if (node.type === "listItem") return <li key={key}>{children}</li>;
  if (node.type === "hardBreak") return <br key={key} />;
  if (node.type === "horizontalRule") return <hr key={key} />;
  if (node.type === "codeBlock") return <pre key={key}><code>{children}</code></pre>;
  if (node.type === "image") {
    const source = typeof node.attrs?.src === "string" ? node.attrs.src : "";
    return source ? <img key={key} src={source.startsWith("/") ? mediaUrl(source) : source} alt={typeof node.attrs?.alt === "string" ? node.attrs.alt : ""} width={typeof node.attrs?.width === "number" ? node.attrs.width : undefined} height={typeof node.attrs?.height === "number" ? node.attrs.height : undefined} /> : null;
  }
  if (node.type === "table") return <table key={key}><tbody>{children}</tbody></table>;
  if (node.type === "tableRow") return <tr key={key}>{children}</tr>;
  if (node.type === "tableHeader") return <th key={key}>{children}</th>;
  if (node.type === "tableCell") return <td key={key}>{children}</td>;
  return <Fragment key={key}>{children}</Fragment>;
}

export function TiptapContent({ content, legacyHtml }: { content: unknown; legacyHtml?: string }) {
  const document = parseContent(content);
  if (document) return <>{renderChildren(document.content, "content")}</>;
  const html = legacyHtml ?? (typeof content === "string" ? content : "");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
