'use client'

import { useState } from 'react'
import type React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MessageSquare, Send, Clock, Trash } from 'lucide-react'
import { formatDate } from '@/utils/format-date'
import { postNote } from '@/actions/post-note'
import { deleteNote } from '@/actions/delete-note'
import type { Note } from '@/db/schema.server'

type Props = {
  contactId: number
  initialNotes: Note[]
}

function Notes({ contactId, initialNotes }: Props) {
  const [noteContent, setNoteContent] = useState('')
  const queryClient = useQueryClient()

  const { data: notes } = useQuery({
    queryKey: ['notes', contactId],
    queryFn: async () => {
      const currentData = queryClient.getQueryData<Note[]>(['notes', contactId])
      return currentData || initialNotes
    },
    initialData: initialNotes,
  })

  const addNoteMutation = useMutation({
    mutationFn: (content: string) => postNote(contactId, content),

    onMutate: async (content) => {
      await queryClient.cancelQueries({ queryKey: ['notes', contactId] })

      const previousNotes = queryClient.getQueryData(['notes', contactId])

      const optimisticNote: Note = {
        id: Date.now(),
        contactId,
        content,
        createdAt: new Date(),
      }

      queryClient.setQueryData(['notes', contactId], (old: Note[]) => [
        optimisticNote,
        ...old,
      ])

      return { previousNotes }
    },

    onError: (err, content, context) => {
      console.error('Error adding note:', err)
      queryClient.setQueryData(['notes', contactId], context?.previousNotes)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', contactId] })
    },
  })

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: number) => deleteNote(noteId),

    onMutate: async (noteId) => {
      await queryClient.cancelQueries({ queryKey: ['notes', contactId] })

      const previousNotes = queryClient.getQueryData(['notes', contactId])

      queryClient.setQueryData(['notes', contactId], (old: Note[]) =>
        old.filter((note) => note.id !== noteId),
      )

      return { previousNotes }
    },

    onError: (err, noteId, context) => {
      console.error('Error deleting note:', err)
      queryClient.setQueryData(['notes', contactId], context?.previousNotes)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['notes', contactId] })
    },
  })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (noteContent.trim()) {
      addNoteMutation.mutate(noteContent)
      setNoteContent('')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Notes ({notes.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-3" onSubmit={handleSubmit}>
          <Textarea
            placeholder="Add a note..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            className="resize-none"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={!noteContent.trim() || addNoteMutation.isPending}
            >
              <Send className="mr-2 h-4 w-4" />
              {addNoteMutation.isPending ? 'Adding...' : 'Add Note'}
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <MessageSquare className="mx-auto mb-3 h-12 w-12 opacity-30" />
              <p>No notes yet. Add the first note above.</p>
            </div>
          ) : (
            notes
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map((note) => (
                <div
                  key={note.id}
                  className="flex gap-3 rounded-lg bg-gray-50 p-4"
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-blue-100 text-xs text-blue-700">
                      A
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          Admin
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatDate(note.createdAt)}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-gray-500 hover:text-red-500"
                        onClick={() => deleteNoteMutation.mutate(note.id)}
                        disabled={deleteNoteMutation.isPending}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
                      {note.content}
                    </p>
                  </div>
                </div>
              ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export { Notes }
