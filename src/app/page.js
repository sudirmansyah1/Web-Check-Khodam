import dynamic from 'next/dynamic'
const View = dynamic(() => import('./view'), {
    loading: () => <p>Loading...</p>,
})

export const metadata = {
  title: 'Temukan Khodam Anda by YorX',
}

export default function UptimeMonEdit() {
  return (
      <View />
  )
}