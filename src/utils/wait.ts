export function wait(ms: number) {
  const start = Date.now();
  let now = start;

  while (now - start < ms) {
    now = Date.now();
  }
}

export function waitBlock() {
  wait(Number(process.env.QUERT_INTERVAL) ?? 400);
}
