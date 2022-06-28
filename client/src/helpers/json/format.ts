export const getFormattedJSON = (body: string): string => {
  return JSON.stringify(JSON.parse(body), null, '\t')
}
