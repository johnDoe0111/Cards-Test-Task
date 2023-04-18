import '../card/card.scss'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FirstPhoto from '../../assets/images/first-photo.jpg';
import SecondPhoto from '../../assets/images/second-photo.jpg';
import ThirdPhoto from '../../assets/images/third-photo.jpg';
import '../card/my-carousel.scss';
import { Link } from 'react-router-dom';

export interface ICarousel {
    secondV: boolean,
    seen: boolean,
    id: string,
    firstV: boolean
}


export const Carousel: React.FC<ICarousel> = ({ secondV, seen, id, firstV }) => { 

    const images = [
        { id: 1, url: FirstPhoto },
        { id: 2, url: SecondPhoto },
        { id: 3, url: ThirdPhoto },
    ];

    const settings = {
        className: secondV ? 'second-my-carousel' :'my-carousel',
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <Slider {...settings}>
                {images.map(i => (
                    <div key={i.id}>
                        <div className={firstV && seen ? 'seen' : secondV && seen ? 'second-seen' : 'none'}>Просмотрено</div>
                        <Link className='carousel-slide-img' to={`/card-info/:${id}`}><img src={i.url} alt="error" /></Link>
                    </div>
                ))}
            </Slider>
        </>
    )
}
