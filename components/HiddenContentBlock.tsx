import { client } from "@/sanity/lib/client";
import { extractTextFromBlockContent } from "@/utils/extractTextFromBlockContent";

/**
 * HiddenContentBlock component
 *
 * Renders all key textual content from Sanity CMS in a hidden div for LLM and crawler accessibility.
 * This ensures that content loaded interactively or hidden behind hover effects is accessible
 * in the HTML source for search engines and AI crawlers.
 *
 * The component is server-rendered and updates automatically when Sanity content changes.
 */
export default async function HiddenContentBlock() {
  // Fetch all main textual content from Sanity
  const [projects, about, tech, iknow] = await Promise.all([
    client.fetch<project[]>(`
      *[_type == "project" && !invisible]{
        _id,
        title,
        headline,
        description,
        url,
        overview,
        tech
      }
    `),
    client.fetch<about[]>(`
      *[_type == "about"]{
        heading,
        body
      }
    `),
    client.fetch<tech[]>(`
      *[_type == "tech"]{
        _id,
        techName
      }
    `),
    client.fetch<iknow[]>(`
      *[_type == "iknow"]{
        _id,
        title
      }
    `),
  ]);
  const aboutData = about[0];

  return (
    <div
      style={{ display: "none" }}
      aria-hidden="true"
      data-purpose="llm-seo-content"
    >
      {/* About Section */}
      {aboutData && (
        <section>
          <h2>{aboutData.heading}</h2>
          <div>{extractTextFromBlockContent(aboutData.body)}</div>
        </section>
      )}

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section>
          <h2>Projects</h2>
          {projects.map((project) => (
            <article key={project._id}>
              <h3>{project.title}</h3>
              {project.headline && <p>{project.headline}</p>}
              {project.description && <p>{project.description}</p>}
              {project.url && <a href={project.url}>{project.url}</a>}
              {project.overview && (
                <div>{extractTextFromBlockContent(project.overview)}</div>
              )}
              {project.tech && project.tech.length > 0 && (
                <ul>
                  {project.tech.map((t, idx) => {
                    return (
                      <li key={idx}>
                        {tech.find((techItem) => techItem._id === t._ref)
                          ?.techName || ""}
                      </li>
                    );
                  })}
                </ul>
              )}
            </article>
          ))}
        </section>
      )}

      {/* Technologies Section */}
      {tech && tech.length > 0 && (
        <section>
          <h2>Technologies</h2>
          <ul>
            {tech.map((t) => (
              <li key={t._id}>{t.techName}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills Section */}
      {iknow && iknow.length > 0 && (
        <section>
          <h2>Skills</h2>
          <ul>
            {iknow.map((skill) => (
              <li key={skill._id}>{skill.title}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
