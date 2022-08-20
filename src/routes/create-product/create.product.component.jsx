import { useState, useContext } from "react";
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
 const { category, name, price, imageUrl } = formFields;
 const {products} = useContext(ProductsContext);
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
  return (
    <div className="sign-up-container">
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
    </div>
  )
};
export default CreateProduct;
