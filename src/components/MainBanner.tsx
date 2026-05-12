import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";

const BANNERS = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200",
    title: "DESCUENTOS MID SEASON",
    discount: "40%",
    category: "ZAPATILLAS DEPORTIVAS",
    buttonText: "VER ZAPATILLAS",
    bgColor: "bg-[#F3F3F3]",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200",
    title: "NUEVA COLECCIÓN",
    discount: "20%",
    category: "URBANO MUJER",
    buttonText: "COMPRAR AHORA",
    bgColor: "bg-slate-100",
  },
];

export function MainBanner() {
  const autoplay = Autoplay({ delay: 4000, stopOnInteraction: true });

  return (
    <section className="w-full px-4 py-2">
      <Carousel
        plugins={[autoplay]}
        className="w-full overflow-hidden rounded-2xl shadow-sm"
      >
        <CarouselContent>
          {BANNERS.map((banner) => (
            <CarouselItem key={banner.id}>
              <div
                className={`relative h-[300px] md:h-[450px] w-full ${banner.bgColor}`}
              >
                <div className="absolute inset-0 z-10 flex flex-col justify-center px-10 md:px-20 lg:w-1/2">
                  <h3 className="text-sm font-bold text-gray-500 tracking-widest mb-2">
                    {banner.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gray-600 font-medium">HASTA:</span>
                    <span className="text-6xl md:text-8xl font-black text-black italic">
                      {banner.discount}
                    </span>
                    <span className="text-xl font-bold self-start mt-4 italic">
                      DCTO.
                    </span>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-gray-800 mb-6">
                    {banner.category}
                  </p>
                  <Button className="w-fit bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg font-bold">
                    {banner.buttonText}
                  </Button>
                </div>
                <div className="absolute right-0 top-0 h-full w-full lg:w-2/3">
                  <img
                    src={banner.image}
                    alt={banner.category}
                    className="h-full w-full object-cover object-center lg:rounded-l-[100px]"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:block">
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </div>
      </Carousel>
    </section>
  );
}
