import { apiFetch, buildQuery } from './client';
import { EnquiryInput, Enquiry, EnquiryListParams, EnquiryListResponse, EnquiryStatus } from '../types';

// Public - used by the enquiry forms on Product/Service/Contact pages
export function submitEnquiry(data: EnquiryInput) {
  return apiFetch<{ enquiryId: string }>('/enquiries', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Admin-only (Phase 2). The backend route already exists behind `attachUser`,
// so these are ready for when the admin dashboard is built - not called by
// any Phase 1 page yet.
export function getEnquiries(params?: EnquiryListParams) {
  return apiFetch<EnquiryListResponse>(`/enquiries${buildQuery(params)}`);
}

export function updateEnquiryStatus(id: string, status: EnquiryStatus) {
  return apiFetch<Enquiry>(`/enquiries/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}