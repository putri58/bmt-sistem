
import "./FloatingSocialMedia.css";

const socialMedia = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/bmt.alittihad?cplk=MTUzejFsMG9sd2FjcQ==", // Isi link Instagram resmi
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61571418196217", // Isi link Facebook resmi
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13.5 21v-8h2.8l.4-3h-3.2V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "WhatsApp",
    url: "", // Isi link WhatsApp resmi
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4A8 8 0 1 1 20 11.7Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 8.5c.3-.6.6-.6.9-.6l.7 1.7-.8 1c.7 1.3 1.5 2.1 2.8 2.7l.9-.9 1.7.8c.1.8-.5 1.6-1.3 1.7-2.5.2-6.7-3.8-6.3-5.9.1-.2.6-.5 1.4-.5Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@ksppsbmtal-ittihad3812?si=6-v8pHn_fF_Cul3_", // Isi link YouTube resmi
    color: "#FF0000",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="4" fill="currentColor" />
        <path d="m10 9 5 3-5 3z" fill="#fff" />
      </svg>
    ),
  },
];

export default function FloatingSocialMedia() {
  const activeSocials = socialMedia.filter(
    (item) => item.url.trim() !== ""
  );

  if (activeSocials.length === 0) return null;

  return (
    <div className="floating-social-dock" aria-label="Media sosial BMT Al-Ittihad">
      <span className="floating-social-label">Media Sosial</span>

      {activeSocials.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-social-link"
          style={{ "--social-color": item.color }}
          aria-label={`Kunjungi ${item.name} BMT Al-Ittihad`}
          title={item.name}
        >
          {item.icon}
          <span className="floating-social-tooltip">{item.name}</span>
        </a>
      ))}
    </div>
  );
}
