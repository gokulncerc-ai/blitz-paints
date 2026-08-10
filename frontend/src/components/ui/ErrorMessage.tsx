// Path: frontend/src/components/ui/ErrorMessage.tsx
export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="mx-auto my-10 max-w-lg rounded-lg border border-red-200 bg-red-50 px-6 py-4 text-center text-red-700">
      <p className="font-medium">Couldn't load this content</p>
      <p className="mt-1 text-sm text-red-600">{message}</p>
    </div>
  );
}
