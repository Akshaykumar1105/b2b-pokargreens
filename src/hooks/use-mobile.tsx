import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Set initial value based on the media query
    setIsMobile(mql.matches)
    
    // Define the event handler
    const onChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }
    
    // Add event listener
    mql.addEventListener("change", onChange)
    
    // Cleanup
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isMobile
}

// Add this line to provide both export names
export const useMobile = useIsMobile;