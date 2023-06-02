import "./card.scss";
import "dayjs/locale/ru";
import { IItems } from "../../types/IGetItems";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "../carousel/my-carousel.scss";
import { Carousel } from "../carousel/Carousel";
import { useState } from "react";

export interface Variant {
  secondV: boolean;
  changeSecondV: any;
  firstV: boolean;
}

export interface IItemsWithVariant extends IItems, Variant {}

const Card: React.FC<IItemsWithVariant> = ({
  price,
  title,
  address,
  secondV,
  seen,
  id,
  firstV,
}) => {
  const [like, setLike] = useState<string>(() => {
    const l = localStorage.getItem(`like_${id}`);
    if (l !== null) {
      return l;
    }
    return "";
  });

  const f = (i: string) => {
    if (like === i) {
      setLike("");
      localStorage.removeItem(`like_${id}`);
    } else {
      setLike(i);
      localStorage.setItem(`like_${id}`, i);
    }
  };

  dayjs.locale("ru");
  dayjs.extend(relativeTime);

  const time = () => {
    return dayjs("2015-10-24T07:23:53").fromNow();
  };

  return (
    <div className={secondV ? "card-second-variant" : "card"}>
      <div className="carousel-slide">
        <Carousel secondV={secondV} seen={seen} id={id} firstV={firstV} />
      </div>
      <div className="card-footer">
        <div className="first-footer-div">
          <p>{price} ₽</p>
          <div
            onClick={() => f(id)}
            className={like === id ? "image-active" : "image-block"}
          ></div>
        </div>
        <p className="name">{title}</p>
        <div className="second-footer-div">
          <p className="address">{address}</p>
          <p className="created">{time()}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
