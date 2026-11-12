/**
 * Central place for personal details. Edit the values marked EDIT.
 */
export const site = {
  name: "Fizza Sarfraz",
  brand: "FIZZA.",
  title: "AI Developer & Machine Learning Engineer",

  email: "fizzasarfraz515@gmail.com",
  linkedin: "https://www.linkedin.com/in/fizza-sarfraz-45aa052a2/",
  fiverr: "https://www.fiverr.com/sellers/fizzasarfraz1",
  github: "https://github.com/fizzasarfraz515",

  // EDIT: shown in the About section. Change or remove if you prefer.
  location: "Islamabad, Pakistan",

  // Your photo lives at public/profile.jpg. Replace that file to change it.
  profileImage: "/profile.jpg",
  // Where the face sits in the photo (x% y%). Used to keep it centred when the photo is cropped.
  profileImageFocus: "54% 40%",
  // Zoom for the round photo in the hero (1 = no zoom).
  profileAvatarZoom: 1.9,
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const roles = [
  "AI Developer",
  "Machine Learning Engineer",
  "Python Developer",
  "Computer Vision Developer",
  "Aspiring AI Researcher",
];

/** "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x" */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
