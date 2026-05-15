export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <main className="mx-auto max-w-4xl px-6 py-20 lg:px-8 lg:py-32 animate-pulse">
        {/* Hero Skeleton */}
        <section className="flex flex-col-reverse items-center justify-between gap-12 md:flex-row md:items-start">
          <div className="flex-1 space-y-6">
            <div className="h-12 w-3/4 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-8 w-1/2 rounded-lg bg-zinc-100 dark:bg-zinc-900" />
            <div className="flex gap-4">
              <div className="h-10 w-32 rounded-full bg-zinc-100 dark:bg-zinc-900" />
              <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-900" />
            </div>
          </div>
          <div className="h-48 w-48 rounded-2xl bg-zinc-100 dark:bg-zinc-800 md:h-64 md:w-64" />
        </section>

        {/* Bio Skeleton */}
        <section className="mt-24 max-w-2xl space-y-4">
          <div className="h-8 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-4 w-2/3 rounded bg-zinc-100 dark:bg-zinc-900" />
        </section>

        {/* Projects Skeleton */}
        <section className="mt-24">
          <div className="h-8 w-48 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-900">
                <div className="mb-6 aspect-[16/9] w-full rounded-xl bg-zinc-100 dark:bg-zinc-900" />
                <div className="h-6 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="mt-4 space-y-2">
                  <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-900" />
                  <div className="h-4 w-5/6 rounded bg-zinc-100 dark:bg-zinc-900" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
