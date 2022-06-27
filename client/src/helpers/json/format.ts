export const getFormattedJSON = (body: string) => {
  return JSON.stringify(JSON.parse(body), null, '\t')
}
