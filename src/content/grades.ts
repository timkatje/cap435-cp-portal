/** CAP cadet grades, lowest to highest. */
export const CADET_GRADES = [
  "C/AB",
  "C/Amn",
  "C/A1C",
  "C/SrA",
  "C/SSgt",
  "C/TSgt",
  "C/MSgt",
  "C/SMSgt",
  "C/CMSgt",
  "C/2d Lt",
  "C/1st Lt",
  "C/Capt",
  "C/Maj",
  "C/Lt Col",
  "C/Col",
] as const;

export const isGrade = (g: string): boolean => (CADET_GRADES as readonly string[]).includes(g);

/** "C/SSgt Smith", or "Cadet Smith" when the grade isn't set. */
export function cadetName(grade: string, lastName: string): string {
  if (!lastName) return "";
  return `${isGrade(grade) ? grade : "Cadet"} ${lastName}`;
}
