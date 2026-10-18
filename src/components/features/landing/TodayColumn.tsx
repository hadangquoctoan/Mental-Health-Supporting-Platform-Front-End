"use client";

import Link from "next/link";
import { ArrowUpRight, Frown, Meh, Smile, SmilePlus } from "lucide-react";
import { useId, useState } from "react";

const MOODS = [
  {
    label: "Rất buồn",
    icon: Frown,
    message:
      "Nếu hôm nay quá nặng nề, hãy chia sẻ với một người bạn tin tưởng.",
  },
  {
    label: "Buồn",
    icon: Frown,
    message:
      "Bạn có thể dành một chút thời gian để ghi lại điều đang khiến mình buồn.",
  },
  {
    label: "Bình thường",
    icon: Meh,
    message:
      "Một ngày bình thường cũng đáng để bạn lắng nghe cảm xúc của mình.",
  },
  {
    label: "Vui",
    icon: Smile,
    message:
      "Điều gì đã khiến bạn vui hôm nay? Bạn có thể ghi lại để nhớ về nó.",
  },
  {
    label: "Rất vui",
    icon: SmilePlus,
    message:
      "Hãy dành một chút thời gian cho những điều đang mang lại niềm vui cho bạn.",
  },
];

export function TodayColumn() {
  const [selected, setSelected] = useState<number | null>(null);
  const hintId = useId();

  return (
    <aside className="today-column" aria-labelledby="today-heading">
      <div className="today-topline">
        <span className="today-preview-label">Thử một phút lắng nghe mình</span>
        <span className="today-demo-label">Minh họa</span>
      </div>
      <h2 id="today-heading">Hôm nay bạn cảm thấy thế nào?</h2>
      <fieldset className="today-moods" aria-describedby={hintId}>
        <legend className="landing-sr-only">
          Chọn cảm xúc để thử bản minh họa
        </legend>
        {MOODS.map((mood, index) => {
          const Icon = mood.icon;
          return (
            <label
              key={mood.label}
              className={
                selected === index ? "today-mood is-selected" : "today-mood"
              }
            >
              <input
                type="radio"
                name="landing-mood"
                value={mood.label}
                checked={selected === index}
                onChange={() => setSelected(index)}
              />
              <Icon size={29} strokeWidth={1.5} aria-hidden="true" />
              <span>{mood.label}</span>
            </label>
          );
        })}
      </fieldset>
      <p className="today-response" aria-live="polite">
        {selected === null
          ? "Không cần một câu trả lời hoàn hảo. Chỉ cần đúng với bạn lúc này."
          : MOODS[selected].message}
      </p>
      <div className="today-bottomline">
        <p id={hintId}>Bản thử không lưu cảm xúc của bạn.</p>
        <Link href="/register">
          Bắt đầu ghi nhận <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
