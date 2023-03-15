/**
 * Calculate user's age based on its birthday date
 *
 * @param {string} birthDate - date in format DD/MM/YYYY
 * @returns number
 */
export default function getUserAge(birthDate: string): number {
  // Convert string to Date object
  const dob = new Date(birthDate);

  // Calculate time difference in milliseconds
  const diffMs = Date.now() - dob.getTime();

  // Calculate age in years
  const age = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

  return age;
}
