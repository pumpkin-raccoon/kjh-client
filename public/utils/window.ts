export const isRenderingServer = typeof window === 'undefined'
export const isRenderingClient = typeof window !== 'undefined'
