import { useEffect, useState } from "react";

interface PositionMatrix {
  x: number | undefined;
  y: number | undefined;
}

type Event = MouseEvent | undefined;

const useMousePosition = ({ includeTouch }: { includeTouch: Boolean }) => {
  const [mousePosition, setMousePosition] = useState<PositionMatrix>({
    x: undefined,
    y: undefined,
  });
  const [touchPosition, setTouchPosition] = useState<PositionMatrix>({
    x: undefined,
    y: undefined,
  });
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [prevEvent, setPrevEvent] = useState<Event>(undefined);
  useEffect(() => {
    const updateMousePosition = (currentEvent: MouseEvent) => {
      let x, y;
      [x, y] = [currentEvent.clientX, currentEvent.clientY];
      var movementX = Math.abs(
        currentEvent.clientX - (prevEvent?.clientX ? prevEvent?.clientX : 0)
      );
      var movementY = Math.abs(
        currentEvent.clientY - (prevEvent?.clientY ? prevEvent?.clientY : 0)
      );
      var movement = Math.sqrt(movementX * movementX + movementY * movementY);
      var speed = Math.round(10 * movement);
      setMouseSpeed(speed);
      setMousePosition({ x, y });
      setPrevEvent(currentEvent);
      // console.log("prevEvent", prevEvent?.screenX);
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [prevEvent]);
  useEffect(() => {
    const updateTouchPosition = (currentEvent: TouchEvent) => {
      let x, y;
      if (currentEvent.touches) {
        const touch = currentEvent.touches[0];
        [x, y] = [touch.clientX, touch.clientY];
      }
      setTouchPosition({ x, y });
    };
    return () => {
      if (includeTouch) {
        window.removeEventListener("touchmove", updateTouchPosition);
      }
    };
  }, [includeTouch]);
  return { mousePosition, touchPosition, mouseSpeed };
};
export default useMousePosition;
