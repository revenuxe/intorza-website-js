// Convert markdown-ish blog content to HTML. Mirrors the source-project formatter.
export function formatBlogContent(content: string): string {
  let cleaned = content
    .replace(/^META_TITLE:\s*.+$/gm, "")
    .replace(/^META_DESCRIPTION:\s*.+$/gm, "")
    .replace(/^EXCERPT:\s*.+$/gm, "")
    .replace(/^TITLE:\s*.+$/gm, "")
    .replace(/^DESCRIPTION:\s*.+$/gm, "")
    .trim();

  if (cleaned.includes("<article") || (cleaned.includes("<h1") && cleaned.includes("<p>"))) {
    return cleaned;
  }

  let html = cleaned
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/^### (.+)$/gm, (_, t) => `<h3 id="${slug(t)}">${t}</h3>`)
    .replace(/^## (.+)$/gm, (_, t) => `<h2 id="${slug(t)}">${t}</h2>`)
    .replace(/^# (.+)$/gm, (_, t) => `<h1 id="${slug(t)}">${t}</h1>`)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")
    .replace(/^---$/gm, '<hr class="section-divider" />')
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>");

  const blocks = html.split(/\n\n+/);
  html = blocks
    .map((block) => {
      const t = block.trim();
      if (!t) return "";
      if (/^<(h\d|li|ul|ol|blockquote|pre|hr)/.test(t)) return t;
      return `<p>${t.replace(/\n/g, "<br />")}</p>`;
    })
    .filter(Boolean)
    .join("\n\n");

  html = html.replace(/(<li>.*?<\/li>\s*)+/gs, (m) => `<ul class="content-list">${m}</ul>`);
  html = html.replace(/(<blockquote>.*?<\/blockquote>\s*)+/gs, (m) => `<div class="quote-block">${m}</div>`);
  return html;
}

function slug(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
