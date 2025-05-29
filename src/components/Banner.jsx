import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Parallax, Pagination, Navigation } from "swiper/modules";

import img1 from "../assets/image10.webp";
import img2 from "../assets/image11.webp";
import img3 from "../assets/image12.webp";
import img4 from "../assets/image13.webp";
import img5 from "../assets/inage14.webp";
import img6 from "../assets/inage15.webp";

const slides = [
  {
    image: img1,
    title: "Nurture Growth with Every Leaf",
    description:
      "Track your plant’s journey from seed to bloom. With detailed insights and progress tracking, you can monitor every stage of your plant's development. Empower your green routine with the knowledge and tools you need to help your plants thrive. Whether you're a seasoned gardener or just beginning your plant care journey, this feature will ensure your plants stay healthy and vibrant.",
  },
  {
    image: img2,
    title: "Monitor Moisture with Ease",
    description:
      "Never let your greens go thirsty again. Our smart reminders will notify you when it's time to water your plants, ensuring they get the hydration they need at just the right time. You can customize watering schedules for each plant, making it easy to maintain a healthy and thriving indoor garden. Say goodbye to wilting leaves and hello to flourishing plants with our moisture tracking system.",
  },
  {
    image: img3,
    title: "Healthy Roots, Happy Plants",
    description:
      "Healthy roots are the foundation of thriving plants. Our tips and resources will guide you through the best practices for root care, soil types, and proper drainage techniques. Understanding your plant's root system is crucial to providing the ideal growing conditions, and with this knowledge, you'll ensure your plants have the healthiest start possible. From potting to repotting, we've got you covered.",
  },
  {
    image: img4,
    title: "Sunlight That Suits",
    description:
      "Each plant has unique sunlight needs, and providing the right amount of light is key to helping them flourish. Our system helps you learn about the best sunlight schedules for each of your plants, from shade-loving species to those that thrive in direct sunlight. With these insights, you can place your plants in the perfect spots to maximize their growth, ensuring they receive all the nutrients they need from the sun.",
  },
  {
    image: img5,
    title: "Sustainable & Smart Planting",
    description:
      "Growing more with less is possible with sustainable plant care practices. Our eco-friendly planting techniques help you reduce water usage, minimize waste, and create a greener, more sustainable indoor garden. Whether you're using composting, choosing low-water plants, or implementing energy-efficient lighting, we provide you with the tools to make your gardening practices as environmentally friendly as possible. ",
  },
  {
    image: img6,
    title: "Your Green Companion",
    description:
      "Plant Care Tracker is more than just an app — it's your personal partner in your planting journey. Whether you're an experienced gardener or a beginner, our app provides helpful tips, reminders, and insights that make plant care easier and more enjoyable. Track your plants’ progress, set personalized goals, and receive notifications for all the essential care routines.",
  },
];

const Banner = () => {
  return (
    <div className='mt-10 border p-4 sm:p-6 md:p-8 lg:p-10 border-green-400 bg-green-50 rounded-2xl lg:rounded-3xl h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] shadow-2xl'>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Parallax, Pagination, Navigation]}
        className='mySwiper rounded-xl lg:rounded-3xl h-full'
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className='absolute inset-0 bg-cover bg-center rounded-2xl lg:rounded-3xl'
              style={{
                backgroundImage: `url(${slide.image})`,
                zIndex: -1,
                filter: "brightness(0.5)",
              }}
              data-swiper-parallax='-23%'
            ></div>
            <div className='flex flex-col justify-center items-start h-full text-white px-2 sm:px-4 md:px-8 lg:px-10 relative z-10'>
              <h2
                className='text-base sm:text-lg md:text-2xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4'
                data-swiper-parallax='-300'
              >
                {slide.title}
              </h2>
              <p
                className='text-xs sm:text-sm md:text-base lg:text-lg max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl'
                data-swiper-parallax='-100'
              >
                {slide.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
