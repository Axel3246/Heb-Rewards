import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper'
import { images } from '../../../constants';


const Swipe = () => {
    return (
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
            
            className="swiper_container"
        >
            <SwiperSlide>
                <img src={images.one}></img>
            </SwiperSlide>
            <SwiperSlide>
                <img src={images.two}></img>
            </SwiperSlide>
            <SwiperSlide>
                <img src={images.three}></img>
            </SwiperSlide>
            <SwiperSlide>
                <img src={images.five}></img>
            </SwiperSlide>
            <SwiperSlide>
                <img src={images.six}></img>
            </SwiperSlide>
            <SwiperSlide>
                <img src={images.four}></img>
            </SwiperSlide>
            <div className="slider-controler">
                <div className="swiper-pagination">HELLO</div>
            </div>
        </Swiper>
    )
}

export default Swipe