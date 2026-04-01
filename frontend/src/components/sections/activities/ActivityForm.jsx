import { useForm } from 'react-hook-form'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'
import Select from '../../ui/Select'
import Button from '../../ui/Button'

const categoryOptions = [
  { value: 'HOBBY', label: 'Hobby' },
  { value: 'CONTRIBUTION', label: 'Contribution' },
  { value: 'VOLUNTEERING', label: 'Volunteering' },
  { value: 'OTHER', label: 'Other' },
]

export default function ActivityForm({ item, onSave, onCancel, isSaving }) {
  const { register, handleSubmit } = useForm({ defaultValues: item })
  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Title *" placeholder="Open Source Contributor" {...register('title')} required />
        <Select label="Category" options={categoryOptions} {...register('category')} />
        <Input label="URL" placeholder="https://..." {...register('url')} />
        <Input label="Display Order" type="number" {...register('displayOrder', { valueAsNumber: true })} />
      </div>
      <Textarea label="Description" placeholder="Describe this activity..." {...register('description')} />
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
        <Button type="submit" size="sm" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}
