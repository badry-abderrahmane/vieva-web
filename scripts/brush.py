# Generates dry-brush stroke alpha masks (white ink, transparent ground). The stroke runs left to right:
# a loaded, saturated head, bristle streaks running along the stroke, and a tail that dries out in gaps.
import numpy as np, sys
from PIL import Image, ImageFilter
out = sys.argv[1]
W, H = 1400, 200
def smooth(n, k, rng):
    v = rng.standard_normal(n + 2 * k)
    ker = np.hanning(2 * k + 1); ker /= ker.sum()
    return np.convolve(v, ker, mode='same')[k:k + n]
def make(seed, dry=0.55):
    rng = np.random.default_rng(seed)
    x = np.arange(W)
    # stroke body: ragged top and bottom edges that wander slowly
    edge = lambda: 40 * smooth(W, 90, rng) + 16 * smooth(W, 25, rng) + 5 * smooth(W, 4, rng)
    top = 20 + edge()
    bot = H - 20 + edge()
    # head: the brush lands with a slight flare, no geometric round cap
    head = np.clip(x / 26.0, 0, 1) ** 0.35
    tail = np.clip((W - x) / 140.0, 0, 1) ** 0.7
    mid = (top + bot) / 2; half = (bot - top) / 2 * np.minimum(head, 0.55 + 0.45 * tail)
    top, bot = mid - half, mid + half
    yy = np.arange(H)[:, None]
    body = ((yy >= top[None, :]) & (yy <= bot[None, :])).astype(float)
    # bristles: thin lanes (2-4 px) along the stroke, each running out of paint at its own point
    a = np.zeros((H, W))
    y = 0
    while y < H:
        h = rng.integers(2, 5)
        load = rng.uniform(0.6, 1.0)
        end = W * rng.uniform(dry, 1.02)               # where this bristle runs dry
        start = rng.uniform(0, 34)                     # bristles touch down at slightly different points
        lane = np.ones(W) * load * (1 - 0.22 * np.abs(smooth(W, 30, rng)) / 0.05 * 0.05)
        lane[x > end] = 0
        lane[x < start] = 0
        # skips: gaps that grow toward the end of the bristle
        nskip = rng.integers(2, 9)
        for _ in range(nskip):
            s = rng.uniform(0.25, 1.0) * end
            ln = rng.uniform(8, 90) * (s / W + 0.3)
            win = np.clip(1 - np.abs((x - s - ln / 2) / (ln / 2)), 0, 1) ** 0.6   # tapered skip
            lane *= 1 - win * rng.uniform(0.65, 1.0)
        a[y:y + h, :] = lane[None, :]
        y += h
    # the loaded head is solid ink, the tail shows the bristles
    solid = np.clip(1.25 - x / (W * 0.6), 0, 1)[None, :] * np.clip((x - 30) / 30.0, 0, 1)[None, :]
    alpha = body * np.clip(solid + a * (1 - solid) + 0.15 * a, 0, 1)
    im = Image.fromarray((alpha * 255).astype(np.uint8), 'L').filter(ImageFilter.GaussianBlur(0.7))
    rgba = Image.merge('RGBA', [Image.new('L', (W, H), 255)] * 3 + [im])
    return rgba
for i, (s, d) in enumerate([(7, 0.62), (21, 0.55), (42, 0.7)]):
    make(s, d).save(f'{out}/stroke-{i}.png', optimize=True)
print('ok')
