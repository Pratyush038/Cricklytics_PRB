import { PageLoadingFallback } from "@/components/global/loading-spinner"

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  )
}
