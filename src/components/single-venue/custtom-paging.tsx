import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomPaging({ media }: { media: { url: string; alt?: string }[] }) {
    const settings = {
        customPaging: function (i: number) {
            return (
                <a>
                    <div
                        style={{
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={media[i].url}
                            alt={media[i].alt || `Thumbnail ${i + 1}`}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    </div>
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {media.map((item, index) => (
                    <div key={index}>
                        <img
                            src={item.url}
                            alt={item.alt || `Image ${index + 1}`}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default CustomPaging;
