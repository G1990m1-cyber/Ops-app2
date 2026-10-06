/** Verifies a Cloudflare Turnstile token. Passes when Turnstile is not configured (local dev). */
export const verifyTurnstile = async (token: string | undefined, ip?: string | null): Promise<boolean> => {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token, remoteip: ip || undefined }),
    })
    const json = (await res.json()) as { success: boolean }
    return Boolean(json.success)
  } catch {
    return false
  }
}
