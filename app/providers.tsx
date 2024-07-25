// app/providers.tsx
'use client';

import { MainStoreProvider } from '@/stores/main-state-provider';

export function Providers({ children }: { children: React.ReactNode }) {
	return <MainStoreProvider>{children}</MainStoreProvider>;
}
