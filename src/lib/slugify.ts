export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

export function generateUniqueSlug(title: string): string {
  const base = slugify(title);
  const random = Math.random().toString(36).substring(2, 6);
  return `${base}-${random}`;
}
