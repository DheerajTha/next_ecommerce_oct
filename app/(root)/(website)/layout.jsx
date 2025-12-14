import Footer from '@/components/website/Footer'
import Header from '@/components/website/header'

const layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer/>
    </>
  )
}

export default layout
