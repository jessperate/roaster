import LZString from 'lz-string';
import { RoastResult } from './types';

export function encodeRoastForUrl(result: RoastResult): string {
  const json = JSON.stringify(result);
  return LZString.compressToEncodedURIComponent(json);
}

export function decodeRoastFromUrl(encoded: string): RoastResult | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json) as RoastResult;
  } catch {
    return null;
  }
}
