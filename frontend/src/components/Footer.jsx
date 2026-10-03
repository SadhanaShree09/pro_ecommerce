export default function Footer (){

    return <footer className="py-1 bg-dark">
    <div className="footer-content">
      <div><strong>Ecomcart</strong><p>Thoughtful tech for everyday life.</p></div>
      <div><strong>Shop with confidence</strong><p>Fast delivery · Secure checkout · Easy returns</p></div>
    </div>
    <p className="text-center text-white mt-1">© {new Date().getFullYear()} Ecomcart</p>
  </footer>
}