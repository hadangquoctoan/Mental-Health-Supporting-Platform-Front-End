const RED_FLAG_PATTERN =
  /tự\s*tử|tu\s*tu|tự\s*hại|tu\s*hai|muốn\s*chết|muon\s*chet|không\s*muốn\s*sống|khong\s*muon\s*song|kết\s*liễu|ket\s*lieu|tự\s*vẫn|tu\s*van/i;

export function hasCheckInRedFlag(note: string | undefined): boolean {
  if (!note) return false;
  return RED_FLAG_PATTERN.test(note);
}
