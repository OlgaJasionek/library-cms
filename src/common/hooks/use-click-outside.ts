import React, { useEffect } from "react";

export const useClickOutside = (ref: React.MutableRefObject<HTMLElement | null>, callback: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && ref.current.contains(event.target as Node)) {
        return;
      }

      callback();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};
