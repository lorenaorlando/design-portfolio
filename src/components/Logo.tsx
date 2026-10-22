/** "loOS" wordmark, a nod to the classic Mac OS logotype. */
export function Logo({ size = 22 }: { size?: number }) {
  return (
    <span className="logo" style={{ fontSize: size }} aria-label="loOS">
      <span className="logo-lo">lo</span>
      <span className="logo-os">OS</span>
    </span>
  );
}
