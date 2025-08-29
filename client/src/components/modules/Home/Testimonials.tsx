// src/components/Testimonials.tsx

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: "John Doe",
    quote: "The service is incredibly fast and reliable. My packages always arrive on time and in perfect condition. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    quote: "Customer support is top-notch! They helped me with a last-minute change and were very professional and helpful. A fantastic experience.",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Alex Johnson",
    quote: "I've used several delivery services, and this one is by far the most secure. The tracking system is flawless and easy to use.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Emily White",
    quote: "Their flexible delivery options saved me so much time. It's the perfect solution for my small business needs.",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 ">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight lg:text-5xl text-card-foreground">
          What Our Customers Say
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          Hear from the people who trust us with their valuable parcels.
        </p>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="shadow-lg h-full">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                      <p className="mb-4 italic text-card-foreground">
                        "{testimonial.quote}"
                      </p>
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="font-semibold text-card-foreground">
                        {testimonial.name}
                      </h4>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;