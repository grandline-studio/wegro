/// <reference types="vite/client" />

declare module 'next/image' {
  import React from 'react';
  export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt?: string;
    width?: number | string;
    height?: number | string;
    priority?: boolean;
  }
  const Image: React.FC<ImageProps>;
  export default Image;
}

declare module 'fs/promises' {
  const content: any;
  export default content;
}

declare module 'path' {
  const content: any;
  export default content;
}
