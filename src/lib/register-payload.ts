import type {
  RegisterDoctorRequest,
  RegisterPatientRequest,
  RegisterWizardState,
} from "@/types/auth";

export function toPatientRegisterPayload(
  wizard: RegisterWizardState,
): RegisterPatientRequest {
  return {
    role: "PATIENT",
    ...wizard.account,
    diagnosis_history: wizard.patientProfile.diagnosis_history || undefined,
    treatment_history: wizard.patientProfile.treatment_history || undefined,
    mental_health_notes: wizard.patientProfile.mental_health_notes || undefined,
    emergency_contacts: wizard.emergencyContacts,
  };
}

export function toDoctorRegisterPayload(
  wizard: RegisterWizardState,
): RegisterDoctorRequest {
  return {
    role: "DOCTOR",
    ...wizard.account,
    license_number: wizard.doctorProfile.license_number,
    professional_phone: wizard.doctorProfile.professional_phone || undefined,
    bio: wizard.doctorProfile.bio || undefined,
  };
}
