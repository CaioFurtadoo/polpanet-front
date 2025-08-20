import { BannerAuth } from '@/components/Auth/BannerAuth'
import { HeaderAuth } from '@/components/Auth/HeaderAuth'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex justify-between h-screen">
      <div className="w-[70%] max-[1400px]:w-full relative">
        <HeaderAuth/>
        <main className='flex justify-center min-[640px]:mt-[60px]'>{children}</main>
      </div>
      <BannerAuth/>
    </div>
  )
}
