export default function writeLog(msg: string) {
  process.env.NODE_ENV === "development" ? console.log(msg) : "";
}
