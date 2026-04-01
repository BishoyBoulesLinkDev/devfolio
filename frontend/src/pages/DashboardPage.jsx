import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import ProfileForm from '../components/sections/ProfileForm'
import SectionManager from '../components/sections/SectionManager'
import ProjectForm from '../components/sections/projects/ProjectForm'
import ProjectCard from '../components/sections/projects/ProjectCard'
import SkillForm from '../components/sections/skills/SkillForm'
import SkillCard from '../components/sections/skills/SkillCard'
import ExperienceForm from '../components/sections/experience/ExperienceForm'
import ExperienceCard from '../components/sections/experience/ExperienceCard'
import EducationForm from '../components/sections/education/EducationForm'
import EducationCard from '../components/sections/education/EducationCard'
import ActivityForm from '../components/sections/activities/ActivityForm'
import ActivityCard from '../components/sections/activities/ActivityCard'
import { projectsApi, skillsApi, experiencesApi, educationsApi, activitiesApi } from '../api/portfolio'

const TABS = [
  { id: 'profile', label: 'Profile' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'activities', label: 'Activities' },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const { username } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Portfolio</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Public URL:{' '}
              <Link to={`/u/${username}`} className="text-primary-600 hover:underline">
                /u/{username}
              </Link>
            </p>
          </div>
          <Link
            to={`/u/${username}`}
            className="text-sm text-primary-600 border border-primary-200 px-3 py-1.5 rounded-lg hover:bg-primary-50 transition-colors"
            target="_blank"
          >
            Preview Portfolio
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <nav className="md:w-48 shrink-0">
            <ul className="flex md:flex-col gap-1">
              {TABS.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="flex-1 min-w-0 bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {TABS.find((t) => t.id === activeTab)?.label}
            </h2>

            {activeTab === 'profile' && <ProfileForm />}

            {activeTab === 'projects' && (
              <SectionManager
                queryKey="projects"
                api={projectsApi}
                ItemForm={ProjectForm}
                ItemCard={ProjectCard}
                emptyText="No projects yet. Add your first project!"
              />
            )}

            {activeTab === 'skills' && (
              <SectionManager
                queryKey="skills"
                api={skillsApi}
                ItemForm={SkillForm}
                ItemCard={SkillCard}
                emptyText="No skills yet. Add your technical skills!"
              />
            )}

            {activeTab === 'experience' && (
              <SectionManager
                queryKey="experiences"
                api={experiencesApi}
                ItemForm={ExperienceForm}
                ItemCard={ExperienceCard}
                emptyText="No work experience yet."
              />
            )}

            {activeTab === 'education' && (
              <SectionManager
                queryKey="educations"
                api={educationsApi}
                ItemForm={EducationForm}
                ItemCard={EducationCard}
                emptyText="No education entries yet."
              />
            )}

            {activeTab === 'activities' && (
              <SectionManager
                queryKey="activities"
                api={activitiesApi}
                ItemForm={ActivityForm}
                ItemCard={ActivityCard}
                emptyText="No activities yet. Add hobbies, contributions, or volunteering!"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
