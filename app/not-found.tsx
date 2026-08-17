import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col justify-center py-24">
      <p className="mono text-xs uppercase text-plasma">Signal lost · 404</p>
      <h1 className="display mt-6 text-2xl text-ink md:text-3xl">
        Nothing is in orbit at this address.
      </h1>
      <p className="mt-5 max-w-md text-lg text-dim">
        The page you asked for does not exist. Head back to the system map and
        pick a body.
      </p>
      <Link
        href="/"
        className="cta mt-10 w-fit px-7 py-3.5 text-sm"
      >
        Return to orbit
      </Link>
    </section>
  );
}
