import { Link } from "react-router-dom";

export function Home () {
  return (
    <>
      <h1>Home</h1>
      <Link to="/login" >Login</Link>
      <Link to="/courseprogress" >course</Link>
      <Link to="/codechallge" >Code Challenge</Link>
    </>
  )
}

