import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { thumbs, botttsNeutral } from '@dicebear/collection';

export default function useAvatarUri(seed: string) {
  return useMemo(() => {
    return createAvatar(botttsNeutral, {
      seed,
      size: 64,
    }).toDataUriSync();;
  }, [seed]);
}
