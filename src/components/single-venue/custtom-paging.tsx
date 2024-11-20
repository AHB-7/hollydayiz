// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import {
//     CarouselContainer,
//     MiniImageComp,
//     MiniImageContainer,
//     SliderStyled,
// } from "../../styles/single-venue/carousel";

// export default function CustomPaging({
//     media,
// }: {
//     media: { url: string; alt?: string }[];
// }) {
//     const settings = {
//         customPaging: function (i: number) {
//             return (
//                 <MiniImageContainer>
//                     <MiniImageComp>
//                         <img
//                             src={media[i].url}
//                             alt={media[i].alt || `Thumbnail ${i + 1}`}
//                         />
//                     </MiniImageComp>
//                 </MiniImageContainer>
//             );
//         },
//         dots: true,
//         dotsClass: "slick-dots slick-thumb",
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//     };

//     return (
//         <CarouselContainer>
//             <div className="slider-container">
//                 <SliderStyled {...settings}>
//                     {media.map((item, index) => (
//                         <div key={index}>
//                             <img
//                                 src={item.url}
//                                 alt={item.alt || `Image ${index + 1}`}
//                             />
//                         </div>
//                     ))}
//                 </SliderStyled>
//             </div>
//         </CarouselContainer>
//     );
// }
