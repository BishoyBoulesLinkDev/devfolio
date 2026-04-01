import Card from '../../ui/Card'
import Button from '../../ui/Button'

const categoryColor = {
  HOBBY: 'bg-orange-100 text-orange-700',
  CONTRIBUTION: 'bg-blue-100 text-blue-700',
  VOLUNTEERING: 'bg-teal-100 text-teal-700',
  OTHER: 'bg-gray-100 text-gray-600',
}

export default function ActivityCard({ item, onEdit, onDelete }) {
  return (
    <Card className="p-4 flex justify-between items-start gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          {item.category && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColor[item.category] || 'bg-gray-100'}`}>
              {item.category.charAt(0) + item.category.slice(1).toLowerCase()}
            </span>
          )}
        </div>
        {item.description && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>}
        {item.url && <a href={item.url} target="_blank" rel="noreferrer" className="text-xs text-gray-400 hover:underline mt-1 block">{item.url}</a>}
      </div>
      <div className="flex gap-1 shrink-0">
        <Button variant="ghost" size="sm" onClick={onEdit}>Edit</Button>
        <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-500 hover:bg-red-50">Delete</Button>
      </div>
    </Card>
  )
}
