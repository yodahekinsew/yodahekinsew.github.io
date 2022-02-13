function lerp(a, b, t) {
  return a + (b - a) * t;
}

function inverseLerp(t, a, b) {
  return (t - a) / (b - a);
}

function clamp01(a) {
  return Math.max(Math.min(a, 1), 0);
}

// === Export to Math ===
Math.lerp = lerp;
Math.inverseLerp = inverseLerp;
Math.clamp01 = clamp01;
