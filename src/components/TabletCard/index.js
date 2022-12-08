import React from 'react';
import ReactStars from 'react-stars';
import Currency from 'react-currency-formatter';

import './style.css';

const textCrop = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
};

function TabletCard(props) {
  return (
    <div>
      <div className="card-wrap">
        <img className="card-img" alt={props.title} src={props.image} />
        <h4>{props.title}</h4>
        <div className="mb-5">
          <Currency quantity={props.price} currency="EUR" />
        </div>
        <div className="rating-wrap">
          <div className="rating">
            <ReactStars value={props.rating} size={25} color2={'#ffd700'} />
            <p>{props.rating}</p>
            <p>({props.reviewCount})</p>
          </div>
          <div className="stock">
            {props.stock === 'inStock' ? (
              <p>✔️ In stock</p>
            ) : (
              <p>Out of stock</p>
            )}
          </div>
        </div>
        <div className="card-body">
          <div>
            <ul>
              {props.storePromotions.map((item) => {
                return (
                  <li className="marked">{textCrop(item.promotionText, 40)}</li>
                );
              })}
            </ul>
          </div>
          <div>
            <ul>
              {props.localBenefitList.map((item) => {
                return <li>{item.localBenefitText}</li>;
              })}
            </ul>
          </div>
        </div>
        <button className="card-btn">Add to Basket</button>
      </div>
    </div>
  );
}

export { TabletCard };
