import { Link, useParams } from 'react-router-dom';
import './card-info.scss';
import { getCardId } from '../../store/reducers/getItemsAction';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Info from '../../assets/images/info.jpg'
import { InfinitySpin } from 'react-loader-spinner';

const CardInfo = () => {

    const dispatch = useAppDispatch()
    const {cardId, isLoading} = useAppSelector(state => state.get)
    
    const {id} = useParams()

    useEffect(() => {
        if (id) {
            dispatch(getCardId(id.slice(1)))
        } else {
            console.log('error');

        }
    }, [dispatch, id])

    const {seen, title, about} = cardId

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
    }
    
    return (
        <div className='info-content'>
            <div className="container">
                <div className="info-img">
                    <div className={seen ? 'seen' : 'none'}>Просмотрено</div>
                    <img src={Info} alt="error" />
                </div>
                <div className="text">
                    <p className='first-p'>{title}</p>
                    <p className='about'>{about}</p>
                </div>
                <Link className='link' to='/Cards-API'><p>На главную</p></Link>
            </div>
        </div>
    )
}

export default CardInfo;