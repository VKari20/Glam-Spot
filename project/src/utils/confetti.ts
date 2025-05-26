export default function triggerConfetti() {
  const colors = ['#3B82F6', '#10B981', '#F97316', '#8B5CF6', '#EF4444'];
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return;
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);
  
  const particles: Particle[] = [];
  const particleCount = 150;
  
  interface Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    velocity: {
      x: number;
      y: number;
    };
    rotation: number;
    rotationSpeed: number;
  }
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: Math.random() * 6 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 15
      },
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 5
    });
  }
  
  // Update particles
  function update() {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, index) => {
      particle.velocity.y += 0.1; // Gravity
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.rotation += particle.rotationSpeed;
      
      // Draw particle
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);
      ctx.fillStyle = particle.color;
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
      ctx.restore();
      
      // Remove particles that are off-screen
      if (particle.y > canvas.height || particle.x < 0 || particle.x > canvas.width) {
        particles.splice(index, 1);
      }
    });
    
    if (particles.length > 0) {
      requestAnimationFrame(update);
    } else {
      // Remove canvas when all particles are gone
      document.body.removeChild(canvas);
    }
  }
  
  update();
}