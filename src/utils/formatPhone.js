export default function formatPhone(phoneNumber) {
  return phoneNumber
    .replace(/\D/g, '');
}
