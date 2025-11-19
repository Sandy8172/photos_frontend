// jwt utilities to generate and verify token ----------

export function generateToken(payload) {
  const token = btoa(
    JSON.stringify({
      ...payload,
      exp: Date.now() + 30 * 60 * 1000, // 30 minutes expiry
    })
  );
  return token;
}

export function verifyToken(token) {
  try {
    const data = JSON.parse(atob(token));

    if (Date.now() > data.exp) {
      return { valid: false, expired: true };
    }

    return { valid: true, expired: false, payload: data };
  } catch {
    return { valid: false, expired: true };
  }
}
