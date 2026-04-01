import Card from '../../ui/Card'
import Button from '../../ui/Button'

export default function ProjectCard({ item, onEdit, onDelete }) {
  return (
    <Card className="p-4 flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900">{item.title}</h3>
        {item.techStack && <p className="text-xs text-primary-600 mt-0.5">{item.techStack}</p>}
        {item.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>}
        <div className="flex gap-3 mt-2">
          {item.repoUrl && <a href={item.repoUrl} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:underline">Repo</a>}
          {item.liveUrl && <a href={item.liveUrl} target="_blank" rel="noreferrer" className="text-xs text-gray-500 hover:underline">Live</a>}
        </div>
      </div>
      <div className="flex gap-1 shrink-0">
        <Button variant="ghost" size="sm" onClick={onEdit}>Edit</Button>
        <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-500 hover:bg-red-50">Delete</Button>
      </div>
    </Card>
  )
}
