export interface ILocation {
  _id: string
  name: string
  address: string
  lat: number
  lon: number
  category_id: string[]
}

interface LocationProps {
  promotion: ILocation
}

interface LocationsProps {
  promotions: ILocation[]
}

export interface ICategory {
  _id: string
  name: string
}

interface CategoryProps {
  promotion: ICategory
}

interface CategoriesProps {
  promotions: ICategory[]
}

type ApiDataType = {
  message: string
  status: string
  categories: ICategory[]
  category?: ICategory
}

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'

interface SvgInlineReactProps {
  src: string;
  raw?: boolean;
  element?: string;
}

declare module 'svg-inline-react' {
  export default class InlineSVG extends React.Component<SvgInlineReactProps, any> {
  }
}