'use client'

import { globalStyles } from '@/styles/global'
import { getCssText, Heading } from '@ignite-ui/react'

globalStyles()
export default function Home() {
  return (
    <main>
      <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />

      <div>
        <Heading as="h1">Hello World</Heading>
      </div>
    </main>
  )
}
