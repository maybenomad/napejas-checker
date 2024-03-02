export default function csx(...args: string[]) {
  return args.filter(Boolean).join(" ");
}
