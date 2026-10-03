import { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiUrl } from "../config";

export default function ProductDetail({cartItems,setCartItems}){
    const [product,setProduct]= useState(null);
    const [qty,setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const {id}=useParams();
    const navigate = useNavigate();
    useEffect(()=> {
                    fetch(apiUrl(`/products/${id}`))
                    .then(res=>res.ok ? res.json() : Promise.reject(new Error('Product not found.')))
                    .then (res=>setProduct(res.product))
                    .catch(() => setError('This product could not be loaded.'))
                    .finally(() => setLoading(false));
                },[id])

        function addToCart(){
            const itemExist = cartItems.find((item)=>item.product._id === product._id)
            if(!itemExist) {
             const newItem = {product, qty};
             setCartItems([...cartItems, newItem]);
             toast.success("Cart Item Added Successfully!");
            } else {
             setCartItems(cartItems.map((item) => item.product._id === product._id ? {...item, qty: Math.min(item.qty + qty, product.stock)} : item));
             toast.success("Cart quantity updated!");
            }
        }

        function increaseQty(){
            if (qty >= product.stock){
                return;
            }
            setQty((state)=> state+1);
        }

        function decreaseQty(){
            if (qty > 1){
             setQty((state)=> state-1);
            }
            
        }

    if (loading) return <p className="status-message">Loading product...</p>;
    if (error || !product) return <p className="status-message error-message">{error || 'Product not found.'}</p>;
    const image = product.images?.[0]?.image || '/images/products/1.jpg';

    return <main className="container container-fluid product-detail">
    <button type="button" className="back-link" onClick={() => navigate('/')} aria-label="Back to homepage">
        <span aria-hidden="true">&#8592;</span> Back to homepage
    </button>
    <div className="row f-flex justify-content-around product-detail-grid">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <img src={image} alt={product.name}/>
        </div>

        <div className="col-12 col-lg-5 mt-5 product-info">
            <h3>{product.name}</h3>
            <p id="product_id">Product # {product._id}</p>

            <hr/>

            <div className="rating-outer">
                <div className="rating-inner" style = {{width :`${product.ratings /5*100}%`}}></div>
            </div>
       

            <hr/>

            <p id="product_price">₹{product.price}</p>
            <div className="product-actions">
            <div className="stockCounter">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                <input type="number" className="form-control count d-inline" value={qty} readOnly />

                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
            </div>
             <button type="button" onClick={addToCart} disabled={product.stock === 0} id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>
            </div>

            <hr/>

            <p>Status: <span id="stock_status" className={product.stock > 0 ?'text-success' : 'text-danger'}>{product.stock > 0 ? 'In Stock' : 'Out Of Stock'}</span></p>

            <hr/>

            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr/>
            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
            
            <div className="rating w-50"></div>
                    
        </div>

    </div>

</main>
}