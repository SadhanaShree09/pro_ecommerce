import {Link} from 'react-router-dom';

export default function ProductCard({product, wished, onToggleWishlist}){
  const image = product.images?.[0]?.image || '/images/products/1.jpg';

    return <div className="col-sm-12 col-md-6 col-lg-3 my-3">
    <div className="card p-3 rounded">
      <button type="button" className={`wishlist-button ${wished ? 'is-wished' : ''}`} onClick={() => onToggleWishlist(product._id)} aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}>
        {wished ? '♥' : '♡'}
      </button>
      <img
        className="card-img-top mx-auto"
        src={image} alt={product.name}/>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          <Link to={"/product/"+product._id}>{product.name}</Link>
        </h5>
        <div className="ratings mt-auto">
          <div className="rating-outer">
            <div className="rating-inner" style = {{width :`${product.ratings /5*100}%`}}></div>
          </div>
        </div>
        <p className="card-text">₹{product.price.toLocaleString('en-IN')}</p>
        <Link to={"/product/"+product._id} id="view_btn" className="btn btn-block">View Details</Link>
      </div>
    </div>
  </div>
}