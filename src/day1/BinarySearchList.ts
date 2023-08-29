export default function bs_list(haystack: number[], needle: number): boolean {
  let start = 0;
  let end = haystack.length;

  do {
    const mid = Math.floor(start + (end - start) / 2);
    const value = haystack[mid];

    if (value === needle) return true;

    if (value > needle) {
      end = mid;
    } else {
      start = mid + 1;
    }

  } while (start < end)

  return false;
}