"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AbandonConfirm } from "@/components/features/screening/AbandonConfirm";
import { QuestionCard } from "@/components/features/screening/QuestionCard";
import { ScreeningProgress } from "@/components/features/screening/ScreeningProgress";
import { Button } from "@/components/ui/Button";
import { getApiErrorMessage } from "@/lib/api-error";
import {
  abandonScreeningAttempt,
  createScreeningAttempt,
  listScreeningQuestions,
  listScreeningTypes,
  submitScreeningResult,
} from "@/lib/api/screening";
import {
  clearDraft,
  loadDraft,
  saveDraft,
} from "@/lib/screening-draft";
import { useScreeningRunnerStore } from "@/store/screening-store";
import type { ScreeningQuestion, ScreeningType } from "@/types/screening";

export default function ScreeningRunnerPage() {
  const params = useParams<{ code: string }>();
  const code = String(params.code).toUpperCase();
  const router = useRouter();
  const runner = useScreeningRunnerStore();

  const [types, setTypes] = useState<ScreeningType[]>([]);
  const [questions, setQuestions] = useState<ScreeningQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const screeningType = useMemo(
    () => types.find((item) => item.code === code) ?? null,
    [types, code],
  );

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const fetchedTypes = await listScreeningTypes();
        if (!mounted) return;
        setTypes(fetchedTypes);
        const currentType = fetchedTypes.find((item) => item.code === code);
        if (!currentType) {
          setError("Không tìm thấy bài sàng lọc.");
          return;
        }
        const fetchedQuestions = await listScreeningQuestions(code);
        if (!mounted) return;
        setQuestions(
          [...fetchedQuestions].sort(
            (a, b) => a.question_number - b.question_number,
          ),
        );

        const attempt = await createScreeningAttempt({
          screening_type_id: currentType.id,
        });
        if (!mounted) return;

        const draft = loadDraft(code, attempt.id);
        runner.setRunner({
          code,
          attemptId: attempt.id,
          screeningTypeId: currentType.id,
          answers: draft?.answers ?? {},
          currentIndex: draft?.currentIndex ?? 0,
        });
      } catch (err: unknown) {
        if (mounted) setError(getApiErrorMessage(err, "Không tải được bài làm."));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    void load();
    return () => {
      mounted = false;
    };
  }, [code, runner]);

  useEffect(() => {
    if (!runner.attemptId || !screeningType) return;
    const handle = window.setTimeout(() => {
      saveDraft(code, runner.attemptId as number, {
        attemptId: runner.attemptId,
        screeningTypeId: screeningType.id,
        answers: runner.answers,
        currentIndex: runner.currentIndex,
        updatedAt: new Date().toISOString(),
      });
    }, 400);
    return () => window.clearTimeout(handle);
  }, [code, runner.answers, runner.attemptId, runner.currentIndex, screeningType]);

  const currentQuestion = questions[runner.currentIndex] ?? null;
  const selectedValue = currentQuestion
    ? runner.answers[currentQuestion.question_number]
    : undefined;
  const canNext = selectedValue !== undefined && selectedValue !== "";
  const isLast = runner.currentIndex === questions.length - 1;

  async function onNext() {
    if (!canNext) return;
    if (isLast) {
      await onSubmit();
      return;
    }
    runner.setIndex(runner.currentIndex + 1);
  }

  function onPrev() {
    runner.setIndex(Math.max(0, runner.currentIndex - 1));
  }

  async function onSubmit() {
    if (!runner.attemptId || !screeningType) return;
    if (Object.keys(runner.answers).length !== questions.length) {
      setError("Vui lòng trả lời tất cả câu trước khi nộp.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const answers = questions.map((question) => ({
        question_number: question.question_number,
        value: runner.answers[question.question_number] as number | string | boolean,
      }));
      const result = await submitScreeningResult({
        attempt_id: runner.attemptId,
        screening_type_id: screeningType.id,
        answers,
      });
      clearDraft(code, runner.attemptId);
      runner.reset();
      router.push(`/screening/${code}/result?id=${result.id}`);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, "Không nộp được bài. Vui lòng thử lại."));
    } finally {
      setSubmitting(false);
    }
  }

  async function onAbandon() {
    if (runner.attemptId) {
      try {
        await abandonScreeningAttempt(runner.attemptId);
      } catch {
        // best effort
      }
      clearDraft(code, runner.attemptId);
    }
    runner.reset();
    router.push("/screening");
  }

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6" aria-busy="true">
        <p className="text-sm text-stone-600">Đang tải bài làm...</p>
      </main>
    );
  }

  if (error && questions.length === 0) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6">
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
        <Button variant="secondary" onClick={() => router.push("/screening")} className="mt-3">
          Quay lại danh sách
        </Button>
      </main>
    );
  }

  if (!currentQuestion) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6">
        <p className="text-sm text-stone-600">Không có câu hỏi.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold text-stone-900">
          {screeningType?.name ?? code}
        </h1>
        <Button variant="ghost" onClick={() => setConfirmOpen(true)}>
          Bỏ dở
        </Button>
      </div>

      <ScreeningProgress current={runner.currentIndex + 1} total={questions.length} />

      <div className="mt-4">
        <QuestionCard
          question={currentQuestion}
          selected={selectedValue}
          onSelect={(value) => runner.setAnswer(currentQuestion.question_number, value)}
        />
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-4 flex gap-3">
        <Button variant="secondary" onClick={onPrev} disabled={runner.currentIndex === 0} className="flex-1">
          Trước
        </Button>
        <Button
          onClick={onNext}
          disabled={!canNext || submitting}
          className="flex-1"
        >
          {submitting ? "Đang nộp..." : isLast ? "Nộp bài" : "Tiếp"}
        </Button>
      </div>

      <AbandonConfirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={onAbandon}
      />
    </main>
  );
}
