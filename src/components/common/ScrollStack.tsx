"use client";

import React, { useLayoutEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';

import type { ReactNode } from 'react';

import Lenis from 'lenis';

import { OuterContainer } from './OuterContainer';

import type { OuterContainerProps } from './OuterContainer';

export interface ScrollStackItemProps {

  itemClassName?: string;

  children: ReactNode;

  useOuterContainer?: boolean;

  outerContainerProps?: Partial<OuterContainerProps>;

}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
  useOuterContainer = false,
  outerContainerProps = {}
}) => {
  const baseClassName = `scroll-stack-card relative w-full origin-top will-change-transform ${itemClassName}`.trim();

  const baseStyle: React.CSSProperties = {
    backfaceVisibility: 'hidden',
    transformStyle: 'preserve-3d'
  };

  if (useOuterContainer) {
    return (
      <OuterContainer
        className={baseClassName}
        style={baseStyle}
        {...outerContainerProps}
      >
        {children}
      </OuterContainer>
    );
  }

  return (
    <div
      className={`${baseClassName} h-80 my-8 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border`.trim()}
      style={baseStyle}
    >
      {children}
    </div>
  );
};

export interface ScrollStackProps {

  className?: string;

  children: ReactNode;

  itemDistance?: number;

  itemScale?: number;

  itemStackDistance?: number;

  stackPosition?: string;

  scaleEndPosition?: string;

  baseScale?: number;

  rotationAmount?: number;

  blurAmount?: number;

  useWindowScroll?: boolean;

  onStackComplete?: () => void;

  onSectionChange?: (index: number, headerColor?: string) => void;

}

export interface ScrollStackRef {
  scrollToIndex: (index: number) => void;
}

