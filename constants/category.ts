class CategoryClass {
  constructor(image: string, codestyle: string = '') {
    this.image = image
    this.codestyle = codestyle
  }
  image
  codestyle
}

export type categoryType = {
  image: string
  codestyle: string
}

type CategoryKeys = 'HTML' | 'CSS' | 'JAVA SCRIPT' | 'REACT'

export const categories: { [key in CategoryKeys]: categoryType } = {
  HTML: new CategoryClass('', 'css'),
  CSS: new CategoryClass('', 'css'),
  'JAVA SCRIPT': new CategoryClass('', 'javascript'),
  REACT: new CategoryClass('', 'jsx'),
}

// new CategoryClass('HTML', 'image', 'css'),
// new CategoryClass('CSS', 'image', 'css'),
// new CategoryClass('JAVA SCRIPT', 'image', 'javascript'),
// new CategoryClass('REACT', 'image', 'jsx'),
