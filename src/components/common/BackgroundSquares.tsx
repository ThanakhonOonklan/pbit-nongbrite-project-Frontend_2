"use client";

import React from "react";

export function BackgroundSquares() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* ✨ วงกลม (Circles) - 3 วง */}
      {/* Circle 1: มุมขวาบน */}
      <div
        className="absolute rounded-full opacity-50 sm:opacity-60 animate-float-settings w-[150px] h-[150px] sm:w-[300px] sm:h-[300px] -top-[50px] sm:-top-[100px] right-[5%] sm:right-[15%]"
        style={{
          background: "linear-gradient(135deg, rgba(0, 168, 232, 0.2) 0%, rgba(79, 194, 247, 0.2) 100%)",
          willChange: "transform",
        }}
      ></div>

      {/* Circle 2: มุมซ้ายล่าง */}
      <div
        className="absolute rounded-full opacity-50 sm:opacity-60 animate-float-reverse-settings w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] bottom-[10%] sm:bottom-[15%] -left-[5%] sm:-left-[10%]"
        style={{
          background: "linear-gradient(135deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 224, 130, 0.1) 100%)",
          animationDelay: "2s",
          willChange: "transform",
        }}
      ></div>

      {/* Circle 3: กลางขวา */}
      <div
        className="absolute rounded-full opacity-50 sm:opacity-60 animate-float-settings w-[85px] h-[85px] sm:w-[150px] sm:h-[150px] top-[40%] right-[2%] sm:right-[5%]"
        style={{
          background: "linear-gradient(135deg, rgba(129, 212, 250, 0.25) 0%, rgba(187, 222, 251, 0.1) 100%)",
          animationDelay: "4s",
          willChange: "transform",
        }}
      ></div>

      {/* 📦 สี่เหลี่ยม (Squares) - 2 อัน */}
      {/* Square 1: มุมซ้ายบน */}
      <div
        className="absolute rounded-[12px] sm:rounded-[20px] opacity-50 sm:opacity-60 animate-rotate-settings w-[130px] h-[130px] sm:w-[250px] sm:h-[250px] top-[15%] -left-[5%]"
        style={{
          background: "linear-gradient(135deg, rgba(0, 168, 232, 0.15) 0%, rgba(79, 194, 247, 0.38) 100%)",
          transform: "rotate(15deg)",
          willChange: "transform",
        }}
      ></div>

      {/* Square 2: มุมขวาล่าง */}
      <div
        className="absolute rounded-[10px] sm:rounded-[20px] opacity-50 sm:opacity-60 animate-rotate-reverse-settings w-[90px] h-[90px] sm:w-[180px] sm:h-[180px] bottom-[20%] sm:bottom-[25%] right-[5%] sm:right-[15%]"
        style={{
          background: "linear-gradient(135deg, rgba(174, 213, 255, 0.2) 0%, rgba(227, 242, 253, 0.1) 100%)",
          transform: "rotate(-20deg)",
          animationDelay: "3s",
          willChange: "transform",
        }}
      ></div>

      {/* 🔺 สามเหลี่ยม (Triangles) - 2 อัน */}
      {/* Triangle 1: กลางซ้าย - ซ่อนบนหน้าจอเล็กเพื่อลดความแออัด */}
      <div
        className="absolute opacity-50 sm:opacity-60 animate-float-settings hidden md:block"
        style={{
          width: "0",
          height: "0",
          borderLeft: "100px solid transparent",
          borderRight: "100px solid transparent",
          borderBottom: "180px solid rgba(255, 193, 7, 0.15)",
          top: "10%",
          left: "35%",
          animationDelay: "5s",
          willChange: "transform",
        }}
      ></div>

      {/* Triangle 2: กลางขวาล่าง - ย่อขนาดแบบ Responsive */}
      <div
        className="absolute opacity-50 sm:opacity-60 animate-float-reverse-settings scale-50 sm:scale-100 origin-bottom-right"
        style={{
          width: "0",
          height: "0",
          borderLeft: "80px solid transparent",
          borderRight: "80px solid transparent",
          borderBottom: "140px solid rgba(129, 212, 250, 0.18)",
          bottom: "10%",
          right: "30%",
          transform: "rotate(180deg)",
          animationDelay: "1s",
          willChange: "transform",
        }}
      ></div>

      {/* ⭕ วงแหวน (Rings) - 2 วง */}
      {/* Ring 1: กลางซ้าย - ซ่อนบนหน้าจอเล็กเพื่อเน้นเนื้อหา */}
      <div
        className="absolute rounded-full opacity-50 sm:opacity-60 animate-rotate-slow-settings hidden md:block"
        style={{
          width: "220px",
          height: "220px",
          border: "25px solid rgba(0, 168, 232, 0.15)",
          top: "40%",
          left: "15%",
          willChange: "transform",
        }}
      ></div>

      {/* Ring 2: มุมขวาบน - ย่อขนาดบนหน้าจอมือถือ */}
      <div
        className="absolute rounded-full opacity-50 sm:opacity-60 animate-rotate-slow-reverse-settings scale-50 sm:scale-100 origin-top-right"
        style={{
          width: "160px",
          height: "160px",
          border: "25px solid rgba(255, 193, 7, 0.12)",
          top: "5%",
          right: "35%",
          animationDelay: "2s",
          willChange: "transform",
        }}
      ></div>

      {/* 🌙 ครึ่งวงกลม (Half Circles) - 2 อัน */}
      {/* Half Circle 1: มุมขวาล่าง - ย่อขนาดบนหน้าจอมือถือ */}
      <div
        className="absolute rounded-t-full opacity-50 sm:opacity-60 animate-float-settings scale-50 sm:scale-100 origin-bottom-right"
        style={{
          width: "280px",
          height: "140px",
          borderRadius: "200px 200px 0 0",
          background: "linear-gradient(135deg, rgba(174, 213, 255, 0.2) 0%, rgba(227, 242, 253, 0.08) 100%)",
          bottom: "-70px",
          right: "20%",
          transform: "rotate(-15deg)",
          willChange: "transform",
        }}
      ></div>

      {/* Half Circle 2: มุมซ้ายบน - ย่อขนาดบนหน้าจอมือถือ */}
      <div
        className="absolute rounded-t-full opacity-50 sm:opacity-60 animate-float-reverse-settings scale-50 sm:scale-100 origin-top-left"
        style={{
          width: "200px",
          height: "100px",
          borderRadius: "200px 200px 0 0",
          background: "linear-gradient(135deg, rgba(255, 224, 130, 0.18) 0%, rgba(255, 249, 196, 0.34) 100%)",
          top: "-50px",
          left: "25%",
          transform: "rotate(160deg)",
          animationDelay: "6s",
          willChange: "transform",
        }}
      ></div>

      {/* ⚫ ลายจุด (Dots Pattern) */}
      <div
        className="absolute opacity-50 sm:opacity-60 animate-float-settings w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] top-[65%] right-[4%] sm:right-[8%]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0, 168, 232, 0.15) 2px, transparent 2px)",
          backgroundSize: "25px 25px",
          animationDelay: "7s",
          willChange: "transform",
        }}
      ></div>
    </div>
  );
}
