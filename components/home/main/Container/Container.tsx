import "./Container.scss"

type Props = {
  children: React.ReactNode
}

export const Container = ({ children }: Props) => {
  return <div className="main__container">{children}</div>
}
