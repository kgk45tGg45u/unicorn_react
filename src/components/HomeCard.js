import { Link } from "react-router-dom"

export const HomeCard = (props) => {
  // const [hidden, setHidden] = useState(true);

  return (
    <section>
      {props.link ? (
        <Link to={props.link}>
          <div
            onClick={props.onClick}
          >
            <img src={props.img} alt={props.alt} />
            {/* <span className='indicator'>22</span> */}
            <p>{props.text}</p>
          </div>
        </Link>
      ) : (<div
        onClick={props.onClick}
      >
        <img src={props.img} alt="Tokens" />
        {/* <span className='indicator'>22</span> */}
        <p>{props.text}</p>
      </div>
    )}
    </section>
  )
}
