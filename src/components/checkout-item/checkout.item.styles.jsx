import styled from 'styled-components';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`
export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
  img {
    width: 100%;
    height: 100%;
  }
`
export const ProductInfo = styled.span`
  width: 23%;
`
export const Quantity = styled(ProductInfo)`
  display:flex
`
export const Arrow = styled.div`
  cursor: pointer;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
`
export const Value = styled.div`
  margin: 0 10px;
`
export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`
// .checkout-item-container {
//     width: 100%;
//     display: flex;
//     min-height: 100px;
//     border-bottom: 1px solid darkgrey;
//     padding: 15px 0;
//     font-size: 20px;
//     align-items: center;
    
//     .image-container {
//       width: 23%;
//       padding-right: 15px;
  
//       img {
//         width: 100%;
//         height: 100%;
//       }
//     }
//     .name,
//     .quantity,
//     .price {
//       width: 23%;
//     }
  
//     .quantity {
//       display: flex;
  
//       .arrow {
//         cursor: pointer;
//         user-select: none; /* supported by Chrome and Opera */
//         -webkit-user-select: none; /* Safari */
//         -khtml-user-select: none; /* Konqueror HTML */
//         -moz-user-select: none; /* Firefox */
//         -ms-user-select: none; /* Internet Explorer/Edge */
//       }
  
//       .value {
//         margin: 0 10px;
//       }
//     }
  
//     .remove-button {
//       padding-left: 12px;
//       cursor: pointer;
//     }
//   }
  