import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'
import Button from '../components/ui/Button'

const features = [
  {
    icon: '🚀',
    title: 'Projects Showcase',
    description: 'Highlight your best work with links, screenshots, and tech stacks.',
  },
  {
    icon: '🛠',
    title: 'Skills Matrix',
    description: 'Display your technical skills organized by category and proficiency.',
  },
  {
    icon: '💼',
    title: 'Work Experience',
    description: 'A clean timeline of your career history.',
  },
  {
    icon: '🎓',
    title: 'Education & Certs',
    description: 'Showcase degrees, certifications, and completed courses.',
  },
  {
    icon: '🎯',
    title: 'Activities & Hobbies',
    description: 'Show who you are beyond code — contributions, hobbies, volunteering.',
  },
  {
    icon: '🔗',
    title: 'Shareable URL',
    description: 'Get a public portfolio at devfolio.app/u/yourname instantly.',
  },
]

export default function LandingPage() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <span className="inline-block bg-primary-50 text-primary-600 text-sm font-medium px-3 py-1 rounded-full mb-4">
          Built for developers
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
          Your portfolio,<br />
          <span className="text-primary-600">built in minutes</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          DevFolio is the easiest way for programmers to create a professional portfolio — projects, skills, experience, education, and more.
        </p>
        <div className="flex items-center justify-center gap-4">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button size="lg">Create your portfolio — free</Button>
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium">
                Sign in →
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Everything you need to stand out
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
        <p className="text-gray-600 mb-8">Join other developers and get a portfolio that works for you.</p>
        {!isAuthenticated && (
          <Link to="/register">
            <Button size="lg">Create your free portfolio</Button>
          </Link>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center text-sm text-gray-400">
        DevFolio — Built with React & Spring Boot
      </footer>
    </div>
  )
}
