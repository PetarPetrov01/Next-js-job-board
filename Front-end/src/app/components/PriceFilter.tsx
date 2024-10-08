"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import Slider from "react-slider";

const MIN_PRICE = 30;
const MAX_PRICE = 9000;

const hideInputArrowClass =
  "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

export default function PriceFilter() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const priceParams = searchParams.get("price");

  
  const [initialMin,initialMax] = priceParams ? priceParams.split(":") : [] 

  const [priceRange, setPriceRange] = useState([
    Number(initialMin) || MIN_PRICE,
    Number(initialMax) || MAX_PRICE,
  ]);

  useEffect(() => {
    //To sync the state when all filters are cleared
    if (!initialMin && !initialMax) {
      setPriceRange([MIN_PRICE, MAX_PRICE]);
    }
  }, [initialMin, initialMax]);

  const handleSliderChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleSliderChangeComplete = (value: number[]) => {
    const params = new URLSearchParams(searchParams);

    if (value && value.length == 2) {
      params.set("price", String(value.join(":")));
    } else {
      params.delete("price");
    }
    const href = `${pathname}?${params.toString()}`;
    replace(href, { scroll: false });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = Number(e.target.value);
    const newRange = [...priceRange];
    newRange[index] = value;

    setPriceRange(newRange);
  };

  const handleInputChangeComplete = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let value: string | number = e.target.value;
    const params = new URLSearchParams(searchParams);

    const curentVal = params.get("price")?.split(":");

    if (value && priceRange[0] > priceRange[1]) {
      setPriceRange(([gte, lte]) =>
        index === 0
          ? [Number(curentVal?.[0] ?? MIN_PRICE), lte]
          : [gte, Number(curentVal?.[1] ?? MAX_PRICE)]
      );

      return;
    }

    index == 0
      ? params.set("price", String([value, priceRange[1]].join(":")))
      : params.set("price", String([priceRange[0], value].join(":")));

    const href = `${pathname}?${params.toString()}`;
    replace(href, { scroll: false });
  };

  return (
    <div
      className={`relative flex flex-col gap-1 p-2 pb-4 overflow-hidden border-b-2 border-new-peach-100 font-semibold text-new-mint duration-200`}
    >
      <h3>Price</h3>
      <div className="flex flex-col justify-between py-4 px-2">
        <Slider
          onAfterChange={handleSliderChangeComplete}
          onChange={handleSliderChange}
          className="h-1 w-full bg-new-mint"
          value={priceRange}
          min={MIN_PRICE}
          max={MAX_PRICE}
          thumbClassName="translate-y-[-33%] top-0 bg-new-peach-100 h-4 w-4 rounded-full"
        />
      </div>
      <div className="flex gap-2 justify-around">
        <input
          className={`w-[40%] text-center bg-gray-600/80 text-new-mint ${hideInputArrowClass}`}
          value={priceRange[0]}
          type="number"
          onChange={(e) => handleInputChange(e, 0)}
          onBlur={(e) => handleInputChangeComplete(e, 0)}
        />
        -
        <input
          className={`w-[40%] text-center bg-gray-600/80 text-new-mint ${hideInputArrowClass}`}
          value={priceRange[1]}
          type="number"
          onChange={(e) => handleInputChange(e, 1)}
          onBlur={(e) => handleInputChangeComplete(e, 1)}
        />
      </div>
    </div>
  );
}
