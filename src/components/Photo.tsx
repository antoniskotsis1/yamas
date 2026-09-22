import type { Pic } from '../content'

interface Props {
  pic: Pic
  alt?: string
  sizes: string
  /** Above-the-fold image: load eagerly with high fetch priority. */
  priority?: boolean
  pos?: string
}

/** Responsive <picture> (WebP, JPEG fallback) that fills its positioned parent with object-fit: cover. */
export default function Photo({ pic, alt = '', sizes, priority = false, pos }: Props) {
  const fallback = pic.sources.jpg ?? pic.sources.jpeg
  const modern = Object.entries(pic.sources).filter(([format]) => format !== 'jpg' && format !== 'jpeg')
  return (
    <picture>
      {modern.map(([format, srcSet]) => (
        <source key={format} type={`image/${format}`} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={pic.img.src}
        srcSet={fallback}
        sizes={sizes}
        width={pic.img.w}
        height={pic.img.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        style={pos ? { objectPosition: pos } : undefined}
        // React 18 doesn't know `fetchPriority`; the lowercase attribute is passed through as-is.
        {...(priority ? { fetchpriority: 'high' } : {})}
      />
    </picture>
  )
}
