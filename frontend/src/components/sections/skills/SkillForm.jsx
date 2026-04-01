import { useForm } from 'react-hook-form'
import Input from '../../ui/Input'
import Select from '../../ui/Select'
import Button from '../../ui/Button'

const proficiencyOptions = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
  { value: 'EXPERT', label: 'Expert' },
]

export default function SkillForm({ item, onSave, onCancel, isSaving }) {
  const { register, handleSubmit } = useForm({ defaultValues: item })
  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input label="Skill *" placeholder="React" {...register('name')} required />
        <Input label="Category" placeholder="Frontend" {...register('category')} />
        <Select label="Proficiency" options={proficiencyOptions} {...register('proficiency')} />
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
        <Button type="submit" size="sm" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}
