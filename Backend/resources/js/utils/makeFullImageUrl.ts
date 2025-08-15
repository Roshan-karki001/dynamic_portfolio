import { SERVER_URL } from '@/constants/domain'
import React from 'react'

export default function makeFullImageUrl(src) {
  return `${SERVER_URL}/storage/${src}`
}
