const LOCALES = ['de', 'en'];

function isLocalizedString(val: unknown): val is Record<string, string> {
  if (!val || typeof val !== 'object') {
    return false;
  }

  const entries = Object.entries(val as Record<string, unknown>);

  return (
    entries.length > 0 &&
    Boolean((val as Record<string, unknown>).en) &&
    entries.every(
      ([key, value]) => key.length === 2 && typeof value === 'string'
    )
  );
}

function enrichWithLocalizationKeys(val: Record<string, string>) {
  const defaultValue = val.en ?? '';

  for (const locale of LOCALES) {
    if (!val[locale]) {
      val[locale] = defaultValue;
    }
  }
}

export function enrichAllWithLocalizationKeys(object: unknown): void {
  if (!object || typeof object !== 'object') {
    return;
  }

  Object.values(object as Record<string, unknown>).forEach(value => {
    if (!value || typeof value !== 'object') {
      return;
    }

    if (isLocalizedString(value)) {
      enrichWithLocalizationKeys(value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(item => {
        if (isLocalizedString(item)) {
          enrichWithLocalizationKeys(item);
        } else {
          enrichAllWithLocalizationKeys(item);
        }
      });
      return;
    }

    enrichAllWithLocalizationKeys(value);
  });
}
