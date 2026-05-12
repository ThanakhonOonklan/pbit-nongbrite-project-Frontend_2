"use client";

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { useTranslations } from "next-intl";

const MASCOTS = [
  { src: "/images/P_Bit/bit-01.svg", label: "Bit" },
  { src: "/images/P_Minnie/minnie-01.svg", label: "Minnie" },
  { src: "/images/P_Momo/momo-01.svg", label: "Momo" },
  { src: "/images/P_Bobo/bobo-01.svg", label: "Bobo" },
  { src: "/images/P_Coco/coco-01.svg", label: "Coco" },
  { src: "/images/P_PingPing/pingping-01.svg", label: "PingPing" },
  { src: "/images/Nong_brite/nong-brite-01.svg", label: "Nong Brite" },
];

export function PhysicsPlayground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const t = useTranslations("Landing.Physics");

  useEffect(() => {
    if (!sceneRef.current) return;

    const {
      Engine,
      Render,
      Runner,
      Bodies,
      Composite,
      Mouse,
      MouseConstraint,
      Events,
    } = Matter;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // Get container dimensions
    const width = sceneRef.current.clientWidth;
    const height = 400;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });

    Render.run(render);

    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Add walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 30, width, 60, wallOptions);
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height, wallOptions);
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -30, width, 60, wallOptions);

    Composite.add(world, [ground, leftWall, rightWall, ceiling]);

    // Function to add a mascot
    const addMascot = (x: number, y: number) => {
      const mascot = MASCOTS[Math.floor(Math.random() * MASCOTS.length)];
      const size = Math.random() * 40 + 40; // 40-80px
      
      const body = Bodies.circle(x, y, size / 2, {
        restitution: 0.6,
        friction: 0.1,
        render: {
          sprite: {
            texture: mascot.src,
            xScale: size / 200, // Assuming base size of SVG is roughly 200
            yScale: size / 200,
          },
        },
      });

      Composite.add(world, body);
    };

    // Add initial mascots
    for (let i = 0; i < 12; i++) {
      addMascot(Math.random() * width, Math.random() * -height);
    }

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    Composite.add(world, mouseConstraint);
    render.mouse = mouse;

    // Prevent scrolling when interacting with physics
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    // Handle clicks to add more
    const handleClick = (event: MouseEvent) => {
      // Only add if not dragging
      if (!mouseConstraint.body) {
        addMascot(mouse.position.x, mouse.position.y);
      }
    };

    render.canvas.addEventListener("mousedown", handleClick);

    // Handle window resize
    const handleResize = () => {
      if (!sceneRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      render.canvas.width = newWidth;
      Matter.Body.setPosition(rightWall, { x: newWidth + 30, y: height / 2 });
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: height + 30 });
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -30 });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      render.canvas.removeEventListener("mousedown", handleClick);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t("title") || "Interactive Mascot Playground"}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {t("description") || "Drag, toss, and play with our mascots! Click anywhere in the box to add more friends."}
          </p>
        </div>
        
        <div 
          className="relative w-full h-[400px] bg-white rounded-[40px] border-4 border-dashed border-gray-200 shadow-inner cursor-crosshair overflow-hidden"
          ref={sceneRef}
        >
          {/* Instructions Overlay */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none opacity-40 text-sm font-medium text-gray-400">
            Click to drop • Drag to toss
          </div>
        </div>
      </div>
    </section>
  );
}
