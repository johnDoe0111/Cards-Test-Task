import './home-page.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getItemsAction } from '../../store/reducers/getItemsAction';
import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import ScrollTop from '../../assets/icons/Scroll-top.png';
import { InfinitySpin } from 'react-loader-spinner';

const HomePage = () => {

   const dispatch = useAppDispatch();
   const {getItems, isLoading, error} = useAppSelector(state => state.get)

   const [currentPage, setCurrentPage] = useState(1)
   const [visible, setVisible] = useState(false);

   const [variant, setVariant] = useState<boolean>(() => {
      const variantStr = localStorage.getItem('variant');
      if (variantStr !== null) {
        return JSON.parse(variantStr);
      }
      return true;
    });

   const [secondVariant, setSecondVariant] = useState<boolean>(() => {
      const secondVariantStr = localStorage.getItem('second-variant');
      if (secondVariantStr !== null) {
         return JSON.parse(secondVariantStr);
      }
      return false;
   });

   const handleClickPageCount = () => {
      setCurrentPage(currentPage + 1)
   }

   const changeVariants = () => {
      setVariant(true)
      setSecondVariant(false)
   }

   const changeSecondVariant = () => {
      setVariant(false)
      setSecondVariant(true)
   }

   const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
   };

   const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
   };

   useEffect(() => {
      window.addEventListener("scroll", toggleVisibility);
      return () => {
         window.removeEventListener("scroll", toggleVisibility);
      };
   }, []);

   useEffect(() => {
      localStorage.setItem('variant', JSON.stringify(variant))
      localStorage.setItem('second-variant', JSON.stringify(secondVariant))
   }, [variant, secondVariant])

   useEffect(() => {
      dispatch(getItemsAction(currentPage))
   }, [dispatch, currentPage])
   
   if (isLoading) {
      return (
        <div className="loader">
          <div>
            <InfinitySpin 
               width='200'
               color="#4fa94d"
            />
          </div>
         </div>
      )
   } else if (error) {
      return (
         <div className='undefined-wrapper'>
            <div className={!getItems ? 'none' : 'items-undefined'}>
               <p className='first-p'>ОБЪЯВЛЕНИЙ НЕ НАЙДЕНО</p>
               <p className='second-p'>Простите, по вашему запросу товаров сейчас нет. Задайте запрос по-другому или измените характеристики</p>
            </div>
         </div>
      )
   }

   return (
     <main>
         <div className='home-page'>
            <div className="variants">
               <div onClick={changeVariants} className={variant ? 'first-variant-active' : 'first-variant'}></div>
               <div onClick={changeSecondVariant} className={variant ? 'second-variant' : 'second-variant-active'}></div>
            </div>
            <div className='cards'>
               {getItems?.map(page => page.items.map(i => (
               <Card key={i.id} {...i} secondV={secondVariant} changeSecondV={changeSecondVariant} firstV={variant}/>
               )))}
            </div>
            <button onClick={scrollToTop} className={visible ? 'scroll-to-top' : 'none'}>
               <div className='scroll-img'>
                  <img src={ScrollTop} alt="error" />
               </div>
               <p>Вверх</p>
            </button>
            <button disabled={currentPage === 10} onClick={handleClickPageCount}  className={currentPage === 10 ? 'none' : 'show-more'}>Показать еще</button>
         </div>
     </main>
   )
}

export default HomePage;