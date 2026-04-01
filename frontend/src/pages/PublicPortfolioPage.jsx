import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getPublicPortfolio } from '../api/portfolio'

const proficiencyColor = {
  BEGINNER: 'bg-gray-100 text-gray-600',
  INTERMEDIATE: 'bg-blue-100 text-blue-700',
  ADVANCED: 'bg-purple-100 text-purple-700',
  EXPERT: 'bg-green-100 text-green-700',
}

const activityColor = {
  HOBBY: 'bg-orange-100 text-orange-700',
  CONTRIBUTION: 'bg-blue-100 text-blue-700',
  VOLUNTEERING: 'bg-teal-100 text-teal-700',
  OTHER: 'bg-gray-100 text-gray-600',
}

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">{title}</h2>
      {children}
    </section>
  )
}

export default function PublicPortfolioPage() {
  const { username } = useParams()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['public-portfolio', username],
    queryFn: () => getPublicPortfolio(username),
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading portfolio...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600 text-lg">Portfolio not found.</p>
        <Link to="/" className="text-primary-600 hover:underline text-sm">← Back to home</Link>
      </div>
    )
  }

  const { profile, projects, skills, experiences, educations, activities } = data

  return (
    <div className="min-h-screen bg-white">
      {/* Header bar */}
      <header className="border-b border-gray-100 py-3 px-6">
        <Link to="/" className="text-primary-600 font-bold">DevFolio</Link>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Hero / Profile */}
        <div className="flex items-start gap-6 mb-10">
          {profile?.avatarUrl && (
            <img
              src={profile.avatarUrl}
              alt={profile.fullName || username}
              className="w-20 h-20 rounded-full object-cover shrink-0 border-2 border-gray-200"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile?.fullName || username}</h1>
            {profile?.location && <p className="text-gray-500 text-sm mt-0.5">{profile.location}</p>}
            {profile?.bio && <p className="text-gray-700 mt-2 leading-relaxed">{profile.bio}</p>}
            <div className="flex flex-wrap gap-3 mt-3">
              {profile?.website && <a href={profile.website} target="_blank" rel="noreferrer" className="text-sm text-primary-600 hover:underline">Website</a>}
              {profile?.github && <a href={`https://${profile.github.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:underline">GitHub</a>}
              {profile?.linkedin && <a href={`https://${profile.linkedin.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:underline">LinkedIn</a>}
              {profile?.twitter && <a href={`https://${profile.twitter.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:underline">Twitter</a>}
            </div>
          </div>
        </div>

        {/* Skills */}
        {skills?.length > 0 && (
          <Section title="Skills">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${proficiencyColor[skill.proficiency] || 'bg-gray-100 text-gray-700'}`}
                >
                  {skill.name}
                  {skill.category && <span className="opacity-60 ml-1">· {skill.category}</span>}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <Section title="Projects">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                  {p.imageUrl && (
                    <img src={p.imageUrl} alt={p.title} className="w-full h-36 object-cover rounded-lg mb-3" />
                  )}
                  <h3 className="font-semibold text-gray-900">{p.title}</h3>
                  {p.techStack && <p className="text-xs text-primary-600 mt-0.5">{p.techStack}</p>}
                  {p.description && <p className="text-sm text-gray-600 mt-1">{p.description}</p>}
                  <div className="flex gap-3 mt-2">
                    {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:underline">Repo →</a>}
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:underline">Live →</a>}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <Section title="Work Experience">
            <div className="flex flex-col gap-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-primary-200 pl-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                    {exp.isCurrent && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Current</span>}
                  </div>
                  <p className="text-gray-600 text-sm">{exp.company}</p>
                  {exp.startDate && (
                    <p className="text-xs text-gray-400">
                      {exp.startDate} — {exp.isCurrent ? 'Present' : (exp.endDate || '')}
                    </p>
                  )}
                  {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Education */}
        {educations?.length > 0 && (
          <Section title="Education">
            <div className="flex flex-col gap-4">
              {educations.map((edu) => (
                <div key={edu.id} className="border-l-2 border-gray-200 pl-4">
                  <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                  {(edu.degree || edu.field) && (
                    <p className="text-gray-600 text-sm">{[edu.degree, edu.field].filter(Boolean).join(' · ')}</p>
                  )}
                  {edu.startYear && (
                    <p className="text-xs text-gray-400">{edu.startYear}{edu.endYear ? ` — ${edu.endYear}` : ''}</p>
                  )}
                  {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Activities */}
        {activities?.length > 0 && (
          <Section title="Activities & Hobbies">
            <div className="flex flex-col gap-3">
              {activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3">
                  {act.category && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 mt-0.5 ${activityColor[act.category] || 'bg-gray-100'}`}>
                      {act.category.charAt(0) + act.category.slice(1).toLowerCase()}
                    </span>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{act.title}</h3>
                    {act.description && <p className="text-sm text-gray-600">{act.description}</p>}
                    {act.url && <a href={act.url} target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:underline">{act.url}</a>}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  )
}
