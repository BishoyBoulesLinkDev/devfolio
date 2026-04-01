import Card from '../../ui/Card'
import Button from '../../ui/Button'

export default function EducationCard({ item, onEdit, onDelete }) {
  const years = item.startYear
    ? `${item.startYear}${item.endYear ? ` — ${item.endYear}` : ''}`
    : ''
  return (
    <Card className="p-4 flex justify-between items-start gap-4">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.institution}</h3>
        {(item.degree || item.field) && (
          <p className="text-sm text-gray-600">{[item.degree, item.field].filter(Boolean).join(' · ')}</p>
        )}
        {years && <p className="text-xs text-gray-400 mt-0.5">{years}</p>}
        {item.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>}
      </div>
      <div className="flex gap-1 shrink-0">
        <Button variant="ghost" size="sm" onClick={onEdit}>Edit</Button>
        <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-500 hover:bg-red-50">Delete</Button>
      </div>
    </Card>
  )
}
