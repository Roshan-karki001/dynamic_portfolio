import appendCurrency from '@/utils/appendCurrency'
import pdfMake from 'pdfmake/build/pdfmake'
import { VFS } from '../vfs_fonts'
import { formatDate } from '@/utils/formatDate'
pdfMake.vfs = VFS

pdfMake.fonts = {
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf',
    },
}

const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'

    return new Promise((resolve, reject) => {
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')

            if (ctx) {
                ctx.drawImage(img, 0, 0)
                const dataUrl = canvas.toDataURL()
                resolve(dataUrl) // This resolves with the base64 string
            } else {
                reject(new Error('Failed to get canvas context'))
            }
        }

        img.onerror = (error) => {
            reject(error)
        }

        img.src = imageUrl
    })
}
