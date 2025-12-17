// Type declarations for three.js and related libraries
// If @types/three is installed, it will take precedence

import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      planeGeometry: any;
      primitive: any;
      ambientLight: any;
      directionalLight: any;
      pointLight: any;
      threeGlobe: any;
    }
  }
}

declare module "three-globe" {
  export default class ThreeGlobe {
    constructor();
    globeMaterial(): any;
    hexPolygonsData(data: any): this;
    hexPolygonResolution(res: number): this;
    hexPolygonMargin(margin: number): this;
    showAtmosphere(show: boolean): this;
    atmosphereColor(color: string): this;
    atmosphereAltitude(alt: number): this;
    hexPolygonColor(fn: (e: any) => string): this;
    arcsData(data: any): this;
    arcStartLat(fn: (d: any) => number): this;
    arcStartLng(fn: (d: any) => number): this;
    arcEndLat(fn: (d: any) => number): this;
    arcEndLng(fn: (d: any) => number): this;
    arcColor(fn: (e: any) => string): this;
    arcAltitude(fn: (e: any) => number): this;
    arcStroke(fn: (e: any) => number): this;
    arcDashLength(length: number): this;
    arcDashInitialGap(fn: (e: any) => number): this;
    arcDashGap(gap: number): this;
    arcDashAnimateTime(fn: (e: any) => number): this;
    pointsData(data: any): this;
    pointColor(fn: (e: any) => string): this;
    pointsMerge(merge: boolean): this;
    pointAltitude(alt: number): this;
    pointRadius(radius: number): this;
    ringsData(data: any): this;
    ringColor(fn: (e: any) => (t: number) => string): this;
    ringMaxRadius(radius: number): this;
    ringPropagationSpeed(speed: number): this;
    ringRepeatPeriod(period: number): this;
  }
}

declare module "@react-three/fiber" {
  import * as React from "react";
  
  export interface ThreeElements {
    mesh: any;
    planeGeometry: any;
    primitive: any;
    ambientLight: any;
    directionalLight: any;
    pointLight: any;
    threeGlobe: any;
  }
  
  export function Canvas(props: any): React.ReactElement;
  export function useFrame(callback: (state: { clock: any }) => void): void;
  export function useThree(): { gl: any; size: { width: number; height: number } };
  export function extend(object: any): void;
  export type Object3DNode<T, P> = any;
}

declare module "@react-three/drei" {
  export function OrbitControls(props: any): React.ReactElement;
}

declare module "react-globe" {
  import * as React from "react";
  
  export type Coordinates = [number, number];
  export type Marker = {
    id?: string;
    city?: string;
    color?: string;
    coordinates: Coordinates;
    value?: number;
    [key: string]: any;
  };
  
  export type EasingFunction = 
    | ["Back", "In"]
    | ["Back", "Out"]
    | ["Back", "InOut"]
    | ["Bounce", "In"]
    | ["Bounce", "Out"]
    | ["Bounce", "InOut"]
    | ["Circular", "In"]
    | ["Circular", "Out"]
    | ["Circular", "InOut"]
    | ["Linear", "None"]
    | ["Linear", "In"]
    | ["Linear", "Out"]
    | ["Linear", "InOut"]
    | ["Elastic", "In"]
    | ["Elastic", "Out"]
    | ["Elastic", "InOut"]
    | ["Exponential", "In"]
    | ["Exponential", "Out"]
    | ["Exponential", "InOut"]
    | ["Quadratic", "In"]
    | ["Quadratic", "Out"]
    | ["Quadratic", "InOut"]
    | ["Cubic", "In"]
    | ["Cubic", "Out"]
    | ["Cubic", "InOut"]
    | ["Quartic", "In"]
    | ["Quartic", "Out"]
    | ["Quartic", "InOut"]
    | ["Quintic", "In"]
    | ["Quintic", "Out"]
    | ["Quintic", "InOut"]
    | ["Sinusoidal", "In"]
    | ["Sinusoidal", "Out"]
    | ["Sinusoidal", "InOut"];
  
  export type Options = {
    ambientLightColor?: string;
    cameraRotateSpeed?: number;
    focusAnimationDuration?: number;
    focusEasingFunction?: EasingFunction;
    pointLightColor?: string;
    pointLightIntensity?: number;
    globeGlowColor?: string;
    markerTooltipRenderer?: (marker: Marker) => string;
  };
  
  export type Optional<T> = {
    [P in keyof T]?: T[P];
  };
  
  export interface Props {
    height?: string;
    width?: string;
    globeBackgroundTexture?: string;
    globeCloudsTexture?: string | null;
    globeTexture?: string;
    initialCoordinates?: Coordinates;
    markers?: Marker[];
    options?: Optional<Options>;
    onClickMarker?: (marker: Marker, markerObject: any, event: any) => void;
    onGetGlobe?: (globe: any) => void;
    onMouseOutMarker?: (marker: Marker, markerObject: any, event: any) => void;
    onGlobeTextureLoaded?: () => void;
    onMouseOverMarker?: (marker: Marker, markerObject: any, event: any) => void;
  }
  
  const ReactGlobe: React.FC<Props>;
  export default ReactGlobe;
}

