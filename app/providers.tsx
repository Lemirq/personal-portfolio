'use client';
import { PostHogProvider } from '@/components/PostHogProvider';

import { MainStoreProvider } from '@/stores/main-state-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <MainStoreProvider>{children}</MainStoreProvider>
    </PostHogProvider>
  );
}