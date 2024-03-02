export default function csx(...args) {
  return args.filter(Boolean).join(" ");
}
