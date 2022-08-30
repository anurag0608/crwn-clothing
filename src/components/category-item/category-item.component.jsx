import {CategoryContainer, BackgroundImage, CategoryBodyContainer} from './category-item.styles'
import {useNavigate} from 'react-router-dom';

const CategoryItem = ({category})=>{
    const {title, imageUrl} = category;
    const navigate = useNavigate();
    const handleNavigate = (e)=>{
      navigate(`/shop/${title}`)
    }
    return (
        <CategoryContainer onClick={handleNavigate}>
              <BackgroundImage imageUrl={imageUrl} />
              <CategoryBodyContainer>
                <h2>{title}</h2>
                <p>Shop Now</p>
              </CategoryBodyContainer>
        </CategoryContainer>
    )
}
export default CategoryItem;