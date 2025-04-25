import { Card } from "@/components/ui/card";
import { Music, Music2 } from "lucide-react";
import React from "react";

const EventCategory = () => {
  return (
    <section className="container mx-auto py-8">
      <Card className="bg-[#fefefe] shadow-md">
        <div className="mx-4 space-y-6 py-8">
          <h3 className="text-center text-2xl font-bold text-[#083ca3] md:text-left md:text-3xl">
            Explore Events by <span className="text-[#FF7F00]">Category</span>
          </h3>
          <div className="grid grid-cols-2 items-center justify-center gap-4 text-center md:grid-cols-3 md:gap-2 lg:grid-cols-6">
            <div className="flex flex-col items-center justify-center rounded-md bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-lg">
              <div className="flex h-[80px] w-[80px] items-center justify-center bg-white md:h-[100px] md:w-[100px]">
                <Music size={48} className="text-[#FF7F00]" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700 md:text-base">
                Music
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-lg">
              <div className="flex h-[80px] w-[80px] items-center justify-center bg-white md:h-[100px] md:w-[100px]">
                <Music2 size={48} className="text-[#10b981]" />
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700 md:text-base">
                Concerts
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-lg">
              <div className="flex h-[80px] w-[80px] items-center justify-center bg-white md:h-[100px] md:w-[100px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-12 w-12 text-[#a855f7] md:h-16 md:w-16"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM21 12a9 9 0 10-18 0 9 9 0 0018 0zM15.75 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700 md:text-base">
                Festivals
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-lg">
              <div className="flex h-[80px] w-[80px] items-center justify-center bg-white md:h-[100px] md:w-[100px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-12 w-12 text-[#f97316] md:h-16 md:w-16"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.304 0-9.75 4.446-9.75 9.75s4.446 9.75 9.75 9.75 9.75-4.446 9.75-9.75S17.304 2.25 12 2.25zm-2.625 6c-.19 0-.375.075-.525.2l-4.5 4.5a.75.75 0 001.06 1.06l4.5-4.5a.75.75 0 00-1.06-1.06zM16.3 13.42a.75.75 0 00-1.06-1.06l-4.5 4.5a.75.75 0 001.06 1.06l4.5-4.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700 md:text-base">
                Workshops
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-lg">
              <div className="flex h-[80px] w-[80px] items-center justify-center bg-white md:h-[100px] md:w-[100px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-12 w-12 text-[#db2777] md:h-16 md:w-16"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.304 0-9.75 4.446-9.75 9.75s4.446 9.75 9.75 9.75 9.75-4.446 9.75-9.75S17.304 2.25 12 2.25zM8.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM12 17.25a.75.75 0 01-.75-.75V12a.75.75 0 011.5 0v4.5a.75.75 0 01-.75.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700 md:text-base">
                Talks
              </p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-md bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-lg">
              <div className="flex h-[80px] w-[80px] items-center justify-center bg-white md:h-[100px] md:w-[100px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-12 w-12 text-[#0ea5e9] md:h-16 md:w-16"
                >
                  <path d="M12 2.25c-5.304 0-9.75 4.446-9.75 9.75s4.446 9.75 9.75 9.75 9.75-4.446 9.75-9.75S17.304 2.25 12 2.25zM8.547 14.7c.29-.384.714-.61 1.174-.61h5.658c.46 0 .884.226 1.174.61l1.54 2.062A1.5 1.5 0 0018 19.5H6a1.5 1.5 0 00-1.5-1.5l1.54-2.062zM12 9.75a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
                </svg>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700 md:text-base">
                Meetups
              </p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default EventCategory;
