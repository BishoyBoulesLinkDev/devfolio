import { useForm } from 'react-hook-form'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProfile, updateProfile } from '../../api/portfolio'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'

export default function ProfileForm() {
  const queryClient = useQueryClient()
  const { data: profile, isLoading } = useQuery({ queryKey: ['profile'], queryFn: getProfile })

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty } } = useForm({
    values: profile || {},
  })

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => queryClient.invalidateQueries(['profile']),
  })

  if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full Name" placeholder="John Doe" {...register('fullName')} />
        <Input label="Location" placeholder="Cairo, Egypt" {...register('location')} />
        <Input label="Website" placeholder="https://johndoe.dev" {...register('website')} />
        <Input label="GitHub" placeholder="github.com/johndoe" {...register('github')} />
        <Input label="LinkedIn" placeholder="linkedin.com/in/johndoe" {...register('linkedin')} />
        <Input label="Twitter / X" placeholder="twitter.com/johndoe" {...register('twitter')} />
        <Input label="Avatar URL" placeholder="https://..." {...register('avatarUrl')} className="sm:col-span-2" />
      </div>
      <Textarea label="Bio" placeholder="Tell the world about yourself..." rows={4} {...register('bio')} />
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting || !isDirty}>
          {isSubmitting ? 'Saving...' : 'Save Profile'}
        </Button>
        {mutation.isSuccess && <span className="text-sm text-green-600">Saved!</span>}
      </div>
    </form>
  )
}
