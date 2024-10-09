// app/providers.tsx
'use client'

import {NextUIProvider as Provider} from '@nextui-org/system'

export function NextUIProvider({children}: { children: React.ReactNode }) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}