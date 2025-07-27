'use client'
import { calculateType } from '@/_frontend/shared/lib/ts-code-compiler'
import { useEffect } from 'react'

export default function TestPage() {
  useEffect(() => {
    calculateType(
      "type If<C> = C extends `${infer A}.${infer B}` ? [A, B]: never; type T = If<'a.b'>",
    ).then((res) => {
      console.log('Type calculation result:', res)
    })
  }, [])
  return <div style={{ maxWidth: '800px', maxHeight: '600px' }}></div>
}
