import React from "react"
import { Link } from "gatsby"
import styled from "@emotion/styled"
import colors from "styles/colors"
import Logo from "components/_ui/Logo"

const FooterContainer = styled("div")`
  padding-top: 3.25em;
  padding-bottom: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FooterAuthor = styled("div")`
  font-size: 0.75em;
  color: ${colors.grey700};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  margin-top: 1.5em;
`

const Footer = () => (
  <FooterContainer>
    <Link to="/">
      <Logo />
    </Link>
    <FooterAuthor>© 2021 — Designed & developed by Thai-Nam Hoang</FooterAuthor>
  </FooterContainer>
)

export default Footer
