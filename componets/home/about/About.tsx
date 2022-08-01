import "./About.scss"

type Props = {
  children: React.ReactNode
}

export const About = ({ children }: Props) => {
  return (
    <div className="about">
      <div className="about__triangle" />
      {children}
    </div>
  )
}
