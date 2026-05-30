import type { PublishRecord } from '../adapters/types';

const HISTORY_STORAGE_KEY = 'creator_publish_assistant_history_v1';
const MAX_HISTORY_COUNT = 30;

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

export function loadPublishHistory(): PublishRecord[] {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as PublishRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePublishRecord(record: PublishRecord): PublishRecord[] {
  const nextRecords = [record, ...loadPublishHistory()].slice(0, MAX_HISTORY_COUNT);

  if (canUseStorage()) {
    window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextRecords));
  }

  return nextRecords;
}

export function clearPublishHistory(): void {
  if (canUseStorage()) {
    window.localStorage.removeItem(HISTORY_STORAGE_KEY);
  }
}
