import React from 'react'
import './styles.css'

export const metadata = {
  description: 'OK Mission Tennis Club - Kelowna, BC',
  title: 'OK Mission Tennis Club',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
