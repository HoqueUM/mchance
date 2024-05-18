"use client";
import React, { useEffect, useRef } from 'react';

const BackgroundTriangles = () => {
  const refreshDuration = 10000;
  const refreshTimeout = useRef(null);
  const pointsRef = useRef([]);
  const svgRef = useRef(null);

  const randomize = (points, numPointsX, numPointsY, unitWidth, unitHeight) => {
    for (let i = 0; i < points.length; i++) {
      if (points[i].originX !== 0 && points[i].originX !== unitWidth * (numPointsX - 1)) {
        points[i].x = points[i].originX + Math.random() * unitWidth - unitWidth / 2;
      }
      if (points[i].originY !== 0 && points[i].originY !== unitHeight * (numPointsY - 1)) {
        points[i].y = points[i].originY + Math.random() * unitHeight - unitHeight / 2;
      }
    }
  };

  const refresh = (svg, points, numPointsX) => {
    randomize(points, numPointsX);
    const polygons = svg.childNodes;
    polygons.forEach((polygon) => {
      const animate = polygon.childNodes[0];
      if (animate.getAttribute('to')) {
        animate.setAttribute('from', animate.getAttribute('to'));
      }
      animate.setAttribute('to', `${points[polygon.point1].x},${points[polygon.point1].y} ${points[polygon.point2].x},${points[polygon.point2].y} ${points[polygon.point3].x},${points[polygon.point3].y}`);
      animate.beginElement();
    });
    refreshTimeout.current = setTimeout(() => refresh(svg, points, numPointsX), refreshDuration);
  };

  const onLoad = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', window.innerWidth);
    svg.setAttribute('height', window.innerHeight);
    svgRef.current.appendChild(svg);

    const unitSize = (window.innerWidth + window.innerHeight) / 60;
    const numPointsX = Math.ceil(window.innerWidth / unitSize) + 1;
    const numPointsY = Math.ceil(window.innerHeight / unitSize) + 1;
    const unitWidth = Math.ceil(window.innerWidth / (numPointsX - 1));
    const unitHeight = Math.ceil(window.innerHeight / (numPointsY - 1));

    pointsRef.current = [];

    for (let y = 0; y < numPointsY; y++) {
      for (let x = 0; x < numPointsX; x++) {
        pointsRef.current.push({ x: unitWidth * x, y: unitHeight * y, originX: unitWidth * x, originY: unitHeight * y });
      }
    }

    randomize(pointsRef.current, numPointsX, numPointsY, unitWidth, unitHeight);

    for (let i = 0; i < pointsRef.current.length; i++) {
      if (pointsRef.current[i].originX !== unitWidth * (numPointsX - 1) && pointsRef.current[i].originY !== unitHeight * (numPointsY - 1)) {
        const topLeftX = pointsRef.current[i].x;
        const topLeftY = pointsRef.current[i].y;
        const topRightX = pointsRef.current[i + 1].x;
        const topRightY = pointsRef.current[i + 1].y;
        const bottomLeftX = pointsRef.current[i + numPointsX].x;
        const bottomLeftY = pointsRef.current[i + numPointsX].y;
        const bottomRightX = pointsRef.current[i + numPointsX + 1].x;
        const bottomRightY = pointsRef.current[i + numPointsX + 1].y;

        const rando = Math.floor(Math.random() * 2);

        for (let n = 0; n < 2; n++) {
          const polygon = document.createElementNS(svg.namespaceURI, 'polygon');

          if (rando === 0) {
            if (n === 0) {
              polygon.point1 = i;
              polygon.point2 = i + numPointsX;
              polygon.point3 = i + numPointsX + 1;
              polygon.setAttribute('points', `${topLeftX},${topLeftY} ${bottomLeftX},${bottomLeftY} ${bottomRightX},${bottomRightY}`);
            } else if (n === 1) {
              polygon.point1 = i;
              polygon.point2 = i + 1;
              polygon.point3 = i + numPointsX + 1;
              polygon.setAttribute('points', `${topLeftX},${topLeftY} ${topRightX},${topRightY} ${bottomRightX},${bottomRightY}`);
            }
          } else if (rando === 1) {
            if (n === 0) {
              polygon.point1 = i;
              polygon.point2 = i + numPointsX;
              polygon.point3 = i + 1;
              polygon.setAttribute('points', `${topLeftX},${topLeftY} ${bottomLeftX},${bottomLeftY} ${topRightX},${topRightY}`);
            } else if (n === 1) {
              polygon.point1 = i + numPointsX;
              polygon.point2 = i + 1;
              polygon.point3 = i + numPointsX + 1;
              polygon.setAttribute('points', `${bottomLeftX},${bottomLeftY} ${topRightX},${topRightY} ${bottomRightX},${bottomRightY}`);
            }
          }
          polygon.setAttribute('fill', `rgba(0,0,0,${Math.random() / 3})`);
          polygon.classList.add('triangle');

          const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
          animate.setAttribute('fill', 'freeze');
          animate.setAttribute('attributeName', 'points');
          animate.setAttribute('dur', `${refreshDuration}ms`);
          animate.setAttribute('calcMode', 'linear');
          polygon.appendChild(animate);
          svg.appendChild(polygon);
        }
      }
    }

    refresh(svg, pointsRef.current, numPointsX);
  };

  const onResize = () => {
    if (svgRef.current) {
      while (svgRef.current.firstChild) {
        svgRef.current.removeChild(svgRef.current.firstChild);
      }
    }
    clearTimeout(refreshTimeout.current);
    onLoad();
  };

  useEffect(() => {
    onLoad();
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(refreshTimeout.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <div id="bg" ref={svgRef} />;
};

export default BackgroundTriangles;
