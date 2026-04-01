import Card from '../../ui/Card'
import Button from '../../ui/Button'

const proficiencyColor = {
  BEGINNER: 'bg-gray-100 text-gray-600',
  INTERMEDIATE: 'bg-blue-100 text-blue-700',
  ADVANCED: 'bg-purple-100 text-purple-700',
  EXPERT: 'bg-green-100 text-green-700',
}

export default function SkillCard({ item, onEdit, onDelete }) {
  return (
    <Card className="p-3 flex justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-900 text-sm">{item.name}</span>
        {item.category && <span className="text-xs text-gray-400">{item.category}</span>}
        {item.proficiency && (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${proficiencyColor[item.proficiency] || 'bg-gray-100'}`}>
            {item.proficiency.charAt(0) + item.proficiency.slice(1).toLowerCase()}
          </span>
        )}
      </div>
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={onEdit}>Edit</Button>
        <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-500 hover:bg-red-50">Delete</Button>
      </div>
    </Card>
  )
}
