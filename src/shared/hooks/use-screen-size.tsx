import { useCallback, useEffect, useState } from 'react';

import variables from '@/shared/styles/variables.module.scss';

const Breakpoint = {
  sm: 0,
  md: 1,
  lg: 2,
  xl: 3,
  xxl: 4,
};

type ScreenSize = {
  width: number;
  height: number;
  breakpoint: keyof typeof Breakpoint;
};

const calcBreakpoint = (width: number) => {
  const parseBreakpoint = (breakpoint: string) => parseInt(breakpoint.replace('px', ''));

  if (width <= parseBreakpoint(variables.breakpointSm)) {
    return 'sm';
  } else if (width <= parseBreakpoint(variables.breakpointMd)) {
    return 'md';
  } else if (width <= parseBreakpoint(variables.breakpointLg)) {
    return 'lg';
  } else if (width <= parseBreakpoint(variables.breakpointXl)) {
    return 'xl';
  } else {
    return 'xxl';
  }
};

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: calcBreakpoint(window.innerWidth),
  });

  const handleResize = useCallback(() => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
      breakpoint: calcBreakpoint(window.innerWidth),
    });
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  const isGreaterThan = (breakpoint: keyof typeof Breakpoint) => {
    return Breakpoint[screenSize.breakpoint] > Breakpoint[breakpoint];
  };

  const isLessThan = (breakpoint: keyof typeof Breakpoint) => {
    return Breakpoint[screenSize.breakpoint] < Breakpoint[breakpoint];
  };

  const isGreaterOrEqualThan = (breakpoint: keyof typeof Breakpoint) => {
    return Breakpoint[screenSize.breakpoint] >= Breakpoint[breakpoint];
  };

  const isLessOrEqualThan = (breakpoint: keyof typeof Breakpoint) => {
    return Breakpoint[screenSize.breakpoint] <= Breakpoint[breakpoint];
  };

  return { size: screenSize, isGreaterThan, isLessThan, isGreaterOrEqualThan, isLessOrEqualThan };
};

export default useScreenSize;
