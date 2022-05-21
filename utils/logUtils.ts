export default function witreLog(msg: string) {
  process.env.NODE_ENV === "development" ? console.log(msg) : "";
}
