import React, {
  useEffect,
} from "react";

export default function LoginCanvas() {
  useEffect(() => {
    const canvas =
      document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);
    canvas.style.position = "fixed";
    canvas.style.top = 0;
    canvas.style.left = 0;
    canvas.style.zIndex = -100;

    const particles = [];

    function render() {
      canvas.width = window.innerWidth;
      canvas.height =
        window.innerHeight;
      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        const particle = particles[i];
        const img = new Image();
        img.src =
          "https://img.icons8.com/material-rounded/48/b1f2cf/dumbbell.png";

        ctx.drawImage(
          img,
          particle.x -
            particle.size / 2,
          particle.y -
            particle.size / 2,
          particle.size,
          particle.size
        );
      }
    }

    function update() {
      while (particles.length < 100) {
        const particle = {
          x:
            Math.random() *
            canvas.width,
          y: 0,
          size: Math.random() * 20 + 15,
          speedX: Math.random() * 3 - 1,
          speedY: Math.random() * 3,
        };

        particles.push(particle);
      }

      for (
        let i = 0;
        i < particles.length;
        i++
      ) {
        const particle = particles[i];
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (
          particle.x < 0 ||
          particle.y > canvas.height
        ) {
          particles.splice(i, 1);
          i--;
        }
      }

      render();
    }

    function animate() {
      update();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return null;
}
