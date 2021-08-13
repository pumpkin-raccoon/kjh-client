export const copyToClipboard = (content: string) => {
  const tempElement = document.createElement('textarea')
  tempElement.value = content
  document.body.appendChild(tempElement)
  tempElement.select()
  document.execCommand('copy')
  document.body.removeChild(tempElement)
}
