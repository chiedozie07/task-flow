export function parseTranscriptionToTasks(transcript: string): string[] {
  if (!transcript) return [];
  // normalize punctuation
  const cleaned = transcript.replace(/\s+/g, " ").trim();

  // split rules:
  // - split on ' and ' / ' & ' / commas when they likely separate actions
  // - split on semicolons, 'then', 'also', newlines, or numbered lists
  const separators = /\band\b|,|;|\bthen\b|\balso\b|\n|\. /i;
  const parts = cleaned
    .split(separators)
    .map((p) => p.trim())
    .filter(Boolean);

  // filter out fragments that are too short (like 'to' or 'the')
  return parts.filter((p) => p.length > 2).map((p) => capitalizeFirst(p));
}

function capitalizeFirst(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
