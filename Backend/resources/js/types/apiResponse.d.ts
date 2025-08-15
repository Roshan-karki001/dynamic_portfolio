interface PaginatedData<T> {
    data: T[]
    current_page: number
    per_page: number
    total: number
}
interface PaginatedResponse {
    success: string
    message: string
    data: PaginatedData
}
interface ApiResponse  {
    success: string
    message: string
    data: any
}



