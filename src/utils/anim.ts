function animateCircle(circleX: number, circleY: number, centerX: number, centerY: number, ctx:CanvasRenderingContext2D) {
    const targetX = centerX / 2; 
    const targetY = centerY / 2;
    const circleRadius = 10;
    const dx = targetX - circleX;
    const dy = targetY - circleY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const speed = 2;

    if (distance > circleRadius) {
      // Если кружок еще не достиг цели
      const angle = Math.atan2(dy, dx);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;

      circleX += vx;
      circleY += vy;

      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
      ctx.fill();

      requestAnimationFrame(() => animateCircle(circleCoords.x, circleCoords.y, centerX, centerY, ctx));
    } else {
      setScore((prevScore) => prevScore + 1);
    }
  }