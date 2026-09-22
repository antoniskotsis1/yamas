import { useI18n } from '../i18n/i18n'
import { allergenKey } from '../content'
import type { Allergen } from '../content'

export default function Tags({ tags }: { tags: Allergen[] }) {
  const { t } = useI18n()
  return (
    <div className="tags">
      {tags.map((a) => (
        <span key={a} className="tag" title={t(allergenKey[a])}>
          {a}
        </span>
      ))}
    </div>
  )
}
