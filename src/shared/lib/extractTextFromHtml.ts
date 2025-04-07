import * as cheerio from 'cheerio'

interface ExtractOptions {
  maxLength?: number
}

export function extractTextFromHtml(html: string, options?: ExtractOptions): string {
  if (!html) return ''

  const $ = cheerio.load(html)
  const rawText = $.text().replace(/\s+/g, ' ').trim() // 공백 정리

  if (options?.maxLength && rawText.length > options.maxLength) {
    return rawText.slice(0, options.maxLength) + '...'
  }

  return rawText
}
