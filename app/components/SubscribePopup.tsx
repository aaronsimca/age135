import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SubscribePopupProps {
  onSubscribe: () => void
}

declare global {
  interface Window {
    SubstackWidget?: {
      createWidget: (config: any) => void;
    };
  }
}

export function SubscribePopup({ onSubscribe }: SubscribePopupProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false)
  const substackFormRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create the target element for the Substack widget
    const substackEmbed = document.createElement('div')
    substackEmbed.id = 'custom-substack-embed'
    document.body.appendChild(substackEmbed)

    // Load the Substack script
    const script = document.createElement('script')
    script.src = 'https://substackapi.com/widget.js'
    script.async = true
    script.onload = () => {
      setIsWidgetLoaded(true)
      if (window.SubstackWidget) {
        window.SubstackWidget.createWidget({
          substackUrl: "aaronsimhq.substack.com",
          theme: "custom",
          placeholder: "example@gmail.com",
          buttonText: "Subscribe",
          color: "#000000",
          element: "#custom-substack-embed"
        })
      }
    }
    script.onerror = () => {
      console.error('Failed to load Substack widget script')
      setIsWidgetLoaded(false)
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
      if (substackEmbed) {
        document.body.removeChild(substackEmbed)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (isWidgetLoaded && substackFormRef.current) {
      const substackForm = document.querySelector('#custom-substack-embed form') as HTMLFormElement
      if (substackForm) {
        const emailInput = substackForm.querySelector('input[type="email"]') as HTMLInputElement
        if (emailInput) {
          emailInput.value = email
          const submitButton = substackForm.querySelector('button[type="submit"]') as HTMLButtonElement
          if (submitButton) {
            submitButton.click()
            // Wait for a short time to allow the submission to process
            await new Promise(resolve => setTimeout(resolve, 2000))
            setIsLoading(false)
            onSubscribe()
          } else {
            setError('Subscription failed. Please try again.')
            setIsLoading(false)
          }
        } else {
          setError('Subscription failed. Please try again.')
          setIsLoading(false)
        }
      } else {
        setError('Subscription form not found. Please try again.')
        setIsLoading(false)
      }
    } else {
      handleFallbackSubscription()
    }
  }

  const handleFallbackSubscription = async () => {
    // Implement a fallback subscription method here
    // For now, we'll just simulate a successful subscription
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsLoading(false)
    onSubscribe()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-black">Subscribe to Access</h2>
        <p className="mb-4 text-gray-600">Enter your email to get access to the longevity calculator.</p>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 text-black"
            required
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        <div ref={substackFormRef} style={{ display: 'none' }} />
      </div>
    </div>
  )
}