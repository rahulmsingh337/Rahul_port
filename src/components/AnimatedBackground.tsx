import React, { useEffect, useRef } from 'react';
import { useScroll, useSpring, useTransform } from 'motion/react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const { scrollYProgress } = useScroll();
  const scrollSmooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width: number;
    let height: number;
    const gridSpacing = 80;
    
    // Data Dust (Small reactive particles)
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseOpacity: number;
    }
    
    let particles: Particle[] = [];
    const particleCount = 120;

    // Logic Signals (Moving data packets)
    interface Signal {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      progress: number;
      speed: number;
      type: 'vibrant' | 'royal';
    }
    
    let signals: Signal[] = [];
    const maxSignals = 45;

    // Infrastructure Nodes (Fixed on grid)
    interface GridNode {
      x: number;
      y: number;
      pulse: number;
    }
    
    let gridNodes: GridNode[] = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      gridNodes = [];
      for (let x = 0; x < width + gridSpacing; x += gridSpacing) {
        for (let y = 0; y < height + gridSpacing; y += gridSpacing) {
          if (Math.random() > 0.85) {
            gridNodes.push({ x, y, pulse: Math.random() * Math.PI });
          }
        }
      }

      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 1.5 + 0.5,
        baseOpacity: Math.random() * 0.3 + 0.1
      }));

      signals = [];
    };

    const createSignal = () => {
      if (signals.length >= maxSignals || gridNodes.length === 0) return;
      
      const startNode = gridNodes[Math.floor(Math.random() * gridNodes.length)];
      const direction = Math.random() > 0.5 ? 'h' : 'v';
      const offset = (Math.random() > 0.5 ? 1 : -1) * gridSpacing;
      
      signals.push({
        x: startNode.x,
        y: startNode.y,
        targetX: direction === 'h' ? startNode.x + offset : startNode.x,
        targetY: direction === 'v' ? startNode.y + offset : startNode.y,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        type: Math.random() > 0.5 ? 'vibrant' : 'royal'
      });
    };

    const animate = (time: number) => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      const currentScroll = scrollSmooth.get();
      const scrollOffset = currentScroll * 500;
      
      // Dynamic Hue Logic
      const hueShift = currentScroll * 60; // Shift hue as user scrolls
      const vibrantColor = `hsla(${180 + hueShift}, 70%, 60%, 0.3)`;
      const royalColor = `hsla(${240 + hueShift}, 70%, 60%, 0.4)`;

      // Draw Background Grid
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += gridSpacing) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = -(scrollOffset % gridSpacing); y < height; y += gridSpacing) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Update and Draw Data Dust (Advanced Mouse Interaction)
      particles.forEach(p => {
        // Apply velocity with friction
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Screen wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse behavior logic
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          // Mode 1: High-velocity acceleration AWAY (Repulse)
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 0.8;
          p.vy -= (dy / dist) * force * 0.8;
          ctx.globalAlpha = p.baseOpacity + force * 0.6;
        } else if (dist < 400) {
          // Mode 2: Subtle gravitational pull TOWARDS (Attract)
          const force = (400 - dist) / 400;
          p.vx += (dx / dist) * force * 0.05;
          p.vy += (dy / dist) * force * 0.05;
          ctx.globalAlpha = p.baseOpacity;
        } else {
          ctx.globalAlpha = p.baseOpacity;
          // Return to base drift if too slow
          if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.05;
          if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.05;
        }

        ctx.fillStyle = currentScroll > 0.5 ? '#22D3EE' : '#6366F1';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Atmospheric Static Glows
      const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0)');
      grad.addColorStop(1, 'rgba(2, 6, 23, 0.9)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw Grid Nodes
      gridNodes.forEach(node => {
        node.pulse += 0.03;
        const opacity = 0.05 + Math.sin(node.pulse) * 0.1;
        const size = 3 + Math.sin(node.pulse) * 2;
        
        ctx.fillStyle = royalColor.replace('0.4', opacity.toString());
        ctx.fillRect(node.x - size/2, node.y - (scrollOffset % height) - size/2, size, size);
      });

      // Update and Draw Logic Signals
      if (Math.random() > 0.85) createSignal();

      signals.forEach((sig, index) => {
        sig.progress += sig.speed;
        
        const currentX = sig.x + (sig.targetX - sig.x) * sig.progress;
        const currentY = sig.y + (sig.targetY - sig.y) * sig.progress;
        const yPos = currentY - (scrollOffset % height);
        
        ctx.beginPath();
        ctx.moveTo(sig.x, sig.y - (scrollOffset % height));
        ctx.lineTo(currentX, yPos);
        ctx.strokeStyle = sig.type === 'vibrant' ? vibrantColor : royalColor;
        ctx.lineWidth = 1;
        ctx.globalAlpha = (1 - sig.progress) * 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;

        // Signal Head
        ctx.fillStyle = '#fff';
        ctx.fillRect(currentX - 1, yPos - 1, 2, 2);

        if (sig.progress >= 1) signals.splice(index, 1);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };

    const handleResize = () => init();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    init();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollSmooth]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-screen w-screen bg-[#020617]"
    />
  );
};