const ScrollStack = forwardRef<ScrollStackRef, ScrollStackProps>(({

  children,

  className = '',

  itemDistance = 100,

  itemScale = 0.04,

  itemStackDistance = 30,

  stackPosition = '15%',

  scaleEndPosition = '10%',

  baseScale = 0.85,

  rotationAmount = 0,

  blurAmount = 0.5,

  useWindowScroll = false,

  onStackComplete,

  onSectionChange

}, ref) => {

  const scrollerRef = useRef<HTMLDivElement>(null);

  const stackCompletedRef = useRef(false);

  const animationFrameRef = useRef<number | null>(null);

  const lenisRef = useRef<Lenis | null>(null);

  const cardsRef = useRef<HTMLElement[]>([]);

  const headerColorsRef = useRef<(string | undefined)[]>([]);

  const currentSectionRef = useRef<number>(-1);

  // Fix #1: Store onSectionChange in a ref so updateCardTransforms + useLayoutEffect
  // don't need it in their dependency arrays → Lenis won't restart mid-scroll
  const onSectionChangeRef = useRef(onSectionChange);
  useLayoutEffect(() => {
    onSectionChangeRef.current = onSectionChange;
  });

  const onStackCompleteRef = useRef(onStackComplete);
  useLayoutEffect(() => {
    onStackCompleteRef.current = onStackComplete;
  });

  interface CardTransform {
    translateY: number;
    scale: number;
    rotation: number;
    blur: number;
    opacity: number;
  }

  const lastTransformsRef = useRef(new Map<number, CardTransform>());

  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {

    if (scrollTop < start) return 0;

    if (scrollTop > end) return 1;

    return (scrollTop - start) / (end - start);

  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {

    if (typeof value === 'string' && value.includes('%')) {

      return (parseFloat(value) / 100) * containerHeight;

    }

    return parseFloat(value as string);

  }, []);

  const getScrollData = useCallback(() => {

    if (useWindowScroll) {

      return {

        scrollTop: window.scrollY,

        containerHeight: window.innerHeight

      };

    } else {

      const scroller = scrollerRef.current;

      return {

        scrollTop: scroller ? scroller.scrollTop : 0,

        containerHeight: scroller ? scroller.clientHeight : 0

      };

    }

  }, [useWindowScroll]);

  const getElementOffset = useCallback(

    (element: HTMLElement) => {

      if (useWindowScroll) {

        const rect = element.getBoundingClientRect();

        return rect.top + window.scrollY;

      } else {

        return element.offsetTop;

      }

    },

    [useWindowScroll]

  );

  const updateCardTransforms = useCallback(() => {

    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();

    const stackPositionPx = parsePercentage(stackPosition, containerHeight);

    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll

      ? (document.querySelector('.scroll-stack-end') as HTMLElement | null)

      : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement | null);

    const endElementTop = endElement ? getElementOffset(endElement) : 0;


    let topCardIndex = -1;

    for (let j = 0; j < cardsRef.current.length; j++) {
      const jCard = cardsRef.current[j];
      if (!jCard) continue;

      const jCardTop = getElementOffset(jCard);
      const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;

      // ตรวจสอบ card ถัดไป (ถ้ามี) เพื่อหาขอบเขต
      let jTriggerEnd = Infinity;
      if (j < cardsRef.current.length - 1) {
        const nextCard = cardsRef.current[j + 1];
        if (nextCard) {
          const nextCardTop = getElementOffset(nextCard);
          jTriggerEnd = nextCardTop - stackPositionPx - itemStackDistance * (j + 1);
        }
      }

      // ถ้า scrollTop อยู่ระหว่าง triggerStart และ triggerEnd ของ card นี้
      if (scrollTop >= jTriggerStart && scrollTop < jTriggerEnd) {
        topCardIndex = j;
        break; // หาเจอแล้ว ไม่ต้องหาต่อ
      }

      // ถ้า scrollTop ยังไม่ถึง triggerStart ของ card แรก ให้ return -1
      if (j === 0 && scrollTop < jTriggerStart) {
        topCardIndex = -1;
        break;
      }
    }

    cardsRef.current.forEach((card, i) => {

      if (!card) return;

      const cardTop = getElementOffset(card);

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;

      const triggerEnd = cardTop - scaleEndPositionPx;

      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;

      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);

      const targetScale = baseScale + i * itemScale;

      const scale = 1 - scaleProgress * (1 - targetScale);

      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      // คำนวณ blur สำหรับ cards ที่อยู่ด้านหลัง
      let blur = 0;

      if (blurAmount && i < topCardIndex) {

        const depthInStack = topCardIndex - i;

        blur = Math.max(0, depthInStack * blurAmount);

      }

      // คำนวณ opacity สำหรับ cards ที่อยู่ด้านหลัง
      let opacity = 1;
      if (i < topCardIndex) {
        // Cards ที่อยู่ด้านหลัง active card - ซ่อนไว้
        opacity = 0;
      } else if (i === topCardIndex) {
        // Active card - แสดงเต็มที่
        opacity = 1;
      } else {
        // Cards ที่ยังไม่ถึง - แสดงปกติ
        opacity = 1;
      }

      let translateY = 0;

      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {

        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;

      } else if (scrollTop > pinEnd) {

        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;

      }

      const newTransform = {

        translateY: Math.round(translateY * 100) / 100,

        scale: Math.round(scale * 1000) / 1000,

        rotation: Math.round(rotation * 100) / 100,

        blur: Math.round(blur * 100) / 100,

        opacity: Math.round(opacity * 100) / 100

      };

      const lastTransform = lastTransformsRef.current.get(i);

      const hasChanged =

        !lastTransform ||

        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||

        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||

        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||

        Math.abs(lastTransform.blur - newTransform.blur) > 0.1 ||

        Math.abs(lastTransform.opacity - newTransform.opacity) > 0.01;

      if (hasChanged) {

        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;

        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;

        card.style.filter = filter;

        card.style.opacity = newTransform.opacity.toString();

        card.style.pointerEvents = newTransform.opacity < 0.5 ? 'none' : 'auto';

        lastTransformsRef.current.set(i, newTransform);

      }

      if (i === cardsRef.current.length - 1) {

        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;

        if (isInView && !stackCompletedRef.current) {

          stackCompletedRef.current = true;

          onStackCompleteRef.current?.();

        } else if (!isInView && stackCompletedRef.current) {

          stackCompletedRef.current = false;

        }

      }

    });

    // Fix #1: Call via ref so this function doesn't need onSectionChange in its dep array
    if (onSectionChangeRef.current && topCardIndex !== currentSectionRef.current) {
      currentSectionRef.current = topCardIndex;

      // ตรวจสอบ bounds ก่อนเข้าถึง array
      const headerColor = topCardIndex >= 0 && topCardIndex < headerColorsRef.current.length
        ? headerColorsRef.current[topCardIndex]
        : undefined;

      onSectionChangeRef.current(topCardIndex, headerColor);
    }

    isUpdatingRef.current = false;

  }, [

    itemScale,

    itemStackDistance,

    stackPosition,

    scaleEndPosition,

    baseScale,

    rotationAmount,

    blurAmount,

    useWindowScroll,

    // Fix #1 & #2: onStackComplete and onSectionChange removed from deps — accessed via ref

    calculateProgress,

    parsePercentage,

    getScrollData,

    getElementOffset

  ]);

  const handleScroll = useCallback(() => {

    updateCardTransforms();

  }, [updateCardTransforms]);

  const scrollToIndex = useCallback((index: number) => {
    if (index < 0 || index >= cardsRef.current.length) return;
    const card = cardsRef.current[index];
    if (!card) return;

    const { containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const cardTop = getElementOffset(card);
    // เพิ่ม offset เล็กน้อยเพื่อให้แน่ใจว่า scroll ไปถึงหรือเกิน triggerStart
    const targetScroll = cardTop - stackPositionPx - itemStackDistance * index + 1;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScroll, { immediate: true });
      // Update immediately after scroll
      requestAnimationFrame(() => {
        updateCardTransforms();
      });
    } else if (scrollerRef.current) {
      scrollerRef.current.scrollTo({ top: targetScroll, behavior: 'auto' });
      // Update immediately after scroll
      requestAnimationFrame(() => {
        updateCardTransforms();
      });
    }
  }, [stackPosition, itemStackDistance, getScrollData, parsePercentage, getElementOffset, updateCardTransforms]);

  const setupLenis = useCallback(() => {

    if (useWindowScroll) {

      const lenis = new Lenis({

        duration: 1.2,

        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

        smoothWheel: true,

        touchMultiplier: 2,

        infinite: false,

        wheelMultiplier: 1,

        lerp: 0.1,

        syncTouch: true,

        syncTouchLerp: 0.075

      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {

        lenis.raf(time);

        animationFrameRef.current = requestAnimationFrame(raf);

      };

      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;

      return lenis;

    } else {

      const scroller = scrollerRef.current;

      if (!scroller) return;

      const lenis = new Lenis({

        wrapper: scroller,

        content: scroller.querySelector('.scroll-stack-inner') as HTMLElement,

        duration: 1.2,

        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

        smoothWheel: true,

        touchMultiplier: 2,

        infinite: false,

        gestureOrientation: 'vertical',

        wheelMultiplier: 1,

        lerp: 0.1,

        syncTouch: true,

        syncTouchLerp: 0.075

      });

      lenis.on('scroll', handleScroll);

      const raf = (time: number) => {

        lenis.raf(time);

        animationFrameRef.current = requestAnimationFrame(raf);

      };

      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;

      return lenis;

    }

  }, [handleScroll, useWindowScroll]);

  useImperativeHandle(ref, () => ({
    scrollToIndex,
  }), [scrollToIndex]);

  useLayoutEffect(() => {

    if (!useWindowScroll && !scrollerRef.current) return;

    const cards = Array.from(

      useWindowScroll

        ? document.querySelectorAll('.scroll-stack-card')

        : (scrollerRef.current?.querySelectorAll('.scroll-stack-card') ?? [])

    ) as HTMLElement[];

    cardsRef.current = cards;

    const transformsMap = lastTransformsRef.current;

    // Extract headerColor from each card (stored in data attribute)
    const headerColors: (string | undefined)[] = [];

    cards.forEach((card, i) => {

      if (i < cards.length - 1) {

        card.style.marginBottom = `${itemDistance}px`;

      }

      // Get headerColor from data attribute
      const headerColor = card.getAttribute('data-header-color') || undefined;
      headerColors.push(headerColor);

      card.style.willChange = 'transform, filter';

      card.style.transformOrigin = 'top center';

      card.style.backfaceVisibility = 'hidden';

      card.style.transform = 'translateZ(0)';

      card.style.webkitTransform = 'translateZ(0)';

      card.style.perspective = '1000px';

      card.style.webkitPerspective = '1000px';

    });

    headerColorsRef.current = headerColors;

    setupLenis();

    updateCardTransforms();

    return () => {

      if (animationFrameRef.current) {

        cancelAnimationFrame(animationFrameRef.current);

      }

      if (lenisRef.current) {

        lenisRef.current.destroy();

      }

      stackCompletedRef.current = false;

      cardsRef.current = [];

      transformsMap.clear();

      isUpdatingRef.current = false;

    };

  }, [

    itemDistance,

    itemScale,

    itemStackDistance,

    stackPosition,

    scaleEndPosition,

    baseScale,

    rotationAmount,

    blurAmount,

    useWindowScroll,

    // Fix #1 & #2: onStackComplete removed — accessed via ref, won't cause Lenis restart

    setupLenis,

    updateCardTransforms

  ]);

  return (

    <div

      className={`relative w-full h-full overflow-y-auto overflow-x-visible [&::-webkit-scrollbar]:hidden ${className}`.trim()}

      ref={scrollerRef}

      style={{

        overscrollBehavior: 'contain',

        WebkitOverflowScrolling: 'touch',

        // Fix #5: removed scrollBehavior: 'smooth' — conflicts with Lenis easing (double easing)

        WebkitTransform: 'translateZ(0)',

        transform: 'translateZ(0)',

        // Fix #7: 'scroll-position' is not a valid will-change value (removed from spec)
        willChange: 'transform',

        scrollbarWidth: 'none'

      }}

    >

      <div className="scroll-stack-inner pt-[1vh] px-2 sm:px-2.5 md:px-3 pb-[35vh] min-h-screen">

        {children}

        {/* Spacer so the last pin can release cleanly */}

        <div className="scroll-stack-end w-full h-px" />

      </div>

    </div>

  );

});

ScrollStack.displayName = 'ScrollStack';

export default ScrollStack;

