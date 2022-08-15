import './checkout.item.scss';

const CheckoutItem = ({item, onClickDecrease, onClickIncrease, onClickRemove}) => {
    const {id, name, price, quantity} = item;
    return (
        <div>
            <h2>{name}</h2>
            <div>
                <span>Price : {price}$</span>
                <br/>
                Quantity : <button onClick={onClickDecrease} itemID={id}>{'<'}</button> {quantity} <button onClick={onClickIncrease} itemID={id}>{'>'}</button>
                <br/>
                Remove item : <button itemID={id} onClick={onClickRemove}>X</button>
            </div>
        </div>
    );
};

export default CheckoutItem;
