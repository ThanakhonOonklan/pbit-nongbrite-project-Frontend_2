"use client";

import React from "react";

export function BackgroundSquares() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* ✨ วงกลม (Circles) - 3 วง */}
      {/* Circle 1: มุมขวาบน */}
      <div
        className="absolute rounded-full opacity-60 animate-float-settings"
        style={{
          width: "300px",
          height: "300px",
          background: "linear-gradient(135deg, rgba(0, 168, 232, 0.2) 0%, rgba(79, 194, 247, 0.2) 100%)",
          top: "-100px",
          right: "15%",
        }}
      ></div>

      {/* Circle 2: มุมซ้ายล่าง */}
      <div
        className="absolute rounded-full opacity-60 animate-float-reverse-settings"
        style={{
          width: "200px",
          height: "200px",
          background: "linear-gradient(135deg, rgba(255, 193, 7, 0.2) 0%, rgba(255, 224, 130, 0.1) 100%)",
          bottom: "15%",
          left: "-10%",
          animationDelay: "2s",
        }}
      ></div>

      {/* Circle 3: กลางขวา */}
      <div
        className="absolute rounded-full opacity-60 animate-float-settings"
        style={{
          width: "150px",
          height: "150px",
          background: "linear-gradient(135deg, rgba(129, 212, 250, 0.25) 0%, rgba(187, 222, 251, 0.1) 100%)",
          top: "40%",
          right: "5%",
          animationDelay: "4s",
        }}
      ></div>

      {/* 📦 สี่เหลี่ยม (Squares) - 2 อัน */}
      {/* Square 1: มุมซ้ายบน */}
      <div
        className="absolute rounded-[20px] opacity-60 animate-rotate-settings"
        style={{
          width: "250px",
          height: "250px",
          background: "linear-gradient(135deg, rgba(0, 168, 232, 0.15) 0%, rgba(79, 194, 247, 0.38) 100%)",
          top: "15%",
          left: "-5%",
          transform: "rotate(15deg)",
        }}
      ></div>

      {/* Square 2: มุมขวาล่าง */}
      <div
        className="absolute rounded-[20px] opacity-60 animate-rotate-reverse-settings"
        style={{
          width: "180px",
          height: "180px",
          background: "linear-gradient(135deg, rgba(174, 213, 255, 0.2) 0%, rgba(227, 242, 253, 0.1) 100%)",
          bottom: "25%",
          right: "15%",
          transform: "rotate(-20deg)",
          animationDelay: "3s",
        }}
      ></div>

      {/* 🔺 สามเหลี่ยม (Triangles) - 2 อัน */}
      {/* Triangle 1: กลางซ้าย */}
      <div
        className="absolute opacity-60 animate-float-settings"
        style={{
          width: "0",
          height: "0",
          borderLeft: "100px solid transparent",
          borderRight: "100px solid transparent",
          borderBottom: "180px solid rgba(255, 193, 7, 0.15)",
          top: "10%",
          left: "35%",
          animationDelay: "5s",
        }}
      ></div>

      {/* Triangle 2: กลางขวาล่าง */}
      <div
        className="absolute opacity-60 animate-float-reverse-settings"
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
        }}
      ></div>

      {/* ⭕ วงแหวน (Rings) - 2 วง */}
      {/* Ring 1: กลางซ้าย */}
      <div
        className="absolute rounded-full opacity-60 animate-rotate-slow-settings"
        style={{
          width: "220px",
          height: "220px",
          border: "25px solid rgba(0, 168, 232, 0.15)",
          top: "40%",
          left: "15%",
        }}
      ></div>

      {/* Ring 2: มุมขวาบน */}
      <div
        className="absolute rounded-full opacity-60 animate-rotate-slow-reverse-settings"
        style={{
          width: "160px",
          height: "160px",
          border: "25px solid rgba(255, 193, 7, 0.12)",
          top: "5%",
          right: "35%",
          animationDelay: "2s",
        }}
      ></div>

      {/* 🌙 ครึ่งวงกลม (Half Circles) - 2 อัน */}
      {/* Half Circle 1: มุมขวาล่าง */}
      <div
        className="absolute rounded-t-full opacity-60 animate-float-settings"
        style={{
          width: "280px",
          height: "140px",
          borderRadius: "200px 200px 0 0",
          background: "linear-gradient(135deg, rgba(174, 213, 255, 0.2) 0%, rgba(227, 242, 253, 0.08) 100%)",
          bottom: "-70px",
          right: "20%",
          transform: "rotate(-15deg)",
        }}
      ></div>

      {/* Half Circle 2: มุมซ้ายบน */}
      <div
        className="absolute rounded-t-full opacity-60 animate-float-reverse-settings"
        style={{
          width: "200px",
          height: "100px",
          borderRadius: "200px 200px 0 0",
          background: "linear-gradient(135deg, rgba(255, 224, 130, 0.18) 0%, rgba(255, 249, 196, 0.34) 100%)",
          top: "-50px",
          left: "25%",
          transform: "rotate(160deg)",
          animationDelay: "6s",
        }}
      ></div>

      {/* ⚫ ลายจุด (Dots Pattern) */}
      <div
        className="absolute opacity-60 animate-float-settings"
        style={{
          width: "200px",
          height: "200px",
          backgroundImage: "radial-gradient(circle, rgba(0, 168, 232, 0.15) 2px, transparent 2px)",
          backgroundSize: "25px 25px",
          top: "65%",
          right: "8%",
          animationDelay: "7s",
        }}
      ></div>

    
    </div>
  );
}
