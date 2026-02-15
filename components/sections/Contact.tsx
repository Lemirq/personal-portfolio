'use client';
import { SOCIAL_LINKS } from "@/components/social-links";
import Form from "@/components/Form";
import posthog from 'posthog-js';

const contact = SOCIAL_LINKS;

const Contact = () => {
  const handleSocialLinkClick = (label: string, url: string) => {
    posthog.capture('social_link_clicked', {
      platform: label,
      url: url,
    });
  };

  return (
    <section
      className="max-w-6xl mx-auto py-32 pb-16 fc px-5 md:px-10 relative z-10"
      id="contact"
    >
      <h2 className="text-4xl md:text-6xl font-bold text-center bg-clip-text text-transparent bg-linear-to-b from-neutral-50 to-neutral-400 bg-opacity-50 tracking-tight font-serif">
        Ready to take your project <br /> to the next level?
      </h2>
      <div className="max-w-3xl mx-auto mt-10 text-center mb-10">
        <p className="text-lg text-neutral-300">
          I'm always looking for interesting new projects and collaborations. <br />
          Let's talk about how we can work together to achieve your goals—or
          just connect for a quick chat.
        </p>
      </div>

      <div className="fc md:fr gap-5 lg:gap-10	w-full">
        <ul className="fr flex-wrap sm:fc gap-2 sm:flex-nowrap sm:gap-4 text-xl sm:text-3xl">
          {contact.map(({ label, icon, url }) => (
            <li
              key={label}
              data-cursor="fill"
              className="transition-transform hover:-translate-y-1"
            >
              <a
                className="fr gap-1"
                href={url}
                target="blank"
                onClick={() => handleSocialLinkClick(label, url)}
              >
                {icon}
                {label !== "X" ? label : ""}
              </a>
            </li>
          ))}
        </ul>
        <div className="mx-4 text-white/45">or</div>
        <Form />
      </div>
    </section>
  );
};

export default Contact;
