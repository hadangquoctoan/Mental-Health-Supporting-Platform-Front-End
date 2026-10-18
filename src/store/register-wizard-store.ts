import { create } from "zustand";
import type { EmergencyContact } from "@/types/patient";
import type { RegisterWizardState } from "@/types/auth";

const emptyAccount = {
  phone: "",
  password: "",
  full_name: "",
  date_of_birth: "",
  gender: undefined,
  address: "",
};

interface RegisterWizardStore extends RegisterWizardState {
  step: number;
  setRole: (role: "PATIENT" | "DOCTOR") => void;
  setAccount: (account: RegisterWizardState["account"]) => void;
  setPatientProfile: (profile: RegisterWizardState["patientProfile"]) => void;
  setDoctorProfile: (profile: RegisterWizardState["doctorProfile"]) => void;
  setEmergencyContacts: (contacts: EmergencyContact[]) => void;
  setTermsAccepted: (accepted: boolean) => void;
  goNext: () => void;
  goBack: () => void;
  goTo: (step: number) => void;
  reset: () => void;
  totalSteps: () => number;
}

const initialState: RegisterWizardState = {
  role: null,
  account: emptyAccount,
  patientProfile: {
    diagnosis_history: "",
    treatment_history: "",
    mental_health_notes: "",
  },
  doctorProfile: {
    license_number: "",
    professional_phone: "",
    bio: "",
  },
  emergencyContacts: [
    { name: "", phone: "", relationship: "", priority: 1 },
  ],
  termsAccepted: false,
};

export const useRegisterWizardStore = create<RegisterWizardStore>(
  (set, get) => ({
    ...initialState,
    step: 1,

    setRole: (role) => set({ role, step: 2 }),
    setAccount: (account) => set({ account }),
    setPatientProfile: (patientProfile) => set({ patientProfile }),
    setDoctorProfile: (doctorProfile) => set({ doctorProfile }),
    setEmergencyContacts: (emergencyContacts) => set({ emergencyContacts }),
    setTermsAccepted: (termsAccepted) => set({ termsAccepted }),
    goNext: () => {
      const max = get().totalSteps();
      set({ step: Math.min(get().step + 1, max) });
    },
    goBack: () => set({ step: Math.max(get().step - 1, 1) }),
    goTo: (step) => set({ step }),
    reset: () => set({ ...initialState, step: 1 }),
    totalSteps: () => (get().role === "DOCTOR" ? 4 : 5),
  }),
);
