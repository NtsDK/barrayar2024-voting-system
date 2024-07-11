export function ErrorPanel({ errors }: { errors?: any }) {
  if (errors && JSON.stringify(errors) !== "{}") {
    return (
      <pre className="p-6 bg-red-100 border-red-800 border-2 border-solid rounded mb-8">
        {JSON.stringify(errors, null, "  ")}
      </pre>
    );
  }
  return null;
}
