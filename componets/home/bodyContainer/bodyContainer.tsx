import "./bodyContainer.scss"

type Props = {
  children: React.ReactNode
}

export const BodyContainer = ({ children }: Props) => {
  return <div className="bodyContainer">{children}</div>
}
