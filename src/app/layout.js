import './globals.css'

export const metadata = {
  title: 'Fitness Prompt Builder',
  description: 'Create personalized AI fitness and running prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
