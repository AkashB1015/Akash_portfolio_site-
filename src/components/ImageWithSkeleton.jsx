import { useState, useRef } from "react";

/**
 * ImageWithSkeleton
 * Reserves the image's exact space via `aspectRatio`, shows a shimmer skeleton
 * until the real image fires onLoad, then cross-fades it in over ~300ms.
 *
 * Props:
 *   src          - image source URL (if null, skeleton stays permanently as placeholder)
 *   alt          - alt text
 *   aspectRatio  - CSS aspect-ratio value string, e.g. "5/3" (default "5/3")
 *   className    - extra classes applied to the outer container
 *   imgClassName - extra classes for the <img> element
 */
export default function ImageWithSkeleton({
  src,
  alt = "",
  aspectRatio = "5/3",
  className = "",
  imgClassName = "",
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // If the image is already cached, the onLoad event may not fire —
  // check naturalWidth to detect cached-complete state after mount.
  const handleRef = (node) => {
    imgRef.current = node;
    if (node && node.complete && node.naturalWidth > 0) {
      setLoaded(true);
    }
  };

  return (
    <div
      className={`img-skeleton-container w-full rounded-sm ${className}`}
      style={{ aspectRatio }}
    >
      {/* Shimmer skeleton — sits underneath, always rendered */}
      <div
        className="skeleton-shimmer absolute inset-0 rounded-sm"
        aria-hidden="true"
      />

      {/* Real image — cross-fades in over 300ms on load */}
      {src && (
        <img
          ref={handleRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`rounded-sm filter brightness-95 hover:brightness-100 transition-[opacity,filter] duration-300 ${
            loaded ? "img-loaded" : ""
          } ${imgClassName}`}
        />
      )}

      {/* If no src — skeleton stays visible as a placeholder */}
    </div>
  );
}
