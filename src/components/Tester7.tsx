import React, { useState, useRef, useEffect, HtmlHTMLAttributes } from 'react';
import axios from "axios";
import { useSwipeable } from "react-swipeable";

import "../index.scss";

// Data
import data from '../data.json';
const lol = data;



try {
  const response = await axios.get('https://jsonlaceholder.typicode.com/');
  // Success 🎉
  console.log("C GAGNE LOL");
} catch (error) {
  const response = await axios.get('../data.json');
  console.log(response);
  }


const Tester7 = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const [isActive, setIsActive] = useState(true);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };
  
  

  const changeBackground = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    const url = ev.target.dataset.url
    const id = parseInt(ev.target.dataset.id)
    console.log(id)
    document.body.style.backgroundImage = `url(${url})`
    setIsActive(current => !current);
    console.log(isActive);
    // document.querySelector(`[data-id=${id}]`).style.display = 'none'
  }

  const closeSelected = (event) => {
    console.log(event.target.id);
    console.log(event.target.value);
    event.classList.remove( bg-salmon )
    // setIsActive(current => !current);
  }

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction: string) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <>

   
    <div className="carousel my-12 mx-auto w-1/2">
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('prev')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {data.resources.map((resource, index) => {
            return (
              <div
                key={index}

                className="carousel-item text-center relative w-64 h-64 snap-start"
                
              >
                <a
                  href="#"
                  onClick={changeBackground}
                  data-url={resource.imageUrl}
                  data-id={index}
                  className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                  style={{ backgroundImage: `url(${resource.imageUrl || ''})` }}
                >
                  <img
                    src={resource.imageUrl || ''}
                    alt={resource.title}
                    className="w-full aspect-square hidden"
                  />
                </a>
                
                 <a
                  href="#" data-id={index} onClick={closeSelected} className={isActive ? '' : 'bg-salmon'}
                >
                  <h3 className="text-white py-6 px-3 mx-auto text-xl">
                    {resource.title}
                  </h3>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>

    {/* Nav avec les bouttons */}

    <div className="flex w-full justify-center">
    <button
            onClick={movePrev}
            className="btn mx-2"
            disabled={isDisabled('prev')}
          >Précdent
      </button>
      <button
            onClick={moveNext}
            className="btn"
            disabled={isDisabled('next')}
          >Suivant
      </button>
    </div>

</>
  );
};

export default Tester7;
