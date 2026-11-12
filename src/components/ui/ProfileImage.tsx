import { useState } from "react";
import { site } from "@/data/site";

type Variant = "portrait" | "avatar";

interface ProfileImageProps {
  /** "portrait" fills a tall frame (About). "avatar" zooms in on the face for round frames (Hero). */
  variant?: Variant;
  className?: string;
}

/**
 * The single place your photo is rendered. To change the photo, replace public/profile.jpg
 * (or edit `profileImage`, `profileImageFocus` and `profileAvatarZoom` in src/data/site.ts).
 * If the file is missing or fails to load, a clean placeholder is shown instead.
 */
export function ProfileImage({ variant = "portrait", className = "" }: ProfileImageProps) {
  const [failed, setFailed] = useState(false);
  const { profileImage, profileImageFocus, profileAvatarZoom, name } = site;

  if (profileImage && !failed) {
    const zoomed = variant === "avatar" && profileAvatarZoom > 1;
    return (
      <img
        src={profileImage}
        alt={`Portrait of ${name}`}
        width={720}
        height={900}
        loading={variant === "avatar" ? "eager" : "lazy"}
        decoding="async"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${className}`}
        style={{
          objectPosition: profileImageFocus,
          transformOrigin: profileImageFocus,
          transform: zoomed ? `scale(${profileAvatarZoom})` : undefined,
        }}
      />
    );
  }

  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label="Profile photo placeholder"
      className={`h-full w-full ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="500" fill="#B7AD98" />
      <circle cx="200" cy="190" r="62" fill="#F5F1E8" opacity="0.85" />
      <path d="M58 500 C58 385 125 322 200 322 S342 385 342 500 Z" fill="#F5F1E8" opacity="0.85" />
    </svg>
  );
}
