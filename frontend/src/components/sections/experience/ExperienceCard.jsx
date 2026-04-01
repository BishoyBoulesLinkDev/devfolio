import Card from '../../ui/Card'
import Button from '../../ui/Button'

export default function ExperienceCard({ item, onEdit, onDelete }) {
  const period = item.startDate
    ? `${item.startDate} — ${item.isCurrent ? 'Present' : (item.endDate || '')}`
    : ''
  return (
    <Card className="p-4 flex justify-between items-start gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">{item.role}</h3>
          {item.isCurrent && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Current</span>
          )}
        </div>
        <p className="text-sm text-gray-600">{item.company}</p>
        {period && <p className="text-xs text-gray-400 mt-0.5">{period}</p>}
        {item.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>}
      </div>
      <div className="flex gap-1 shrink-0">
        <Button variant="ghost" size="sm" onClick={onEdit}>Edit</Button>
        <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-500 hover:bg-red-50">Delete</Button>
      </div>
    </Card>
  )
}
