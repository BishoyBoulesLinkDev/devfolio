import { useForm } from 'react-hook-form'
import Input from '../../ui/Input'
import Textarea from '../../ui/Textarea'
import Button from '../../ui/Button'

export default function ProjectForm({ item, onSave, onCancel, isSaving }) {
  const { register, handleSubmit } = useForm({ defaultValues: item })
  return (
    <form onSubmit={handleSubmit(onSave)} className="flex flex-col gap-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input label="Title *" placeholder="My Awesome Project" {...register('title')} required />
        <Input label="Tech Stack" placeholder="React, Spring Boot, PostgreSQL" {...register('techStack')} />
        <Input label="Repo URL" placeholder="https://github.com/..." {...register('repoUrl')} />
        <Input label="Live URL" placeholder="https://myproject.com" {...register('liveUrl')} />
        <Input label="Image URL" placeholder="https://..." {...register('imageUrl')} />
        <Input label="Display Order" type="number" {...register('displayOrder', { valueAsNumber: true })} />
      </div>
      <Textarea label="Description" placeholder="What does this project do?" {...register('description')} />
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>Cancel</Button>
        <Button type="submit" size="sm" disabled={isSaving}>{isSaving ? 'Saving...' : 'Save'}</Button>
      </div>
    </form>
  )
}
