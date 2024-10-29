export const getPresignedImg = async (src: File) => {
  const file = src
  let url
  if (file) {
    try {
      const filename = encodeURIComponent(src?.name)
      const res: { fields: any; url: string } | any = await fetch(
        `/api/image?file=${filename}`,
      )
      const resJson = await res.json()
      const formData = new FormData()
      Object.entries({ ...resJson.data.fields, file }).forEach(
        ([key, value]) => {
          formData.append(key, value as string)
        },
      )
      const uploadResult = await fetch(resJson.data.url, {
        method: 'POST',
        body: formData,
      })
      if (uploadResult.ok) {
        url = `${uploadResult.url}/${filename}`
        return url
      }
      throw new Error('이미지 업로드 중 에러 발생!')
    } catch (e) {
      return false
    }
  }
  return null
}
