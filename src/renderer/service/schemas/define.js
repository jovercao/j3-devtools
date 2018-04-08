export default function define(name, schema) {
  const cls = class {}
  cls.$schema = schema
}
