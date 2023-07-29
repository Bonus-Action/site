export function classNames(...strings: Array<unknown>): string {
  return strings
    .map((string) => (typeof string === "string" ? string : ""))
    .filter(Boolean)
    .join(" ");
}
