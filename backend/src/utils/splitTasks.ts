// splits a string of tasks into an array of individual tasks based on common delimiters.
export function splitTasks(text: string): string[] {
  return text.replace(/and then|then|also/gi, ",").split(",").map((t) => t.trim()).filter(Boolean);
};
