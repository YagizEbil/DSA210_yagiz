import { ArrowDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      angle: number;
      speed: number;
      size: number;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.5 + 0.2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.size = Math.random() * 2 + 1;
      }

      update(mouse: { x: number; y: number }) {
        // Continuous random movement
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen edges with fade effect
        const padding = 50;
        if (this.x < -padding) this.x = canvas.width + padding;
        if (this.x > canvas.width + padding) this.x = -padding;
        if (this.y < -padding) this.y = canvas.height + padding;
        if (this.y > canvas.height + padding) this.y = -padding;

        // Gradually change direction
        this.angle += (Math.random() - 0.5) * 0.1;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;

        // Connect to mouse when nearby instead of repelling
        const mouseDistance = Math.hypot(mouse.x - this.x, mouse.y - this.y);
        const attractRange = 150;
        
        if (mouseDistance < attractRange) {
          const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
          const force = (attractRange - mouseDistance) / attractRange;
          this.x += Math.cos(angle) * force * 0.5;
          this.y += Math.sin(angle) * force * 0.5;
        }
      }

      draw(ctx: CanvasRenderingContext2D, mouse: { x: number; y: number }) {
        const mouseDistance = Math.hypot(mouse.x - this.x, mouse.y - this.y);
        const maxDistance = 200;
        const opacity = Math.min(1, Math.max(0.2, 1 - mouseDistance / maxDistance));
        const glow = mouseDistance < 100 ? 3 : 0;
        
        // Draw glow effect
        if (glow > 0) {
          ctx.shadowBlur = glow;
          ctx.shadowColor = 'rgba(30, 144, 255, 0.5)';
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30, 144, 255, ${opacity})`;
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    const particleCount = 80;
    const connectionDistance = 150;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      ));
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.update(mouseRef.current);
        particle.draw(ctx, mouseRef.current);

        // Connect particles
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const mouseDistance = Math.hypot(
              mouseRef.current.x - (particle.x + otherParticle.x) / 2,
              mouseRef.current.y - (particle.y + otherParticle.y) / 2
            );
            const opacity = Math.min(0.2, Math.max(0.05, 1 - distance / connectionDistance));
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(30, 144, 255, ${opacity})`;
            ctx.stroke();
          }
        });

        // Connect to mouse
        const mouseDistance = Math.hypot(mouseRef.current.x - particle.x, mouseRef.current.y - particle.y);
        if (mouseDistance < connectionDistance) {
          const opacity = Math.min(0.3, Math.max(0.1, 1 - mouseDistance / connectionDistance));
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(30, 144, 255, ${opacity})`;
          ctx.stroke();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToDataset = () => {
    const element = document.getElementById('dataset');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: 'transparent' }}
      />

      <div className="relative z-10 text-center px-4">
        <h1 className="font-roboto font-bold text-4xl md:text-6xl lg:text-7xl mb-6 animate-fade-down">
          Vehicle Sensor Data Analysis
        </h1>
        <p className="font-merriweather text-xl md:text-2xl text-gray-600 mb-12 animate-fade-up">
          Exploring Data, Driving Insights
        </p>
        <button
          onClick={scrollToDataset}
          className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors animate-fade-up"
        >
          Learn More
          <ArrowDown size={20} />
        </button>
      </div>
    </div>
  );
};

export default Hero;