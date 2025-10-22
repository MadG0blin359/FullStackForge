import React, { useState, useEffect, useRef } from "react";

const MeteorBackground = () => {
  const canvasRef = useRef(null);

  // Converts the canvas logic into a React effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial size and resize listener
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class ShootingStar {
      constructor() {
        this.reset();
      }

      reset() {
        if (Math.random() < 0.5) {
          this.x = Math.random() * canvas.width;
          this.y = -10;
        } else {
          this.x = -10;
          this.y = Math.random() * canvas.height;
        }

        this.len = Math.random() * 80 + 30;
        this.speed = Math.random() * 4 + 1;
        this.size = Math.random() * 2 + 3.5;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.velX = this.speed;
        this.velY = this.speed;
      }

      update() {
        this.x += this.velX;
        this.y += this.velY;
        if (
          this.x > canvas.width + this.len ||
          this.y > canvas.height + this.len
        ) {
          this.reset();
        }
      }

      draw() {
        const grad = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x - this.len,
          this.y - this.len
        );
        grad.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.size;
        ctx.lineCap = "round";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "white";

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - this.len, this.y - this.len);
        ctx.stroke();
        ctx.restore();
      }
    }

    const shootingStars = [];
    for (let i = 0; i < 7; i++) {
      shootingStars.push(new ShootingStar());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shootingStars.forEach((star) => {
        star.update();
        star.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-1"
      ></canvas>
    </>
  );
};

export default MeteorBackground;
