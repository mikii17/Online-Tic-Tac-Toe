import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';

export default function useAvatarUri(seed: string) {
  return useMemo(() => {
    return createAvatar(thumbs, {
      seed,
      size: 64,
    }).toDataUriSync();;
  }, [seed]);
}
