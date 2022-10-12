import styles from "./Header.module.scss";
import className from "classnames/bind";
import { GoSearch } from "react-icons/go";
import { AiOutlineMenu } from "react-icons/ai";
import { useState, useRef, useEffect, Fragment, useContext } from "react";
import Tippy from "@tippyjs/react/headless";
import { Link, useNavigate } from "react-router-dom";
import * as request from "../../config";
import { MovieIdContext } from "../../App";

const cx = className.bind(styles);

function Header({
  handleTypeMovie,
  handleTypeTv,
  type,
  onGetGenre,
  getMovieName,
}) {
  const inputRef = useRef();
  const navigate = useNavigate();

  const context = useContext(MovieIdContext);
  console.log(context.type);
  const [searchInput, setSearchInput] = useState("");
  const [isMenu, setIsMenu] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [genres, setGenres] = useState([]);
  const searchInputZone = document.getElementById("id");

  useEffect(() => {
    request
      .get(`genre/${type}/list`, {
        params: {
          api_key: "19f84e11932abbc79e6d83f82d6d1045",
        },
      })
      .then((data) => setGenres(data.genres));
  }, [type]);
  console.log(type);
  searchInputZone &&
    document.addEventListener("click", (event) => {
      const isClickInside = searchInputZone.contains(event.target);
      if (!isClickInside) {
        setIsSearch(false);
      }
    });

  {
    document.onkeyup = (e) => {
      if (e.key === "Enter") {
        navigate(
          isSearch &&
            searchInput !== "" &&
            `/type=${context.type}/search=${searchInput}`
        );
      }
    };
  }
  return (
    <Fragment>
      {/* Mobile nav */}
      <div
        onClick={(e) => {
          if (!document.getElementById("overlay").contains(e.target)) {
            setIsMenu(false);
          }
        }}
        className={
          !isMenu
            ? cx("menu-overlay")
            : cx("menu-overlay", "menu-overlay-transform")
        }
      >
        <div
          id="overlay"
          className={
            !isMenu
              ? cx("menu-mobile")
              : cx("menu-mobile", "menu-overlay-transform")
          }
        >
          <nav
            onClick={() => {
              setIsMenu(false);
            }}
            className={cx("header-nav-mobile")}
          >
            <Link to="/" className={cx("header-nav-item-mobile")}>
              Home
            </Link>
            <Link
              to="/"
              className={cx("header-nav-item-mobile")}
              onClick={() => {
                handleTypeMovie();
              }}
            >
              Movies
            </Link>
            <Link
              to="/"
              className={cx("header-nav-item-mobile")}
              onClick={() => {
                handleTypeTv();
              }}
            >
              TV Shows
            </Link>
            <Tippy
              interactive
              offset={[20, -180]}
              // visible
              placement="right-start"
              render={(attrs) => (
                <ul className={cx("genres-list")} tabIndex="-1" {...attrs}>
                  {genres &&
                    genres.map((genre, id) => {
                      return (
                        <li className={cx("genres-list-item")} key={id}>
                          <Link
                            to={`/type=${context.type}/genre=${genre.id}/page=1`}
                            className={cx("genres-list-item-link")}
                            onClick={() => {
                              onGetGenre(genre.id);
                              context.getPage(1);
                              context.getGenreName(genre.name);
                            }}
                          >
                            {genre.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              )}
            >
              <p className={cx("header-nav-item-mobile")}>Genres</p>
            </Tippy>
          </nav>
          <p className={cx("sign-in-mobile")}>Sign in</p>
        </div>
      </div>
      {/* Mobile nav */}

      <header className={cx("header")}>
        <div className={cx("menu-logo")}>
          <div onClick={() => setIsMenu(!isMenu)} className={cx("menu-icon")}>
            <AiOutlineMenu />{" "}
          </div>
          <Link to={"/"} className={cx("logo")}>
            <img src="https://thereelbits.com/wp-content/uploads/2017/05/Netflix-Logo.jpg" />
          </Link>
        </div>

        {/* Main nav */}
        <nav className={cx("header-nav")}>
          <Link to="/" className={cx("header-nav-item")}>
            Home
          </Link>
          <Link
            to="/"
            className={cx("header-nav-item")}
            onClick={handleTypeMovie}
          >
            Movies
          </Link>
          <Link to="/" className={cx("header-nav-item")} onClick={handleTypeTv}>
            TV Shows
          </Link>
          <Tippy
            interactive
            placement="bottom-start"
            render={(attrs) => (
              <ul className={cx("genres-list")} tabIndex="-1" {...attrs}>
                {genres &&
                  genres.map((genre, id) => {
                    return (
                      <li className={cx("genres-list-item")} key={id}>
                        <Link
                          to={`/type=${context.type}/genre=${genre.id}/page=1`}
                          className={cx("genres-list-item-link")}
                          onClick={() => {
                            onGetGenre(genre.id);
                            context.getPage(1);
                            context.getGenreName(genre.name);
                          }}
                        >
                          {genre.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            )}
          >
            <p className={cx("header-nav-item")}>Genres</p>
          </Tippy>
        </nav>
        {/* Main nav */}

        {/* browser tippy */}
        <Tippy
          placement={"bottom-start"}
          interactive
          render={(attrs) => (
            <nav className={cx("header-nav-tablet")} tabIndex="-1" {...attrs}>
              <Link to="/" className={cx("header-nav-item")}>
                Home
              </Link>
              <Link
                to="/"
                className={cx("header-nav-item")}
                onClick={handleTypeMovie}
              >
                Movies
              </Link>
              <Link
                to="/"
                className={cx("header-nav-item")}
                onClick={handleTypeTv}
              >
                TV Shows
              </Link>
              <Tippy
                interactive
                placement="bottom-start"
                render={(attrs) => (
                  <ul className={cx("genres-list")} tabIndex="-1" {...attrs}>
                    {genres &&
                      genres.map((genre, id) => {
                        return (
                          <li className={cx("genres-list-item")} key={id}>
                            <Link
                              to={`/type=${context.type}/genre=${genre.id}/page=1`}
                              className={cx("genres-list-item-link")}
                              onClick={() => {
                                onGetGenre(genre.id);
                                context.getPage(1);
                                context.getGenreName(genre.name);
                              }}
                            >
                              {genre.name}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                )}
              >
                <p className={cx("header-nav-item")}>Genres</p>
              </Tippy>
            </nav>
          )}
        >
          <p className={cx("browser-mobile")}>Browser</p>
        </Tippy>
        {/* browser tippy */}

        <div className={cx("search-login")}>
          <div
            id={"id"}
            className={
              isSearch ? cx("search-input") : cx("search-input", "border-none")
            }
          >
            <div
              className={cx("search-icon")}
              onClick={() => {
                setIsSearch(true);
                inputRef.current.focus();
              }}
            >
              <Link
                to={
                  isSearch &&
                  searchInput !== "" &&
                  `/type=${context.type}/search=${searchInput}`
                }
                onClick={() => {
                  isSearch && searchInput !== "" && getMovieName(searchInput);
                  setSearchInput("");
                }}
              >
                <GoSearch />
              </Link>
            </div>
            <input
              ref={inputRef}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search..."
              className={isSearch ? cx("input-area") : cx("display-none")}
            />
          </div>
          <p className={cx("sign-in")}>Sign in</p>
        </div>
      </header>
    </Fragment>
  );
}

export default Header;
