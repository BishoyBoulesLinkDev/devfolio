import { useForm } from 'react-hook-form'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'
import Button from '../../ui/Button'

export default function EducationForm({ item, onSave, onCancel, isSaving }) {
  const { register, handleSubmit } = useForm({ defaultValues: item })
  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Institution *" placeholder="Cairo University" {...register('institution')} required />
        <Input label="Degree" placeholder="B.Sc. Computer Science" {...register('degree')} />
        <Input label="Field of Study" placeholder="Computer Science" {...register('field')} />
        <div className="grid grid-cols-2 gap-2">
          <Input label="Start Year" type="number" placeholder="2019" {...register('startYear', { valueAsNumber: true })} />
          <Input label="End Year" type="number" placeholder="2023" {...register('endYear', { valueAsNumber: true })} />
        </div>
      </div>
      <Textarea label="Notes" placeholder="Achievements, honors, relevant coursework..." {...register('description')} />
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
        <Button type="submit" size="sm" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}
