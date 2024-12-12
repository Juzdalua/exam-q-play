"use client";

const FullBleedCarousel = () => {
  const images = JSON.parse(process.env.NEXT_PUBLIC_CAROUSEL_IMAGES);
  const count = images.length;

  return (
    <div className="flex justify-center mt-20">
      <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">
        {images.slice(0, count).map((src, index) => (
          <div className="carousel-item" key={index}>
            <img src={src} className="rounded-box" alt={`carousel-item-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullBleedCarousel;
