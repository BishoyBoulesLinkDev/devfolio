import { useForm } from 'react-hook-form'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'
import Button from '../../ui/Button'

export default function ExperienceForm({ item, onSave, onCancel, isSaving }) {
  const { register, handleSubmit, watch } = useForm({ defaultValues: item })
  const isCurrent = watch('isCurrent')

  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Company *" placeholder="Acme Corp" {...register('company')} required />
        <Input label="Role *" placeholder="Senior Software Engineer" {...register('role')} required />
        <Input label="Start Date" type="date" {...register('startDate')} />
        {!isCurrent && <Input label="End Date" type="date" {...register('endDate')} />}
        <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer sm:col-span-2">
          <input type="checkbox" {...register('isCurrent')} className="rounded" />
          Currently working here
        </label>
      </div>
      <Textarea label="Description" placeholder="What did you do?" {...register('description')} />
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
        <Button type="submit" size="sm" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}
