import { Fragment, useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function Home() {

    const [products, setProducts]= useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sort, setSort] = useState('featured');
    const [category, setCategory] = useState('all');
    const [wishlist, setWishlist] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem('ecomwishlist') || '[]');
      } catch {
        return [];
      }
    });
    const [searchParams] = useSearchParams();
    useEffect(()=> {
      setLoading(true);
      setError('');
      fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000/api/v1'}/products?${searchParams}`)
      .then(res=>res.ok ? res.json() : Promise.reject(new Error('Unable to load products.')))
      .then(res=>setProducts(res.products || []))
      .catch(() => {
        setError('The catalogue is unavailable. Please start the API and try again.');
        toast.error('Unable to load products.');
      })
      .finally(() => setLoading(false));
    },[searchParams]);

    const categories = useMemo(() => ['all', ...new Set(products.map((product) => product.category).filter(Boolean))], [products]);
    const visibleProducts = useMemo(() => [...products]
      .filter((product) => category === 'all' || product.category === category)
      .sort((first, second) => {
        if (sort === 'price-low') return first.price - second.price;
        if (sort === 'price-high') return second.price - first.price;
        if (sort === 'rating') return second.ratings - first.ratings;
        return 0;
      }), [products, category, sort]);

    function toggleWishlist(productId) {
      const next = wishlist.includes(productId)
        ? wishlist.filter((id) => id !== productId)
        : [...wishlist, productId];
      setWishlist(next);
      localStorage.setItem('ecomwishlist', JSON.stringify(next));
    }

    return <Fragment>
      

      <section className="catalogue-intro">
        <p className="eyebrow">CURATED TECH, EVERYDAY</p>
        <h1 id="products_heading">Find your next essential.</h1>
        <p className="intro-copy">Thoughtful devices and accessories, selected for how you actually live.</p>
        <div className="catalogue-highlights" aria-label="Store benefits">
          <span>Fast delivery</span><span>Secure checkout</span><span>Easy returns</span>
        </div>
      </section>

      <section id="products" className="container mt-5">
        {loading && <p className="status-message">Loading the collection...</p>}
        {!loading && error && <p className="status-message error-message">{error}</p>}
        {!loading && !error && products.length > 0 && <div className="catalogue-toolbar">
          <label>Category <select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((item) => <option key={item} value={item}>{item === 'all' ? 'All products' : item}</option>)}</select></label>
          <label>Sort <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label>
          <span className="result-count">{visibleProducts.length} products</span>
        </div>}
        {!loading && !error && visibleProducts.length === 0 && <p className="status-message">No products matched your filters.</p>}
        <div className="row product-grid">
          {visibleProducts.map(product=><ProductCard key={product._id} product={product} wished={wishlist.includes(product._id)} onToggleWishlist={toggleWishlist}/>)}
        </div>
      </section>
    </Fragment>
}