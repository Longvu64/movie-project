import styles from "./PageLink.module.scss";
import className from "classnames/bind";
import { NavLink,  } from "react-router-dom";
import { useContext } from "react";
import {MovieIdContext} from "../../App"

const cx = className.bind(styles);
function PageLink({children, getIndex, page}) {
  const context = useContext(MovieIdContext)
 
    return ( 
        <NavLink 
            to={`/type=${context.type}/genre=${context.genreId}/page=${page ? page : children}`} 
            className={((nav) => cx("page-number", {active: nav.isActive}) )}
            onClick={() => {
                getIndex(page ? page : children)
                context.getPage(page ? page : children);
              }}
        > 
            {page ? page : children}
        </NavLink>
     );
}

export default PageLink;