import Image from "next/image";
import Link from "next/link";
export default function SponsorCard({ type, json, basePath }) {
  const style = "relative " + (type === "small" ? "h-28 w-28" : "h-48 w-48");
  return (
    <Link
      className="text-center rounded-lg bg-grey py-4 px-8 w-full sm:w-60 hover:-translate-y-1"
      href={json.link}
    >
      <Image
        className={
          "object-contain mx-auto " +
          (type === "small" ? "h-28 w-28" : "glow h-48 w-48")
        }
        width="500"
        height="500"
        src={
          basePath
            ? `${basePath}/images/sponsors/${json.image}`
            : `/images/sponsors/${json.image}`
        }
        alt={json.name}
      />
    </Link>
  );
}
