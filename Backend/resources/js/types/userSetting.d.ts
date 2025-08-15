interface UserSetting {
    id: number
    name: string
    contact_number: string
    email: string
    address: string
    bio: string
    user_type: string
    profile_picture_url: string
    social_links: { facebook?: string; instagram?: string; whatsapp?: string; linkedin?: string } | null
}
