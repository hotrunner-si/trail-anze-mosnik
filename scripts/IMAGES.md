# Image variants

Run `py -m pip install --target .image-tools pillow-heif` once, then `py scripts/optimize-images.py` after adding or replacing source photos.

All source photos (including HEIC) remain in `public/images`. Generated WebP files live in `public/images/optimized`, with dimensions recorded in `src/image-variants.json`.

- Small: longest edge up to 960 px, quality 84.
- Full: longest edge up to 3200 px, quality 94.
- No upscaling; EXIF orientation is applied and metadata omitted.

Responsive images select the appropriate size for the screen. Clicking a gallery photo opens the full version. Escape, the close button or clicking outside the photo closes it.

Public pages: `/`, `/v1`, `/v2`. Both trailing-slash spellings work.
