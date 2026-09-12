export interface CodeState {
  html: string;
  css: string;
  js: string;
}

export type EditorTab = 'html' | 'css' | 'js';

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  code: CodeState;
}

export const TEMPLATES: Template[] = [
  {
    id: 'blank',
    name: 'Blank',
    description: 'Start from scratch',
    icon: 'FileCode',
    code: {
      html: '<div class="container">\n  <h1>Hello, World!</h1>\n  <p>Start building something amazing.</p>\n</div>',
      css: 'body {\n  font-family: system-ui, sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  margin: 0;\n  background: #0d0d14;\n  color: #e8e8f0;\n}\n\n.container {\n  text-align: center;\n}\n\nh1 {\n  font-size: 2.5rem;\n  margin-bottom: 0.5rem;\n}\n\np {\n  color: #9999b0;\n}',
      js: '',
    },
  },
  {
    id: 'card',
    name: 'Glass Card',
    description: 'A frosted glass card with hover effect',
    icon: 'CreditCard',
    code: {
      html: '<div class="card">\n  <div class="card-glow"></div>\n  <div class="card-content">\n    <div class="avatar">A</div>\n    <h2>Alex Carter</h2>\n    <p class="role">Product Designer</p>\n    <div class="stats">\n      <div class="stat"><span class="num">42</span><span class="label">Projects</span></div>\n      <div class="stat"><span class="num">1.2k</span><span class="label">Followers</span></div>\n      <div class="stat"><span class="num">98%</span><span class="label">Rating</span></div>\n    </div>\n  </div>\n</div>',
      css: 'body {\n  margin: 0;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #1a1a2e, #16213e);\n  font-family: system-ui, sans-serif;\n}\n\n.card {\n  position: relative;\n  width: 320px;\n  padding: 2rem;\n  border-radius: 20px;\n  background: rgba(255,255,255,0.08);\n  backdrop-filter: blur(20px);\n  border: 1px solid rgba(255,255,255,0.12);\n  text-align: center;\n  color: #fff;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  overflow: hidden;\n}\n\n.card:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 20px 60px rgba(0,0,0,0.4);\n}\n\n.card-glow {\n  position: absolute;\n  top: -50%;\n  left: -50%;\n  width: 200%;\n  height: 200%;\n  background: radial-gradient(circle, rgba(255,120,73,0.15), transparent 60%);\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n\n.card:hover .card-glow {\n  opacity: 1;\n}\n\n.avatar {\n  width: 70px;\n  height: 70px;\n  margin: 0 auto 1rem;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #ff7849, #ff4d6d);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.8rem;\n  font-weight: 700;\n}\n\nh2 { margin: 0 0 0.25rem; font-size: 1.3rem; }\n.role { color: #9999b0; margin: 0 0 1.5rem; font-size: 0.9rem; }\n\n.stats { display: flex; justify-content: space-around; }\n.stat { display: flex; flex-direction: column; }\n.num { font-weight: 700; font-size: 1.1rem; }\n.label { font-size: 0.75rem; color: #6b6b85; margin-top: 2px; }',
      js: '',
    },
  },
  {
    id: 'clock',
    name: 'Live Clock',
    description: 'Animated digital clock',
    icon: 'Clock',
    code: {
      html: '<div class="clock-container">\n  <div class="time" id="time">00:00:00</div>\n  <div class="date" id="date">Loading...</div>\n</div>',
      css: 'body {\n  margin: 0;\n  min-height: 100vh;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #0d0d14;\n  font-family: "Courier New", monospace;\n}\n\n.clock-container {\n  text-align: center;\n  padding: 2rem 3rem;\n  border-radius: 20px;\n  background: rgba(255,255,255,0.05);\n  border: 1px solid rgba(255,255,255,0.1);\n}\n\n.time {\n  font-size: 4rem;\n  font-weight: 700;\n  color: #2dd4bf;\n  letter-spacing: 4px;\n  text-shadow: 0 0 30px rgba(45,212,191,0.3);\n}\n\n.date {\n  margin-top: 0.5rem;\n  color: #9999b0;\n  font-size: 1rem;\n  letter-spacing: 2px;\n}',
      js: "function updateClock() {\n  const now = new Date();\n  const h = String(now.getHours()).padStart(2, '0');\n  const m = String(now.getMinutes()).padStart(2, '0');\n  const s = String(now.getSeconds()).padStart(2, '0');\n  document.getElementById('time').textContent = h + ':' + m + ':' + s;\n\n  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];\n  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];\n  document.getElementById('date').textContent =\n    days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate() + ' ' + now.getFullYear();\n}\n\nupdateClock();\nsetInterval(updateClock, 1000);",
    },
  },
  {
    id: 'particles',
    name: 'Particles',
    description: 'Interactive particle canvas',
    icon: 'Sparkles',
    code: {
      html: '<canvas id="canvas"></canvas>\n<div class="hint">Move your mouse</div>',
      css: 'body {\n  margin: 0;\n  overflow: hidden;\n  background: #0d0d14;\n}\ncanvas { display: block; }\n.hint {\n  position: fixed;\n  top: 20px;\n  left: 50%;\n  transform: translateX(-50%);\n  color: #6b6b85;\n  font-family: system-ui, sans-serif;\n  font-size: 0.85rem;\n  letter-spacing: 1px;\n  pointer-events: none;\n}',
      js: "const canvas = document.getElementById('canvas');\nconst ctx = canvas.getContext('2d');\ncanvas.width = innerWidth;\ncanvas.height = innerHeight;\n\nconst particles = [];\nconst colors = ['#ff7849', '#2dd4bf', '#a78bfa', '#f472b6'];\n\nfor (let i = 0; i < 80; i++) {\n  particles.push({\n    x: Math.random() * canvas.width,\n    y: Math.random() * canvas.height,\n    vx: (Math.random() - 0.5) * 0.5,\n    vy: (Math.random() - 0.5) * 0.5,\n    r: Math.random() * 3 + 1,\n    c: colors[Math.floor(Math.random() * colors.length)]\n  });\n}\n\nlet mouse = { x: -100, y: -100 };\nwindow.addEventListener('mousemove', e => {\n  mouse.x = e.clientX;\n  mouse.y = e.clientY;\n});\n\nfunction animate() {\n  ctx.fillStyle = 'rgba(13,13,20,0.15)';\n  ctx.fillRect(0, 0, canvas.width, canvas.height);\n\n  particles.forEach(p => {\n    const dx = mouse.x - p.x;\n    const dy = mouse.y - p.y;\n    const dist = Math.sqrt(dx*dx + dy*dy);\n    if (dist < 120) {\n      p.vx -= dx * 0.0003;\n      p.vy -= dy * 0.0003;\n    }\n    p.x += p.vx;\n    p.y += p.vy;\n    p.vx *= 0.99;\n    p.vy *= 0.99;\n    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;\n    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;\n\n    ctx.beginPath();\n    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);\n    ctx.fillStyle = p.c;\n    ctx.fill();\n  });\n\n  for (let i = 0; i < particles.length; i++) {\n    for (let j = i + 1; j < particles.length; j++) {\n      const dx = particles[i].x - particles[j].x;\n      const dy = particles[i].y - particles[j].y;\n      if (Math.sqrt(dx*dx + dy*dy) < 100) {\n        ctx.strokeStyle = particles[i].c + '33';\n        ctx.lineWidth = 0.5;\n        ctx.beginPath();\n        ctx.moveTo(particles[i].x, particles[i].y);\n        ctx.lineTo(particles[j].x, particles[j].y);\n        ctx.stroke();\n      }\n    }\n  }\n\n  requestAnimationFrame(animate);\n}\nanimate();\n\nwindow.addEventListener('resize', () => {\n  canvas.width = innerWidth;\n  canvas.height = innerHeight;\n});",
    },
  },
];
