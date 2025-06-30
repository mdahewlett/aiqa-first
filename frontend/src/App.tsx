import { Send } from 'lucide-react'
import { Button } from './components/ui/button'
import { Textarea } from './components/ui/textarea'
import { Card, CardContent } from './components/ui/card'
import { useState } from 'react'

function App() {

  const [response, setResponse] = useState("")  
  const [query, setQuery] = useState("")

  const handleSubmit = async () => {
    if (!query.trim()) {
      setResponse('')
      setQuery('')
    }

    try {
      const res = await fetch(`http://localhost:8000/chat?query=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResponse(data.response)
    } catch (err) {
      console.error("API error:", err)
      setResponse("Something went wrong.")
    }

    setQuery("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className='px-3 py-2 text-muted-foreground md:text-sm italic'>
        <p>Sometimes you have to start by seeing it</p>
      </div>
      <div className='flex flex-col justify-center h-full gap-10 w-1/2 mx-auto'>
        {response && <Card>
          <CardContent>
            <p className='whitespace-pre-wrap '>{response}</p>
          </CardContent>
        </Card>}
        <div className='flex items-center gap-2 border rounded-md px-3 py-2'>
          <Textarea 
            className='resize-none border-0 shadow-none focus-visible:border-0 focus-visible:ring-0 px-0 py-0'
            placeholder='Ask me anything'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            />
          <Button variant="secondary" size="icon" onClick={handleSubmit}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
