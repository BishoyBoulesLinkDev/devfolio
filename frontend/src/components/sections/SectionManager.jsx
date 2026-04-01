import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Button from '../ui/Button'
import Card from '../ui/Card'

/**
 * Generic section manager: fetches a list, shows items, and lets user add/edit/delete.
 *
 * Props:
 *  - queryKey: string (e.g. 'projects')
 *  - api: { getAll, create, update, remove }
 *  - ItemForm: component({ item, onSave, onCancel })
 *  - ItemCard: component({ item, onEdit, onDelete })
 *  - emptyText: string
 */
export default function SectionManager({ queryKey, api, ItemForm, ItemCard, emptyText }) {
  const queryClient = useQueryClient()
  const [editingItem, setEditingItem] = useState(null) // null = not editing, {} = new, {...} = existing
  const [showForm, setShowForm] = useState(false)

  const { data: items = [], isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: api.getAll,
  })

  const createMutation = useMutation({
    mutationFn: api.create,
    onSuccess: () => { queryClient.invalidateQueries([queryKey]); setShowForm(false) },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.update(id, data),
    onSuccess: () => { queryClient.invalidateQueries([queryKey]); setEditingItem(null) },
  })

  const deleteMutation = useMutation({
    mutationFn: api.remove,
    onSuccess: () => queryClient.invalidateQueries([queryKey]),
  })

  const handleSave = (data) => {
    if (editingItem?.id) {
      updateMutation.mutate({ id: editingItem.id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  if (isLoading) return <p className="text-sm text-gray-500">Loading...</p>

  return (
    <div className="flex flex-col gap-4">
      {items.length === 0 && !showForm && (
        <p className="text-sm text-gray-400 italic">{emptyText}</p>
      )}

      {items.map((item) =>
        editingItem?.id === item.id ? (
          <Card key={item.id} className="p-4">
            <ItemForm
              item={editingItem}
              onSave={handleSave}
              onCancel={() => setEditingItem(null)}
              isSaving={updateMutation.isPending}
            />
          </Card>
        ) : (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={() => setEditingItem(item)}
            onDelete={() => deleteMutation.mutate(item.id)}
          />
        )
      )}

      {showForm && !editingItem && (
        <Card className="p-4">
          <ItemForm
            item={{}}
            onSave={handleSave}
            onCancel={() => setShowForm(false)}
            isSaving={createMutation.isPending}
          />
        </Card>
      )}

      {!showForm && !editingItem && (
        <Button
          variant="secondary"
          size="sm"
          className="self-start"
          onClick={() => { setShowForm(true); setEditingItem(null) }}
        >
          + Add
        </Button>
      )}
    </div>
  )
}
