export const getPresignedImg = async (src: File) => {
  console.log(src, '버박')
  let file = src
  let url
  if (file) {
    try {
      let filename = encodeURIComponent(src?.name)
      let res: { fields: any; url: string } | any = await fetch(
        `/api/image?file=${filename}`,
      )
      const resJson = await res.json()
      const formData = new FormData()
      Object.entries({ ...resJson.data.fields, file }).forEach(
        ([key, value]) => {
          formData.append(key, value as string)
        },
      )
      let uploadResult = await fetch(resJson.data.url, {
        method: 'POST',
        body: formData,
      })
      console.log(uploadResult, '업로드 리절트')
      if (uploadResult.ok) {
        url = uploadResult.url + `/` + filename
        return url
      } else {
        throw new Error('이미지 업로드 중 에러 발생!')
      }
    } catch (e) {
      alert(e)
    }
  }
}
