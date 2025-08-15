import makeFullImageUrl from './makeFullImageUrl'
import DefaultImage from '@/../../public/images/default-image.png'

/**
 *
 * convert file to image src and return storage path if string
 *
 * @returns
 */
export default function getImageSrc(file) {
    if (file && typeof file === 'string') {
        return makeFullImageUrl(file)
    } else if (typeof window !== 'undefined' && (file instanceof Blob || file instanceof File)) {
        return URL.createObjectURL(file) // Create and return the object URL
    }
    return DefaultImage // Return null if neither condition is met
}
