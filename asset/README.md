# Asset Sources

Thư mục này chỉ chứa file nguồn dung lượng lớn, không phải file web dùng trực tiếp.

## Cấu trúc

- `asset/vid_*.mp4`: clip nguồn do người dùng/designer cung cấp.
- `asset/videos/originals/`, `asset/images/originals/`, `asset/brand/originals/`: nơi nhận file gốc mới từ designer.
- `public/media/videos/landing/demo/`: 6 bản MP4 đã tối ưu để web dùng.
- `public/media/posters/landing/demo/`: 6 poster JPG trích từ chính clip.

## Quy tắc

- Không đổi tên, xóa hoặc ghi đè clip nguồn.
- Không commit file nguồn MP4/MOV/WebM; `.gitignore` đã chặn `asset/`.
- Chỉ commit `README.md`, `ATTRIBUTION.md` và media đã tối ưu trong `public/media`.
- URL trình duyệt dùng `/media/...`, không dùng đường dẫn ổ E hoặc `/asset/...`.

## Xuất media

Dùng FFmpeg 9.0.2. Mỗi clip xuất một MP4 1920x1080, bỏ audio, faststart và một poster JPG:

```bash
ffmpeg -ss <start> -i asset/vid_<n>.mp4 -t <8-15> \
  -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" -an \
  -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
  -profile:v high -level 4.0 -movflags +faststart \
  public/media/videos/landing/demo/vid-<slot>.mp4

ffmpeg -ss <poster_time> -i asset/vid_<n>.mp4 -frames:v 1 -q:v 2 \
  public/media/posters/landing/demo/vid-<slot>.jpg
```

- `-an`: bỏ audio để autoplay muted và giảm dung lượng.
- `+faststart`: đưa metadata lên đầu file để phát sớm.
- Poster: fallback khi video chưa tải, autoplay bị chặn, reduced motion, Save-Data hoặc no-JS.
- Mục tiêu 2-6 MB/clip, tổng <= 25 MB.

## Nguồn

Xem `ATTRIBUTION.md` và `Plan-and-Docs/03-ARCH-NOTES/MEDIA_CATALOG.md`.
