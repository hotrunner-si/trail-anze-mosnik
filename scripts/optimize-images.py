from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / '.image-tools'))
import pillow_heif
pillow_heif.register_heif_opener()
from PIL import Image, ImageOps
import json
root = Path(__file__).resolve().parents[1]
source = root / 'public/images'
output = source / 'optimized'
manifest = {}
for path in sorted(source.rglob('*')):
    if not path.is_file() or output in path.parents or path.suffix.lower() not in ('.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'):
        continue
    relative = path.relative_to(source)
    # Include the original extension to avoid collisions between similarly named files.
    base = output / relative.parent / relative.name
    base.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(path) as opened:
        image = ImageOps.exif_transpose(opened).convert('RGB' if opened.mode != 'RGBA' else 'RGBA')
        variants = {}
        for name, size, quality in [('small', 960, 84), ('full', 3200, 94)]:
            result = image.copy()
            result.thumbnail((size, size), Image.Resampling.LANCZOS)
            target = Path(str(base) + '.' + name + '.webp')
            if not target.exists() or target.stat().st_mtime < path.stat().st_mtime:
                result.save(target, 'WEBP', quality=quality, method=4)
            variants[name] = {'src': '/' + target.relative_to(root / 'public').as_posix(), 'width': result.width, 'height': result.height, 'bytes': target.stat().st_size}
        manifest['/images/' + relative.as_posix()] = variants
(root / 'src/image-variants.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Converted {len(manifest)} images; small: {sum(x["small"]["bytes"] for x in manifest.values()):,} bytes; full: {sum(x["full"]["bytes"] for x in manifest.values()):,} bytes')
