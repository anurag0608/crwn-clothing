import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

import { Container } from "./create.product.styles";
import { ProductsContext } from "../../contexts/products.context";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";

import { addCollectionAndDocuments } from "../../utils/firebase/firebase.util";

const defaultFormFields = {
    category: "",
    name: "",
    price: "",
    imageUrl: "",
}
const CreateProduct = () => {
 const [formFields, setFormFields] = useState(defaultFormFields);
 const {currentUser} = useContext(UserContext);
 const { category, name, price, imageUrl } = formFields;
 const {products} = useContext(ProductsContext);
 const navigate = useNavigate();
 const availableCategories = Object.keys(products);
 const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value});
 }
 const handleSubmit = (e)=>{
        e.preventDefault();
        (async()=>{
          await addCollectionAndDocuments('products', [formFields]); // accepts collection name and array of objects
        })();
        resetFormFields();
 }
 const resetFormFields = ()=>{
        setFormFields(defaultFormFields);
 }
 const redirectToAuth = ()=>{
    setTimeout(()=>{
      navigate('/auth')
    },3000)
 }
 if(!currentUser){
  redirectToAuth(); // will excute after 3secs
  return <div>
    <h2>You are not signed in!</h2>
    <p>Redirecting to Login page 🔑</p>
  </div>
 }
  return (
    <Container>
      <h2>Create a NEW Product!</h2>
      <form onSubmit={handleSubmit}>
        {/* Drop down menu */}
        <FormInput
          select={true}
          options={availableCategories}
          type="text"
          required={true}
          name="category"
          onChange={handleChange}
        />
         <FormInput
          label="Name"
          type="text"
          required={true}
          name="name"
          value={name}
          onChange={handleChange}
        />
         <FormInput
          label="Price"
          type="number"
          required={true}
          name="price"
          value={price}
          onChange={handleChange}
        />
         <FormInput
          label="Image Link"
          type="text"
          required={true}
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
        />
        <Button type='submit'>Create ✨</Button>
      </form>
    </Container>
  )
};
export default CreateProduct;
