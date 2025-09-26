import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface EventPayload {
  title: string
  description: string
  date: string
  category: 'work' | 'personal' | 'other'
}

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Events'],
  endpoints: (builder) => ({
    getEvents: builder.query<any[], { category?: 'work' | 'personal' } | void>({
      query: (args) => {
        const category = (args as any)?.category
        return category ? `/events?category=${category}` : '/events'
      },
      providesTags: ['Events'],
    }),
    getEvent: builder.query<any, string>({
      query: (id) => `/events/${id}`,
      providesTags: ['Events'],
    }),
    createEvent: builder.mutation<any, EventPayload>({
      query: (body) => ({
        url: '/events/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Events'],
    }),
    updateEvent: builder.mutation<any, { id: string; data: EventPayload }>({
      query: ({ id, data }) => ({
        url: `/events/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Events'],
    }),
    deleteEvent: builder.mutation<any, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Events'],
    }),
  }),
})

export const {
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi


