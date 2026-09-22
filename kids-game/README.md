# Max & Chloe's Playtime

A simple, touch-friendly game for Max (4) and Chloe (2). One file, no build step.

## How to play

Open `kids-game/index.html` in any browser, or on a phone or tablet:

1. Pick who is playing. Chloe gets 2 choices and counts up to 3; Max gets 3 choices and counts up to 5.
2. Choose a game:
   - **Pop Bubbles** — tap floating bubbles to pop them. Nothing can go wrong, ideal for age 2.
   - **Find the Animal** — "Find the cow!" Tap the right animal.
   - **Colours** — "Tap red!" Tap the right colour.
   - **Counting** — count the pictures and tap the number.
   - **Dot to Dot** — join numbered dots with a finger to draw letters (their own names first), numbers 1 to 5, and shapes. A faint guide shows the shape, and a finished letter is read out loud.

Pop Bubbles speeds up as you go: every 5 pops raises the level, and bubbles get faster, smaller, and start drifting sideways. Chloe ramps up more gently than Max.
3. Every right answer earns a star and a cheer.

Sounds and spoken prompts use the browser's built-in audio and speech, so nothing needs downloading.
On iPhone or iPad, use Share → Add to Home Screen for a full-screen app without browser bars.

To try it from a computer on the same Wi-Fi as a tablet, run a tiny server from the repo root:

```
npx serve kids-game
```
