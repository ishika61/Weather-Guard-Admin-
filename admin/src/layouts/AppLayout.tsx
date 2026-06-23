// import { Outlet } from 'react-router-dom'
// import { Navbar } from '../components/Navbar'

// export function AppLayout() {
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar />
//       <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
//         <Outlet />
//       </main>
//     </div>
//   )
// }



import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/Navbar'

export function AppLayout() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #080c14 0%, #0d1424 50%, #0a0f1e 100%)' }}>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}