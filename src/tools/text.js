export function truncateDesc(text, maxWords){
    if(!text) return "";
    const words = text.trim().split(/\s+/);
    const truncated = words.slice(0, maxWords).join(" ");
    return words.length > maxWords ? truncated + "..." : text;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR");
}
